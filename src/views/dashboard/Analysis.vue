<template>
  <div class="dashboard-container">
    <a-row :gutter="24" style="margin-right: 0px;">
      <a-col :sm="24" :md="24" :xl="12" :style="{ paddingRight: '0px' }">
        <a-card :loading="loading" title="Materials Requests">
          <a-popover title="Requested Details" slot="extra">
            <template slot="content">
              <p v-for="item in materialsTypeCounts" :key="item.group">
                <a-tag :color="formatColor(item.group)">{{ item.group }}</a-tag>
                {{ item.tubes }} tubes / {{ item.volume }} μl
              </p>
            </template>
            <a-icon type="info-circle-o" />
          </a-popover>
          <a-row class="content">This is a description.</a-row>
          <template slot="actions">
            <a-col class="total">{{ totalTubes }} tubes / {{ totalVolume }}</a-col>
            <a-col class="btn-group">
              <a-button @click="requestMaterials">
                <a-icon type="file-protect" />Request
              </a-button>
              <a-button @click="requestMaterials" style="margin-left: 5px;">
                <a-icon type="message" />Feedback
              </a-button>
            </a-col>
          </template>
        </a-card>
      </a-col>

      <!-- 暂时隐藏 -->
      <a-col :sm="24" :md="12" :xl="6" :style="{ paddingRight: '0px', display: 'none' }">
        <a-card :loading="loading" title="Temperature">
          <a-tooltip title="Details" slot="extra">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <a-row class="content">
            <mini-area />
          </a-row>
          <template slot="actions">Stable Temperature</template>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="12" :style="{ paddingRight: '0px', display: 'block' }">
        <a-card :loading="loading" title="Stable Quality">
          <a-tooltip title="Details" slot="extra">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <a-row class="content" style="height: 144px;">
            <v-chart :force-fit="true" :height="160" :data="rinDinData" :padding="[36, 5, 18, 5]">
              <v-tooltip />
              <v-legend position="top"/>
              <v-bar position="id*value" color="group"/>
            </v-chart>
          </a-row>
        </a-card>
      </a-col>
    </a-row>

    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs
          default-active-key="1"
          size="large"
          :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"
        >
          <a-tab-pane tab="Materials" key="materials">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <a-select
                  class="group-selector"
                  style="width: 120px"
                  @change="selectMaterialsGroup"
                  default-value="sampleType"
                >
                  <a-select-option value="sampleType">Sample Type</a-select-option>
                  <a-select-option value="receiver">Receiver</a-select-option>
                </a-select>
                <a-spin :spinning="materialsBarLoading">
                  <bar
                    :data="groupedMaterialsData"
                    :padding="padding"
                    color="group"
                    position="date*tubes"
                    title="Materials Tubes"
                  />
                </a-spin>
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list
                  class="rank-list"
                  title="Usage Ranking in Lab (Tubes)"
                  :list="materialsRankList"
                />
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="Data" key="data">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <a-select
                  class="group-selector"
                  default-value="site"
                  style="width: 120px"
                  @change="selectSeqGroup"
                >
                  <a-select-option value="site">Site</a-select-option>
                  <a-select-option value="library">Library</a-select-option>
                  <a-select-option value="company">Platform</a-select-option>
                  <a-select-option value="machine">Machine</a-select-option>
                </a-select>
                <a-spin :spinning="seqBarLoading">
                  <bar
                    :data="groupedSeqData"
                    :padding="padding"
                    color="group"
                    position="date*totalSize"
                    title="Data Volume (GB)"
                  />
                </a-spin>
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list
                  class="rank-list"
                  title="Usage Ranking in Lab (GB)"
                  :list="seqDataRankList"
                />
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>

    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs
          default-active-key="1"
          size="large"
          :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"
        >
          <a-tab-pane tab="Temperature" key="1">
            <a-row>
              <bar :data="barData" title="Usage Ranking" />
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>

    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs
          default-active-key="1"
          size="large"
          :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"
        >
          <a-tab-pane tab="RIN" key="1">
            <a-row style="margin-right: 32px;">
              <a-select
                class="group-selector"
                style="width: 120px"
                :value="defaultRinGroup"
                @select="selectRinGroup"
              >
                <a-select-option v-for="item in rinGroup" :key="item" :value="item">{{ item }}</a-select-option>
              </a-select>
              <a-spin :spinning="materialsRinLoading">
                <bar
                  :data="groupedRinData"
                  :padding="padding"
                  position="sampleReplicate*rin"
                  title="RIN Value for RNA Materials"
                />
              </a-spin>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="DIN" key="2">
            <a-row style="margin-right: 32px;">
              <a-select
                class="group-selector"
                style="width: 120px"
                :value="defaultDinGroup"
                @select="selectDinGroup"
              >
                <a-select-option v-for="item in dinGroup" :key="item" :value="item">{{ item }}</a-select-option>
              </a-select>
              <a-spin :spinning="materialsDinLoading">
                <bar
                  :data="groupedDinData"
                  :padding="padding"
                  position="sampleReplicate*din"
                  title="DIN Value for RNA Materials"
                />
              </a-spin>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
  </div>
</template>

<script>
import { MiniArea, RankList, Bar } from '@/components'
import { mixinDevice } from '@/utils/mixin'
import { mapActions } from 'vuex'
import groupBy from 'lodash.groupby'
import map from 'lodash.map'
import filter from 'lodash.filter'
import sortedUniq from 'lodash.sorteduniq'
import sumBy from 'lodash.sumby'
import sortBy from 'lodash.sortby'

const barData = []
for (let i = 0; i < 12; i += 1) {
  barData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
}

const rankList = []
for (let i = 0; i < 7; i++) {
  rankList.push({
    name: 'Fudan University ' + '-' + ' Lab' + (i + 1),
    total: 1234.56 - i * 100
  })
}

export default {
  name: 'Analysis',
  mixins: [mixinDevice],
  components: {
    MiniArea,
    RankList,
    Bar
  },
  data() {
    return {
      loading: true,
      rankList,
      barData,
      // SeqData
      seqDataRankList: [],
      seqData: [],
      groupedSeqData: [],
      seqBarLoading: false,
      totalVolume: 0,
      // Materials
      materialsRankList: [],
      materialsData: [],
      groupedMaterialsData: [],
      materialsBarLoading: false,
      // RIN
      rinGroup: [],
      rinData: [],
      groupedRinData: [],
      rinGroupedData: [],
      defaultRinGroup: '',
      materialsRinLoading: false,
      // DIN
      dinGroup: [],
      dinData: [],
      groupedDinData: [],
      dinGroupedData: [],
      defaultDinGroup: '',
      materialsDinLoading: false,
      // Trend
      rinDinData: [],
      // General
      totalTubes: 0,
      padding: ['auto', 'auto', '50', '50'],
      materialsTypeCounts: []
    }
  },
  methods: {
    ...mapActions({
      getMaterialsSeqData: 'GetMaterialsSeqData',
      getMaterialsMetadata: 'GetMaterialsMetadata',
      getMaterialsDIN: 'GetMaterialsDIN',
      getMaterialsRIN: 'GetMaterialsRIN'
    }),
    formatColor(group) {
      if (group === 'DNA') {
        return '#f50'
      } else if (group === 'RNA') {
        return '#2db7f5'
      } else if (group === 'Plasma') {
        return '#87d068'
      } else if (group === 'Cell') {
        return '#108ee9'
      } else {
        return 'blue'
      }
    },
    selectSeqGroup(groupName) {
      this.seqBarLoading = true
      this.groupedSeqData = this.generateGroupedData(this.seqData, groupName, 'totalSize')
      setTimeout(() => {
        this.seqBarLoading = false
      }, 500)
    },
    selectMaterialsGroup(groupName) {
      this.materialsBarLoading = true
      this.groupedMaterialsData = this.generateGroupedData(this.materialsData, groupName, 'tubes')
      setTimeout(() => {
        this.materialsBarLoading = false
      }, 500)
    },
    selectRinGroup(groupName) {
      this.materialsRinLoading = true
      this.groupedRinData = filter(this.rinData, record => {
        return record.date === groupName
      })

      setTimeout(() => {
        this.materialsRinLoading = false
      }, 500)
    },
    selectDinGroup(groupName) {
      this.materialsDinLoading = true
      this.groupedDinData = filter(this.dinData, record => {
        return record.date === groupName
      })

      setTimeout(() => {
        this.materialsDinLoading = false
      }, 500)
    },
    groupRinDinData(rinData, dinData) {
      const groupedData = groupBy(rinData.concat(dinData), function(record) {
        return record.date + '_' + record.sampleReplicate
      })

      const rinDinData = map(groupedData, (record, id) => {
        const data = record[0]
        const newRecord = {}
        newRecord['id'] = id
        newRecord['value'] = data.rin ? data.rin : data.din
        newRecord['group'] = data.rin ? 'RIN' : 'DIN'
        return newRecord
      })

      console.log('rinDinData: ', rinDinData)
      this.rinDinData = sortBy(rinDinData, (record) => { return record.value })
    },
    countByGroup(data, groupName) {
      const counts = map(groupBy(data, groupName), (record, id) => ({
        group: id,
        tubes: parseFloat(sumBy(record, 'tubes').toFixed(2)),
        volume: sumBy(record, record => {
          return record.tubes * record.volume
        })
      }))

      console.log('countByGroup: ', counts)
      return counts
    },
    generateGroupedData(data, groupName, totalVal) {
      const groupedData = groupBy(data, function(record) {
        return record.date + '_' + record[groupName]
      })

      const seqData = map(groupedData, (record, id) => {
        const newRecord = {}
        newRecord['date'] = id.split('_')[0]
        newRecord[totalVal] = parseFloat(sumBy(record, totalVal).toFixed(2))
        newRecord['group'] = id.split('_')[1]
        return newRecord
      })

      console.log('generateGroupedData: ', seqData)

      return seqData
    },
    getSeqData() {
      this.loading = true
      this.getMaterialsSeqData()
        .then(response => {
          this.seqDataRankList = response.rankList
          this.seqData = response.data
          this.totalVolume = response.total
          this.selectSeqGroup('site', 'totalSize')
          this.loading = false
        })
        .catch(error => {
          console.log('getSeqData Error: ', error)
          this.seqDataRankList = []
          this.seqData = []
          this.totalVolume = 0
          this.loading = false
        })
    },
    getMetaData() {
      this.loading = true
      this.getMaterialsMetadata()
        .then(response => {
          this.materialsRankList = response.rankList
          this.materialsData = response.data
          this.totalTubes = response.total
          this.materialsTypeCounts = this.countByGroup(this.materialsData, 'sampleType')
          this.selectMaterialsGroup('sampleType', 'tubes')
          this.loading = false
        })
        .catch(error => {
          console.log('getMetaData Error: ', error)
          this.materialsRankList = []
          this.materialsData = []
          this.totalTubes = 0
          this.loading = false
        })
    },
    getRINData() {
      this.loading = true
      this.getMaterialsRIN()
        .then(response => {
          this.rinGroup = sortedUniq(
            map(response, record => {
              return record.date
            })
          )

          this.rinData = response
          this.defaultRinGroup = this.rinGroup[0]
          this.groupedRinData = filter(response, record => {
            return record.date === this.defaultRinGroup
          })
          console.log('getRINData: ', this.rinGroup)
          this.loading = false

          this.getDINData()
        })
        .catch(error => {
          console.log('getRINData Error: ', error)
          this.loading = false
        })
    },
    getDINData() {
      this.loading = true
      this.getMaterialsDIN()
        .then(response => {
          this.dinGroup = sortedUniq(
            map(response, record => {
              return record.date
            })
          )

          this.dinData = response
          this.defaultDinGroup = this.dinGroup[0]
          this.groupedDinData = filter(response, record => {
            return record.date === this.defaultDinGroup
          })
          console.log('getDINData: ', this.dinGroup)
          this.loading = false

          this.groupRinDinData(this.rinData, this.dinData)
        })
        .catch(error => {
          console.log('getDINData Error: ', error)
          this.loading = false
        })
    },
    requestMaterials() {}
  },
  created() {
    this.getMetaData()
    this.getSeqData()
    this.getRINData()
  }
}
</script>

<style lang="less" scoped>
.dashboard-container {
  .ant-card {
    margin-bottom: 10px;

    .total {
      height: 32px;
      display: flex;
      align-items: center;
      font-size: 25px;
      color: #000;
    }

    .btn-group {
      display: flex;
      justify-content: flex-end;
    }

    .content {
      height: 100px;
    }
  }

  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 24px;
      }
    }
  }

  .salesCard {
    .rank-list {
      height: 300px;
    }

    .group-selector {
      position: absolute;
      right: 0px;
      z-index: 100;
      width: 150px !important;
    }
  }
}
</style>

<style lang="less">
.dashboard-container {
  .ant-card {
    .ant-card-head {
      padding: 0 16px;
    }

    .ant-card-body {
      padding: 10px 16px;
    }

    .ant-card-actions {
      background: unset;
      border-top: unset;
    }

    .ant-card-actions > li:not(:last-child) {
      border-right: unset;
    }

    .ant-card-actions > li > span {
      height: 32px;
      line-height: 32px;
    }

    .ant-card-actions > li {
      margin: 0px 0px 12px 0px;
    }
  }
}
</style>