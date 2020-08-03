<template>
  <div class="dashboard-container">
    <a-row :gutter="24" style="margin-right: 0px;">
      <a-col :sm="24" :md="12" :xl="12" :style="{ paddingRight: '0px' }">
        <a-card :loading="loading" title="Materials Requests">
          <a-tooltip title="Details" slot="extra">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <a-row class="content">
            This is a description.
          </a-row>
          <template slot="actions">
            <a-col class="total">126,560</a-col>
            <a-col class="btn-group">
              <a-button @click="requestMaterials"><a-icon type="file-protect"/>Request</a-button>
              <a-button @click="requestMaterials" style="margin-left: 5px;"><a-icon type="message"/>Feedback</a-button>
            </a-col>
          </template>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ paddingRight: '0px' }">
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
      <a-col :sm="24" :md="12" :xl="6" :style="{ paddingRight: '0px' }">
        <a-card :loading="loading" title="Quality">
          <a-tooltip title="Details" slot="extra">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <a-row class="content">
            <mini-bar />
          </a-row>
          <template slot="actions">Stable Quality</template>
        </a-card>
      </a-col>
    </a-row>

    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item">
              <a>Today</a>
              <a>Week</a>
              <a>Month</a>
              <a>Year</a>
            </div>
            <a-range-picker :style="{width: '256px'}" />
          </div>
          <a-tab-pane loading="true" tab="Materials" key="1">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <bar :data="barData" title="Usage Ranking" />
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list title="Usage Ranking in Lab" :list="rankList"/>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="Data" key="2">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <bar :data="barData2" title="销售额趋势" />
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list title="Usage Ranking in Lab" :list="rankList"/>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>

    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item">
              <a>Today</a>
              <a>Week</a>
              <a>Month</a>
              <a>Year</a>
            </div>
            <a-range-picker :style="{width: '256px'}" />
          </div>
          <a-tab-pane loading="true" tab="Temperature" key="1">
            <a-row>
              <bar :data="barData" title="Usage Ranking" />
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>

    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item">
              <a>Today</a>
              <a>Week</a>
              <a>Month</a>
              <a>Year</a>
            </div>
            <a-range-picker :style="{width: '256px'}" />
          </div>
          <a-tab-pane loading="true" tab="RIN" key="1">
            <a-row>
              <bar :data="barData" title="Usage Ranking" />
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="DIN" key="2">
            <a-row>
              <bar :data="barData2" title="销售额趋势" />
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
  </div>
</template>

<script>
import { MiniArea, MiniBar, RankList, Bar } from '@/components'
import { mixinDevice } from '@/utils/mixin'

const barData = []
const barData2 = []
for (let i = 0; i < 12; i += 1) {
  barData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
  barData2.push({
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
    MiniBar,
    RankList,
    Bar
  },
  data () {
    return {
      loading: true,
      rankList,

      barData,
      barData2
    }
  },
  methods: {
    requestMaterials () {

    }
  },
  created () {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
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
      font-size: 30px;
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