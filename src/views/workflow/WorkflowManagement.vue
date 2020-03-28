<template>
  <page-view :title="getTitle()" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <detail-list slot="headerContent" size="small" :col="2" class="detail-layout">
      <detail-list-item term="Name">{{ project.title }}</detail-list-item>
      <detail-list-item term="Author">{{ project.author }}</detail-list-item>
      <detail-list-item term="Started Time">{{ project.startedAt }}</detail-list-item>
      <detail-list-item term="Finished Time">{{ project.finishedAt }}</detail-list-item>
      <detail-list-item term="Description">{{ project.description }}</detail-list-item>
      <detail-list-item term="Percentage">
        <a-progress :percent="project.percentage" :status="project.status" />
      </detail-list-item>
    </detail-list>
    <a-row slot="extra" class="status-list">
      <a-col :xs="8" :sm="8" >
        <div class="text">Related Report</div>
        <div class="heading">
          <a-button type="primary" size="small" icon="logout" @click.native="redirect(project.reportId)"/>
        </div>
      </a-col>
      <a-col :xs="16" :sm="16">
        <div class="text">Related App</div>
        <div class="heading">
          <a-tag color="#87d068" style="margin-right: 0px;">{{ project.appName }}</a-tag>
        </div>
      </a-col>
    </a-row>
    <!-- actions -->
    <template slot="action">
      <a-button-group style="margin-right: 4px;">
        <a-button disabled>Stop</a-button>
        <a-button disabled>Restart</a-button>
        <a-button type="primary" disabled>Archive</a-button>
      </a-button-group>
    </template>

    <workflow-list></workflow-list>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import DetailList from '@/components/tools/DetailList'
import WorkflowList from '@/views/workflow/itemList/WorkflowList'

const DetailListItem = DetailList.Item

export default {
  name: 'WorkflowManagement',
  components: {
    PageView,
    WorkflowList,
    DetailList,
    DetailListItem
  },
  data () {
    return {
      project: {
        appName: 'huangyechao/annovar-latest',
        description: 'High Confidence Region Intergration',
        title: 'High Confidence Region Intergration',
        startedAt: '2019-09-01 08:30:00',
        finishedAt: null,
        reportId: '5be4fe22-4b9a-40ae-90c2-251a07388e99',
        author: '付小小',
        status: 'active',
        percentage: 80
      }
    }
  },
  methods: {
    redirect (reportId) {
      this.$router.push({
        name: 'report-details',
        params: {
          reportId: reportId
        },
        query: {
          readonly: true
        }
      })
    },
    getTitle () {
      return 'Project Metadata'
    },
    onCreateProject () {
      this.$router.push({
        name: 'create-project'
      })
    }
  }
}
</script>

<style scoped>
.heading {
  margin-top: 5px;
}
</style>
