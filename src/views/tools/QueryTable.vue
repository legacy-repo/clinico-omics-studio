<template>
  <a-row class="query-table">
    <a-col class="action">
      <a-button @click="downloadAsJSON">Download As JSON</a-button>
      <a-button style="margin-left: 5px" @click="downloadAsCSV">Download As CSV</a-button>
    </a-col>
    <a-col class="results">
      <a-popover v-model="menuVisible" trigger="click" placement="rightTop">
        <a-row slot="content">
          <a-col class="column-list">
            <a-checkbox
              v-for="item in columns"
              :defaultChecked="item.visible"
              :checked="item.visible"
              :key="item.key"
              @change="onSelectColumn(item.title, $event)"
            >
              {{ item.title }}
            </a-checkbox>
          </a-col>
        </a-row>
        <a-button
          type="primary"
          size="small"
          style="position: absolute; z-index: 10; top: 15px; left: 10px"
          icon="plus"
        >
        </a-button>
      </a-popover>
      <a-table
        :scroll="{ x: width }"
        :columns="filteredColumns"
        :data-source="data"
        :pagination="false"
        :loading="loading"
        :rowKey="rowKey"
      >
        <span slot="number" slot-scope="text">{{ text.slice(0, 3) }}</span>
        <span slot="tag" slot-scope="text, record">
          <a-tooltip>
            <template slot="title">{{ record.statusMsg ? record.statusMsg : text }}</template>
            <a-tag color="#f50" v-if="text === 'exception'">{{ text }}</a-tag>
            <a-tag color="#87d068" v-if="text === 'success'">{{ text }}</a-tag>
            <a-tag color="#108ee9" v-if="text === 'active'">{{ text }}</a-tag>
            <a-tag color="#faad14" v-if="text === 'warning'">{{ text }}</a-tag>
          </a-tooltip>
        </span>
        <a-row slot="expandedRowRender" slot-scope="record" style="margin: 0">
          <a-row
            v-for="item in specialColumns"
            :key="item.key"
            style="display: flex; flex-direction: row; margin-bottom: 5px"
          >
            <a-col style="width: 100px">
              <a-tag color="#108ee9">{{ item.title }}</a-tag>
            </a-col>
            <a-col style="width: calc(100% - 100px)">{{ record[item.key] }}</a-col>
          </a-row>
        </a-row>
      </a-table>
      <a-pagination
        style="margin-top: 10px; float: right"
        @showSizeChange="handleSizeChange"
        @change="handleCurrentChange"
        v-model="currentPage"
        :page-size-options="pageSizeOptions"
        :page-size.sync="pageSize"
        :show-total="(total) => `Total ${total} items`"
        show-quick-jumper
        show-size-changer
        :total="total"
      >
      </a-pagination>
      <a id="downloadAnchorElem" v-show="false"></a>
    </a-col>
  </a-row>
</template>

<script>
import { titleCase } from 'voca'
import filter from 'lodash.filter'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  props: {
    namespace: {
      required: true,
      type: String
    },
    rowKey: {
      required: false,
      type: String,
      default: 'id'
    },
    mode: {
      required: false,
      type: String,
      default: 'updateRow' // updateRow, updateTable
    }
  },
  data() {
    return {
      titleCase,
      menuVisible: false,
      currentPage: 1,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '30', '50', '100']
    }
  },
  computed: {
    data: function() {
      return this.items
    },
    filteredColumns: function() {
      return filter(this.columns, item => {
        return item.visible
      })
    },
    numOfColumns: function() {
      return this.filteredColumns.length
    },
    width: function() {
      return this.numOfColumns > 8 ? this.numOfColumns * 150 : -1
    },
    offset: function() {
      return (this.currentPage - 1) * this.pageSize
    },
    limit: function() {
      return this.pageSize
    },
    ...mapState({
      items(state) {
        return state[this.namespace].items
      },
      loading(state) {
        return state[this.namespace].loading
      },
      total(state) {
        return state[this.namespace].total
      },
      columns(state) {
        return state[this.namespace].columns
      },
      specialColumns(state) {
        return state[this.namespace].specialColumns
      }
    })
  },
  methods: {
    ...mapActions({
      getItems(dispatch, payload) {
        return dispatch(this.namespace + '/getItems', payload)
      },
      getItem(dispatch, payload) {
        return dispatch(this.namespace + '/getItem', payload)
      }
    }),
    ...mapMutations({
      updateSearchOptions(commit, payload) {
        return commit(this.namespace + '/updateSearchOptions', payload)
      },
      updateColumn(commit, payload) {
        return commit(this.namespace + '/updateColumn', payload)
      }
    }),
    onSelectColumn(name, event) {
      console.log('onSelectColumn: ', name, event)
      const status = event.target.checked
      if (status && this.filteredColumns.length + 1 > 10) {
        this.$message.warning('Maximum number of selectable columns is 10')
        return
      }

      this.updateColumn({
        name: name,
        value: status
      })
    },
    json2csv(data) {
      var fields = Object.keys(data[0])
      var replacer = function(key, value) {
        return value === null ? '' : value
      }

      var csv = data.map(function(row) {
        return fields
          .map(function(fieldName) {
            return JSON.stringify(row[fieldName], replacer)
          })
          .join(',')
      })

      csv.unshift(fields.join(',')) // add header column
      csv = csv.join('\r\n')
      return csv
    },
    downloadAsJSON() {
      var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.biomarkers))
      var dlAnchorElem = document.getElementById('downloadAnchorElem')
      dlAnchorElem.setAttribute('href', dataStr)
      dlAnchorElem.setAttribute('download', 'data.json')
      dlAnchorElem.click()
    },
    downloadAsCSV() {
      const csv = this.json2csv(this.biomarkers)
      var dataStr = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
      var dlAnchorElem = document.getElementById('downloadAnchorElem')
      dlAnchorElem.setAttribute('href', dataStr)
      dlAnchorElem.setAttribute('download', 'data.csv')
      dlAnchorElem.click()
    },
    onSearch() {
      this.updateSearchOptions({
        limit: this.limit,
        offset: this.offset,
        q: this.queryString
      })
      this.getItems({})
    },
    handleSizeChange: function() {
      this.updateSearchOptions({
        limit: this.limit,
        offset: this.offset
      })
      this.getItems({})
    },
    handleCurrentChange: function() {
      this.updateSearchOptions({
        limit: this.limit,
        offset: this.offset
      })
      this.getItems({})
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
.query-table {
  padding: 10px 0px;

  .action {
    margin-bottom: 5px;
  }

  .results {
    background-color: #fff;
    border-radius: 5px;
  }
}
</style>

<style lang="less">
.column-list {
  display: flex;
  flex-direction: column;

  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0px;
  }
}
</style>
