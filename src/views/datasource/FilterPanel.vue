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
            >
              <filter-list
                :dataSource="field.data"
                @select-filter="filterCollections(field.key, $event)"
              ></filter-list>
            </a-collapse-panel>
          </a-collapse>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Samples" disabled></a-tab-pane>
      </a-tabs>
    </a-col>
    <a-col class="right" :xl="18" :lg="18" :md="18" :sm="24" :xs="24">
      <a-tabs class="chart-container" defaultActiveKey="1" @change="onChangeChartTab">
        <a-tab-pane tab="Files" key="1">
          <a-row class="pie-container">
            <a-col v-for="item in fieldsList" :key="item.name" :xl="5" :lg="5" :md="8" :sm="12">
              <pie :dataSource="item.data" :height="120" :width="120" :title="item.shortName" />
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane tab="Search Advanced" key="2" disabled></a-tab-pane>
      </a-tabs>
      <a-tabs defaultActiveKey="1" @change="onChangeTab">
        <a-tab-pane tab="Table" key="1">
          <data-table :queryMap="queryMap" :key="queryMapString"></data-table>
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
      <a-input-search allowClear placeholder="Enter search text" size="large" @change="filterFields" />
      <a-card class="field-list">
        <a-row v-for="field in filteredFields" :key="field" class="field">{{ field }}</a-row>
      </a-card>
    </a-modal>
  </a-row>
</template>

<script>
import { mapActions } from 'vuex'
import { FilterList } from '@/components'
import Pie from './Pie'
import DataTable from './DataTable'
import filter from 'lodash.filter'
import map from 'lodash.map'

export default {
  name: 'FilterPanel',
  components: {
    FilterList,
    DataTable,
    Pie
  },
  data() {
    return {
      fieldsList: [
        {
          name: 'Reference Materials',
          shortName: 'Reference Materials',
          key: 'reference_materials_type',
          data: []
        },
        {
          name: 'Multi Omics Platforms',
          shortName: 'Platform',
          key: 'sequencing_sequence_platform',
          data: []
        },
        {
          name: 'Multi Profiling Sites',
          shortName: 'Profiling Site',
          key: 'sequencing_sequence_site',
          data: []
        },
        {
          name: 'Multi Characters Raw Datasets',
          shortName: 'Character',
          data: [
            { name: 'Small Variants', count: 10 },
            { name: 'Structural Variants', count: 10 },
            { name: 'Methylations', count: 10 },
            { name: 'mRNAs', count: 10 },
            { name: 'miRNAs', count: 10 },
            { name: 'Proteins', count: 10 },
            { name: 'Metabolites', count: 10 }
          ]
        },
        {
          name: 'Data Category',
          shortName: 'Data Category',
          key: 'data_file_data_format',
          data: []
        }
      ],
      filterKeys: [
        'reference_materials_type',
        'sequencing_sequence_platform',
        'sequencing_sequence_site',
        'data_file_data_format'
      ],
      queryMap: {},
      queryMapString: '',
      visible: false,
      allFields: [
        'biospecimen_biospecimen_id',
        'biospecimen_biospecimen_type',
        'biospecimen_collection_date',
        'collected_from_type',
        'data_file_data_category',
        'data_file_data_format',
        'data_file_data_type',
        'data_file_file_name',
        'data_file_object_id',
        'data_file_referemce_dataset',
        'data_file_submitter_id',
        'dna_library_dna_libray_id',
        'dna_library_fragment_range',
        'dna_library_fragment_selection',
        'dna_library_input_ng',
        'dna_library_library_preparation',
        'dna_library_library_prep_date',
        'dna_library_library_prep_kit',
        'dna_library_pcr_cycle',
        'dna_library_phix_spike_in',
        'donor_donor_birth_date',
        'donor_donor_registry_id',
        'donor_family_id',
        'donor_gender',
        'donor_pedigree',
        'dst_vid',
        'extracted_from_type',
        'label',
        'reference_materials_cat_no',
        'reference_materials_cell_collection_date',
        'reference_materials_cell_line_passage_number',
        'reference_materials_extraction',
        'reference_materials_extraction_date',
        'reference_materials_extraction_site',
        'reference_materials_id',
        'reference_materials_lot_no',
        'reference_materials_source',
        'reference_materials_type',
        'sequencing_flowcell_id',
        'sequencing_index_sequence',
        'sequencing_lane_no',
        'sequencing_sequence_id',
        'sequencing_sequence_method',
        'sequencing_sequence_platform',
        'sequencing_sequence_run_date',
        'sequencing_sequence_site',
        'src_vid',
        'vid'
      ],
      searchValue: '',
      filterValue: '',
      reverseOrder: true
    }
  },
  props: {},
  computed: {
    activeFilterList() {
      const active = []
      for (const field of this.fieldsList) {
        active.push(field.name)
      }
      return active
    },
    filteredFields() {
      if (this.searchValue.length > 0) {
        return filter(this.allFields, record => {
          return record.match(this.searchValue)
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
          newFieldRecord['shortName'] = fieldRecord.shortName
          newFieldRecord['key'] = fieldRecord.key
          newFieldRecord['data'] = filter(fieldRecord.data, record => {
            return record.name.match(this.filterValue)
          })

          return newFieldRecord
        })
      } else {
        return this.fieldsList
      }
    }
  },
  methods: {
    ...mapActions({
      countCollections: 'CountCollections'
    }),
    showFilterPanel() {
      this.visible = !this.visible
    },
    hideFieldPanel() {
      this.visible = !this.visible
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
    filterCollections(fieldKey, event) {
      const key = event.key
      const checked = event.checked

      if (checked) {
        this.queryMap[fieldKey] = key
      } else {
        delete this.queryMap[fieldKey]
      }

      console.log('filterCollections: ', this.queryMap)
      this.queryMapString = JSON.stringify(this.queryMap)
      this.fetchCounts(this.queryMap)
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
            return matched[0]
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
    fetchCounts(queryMap) {
      Promise.all([
        this.countCollections(Object.assign(this.cloneMap(queryMap), { group: 'reference_materials_type' })),
        this.countCollections(Object.assign(this.cloneMap(queryMap), { group: 'sequencing_sequence_platform' })),
        this.countCollections(Object.assign(this.cloneMap(queryMap), { group: 'sequencing_sequence_site' })),
        this.countCollections(Object.assign(this.cloneMap(queryMap), { group: 'data_file_data_format' }))
      ])
        .then(results => {
          for (let idx in this.filterKeys) {
            const key = this.filterKeys[idx]
            const field = filter(this.fieldsList, record => {
              return record.key === key
            })

            const data = this.updateData(field[0].data, results[idx])

            field[0].data = data
          }
        })
        .catch(error => {
          console.log('fetchCouns Error: ', error)
          this.$message.warn('Cannot fetch data, please retry later.')
        })
    }
  },
  created() {
    this.fetchCounts({})
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
    height: 600px;
    top: 60px;

    .ant-modal-content {
      height: 100%;

      .ant-modal-header {
        padding: 10px;
      }

      .ant-modal-close-x {
        height: 45px;
        line-height: 45px;
      }

      .ant-modal-body {
        height: 100%;
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

        .field-list {
          height: calc(100% - 140px);
          overflow: scroll;

          .ant-card-body {
            padding: 0px;
            height: 100%;

            .field {
              padding: 5px 20px;
              font-size: 16px;
            }

            .field:hover {
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
