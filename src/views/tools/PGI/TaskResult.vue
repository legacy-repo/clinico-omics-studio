<template>
  <page-view :title="getTitle()" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <detail-list slot="headerContent" size="small" :col="2" class="detail-layout">
      <detail-list-item term="Task Name">{{ task.taskName }}</detail-list-item>
      <detail-list-item term="Task Type">{{ task.taskType }}</detail-list-item>
      <detail-list-item term="Disease Type">{{ task.diseaseType }}</detail-list-item>
      <detail-list-item term="Started Time">{{ task.startedAt }}</detail-list-item>
      <detail-list-item term="Finished Time">{{ task.finishedAt }}</detail-list-item>
      <detail-list-item term="Knowledge DB">{{ task.knowledgeDBVersion }}</detail-list-item>
      <detail-list-item term="Status">
        <a-tag color="pink" v-if="task.checkedAt">Checked</a-tag>
        <a-tag color="blue" v-if="task.archivedAt">Archived</a-tag>
      </detail-list-item>
      <detail-list-item term="Log Container">
        <a-popover placement="left">
          <template slot="content">
            <a-row v-html="task.taskLog" class="log-container"></a-row>
          </template>
          <a-button type="primary" icon="eye" size="small">Task Log</a-button>
        </a-popover>
      </detail-list-item>
    </detail-list>
    <!-- actions -->
    <template slot="action">
      <a-button-group style="margin-right: 4px">
        <a-button disabled icon="logout" @click.native="backToTaskList(task.taskName)">Related Task</a-button>
        <a-button disabled icon="download">Download</a-button>
        <a-button disabled>{{ switchBtnText }}</a-button>
      </a-button-group>
    </template>

    <a-row class="task-result">
      <a-tabs>
        <a-tab-pane key="1" tab="Genomic Report"> Content of tab 1 </a-tab-pane>
        <a-tab-pane key="3" tab="Omics Data"> Content of tab 3 </a-tab-pane>
        <a-tab-pane key="2" tab="Neoantigens"> Content of tab 2 </a-tab-pane>
        <a-button slot="tabBarExtraContent" @click="switchOmicsViewer">Checked</a-button>
      </a-tabs>
      <a-drawer
        class="task-result__annotation"
        width="100%"
        placement="right"
        :get-container="false"
        :wrap-style="{ position: 'absolute' }"
        @close="switchOmicsViewer"
        :maskClosable="true"
        :destroyOnClose="true"
        :visible="omicsViewerActive"
      >
        <omics-viewer></omics-viewer>
      </a-drawer>
    </a-row>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import { formatDateTime } from './utils'
import OmicsViewer from './OmicsViewer'
import DetailList from '@/components/Tools/DetailList'

const DetailListItem = DetailList.Item

export default {
  components: {
    PageView,
    DetailList,
    DetailListItem,
    OmicsViewer
  },
  props: {
    taskId: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      omicsViewerActive: false,
      task: {
        patientId: '1900272',
        diseaseType: 'Breast Cancer',
        modelName: 'CNV,SNV',
        isPositive: true,
        taskName: '1900272',
        projectId: '',
        knowledgeDBVersion: 'pgi-v20210531', // PGI + Version
        taskType: 'PGI',
        taskUrl: '',
        startedAt: formatDateTime(1622472096900),
        finishedAt: null,
        checkedAt: null,
        archivedAt: null,
        status: 'Finished',
        taskLog: ''
      }
    }
  },
  computed: {
    switchBtnText() {
      if (this.task.status === 'Checked') {
        return 'Uncheck'
      } else {
        return 'Check'
      }
    }
  },
  methods: {
    getTitle() {
      return this.$route.meta.title
    },
    backToTaskList(taskId) {},
    downloadResult() {},
    switchOmicsViewer() {
      this.omicsViewerActive = !this.omicsViewerActive
    }
  }
}
</script>

<style lang="less" scoped>
.task-result {
  border-radius: 5px;
  height: calc(100vh - 84px);
  background-color: #fff;
  padding: 10px;
}
</style>

<style lang="less">
.task-result__annotation {
  overflow: scroll;

  .ant-drawer-body {
    padding: 0px;
  }
}
</style>
