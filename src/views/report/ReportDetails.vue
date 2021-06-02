<template>
  <page-view :title="getTitle()" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <detail-list slot="headerContent" size="small" :col="2" class="detail-layout">
      <detail-list-item term="Report Type">{{ report.reportType }}</detail-list-item>
      <detail-list-item term="Started Time">{{ report.startedAt }}</detail-list-item>
      <detail-list-item term="Finished Time">{{ report.finishedAt }}</detail-list-item>
      <detail-list-item term="Description">{{ report.description }}</detail-list-item>
      <detail-list-item term="Status">
        <a-tag color="pink" v-if="checked">Checked</a-tag>
        <a-tag color="blue" v-if="archived">Archived</a-tag>
      </detail-list-item>
    </detail-list>
    <a-row slot="extra" class="status-list">
      <a-col :xs="8" :sm="8" >
        <div class="text">Related Project</div>
        <div class="heading">
          <a-button type="primary" size="small" icon="logout" @click.native="backToProjectList(report.relatedProjectId)"/>
        </div>
      </a-col>
      <a-col :xs="8" :sm="8">
        <div class="text">Team</div>
        <div class="heading">{{ report.groupName }}</div>
      </a-col>
      <a-col :xs="8" :sm="8">
        <div class="text">Report Log</div>
        <div class="heading">
          <a-popover placement="left">
            <template slot="content">
              <a-row v-html="report.reportLog" class="log-container"></a-row>
            </template>
            <a-button type="primary" size="small" icon="eye"/>
          </a-popover>
        </div>
      </a-col>
    </a-row>
    <!-- actions -->
    <template slot="action">
      <a-button-group style="margin-right: 4px;">
        <a-button disabled>Save</a-button>
        <a-button disabled>Edit</a-button>
        <a-button disabled>{{ switchBtnText }}</a-button>
        <!-- <a-button><a-icon type="ellipsis"/></a-button> -->
      </a-button-group>
      <a-button type="primary" disabled>Archive</a-button>
    </template>

    <embeded-frame :src="reportUrl" class="embeded-frame"></embeded-frame>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import EmbededFrame from '@/views/iframe/EmbededFrame'
import { mapActions } from 'vuex'
import DetailList from '@/components/Tools/DetailList'

const DetailListItem = DetailList.Item

export default {
  name: 'ReportDetails',
  components: {
    PageView,
    DetailList,
    DetailListItem,
    EmbededFrame
  },
  props: {
    readonly: {
      type: [Boolean, String],
      default: true
    }
  },
  data () {
    return {
      report: {}
    }
  },
  computed: {
    reportUrl () {
      const reportUrl = this.report.reportUrl
      if (reportUrl) {
        return reportUrl
      } else {
        return ''
      }
    },
    checked () {
      const status = this.report.status
      if (status) {
        return status.checked
      } else {
        return false
      }
    },
    archived () {
      const status = this.report.status
      if (status) {
        return status.archived
      } else {
        return false
      }
    },
    reportId () {
      return this.$route.params.reportId
    },
    switchBtnText () {
      if (this.report.status === 'Checked') {
        return 'Uncheck'
      } else {
        return 'Check'
      }
    }
  },
  methods: {
    ...mapActions({
      getReport: 'GetReport'
    }),
    backToProjectList (projectId) {
      this.$router.push({ name: 'project-management', params: { projectId: projectId } })
    },
    getTitle () {
      return this.$route.meta.title
    },
    searchReport (reportId) {
      this.getReport(reportId).then(data => {
        const that = this
        that.report = data
        console.log('Report Record: ', data)
      })
    }
  },
  mounted () {

  },
  created () {
    console.log('Request Report: ', this.reportId)
    this.searchReport(this.reportId)
  }
}
</script>

<style lang="less" scoped>
.embeded-frame {
  height: 92vh;
}

.report {
  padding: 20px 80px 0px 20px;
  background: white;
  border-radius: 10px;
}

.detail-layout {
  margin-left: 44px;
}

.text {
  text-align: right;
  color: rgba(0, 0, 0, .45);
}

.heading {
  text-align: right;
  display: block;
  color: rgba(0, 0, 0, .85);
  font-size: 16px;
}

.mobile {
  .detail-layout {
    margin-left: unset;
  }

  .status-list {
    text-align: left;
  }
}
</style>

<style lang="less">
.log-container {
  max-width: 300px;
  max-height: 200px;
  overflow: scroll;
}

.log-container::-webkit-scrollbar {
  width: 0 !important;
}
</style>
