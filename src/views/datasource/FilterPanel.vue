<template>
  <!--eslint-disable-->
  <a-row class="filter-panel" :gutter="16" style="margin-right: 0px;">
    <a-col class="left" :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
      <a-tabs defaultActiveKey="files" @change="onChangeTab">
        <a-tab-pane :tab="tab.title" v-for="tab in tabs" :key="tab.key">
          <a-row class="content">
            <a-row style="display: flex; justify-content: center; margin: 10px 10px;">
              <a-tooltip>
                <template slot="title">Show Projects</template>
                <a-button icon="pic-left" style="width: 50px;" @click="switchProjectPanel"></a-button>
              </a-tooltip>
              <a-input-search
                allowClear
                placeholder="Enter Search Text"
                @change="filterFieldsList"
                style="margin: 0px 5px;"
              />
              <a-tooltip>
                <template slot="title">Add a File Filter</template>
                <a-button icon="setting" style="width: 50px;" @click="showFilterPanel"></a-button>
              </a-tooltip>
            </a-row>
            <a-collapse :activeKey="activeFilterList" ref="collapse">
              <a-collapse-panel
                :header="toTitleCase(field.name)"
                :key="field.name"
                :id="field.key"
                v-for="field in fieldsList"
              >
                <filter-list
                  :dataSource="$store.getters.getFieldDataByKey(field.key, filterValue)"
                  @select-filter="filterCollections(field.key, $event)"
                ></filter-list>
                <a-icon slot="extra" type="delete" @click="removeField(field.key)" />
              </a-collapse-panel>
            </a-collapse>
          </a-row>
        </a-tab-pane>
      </a-tabs>
      <a-drawer
        v-show="projectVisible"
        title="All Projects"
        placement="left"
        :mask="false"
        :closable="true"
        width="320"
        :visible="projectVisible"
        :bodyStyle="{ padding: '0px' }"
        :get-container="false"
        wrapClassName="project-panel"
        :wrap-style="{ position: 'absolute' }"
        @close="switchProjectPanel"
      >
        <a-list item-layout="horizontal" :data-source="collections">
          <a-list-item
            slot="renderItem"
            slot-scope="item, index"
            :class="{active: item.key == defaultCollection}"
            @click="loadProject(item.key)"
          >
            <a-list-item-meta :description="item.description">
              <a slot="title">{{ item.name }}</a>
              <a-avatar slot="avatar" :class="{active: item.key == defaultCollection}">
                <a-icon slot="icon" type="project" style="backgroundColor: #1890ff;" />
              </a-avatar>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-drawer>
    </a-col>
    <a-col class="right" :xl="18" :lg="18" :md="18" :sm="24" :xs="24">
      <a-tabs class="chart-container" defaultActiveKey="1" @change="onChangeChartTab">
        <a-tab-pane tab="Files" key="1">
          <a-row class="pie-container">
            <a-col v-for="item in fieldsList" :key="item.name" :xl="5" :lg="5" :md="8" :sm="12">
              <pie
                :dataSource="$store.getters.getFieldDataByKey(item.key)"
                :height="120"
                :width="120"
                :title="item.short"
              />
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane tab="Search Advanced" key="2" disabled></a-tab-pane>
        <a-select :defaultValue="defaultCollection" style="width: 260px" @change="loadProject" slot="tabBarExtraContent">
          <a-select-option :value="collection.key" v-for="collection in collections" :key="collection.key">
            {{ collection.name }}
          </a-select-option>
        </a-select>
      </a-tabs>
      <a-tabs defaultActiveKey="1">
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
        placeholder="Enter Search Text"
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
      <a-card class="field-list" v-if="existsFilteredFields">
        <a-row
          @click.native="addField(field.key)"
          v-for="(field, index) in filteredFields"
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
      <a-empty class="field-list" v-else />
    </a-modal>
  </a-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { FilterList, Pie } from '@/components'
import DataTable from './DataTable'
import filter from 'lodash.filter'
import map from 'lodash.map'
import sortBy from 'lodash.sortby'
import orderBy from 'lodash.orderby'

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
      projectVisible: false,
      maxLimit: 20,
      visible: false,
      searchValue: '',
      filterValue: '',
      reverseOrder: false
    }
  },
  props: {},
  computed: {
    ...mapGetters({
      collections: 'collections',
      defaultCollection: 'defaultCollection',
      allFields: 'allFields'
    }),
    tabs() {
      return this.$store.getters.getTabs(this.defaultCollection)
    },
    fieldsList() {
      return sortBy(
        filter(this.allFields, o => {
          return o.selected
        }),
        'priority'
      )
    },
    activeFilterList() {
      const active = []
      for (const field of this.fieldsList) {
        if (this.$store.getters.getFieldDataByKey(field.key, this.filterValue).length > 0) {
          active.push(field.name)
        }
      }
      return active
    },
    filterKeys() {
      return map(this.fieldsList, o => {
        return o.key
      })
    },
    existsFilteredFields() {
      return this.filteredFields.length > 0
    },
    filteredFields() {
      let fields = []
      if (this.searchValue.length > 0) {
        fields = filter(this.allFields, record => {
          return (
            record.key.match(new RegExp(this.searchValue, 'i')) || record.name.match(new RegExp(this.searchValue, 'i'))
          )
        })
      } else {
        fields = this.allFields
      }

      if (this.hideActive) {
        fields = filter(fields, o => {
          return !o.selected
        })
      }

      if (this.reverseOrder) {
        return orderBy(fields, ['key'], 'desc')
      } else {
        return orderBy(fields, ['key'], 'asc')
      }
    }
  },
  watch: {
    defaultCollection() {
      this.getFieldsList(this.fetchCounts)
    }
  },
  methods: {
    ...mapActions({
      countCollections: 'CountCollections'
    }),
    loadProject(name) {
      this.$store.commit('SET_COLLECTION', name)
      // Reset
      this.$store.commit('RESET_QUERY_MAP')
      this.dedupField = null
    },
    switchProjectPanel() {
      this.projectVisible = !this.projectVisible
    },
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
      this.$store.commit('ADD_FIELD', key)

      this.visible = !this.visible
      this.fetchCounts()
      console.log('addField: ', key)
      this.$message.success(`Added Field ${key} into Filter Panel.`)
      this.focusField(key)
    },
    removeField(fieldKey) {
      this.$store.commit('REMOVE_FIELD', fieldKey)

      this.fetchCounts()
      this.$message.success(`Removed Field ${fieldKey} from Filter Panel.`)
    },
    showFilterPanel() {
      this.visible = !this.visible
    },
    hideFieldPanel() {
      this.visible = !this.visible
    },
    focusField(field) {
      // Very Tricky, Better Solution？
      setTimeout(() => {
        document.getElementById(field).scrollIntoView({ behavior: 'smooth' })
      }, 300)
    },
    filterFields(e) {
      this.searchValue = e.target.value
    },
    filterFieldsList(e) {
      this.filterValue = e.target.value
    },
    sortFields() {
      this.reverseOrder = !this.reverseOrder
    },
    onChangeChartTab() {},
    onChangeTab(activeKey) {
      // TODO: The dedupField exists?
      this.dedupField = filter(this.tabs, o => {
        return o.key == activeKey
      })[0].value

      // We need to a new results when the group & dedup_field is different
      this.$store.commit('RESET_QUERY_MAP')
      this.fetchCounts()
    },
    toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    },
    filterCollections(fieldKey, event) {
      console.log('filterCollections: ', fieldKey, event)

      this.$store.commit('UPDATE_FIELD', { fieldKey: fieldKey, data: event })

      this.fetchCounts()
    },
    formatField(fieldName) {
      return fieldName.replace('.', '_')
    },
    fetchCounts() {
      const collections = map(this.filterKeys, o => {
        return this.countCollections({ group: this.formatField(o), dedup_field: this.dedupField })
      })

      Promise.all(collections)
        .then(results => {
          for (let idx in this.filterKeys) {
            const fieldKey = this.filterKeys[idx]
            const field = filter(this.fieldsList, record => {
              return record.key === fieldKey
            })

            if (field.length > 0) {
              this.$store.commit('UPDATE_FIELD_DATA', { fieldKey: fieldKey, data: results[idx] })
            }
          }

          console.log('fetchCounts: ', results)
        })
        .catch(error => {
          console.log('fetchCounts Error: ', error)
          this.$message.warn('Cannot fetch data, please retry later.')
        })
    },
    getFieldsList(callback) {
      this.$store
        .dispatch('GetDataSchema')
        .then(response => {
          console.log('getFieldsList', response)
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
        height: calc(100% - 45px);
      }
    }
  }

  .ant-select-selection-selected-value {
    color: @primary-color;
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

    .content {
      height: 100%;
      overflow: scroll;
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
      overflow-x: scroll;
      overflow-y: hidden;
      display: flex;
      margin-right: 25px;

      .pie-chart {
        min-width: 130px;

        div canvas {
          margin: 0px 30px;
        }
      }
    }

    .pie-container::-webkit-scrollbar {
      width: 0 !important;
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

.project-panel {
  .ant-list-item {
    padding: 10px;
    cursor: pointer;

    .ant-avatar {
      background-color: #1890ff;
    }
  }

  .ant-list-item.active {
    background-color: #1890ff;

    .ant-list-item-meta-title > a,
    .ant-list-item-meta-description {
      color: #fff;
    }
  }

  .ant-avatar.active {
    background-color: #fff;
  }
}
</style>
