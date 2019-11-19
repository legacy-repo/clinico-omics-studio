<template>
  <!--eslint-disable-->
  <a-row class="filter-panel" :gutter="16">
    <a-col class="left" :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
      <a-collapse :activeKey="activeFilterList">
        <a-collapse-panel :header="toTitleCase(field.name)" :key="field.name" v-for="field in fieldsList">
          <filter-list :dataSource="field.data"></filter-list>
        </a-collapse-panel>
      </a-collapse>
    </a-col>
    <a-col class="right" :xl="18" :lg="18" :md="18" :sm="24" :xs="24">
      <a-tabs defaultActiveKey="1" @change="onChangeTab">
        <a-tab-pane tab="Apps" key="1">
          <a-row class="card-list" :gutter="16">
            <a-col :xl="8" :lg="8" :md="12" :sm="12" :xs="24" v-for="app in appList" :key="app.id">
              <a-card hoverable class="card">
                <img :alt="app.title" :src="app.cover" slot="cover"/>
                <template class="ant-card-actions" slot="actions">
                  <a-icon type="eye" @click="onView(app)"/>
                  <a-popover :title="app.title" trigger="click" v-model="app.popoverVisible">
                    <a @click="onHidePopover(app)" slot="content">{{ app.description }}</a>
                    <a-icon type="info-circle" @click="onShowPopover(app)"/>
                  </a-popover>
                  <a-icon type="share-alt" />
                </template>
                <a-card-meta :title="app.title" :description="app.description" class="card-meta">
                  <a-avatar slot="avatar" :src="app.icon"/>
                </a-card-meta>
              </a-card>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane tab="Statistics" key="2" class="graph-tab">
          <h4>Case count per Data Category</h4>
          <img style="height: 860px;" src="http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/choppy/case-count.png">
        </a-tab-pane>
      </a-tabs>
    </a-col>
  </a-row>
</template>

<script>
import { FilterList, Pie } from '@/components'
import { getAppList } from '@/api/manage'
import orderBy from 'lodash.orderby'

export default {
  name: 'FilterPanel',
  components: {
    FilterList,
    Pie
  },
  data () {
    return {
      loading: true,
      appList: [],
      fieldsList: [
        {
          name: 'App Type',
          id: 'app-type',
          data: [
            {
              name: 'Web App',
              nums: '2'
            }, {
              name: 'Linux',
              nums: '3'
            }
          ]
        }, {
          name: 'Source',
          id: 'source',
          data: [
            {
              name: 'Open Source',
              nums: '3'
            }, {
              name: 'PGx',
              nums: '3'
            }
          ]
        }, {
          name: 'Category',
          id: 'category',
          data: [
            {
              name: 'Precision Medicine',
              nums: '2'
            }
          ]
        }
      ]
    }
  },
  props: {},
  computed: {
    activeFilterList () {
      const active = []
      for (const field of this.fieldsList) {
        active.push(field.name)
      }
      return active
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    onHidePopover (app) {
      app.popoverVisible = false
    },
    onShowPopover (app) {
      app.popoverVisible = true
    },
    onView (app) {
      window.open(app.repoUrl, '_blank')
    },
    onChangeTab () {

    },
    toTitleCase (str) {
      return str.replace(
        /\w\S*/g,
        function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        }
      )
    },
    getList () {
      getAppList().then(res => {
        console.log('res', res)
        this.appList = orderBy(res.data, [item => {
          item.title.toLowerCase()
          item.popoverVisible = false
        }], ['asc'])
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.filter-panel {
  .right {
    padding-left: 20px !important;
    padding-right: 20px !important;
    padding-bottom: 20px;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    background-color: #fff;
    min-height: 500px;

    .card-list {
      .card {
        width: 100%;
        margin-right: 10px;
        margin-bottom: 10px;

        img {
          height: 200px;
        }

        .card-meta {
          height: 75px;
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

<style lang="less">
.card-meta {
  .ant-card-meta-description {
    align-content: center;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

.ant-popover {
  max-width: 50%;
}
</style>
