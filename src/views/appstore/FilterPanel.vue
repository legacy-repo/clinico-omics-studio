<template>
  <!--eslint-disable-->
  <a-row class="filter-panel">
    <a-col class="left" :xl="6" :lg="6" :md="6" :sm="24" :xs="24" v-if="fieldsList.length > 0">
      <a-collapse :activeKey="activeFilterList">
        <a-collapse-panel
          :header="toTitleCase(field.name)"
          :key="field.name"
          v-for="field in fieldsList"
        >
          <filter-list :dataSource="field.data"></filter-list>
        </a-collapse-panel>
      </a-collapse>
    </a-col>
    <a-col class="right" :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
      <a-tabs defaultActiveKey="1" @change="onChangeTab">
        <a-tab-pane tab="Apps" key="1">
          <app-list :appList="appList"></app-list>
        </a-tab-pane>
        <a-tab-pane tab="Tools" key="2">
          <tool-list :toolList="toolList"></tool-list>
        </a-tab-pane>
      </a-tabs>
    </a-col>
  </a-row>
</template>

<script>
/* eslint-disable */
import { mapActions } from 'vuex'
import { FilterList } from '@/components'
import AppList from '@/views/appstore/AppList'
import ToolList from '@/views/appstore/ToolList'
import orderBy from 'lodash.orderby'

export default {
  name: 'FilterPanel',
  components: {
    FilterList,
    AppList,
    ToolList
  },
  data() {
    return {
      loading: true,
      appList: [],
      toolList: [
        {
          author: 'yangjingcheng',
          cover: '',
          description: 'Convert xps to pdf file',
          icon: '',
          id: '02256595c5470695ad46bbed3f1277da',
          popoverVisible: false,
          rate: '0',
          repoUrl: 'xps2pdf',
          title: 'yangjingcheng/xps2pdf',
          valid: false
        }
      ],
      fieldsList: []
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
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    ...mapActions({
      getAppList: 'GetAppList',
      getAppManifest: 'GetAppManifest'
    }),
    onChangeTab() {},
    toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    },
    generateFields(appList) {

    },
    getList() {
      this.getAppManifest().then(res => {
        console.log('res', res)
        this.appList = orderBy(
          res.data,
          [
            item => {
              item.popoverVisible = false
            }
          ],
          ['asc']
        )
        this.fieldsList = 
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.filter-panel {
  .right {
    // padding-left: 20px !important;
    // padding-right: 20px !important;
    padding-bottom: 20px;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    background-color: #fff;
    min-height: 650px;

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
    overflow: hidden;
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
