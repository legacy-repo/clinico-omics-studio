<template>
  <!--eslint-disable-->
  <a-row class="filter-panel" :gutter="16" style="margin-right: 0px;">
    <a-col class="left" :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="Files">
          <a-row style="display: flex; justify-content: center; margin: 10px 10px;">
            <a-input-search
              allowClear
              placeholder="Enter search text"
              @change="filterFieldsList"
              style="margin-right: 5px;"
            />
            <a-tooltip>
              <template slot="title">Add a File Filter</template>
              <a-button icon="setting" style="width: 50px;" @click="showFilterPanel"></a-button>
            </a-tooltip>
          </a-row>
          <a-collapse :activeKey="activeFilterList">
            <a-collapse-panel
              :header="toTitleCase(field.name)"
              :key="field.name"
              v-for="field in filteredFieldsList"
              v-if="field.data.length <= maxLimit"
            >
              <filter-list
                :dataSource="field.data"
                @select-filter="filterCollections(field.key, $event)"
              ></filter-list>
              <a-icon slot="extra" type="delete" @click="removeField(field.key)" />
            </a-collapse-panel>
          </a-collapse>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Samples" disabled></a-tab-pane>
        <a-tab-pane key="3" tab="Patients" disabled></a-tab-pane>
      </a-tabs>
    </a-col>
    <a-col class="right" :xl="18" :lg="18" :md="18" :sm="24" :xs="24">
      <a-tabs class="chart-container" defaultActiveKey="1" @change="onChangeChartTab">
        <a-tab-pane tab="Files" key="1">
          <a-row class="pie-container">
            <a-col
              v-for="item in fieldsList"
              v-if="item.data.length <= maxLimit"
              :key="item.name"
              :xl="5"
              :lg="5"
              :md="8"
              :sm="12"
            >
              <pie :dataSource="item.data" :height="120" :width="120" :title="item.short" />
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane tab="Search Advanced" key="2" disabled></a-tab-pane>
      </a-tabs>
      <a-tabs defaultActiveKey="1" @change="onChangeTab">
        <a-tab-pane tab="Table" key="1">
          <data-table></data-table>
        </a-tab-pane>
      </a-tabs>
    </a-col>
    <a-modal
      class="filter-field-panel"
      title="Add a File Filter"
      :visible="visible"
      @cancel="hideFieldPanel"
      :footer="null"
      :width="800"
    >
      <a-row class="control-panel">
        <a-col :span="12">
          <a-tag color="#87d068">{{ allFields.length }} file fields</a-tag>
        </a-col>
        <a-col :span="12">
          <a-button style="float: right;" @click="sortFields">
            <a-icon type="sort-descending" v-if="reverseOrder" />
            <a-icon type="sort-ascending" v-else />
          </a-button>
        </a-col>
      </a-row>
      <a-input-search
        allowClear
        placeholder="Enter search text"
        size="large"
        @change="filterFields"
      />
      <a-row style="width: 100%;">
        <a-checkbox
          style="float: right;"
          :checked="hideActive"
          @change="hideSelectedFields"
        >Hide selected fields?</a-checkbox>
      </a-row>
      <a-card class="field-list">
        <a-row
          @click.native="addField(field.key)"
          v-for="(field, index) in filteredFields"
          v-if="hideActive ? !field.selected : true"
          :key="field.key"
          class="field-row"
        >
          <a-row class="field-index">FL {{ index }}</a-row>
          <a-row class="field-content">
            <a-col>
              <span>{{ field.name }}</span>
              <a-tag color="#f50" style="margin-left: 5px">{{ field.type }}</a-tag>
              <a-tag color="#87d068">{{ field.key }}</a-tag>
              <span style="float: right">{{ getSelectStatus(field) }}</span>
            </a-col>
            <a-col>
              <span>{{ field.description }}</span>
            </a-col>
          </a-row>
        </a-row>
      </a-card>
    </a-modal>
  </a-row>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { FilterList } from '@/components'
import Pie from './Pie'
import DataTable from './DataTable'
import filter from 'lodash.filter'
import map from 'lodash.map'
import merge from 'lodash.merge'
import sortBy from 'lodash.sortby'

export default {
  name: 'FilterPanel',
  components: {
    FilterList,
    DataTable,
    Pie
  },
  data() {
    return {
      hideActive: false,
      allFields: [],
      maxLimit: 20,
      visible: false,
      searchValue: '',
      filterValue: '',
      reverseOrder: true
    }
  },
  props: {
    projectName: {
      default: 'quartet',
      required: false,
      type: String
    }
  },
  computed: {
    fieldsList() {
      return sortBy(filter(this.allFields, o => {
        return o.selected
      }), 'priority')
    },
    activeFilterList() {
      const active = []
      for (const field of this.fieldsList) {
        active.push(field.name)
      }
      return active
    },
    filterKeys() {
      return map(this.fieldsList, o => {
        return o.key
      })
    },
    filteredFields() {
      if (this.searchValue.length > 0) {
        return filter(this.allFields, record => {
          return (
            record.key.match(new RegExp(this.searchValue, 'i')) || record.name.match(new RegExp(this.searchValue, 'i'))
          )
        })
      } else {
        return this.allFields
      }
    },
    filteredFieldsList() {
      if (this.filterValue.length > 0) {
        return map(this.fieldsList, fieldRecord => {
          console.log('filteredFieldsList: ', fieldRecord, this.filterValue)
          const newFieldRecord = {}
          newFieldRecord['name'] = fieldRecord.name
          newFieldRecord['short'] = fieldRecord.short
          newFieldRecord['key'] = fieldRecord.key
          newFieldRecord['data'] = filter(fieldRecord.data, record => {
            // Remove Special Character
            const pattern = /[`~!@#$^&*()=|{}':;',\\[\].<>/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g
            return record.name.match(new RegExp(this.filterValue.replace(pattern, ''), 'i'))
          })

          return newFieldRecord
        })
      } else {
        return this.fieldsList
      }
    }
  },
  methods: {
    ...mapMutations({
      set_page: 'SET_PAGE',
      set_payload: 'SET_PAYLOAD',
      delete_payload: 'DELETE_PAYLOAD'
    }),
    ...mapActions({
      listCollections: 'ListCollections',
      getDataSchema: 'GetDataSchema',
      countCollections: 'CountCollections'
    }),
    hideSelectedFields() {
      this.hideActive = !this.hideActive
    },
    getSelectStatus(field) {
      if (field.selected) {
        if (field.data.length <= this.maxLimit) {
          return 'Selected'
        } else {
          return 'Not Shown'
        }
      } else {
        return 'Unselected'
      }
    },
    addField(key) {
      const field = filter(this.allFields, o => {
        return o.key == key
      })

      if (field.length > 0) {
        field[0].selected = true
      }

      this.visible = !this.visible
      this.fetchCounts()
      console.log('addField: ', key)
    },
    showFilterPanel() {
      this.visible = !this.visible
    },
    hideFieldPanel() {
      this.visible = !this.visible
    },
    removeField(fieldKey) {
      const field = filter(this.allFields, o => {
        return o.key === fieldKey
      })

      if (field.length > 0) {
        field[0].selected = false
      }
      this.fetchCounts()
    },
    filterFields(e) {
      this.searchValue = e.target.value
    },
    filterFieldsList(e) {
      this.filterValue = e.target.value
    },
    sortFields() {
      this.filteredFields.sort()

      if (this.reverseOrder) {
        this.filteredFields.reverse()
      }

      this.reverseOrder = !this.reverseOrder
    },
    onChangeChartTab() {},
    onChangeTab() {},
    toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    },
    changeCheckedStatus(fieldKey, key, checked) {
      for (let idx in this.fieldsList) {
        if (this.fieldsList[idx].key == fieldKey) {
          for (let i in this.fieldsList[idx].data) {
            if (this.fieldsList[idx].data[i].key == key) {
              this.fieldsList[idx].data[i].checked = checked
            }
          }
        }
      }

      console.log('changeCheckedStatus: ', this.fieldsList, fieldKey, key, checked)
    },
    filterCollections(fieldKey, event) {
      console.log('filterCollections: ', fieldKey, event)
      const key = event.key
      const checked = event.checked

      if (checked) {
        this.set_payload({
          field: fieldKey,
          value: key,
          type: 'category'
        })
      } else {
        this.delete_payload({
          field: fieldKey,
          value: key,
          type: 'category'
        })
      }

      this.fetchCounts({
        fieldKey: fieldKey,
        key: key,
        checked: checked
      })
    },
    cloneMap(queryMap) {
      return JSON.parse(JSON.stringify(queryMap))
    },
    updateData(oldData, newData) {
      const clonedOldData = this.cloneMap(oldData)
      const clonedNewData = this.cloneMap(newData)

      if (clonedOldData.length > 0) {
        return map(clonedOldData, record => {
          const matched = filter(clonedNewData, item => {
            return item.key === record.key
          })

          if (matched.length > 0) {
            return merge(record, matched[0])
          } else {
            return {
              name: record.name,
              key: record.key,
              count: 0
            }
          }
        })
      } else {
        return clonedNewData
      }
    },
    formatField(fieldName) {
      return fieldName.replace('.', '_')
    },
    fetchCounts(checkedObj) {
      const collections = map(this.filterKeys, o => {
        return this.countCollections({ group: this.formatField(o) })
      })

      Promise.all(collections)
        .then(results => {
          for (let idx in this.filterKeys) {
            const key = this.filterKeys[idx]
            const field = filter(this.fieldsList, record => {
              return record.key === key
            })

            if (field.length > 0) {
              const data = this.updateData(field[0].data, results[idx])

              field[0].data = data
            }
          }

          if (checkedObj != undefined) {
            this.changeCheckedStatus(checkedObj.fieldKey, checkedObj.key, checkedObj.checked)
          }
        })
        .catch(error => {
          console.log('fetchCounts Error: ', error)
          this.$message.warn('Cannot fetch data, please retry later.')
        })
    },
    remarkAllFields(allFields, predict) {
      return map(allFields, o => {
        if (predict(o)) {
          o['selected'] = true
        } else {
          o['selected'] = false
        }

        // Initialize all fields
        o['data'] = []

        return o
      })
    },
    getFieldsList(callback) {
      this.getDataSchema()
        .then(response => {
          this.allFields = this.remarkAllFields(response, o => {
            return o.priority <= 5
          })

          callback()
        })
        .catch(error => {
          this.filterFieldsList = []
          this.$message.error('Unknown Error')
          console.log('getFieldsList: ', error)
        })
    }
  },
  created() {
    this.getFieldsList(this.fetchCounts)
  }
}
</script>

<style lang="less">
@import (reference) '~@/components/index.less';

.filter-panel {
  .left {
    .ant-tabs {
      .ant-tabs-bar {
        margin: 0px;
      }

      .ant-tabs-content {
        height: calc(100% - 60px);
        overflow: scroll;
      }
    }
  }
}

.filter-field-panel {
  .ant-modal {
    top: 100px;

    .ant-modal-content {
      .ant-modal-header {
        padding: 10px;
      }

      .ant-modal-close-x {
        height: 45px;
        line-height: 45px;
      }

      .ant-modal-body {
        padding: 10px;

        .control-panel {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin: 0px 0px 10px;
          align-items: center;
          font-weight: 500;
          color: #bb0e3d;

          .ant-tag {
            line-height: 2.5;
          }
        }

        .ant-input-search {
          margin: 0px 0px 10px;
        }

        .ant-checkbox {
          margin-bottom: 5px;
        }

        .field-list {
          max-height: 350px;
          overflow: scroll;

          .ant-card-body {
            padding: 0px;
            height: 100%;

            .field-row {
              display: flex;
              flex-direction: row;

              .field-index {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 45px;
                margin-right: 5px;
                color: #fff;
                background-color: @primary-color;
              }

              .field-content {
                width: 100%;
                display: flex;
                flex-direction: column;
                padding: 10px 20px 10px 0px;
                font-size: 14px;

                .ant-tag {
                  font-style: italic;
                  font-weight: 500;
                }
              }
            }

            .field-row:hover {
              cursor: pointer;
              background-color: @primary-color;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="less" scoped>
.filter-panel {
  .left {
    .ant-tabs {
      background-color: #fff;
      border: 1px solid #d9d9d9;
      border-radius: 5px;
      height: 1200px;

      .ant-collapse {
        border: 0px;
        border-top: 1px solid #d9d9d9;
        border-radius: 0px;

        .ant-collapse-item:last-child,
        .ant-collapse > .ant-collapse-item:last-child > .ant-collapse-header {
          border-radius: 0px;
        }
      }
    }
  }

  .right {
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    background-color: #fff;
    min-height: 1200px;

    .ant-tabs {
      height: 988px;
    }

    .chart-container {
      height: 210px;
    }

    .pie-container {
      display: flex;
      height: 150px;
      margin-right: 25px;

      .pie-chart {
        min-width: 130px;

        div canvas {
          margin: 0px 30px;
        }
      }
    }

    .graph-tab {
      h4 {
        font-size: 1.5rem;
      }

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
