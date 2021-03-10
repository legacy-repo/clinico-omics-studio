<template>
  <div class="hot-table" ref="chartTable" :style="{ height: clientHeight + 'px' }">
    <a-tabs type="editable-card" :activeKey="activeKey" @edit="onEdit" @change="changeTab">
      <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.name" :closable="pane.closable" forceRender>
        <hot-table
          :id="'hotTable' + pane.key"
          :ref="'hotTable' + pane.key"
          :settings="hotSettings"
          licenseKey="non-commercial-and-evaluation"
        ></hot-table>
      </a-tab-pane>
    </a-tabs>
    <div class="resize-bar" ref="resizeBar" @mousedown.stop.prevent="handleDragStart">
      <div class="divider"></div>
    </div>
  </div>
</template>

<script>
import { HotTable } from '@handsontable/vue'
import { mapState, mapActions } from 'vuex'
import filter from 'lodash.filter'
import map from 'lodash.map'
import v from 'voca'

export default {
  name: 'ChartTable',
  props: {
    clientHeight: {
      required: false,
      default: 150,
      type: Number
    }
  },
  data() {
    return {
      hotSettings: {
        bindRowsWithHeaders: true,
        colHeaders: true,
        rowHeaders: true,
        filters: true,
        minCols: 50,
        minRows: 200,
        data: null,
        manualColumnFreeze: true,
        dropdownMenu: [
          'undo',
          '---------',
          'redo',
          '---------',
          'make_read_only',
          '---------',
          'clear_column',
          '---------',
          'alignment',
          '---------',
          'filter_by_condition',
          'filter_operators',
          'filter_by_condition2',
          'filter_by_value',
          'filter_action_bar'
        ],
        autoRowSize: true,
        autoColSize: true,
        stretchH: 'all',
        height: '100%',
        width: '100%',
        manualColumnResize: true,
        multiColumnSorting: true,
        undo: true,
        redo: true,
        contextMenu: {
          items: {
            make_read_only: {},
            redo: {},
            undo: {},
            row_below: {},
            row_above: {},
            freeze_column: {},
            unfreeze_column: {}
          }
        }
      },
      unamedIndex: 1,
      activeKey: 'unamed_grid_1',
      isMouseDown: false,
      originX: 0,
      originY: 0
    }
  },
  methods: {
    ...mapActions({
      reset_files: 'ResetFiles',
      init_files: 'InitFiles',
      add_new_file: 'AddNewFile'
    }),
    onEdit(targetKey, action) {
      console.log('onEdit: ', targetKey, action)
      this[action](targetKey)
    },
    handleDragStart(e) {
      // 获取拖拽起始位置坐标
      this.originX = e.clientX || e.touches[0].clientX
      this.originY = e.clientY || e.touches[0].clientY
      this.isMouseDown = true
      document.onmousemove = ev => {
        if (!this.isMouseDown) return false
        const h = this.clientHeight
        // 获取拖拽移动的距离
        const eventY = ev.clientY || ev.touches[0].clientY
        const moveY = eventY - this.originY
        if (moveY < 0) {
          if (h + moveY <= 150) {
            return false
          } else {
            this.$refs.resizeBar.style.bottom = moveY + 'px'
          }
        } else {
          this.$refs.resizeBar.style.top = moveY + 'px'
        }

        console.log('handleDragStart: ', moveY, h)
        this.$refs.resizeBar.style.position = 'relative'
        this.$refs.chartTable.style.height = moveY + h + 'px'
        this.refreshTable(this.activeKey)
      }
      document.onmouseup = ev => {
        if (!this.isMouseDown) return false
        this.isMouseDown = false
        const eventY = ev.clientY || ev.changedTouches[0].clientY
        if (eventY === this.originY) return false
        this.$refs.resizeBar.style.top = '0px'
        this.$emit('resize-height', parseInt(this.$refs.chartTable.style.height.replace('px', '')))
        this.refreshTable(this.activeKey)
      }
    },
    refreshTable(activeKey) {
      const instance = this.$refs['hotTable' + activeKey]
      console.log('refreshTable: ', activeKey, instance)
      if (instance && instance.length > 0) {
        setTimeout(() => {
          instance[0].hotInstance.render()
          instance[0].hotInstance.refreshDimensions()
        }, 100)
      }
    },
    getHeader(data) {
      return Object.keys(data[0])
    },
    getBody(data) {
      const headers = this.getHeader(data)
      if (data.length > 0) {
        return map(data, item => {
          const record = []
          headers.forEach(field => {
            record.push(item[field])
          })

          return record
        })
      } else {
        return []
      }
    },
    loadData(activeKey, pane) {
      if (pane.data.length > 0) {
        const instance = this.$refs['hotTable' + activeKey]
        const header = this.getHeader(pane.data)
        const body = this.getBody(pane.data)

        console.log('loadData: ', pane, instance[0], activeKey)
        if (instance && instance.length > 0) {
          setTimeout(() => {
            instance[0].hotInstance.updateSettings({
              colHeaders: header
            })
            instance[0].hotInstance.loadData(body)
          }, 100)
        }
      }
    },
    changeTab(activeKey) {
      const pane = filter(this.panes, pane => {
        return pane.key === activeKey
      })
      this.loadData(activeKey, pane[0]) // TODO: any exception?
      this.activeKey = activeKey
      this.refreshTable(activeKey)
    },
    add() {
      this.unamedIndex += 1
      let name = 'Unamed Grid ' + this.unamedIndex
      this.add_new_file(name)
      this.activeKey = v.snakeCase(name)
    },
    remove(targetKey) {
      const panes = this.panes.filter(pane => pane.key !== targetKey)
      this.reset_files(panes)

      // 切换焦点
      if (panes.length > 0) {
        this.activeKey = panes[0].key
      } else {
        this.activeKey = 'unamed_grid_1'
      }
    }
  },
  computed: mapState({
    panes: state => state.chartStudio.files
  }),
  mounted() {},
  components: {
    HotTable
  },
  created() {
    this.init_files()
  }
}
</script>

<style lang="css">
@import '~handsontable/dist/handsontable.full.css';
</style>

<style lang="less">
.hot-table {
  width: 100%;
  height: 100%;

  .ant-tabs-tabpane {
    border-right: 1px solid #d6d6d6;
  }

  .ant-tabs-bar {
    margin-bottom: 5px;
  }

  .ant-tabs,
  .ant-tabs-content,
  .ant-tabs-tabpane {
    height: calc(100% - 8px);
  }

  .resize-bar {
    width: 100%;
    background-color: #a2b1c6;
    height: 8px;
    cursor: row-resize;
    padding-top: 2px;
  }

  .divider {
    width: 18px;
    height: 4px;
    border: 1px solid #fff;
    border-width: 1px 0 1px 0;
    clear: both;
    margin: auto;
  }

  // Improve table
  .ht_clone_top {
    z-index: 1;
  }

  .ht_clone_left {
    z-index: 1;
  }

  .ht_clone_top_left_corner {
    z-index: 1;
  }
}
</style>
