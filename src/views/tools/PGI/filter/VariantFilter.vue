<template>
  <a-row class="variant-filter" :gutter="16" style="margin-right: 0px">
    <a-col class="variant-filter__left" :xl="4" :lg="4" :md="6" :sm="24" :xs="24">
      <a-tabs defaultActiveKey="somatic" @change="onChangeTab">
        <a-tab-pane :tab="tab.title" v-for="tab in tabs" :key="tab.key">
          <a-row class="variant-filter__left__content">
            <a-row style="display: flex; justify-content: center; margin: 10px 10px">
              <a-tooltip>
                <template slot="title">Show Tasks</template>
                <a-button
                  icon="pic-left"
                  style="display: none; width: 50px; margin-right: 5px"
                  @click="switchProjectPanel"
                ></a-button>
              </a-tooltip>
              <a-input-search
                allowClear
                placeholder="Enter Search Text"
                @change="filterFieldsList"
                style="margin: 0px 5px 0px 0px"
              />
              <a-tooltip>
                <template slot="title">Add a variant filter</template>
                <a-button icon="setting" style="width: 50px" @click="showFilterPanel"></a-button>
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
                  :dataSource="getFieldDataByKey(field.key, filterValue)"
                  @select-filter="filterCollections(field.key, $event)"
                ></filter-list>
                <a-icon slot="extra" type="delete" @click="removeField(field.key)" />
              </a-collapse-panel>
            </a-collapse>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </a-col>
    <a-col class="variant-filter__right" :xl="20" :lg="20" :md="18" :sm="24" :xs="24">
      <a-tabs defaultActiveKey="1" class="variant-filter__right__tabs">
        <a-tab-pane tab="Table" key="1">
          <variant-table @show-panel="dispatch"></variant-table>
        </a-tab-pane>
        <a-tab-pane tab="Chart" key="2">
          <a-row class="variant-filter__right__tabs_chart">
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
      </a-tabs>
    </a-col>
    <a-modal
      class="filter-field-panel"
      title="Add a Filter"
      :visible="visible"
      @cancel="hideFieldPanel"
      :footer="null"
      :width="800"
    >
      <a-row class="control-panel">
        <a-col :span="12">
          <a-tag color="#87d068">{{ allFields.length }} fields</a-tag>
        </a-col>
        <a-col :span="12">
          <a-button style="float: right" @click="sortFields">
            <a-icon type="sort-descending" v-if="reverseOrder" />
            <a-icon type="sort-ascending" v-else />
          </a-button>
        </a-col>
      </a-row>
      <a-input-search allowClear placeholder="Enter Search Text" size="large" @change="filterFields" />
      <a-row style="width: 100%">
        <a-checkbox style="float: right" :checked="hideActive" @change="hideSelectedFields"
          >Hide selected fields?</a-checkbox
        >
      </a-row>
      <a-card class="field-list">
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
    </a-modal>
  </a-row>
</template>

<script>
import { FilterList, Pie } from '@/components'
import VariantTable from './VariantTable'
import filter from 'lodash.filter'
import map from 'lodash.map'
import sortBy from 'lodash.sortby'
import orderBy from 'lodash.orderby'

const allFields = [
  {
    key: 'chrom',
    name: 'CHROM',
    short: 'CHROM',
    description: 'Chromosome',
    type: 'number',
    priority: 1,
    values: ''
  },
  {
    key: 'pos',
    name: 'Position',
    short: 'Position',
    description: 'The position of the variant in a chromosome.',
    type: 'number',
    priority: 1,
    values: ''
  },
  {
    key: 'id',
    name: 'ID',
    short: 'ID',
    description: 'Identity',
    type: 'number',
    priority: 1,
    values: ''
  },
  {
    key: 'ref',
    name: 'Reference',
    short: 'Reference',
    description: 'Reference',
    type: 'category',
    priority: 1,
    values: ''
  },
  {
    key: 'alt',
    name: 'Alteration',
    short: 'Alteration',
    description: 'Alteration',
    type: 'category',
    priority: 1,
    values: ''
  },
  {
    key: 'qual',
    name: 'Quality',
    short: 'Quality',
    description: 'Quality',
    type: 'category',
    priority: 1,
    values: ''
  },
  {
    key: 'filter',
    name: 'Filter',
    short: 'Filter',
    description: 'Filter',
    type: 'category',
    priority: 1,
    values: ''
  },
  {
    key: 'info_dp',
    name: 'Read Depth',
    short: 'Read Depth',
    description: 'Approximate read depth (reads with MQ=255 or with bad mates are filtered)',
    type: 'number',
    priority: 1,
    values: ''
  },
  {
    key: 'info_ecent',
    name: 'Number of events',
    short: 'Number of events',
    description: 'Number of events in this haplotype',
    type: 'number',
    priority: 1,
    values: ''
  },
  {
    key: 'info_in_pon',
    name: 'IN PON',
    short: 'IN PON',
    description: 'site found in panel of normals',
    type: 'number',
    priority: 1,
    values: ''
  }
]

const makeRule = function(field, value, type, operator) {
  // TODO: how to keep operator valid?
  if (type == 'category') {
    return {
      type: 'rule',
      query: {
        variable: field,
        operator: 'in',
        value: Array.isArray(value) ? value : [value]
      }
    }
  } else {
    return {
      type: 'rule',
      query: {
        variable: field,
        operator: operator,
        value: value
      }
    }
  }
}

const makeGroupRule = function(operator, rule1, rule2) {
  return {
    type: 'group',
    operator: operator,
    children: [rule1, rule2]
  }
}

const remarkAllFields = function(allFields, predict) {
  return map(allFields, o => {
    if (predict(o)) {
      o['selected'] = true
    } else {
      o['selected'] = false
    }

    // console.log('remarkAllFields: ', o)
    // Initialize all fields
    if (o.type == 'category') {
      const data = []
      // TODO: Some fields have not values property?
      if (o.values) {
        o.values.forEach(item => {
          if (item == '' || item == undefined || item == null) {
            data.push({
              name: 'Unknown',
              key: item,
              count: 0
            })
          } else {
            data.push({
              name: item,
              key: item,
              count: 0
            })
          }
        })
      }

      o['data'] = data
    } else {
      o['data'] = []
    }

    return o
  })
}

const makeQueryMap = function(fieldsData) {
  const rules = []
  const fieldKeys = Object.keys(fieldsData)

  fieldKeys.forEach(fieldKey => {
    const field = fieldsData[fieldKey]
    if (Array.isArray(field)) {
      const checked = map(
        filter(field, item => {
          return item.checked
        }),
        'key'
      )

      if (checked.length > 0) {
        rules.push(makeRule(fieldKey, checked, 'category'))
      }
    } else {
      rules.push(
        makeGroupRule(
          'or',
          makeRule(field.key, field.min, 'number', '>='),
          makeRule(field.key, field.max, 'number', '<=')
        )
      )
    }
  })

  if (rules.length > 1) {
    return {
      type: 'group',
      operator: 'and',
      children: rules
    }
  } else if (rules.length == 1) {
    return rules[0]
  } else {
    return {}
  }
}

export default {
  components: {
    FilterList,
    Pie,
    VariantTable
  },
  data() {
    return {
      allFields: remarkAllFields(allFields, o => {
        return o.priority <= 5
      }),
      hideActive: false,
      maxLimit: 20,
      visible: false,
      searchValue: '',
      filterValue: '',
      reverseOrder: false,
      fieldsData: {},
      tabs: [
        {
          title: 'Somatic',
          key: 'somatic'
        },
        {
          title: 'Germline',
          key: 'germline'
        },
        {
          title: 'CNV',
          key: 'cnv'
        },
        {
          title: 'SV',
          key: 'sv'
        }
      ]
    }
  },
  computed: {
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
  methods: {
    dispatch(payload) {
      this.$emit('show-panel', payload)
    },
    onChangeTab() {},
    switchProjectPanel() {},
    showFilterPanel() {
      this.visible = !this.visible
    },
    filterFieldsList(e) {
      this.filterValue = e.target.value
    },
    hideSelectedFields() {
      this.hideActive = !this.hideActive
    },
    hideFieldPanel() {
      this.visible = !this.visible
    },
    filterFields(e) {
      this.searchValue = e.target.value
    },
    sortFields() {
      this.reverseOrder = !this.reverseOrder
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
      this.$message.success(`Added Field ${key} into Filter Panel.`)
      this.focusField(key)
    },
    focusField(field) {
      // Very Tricky, Better Solution？
      setTimeout(() => {
        document.getElementById(field).scrollIntoView({ behavior: 'smooth' })
      }, 300)
    },
    fetchCounts() {},
    getFieldDataByKey() {
      return []
    },
    filterCollections() {},
    removeField(key) {
      const field = filter(this.allFields, o => {
        return o.key === key
      })

      if (field.length > 0) {
        field[0].selected = false
      }
    },
    toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    },
    onChangeChartTab() {}
  }
}
</script>

<style lang="less">
@import (reference) '~@/components/index.less';

.variant-filter {
  .variant-filter__left {
    .ant-tabs {
      .ant-tabs-bar {
        margin: 0px;
      }

      .ant-tabs-content {
        height: calc(100% - 45px);
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
.variant-filter {
  height: auto;
  border-radius: 5px;

  .variant-filter__left {
    height: calc(100vh - 155px);
    margin-bottom: 10px;

    .ant-tabs {
      border: 1px solid #d9d9d9;
      border-radius: 5px;
      background-color: #fff;
      height: 100%;

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

    .variant-filter__left__content {
      height: 100%;
      overflow: scroll;
    }
  }

  .variant-filter__right {
    height: calc(100vh - 155px);
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    margin-bottom: 10px;

    .variant-filter__right__tabs {
      height: 100%;

      .variant-filter__right__tabs__chart {
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

      .variant-filter__right__tabs__chart::-webkit-scrollbar {
        width: 0 !important;
      }

      .variant-table {
        height: 100%;
        padding: 0px 10px;
      }
    }
  }
}
</style>
