<template>
  <page-view :title="getTitle()" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <detail-list slot="headerContent" size="small" :col="2" class="detail-layout">
      <detail-list-item term="Author">{{ report.author }}</detail-list-item>
      <detail-list-item term="Analysis Type">{{ report.analysisType }}</detail-list-item>
      <detail-list-item term="Created Time">{{ report.createdTime }}</detail-list-item>
      <detail-list-item term="Related Workflow">
        <router-link :to="{ name: 'workflow-details', params: { workflowId: report.relatedWorkflowId }}">{{ report.relatedWorkflowId }}</router-link>
      </detail-list-item>
      <detail-list-item term="Audit Time">{{ report.auditTime }}</detail-list-item>
      <detail-list-item term="Description">{{ report.description }}</detail-list-item>
    </detail-list>
    <a-row slot="extra" class="status-list">
      <a-col :xs="12" :sm="12">
        <div class="text">Status</div>
        <div class="heading">{{ report.status }}</div>
      </a-col>
      <a-col :xs="12" :sm="12">
        <div class="text">Reviewer</div>
        <div class="heading">PGx</div>
      </a-col>
    </a-row>
    <!-- actions -->
    <template slot="action">
      <a-button-group style="margin-right: 4px;">
        <a-button @click="onSave">Save</a-button>
        <a-button>Edit</a-button>
        <a-button>{{ switchBtnText }}</a-button>
        <!-- <a-button><a-icon type="ellipsis"/></a-button> -->
      </a-button-group>
      <a-button type="primary" >Archive</a-button>
    </template>

    <block-style-editor
      class="report"
      autofocus
      ref="editor"
      holder-id="codex-editor"
      save-button-id="save-button"
      :init-data="initData"
      @ready="onReady"
      @change="onChange"
    />
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import BlockStyleEditor from '@/components/BlockStyleEditor'
import { getReport } from '@/api/manage'
import DetailList from '@/components/tools/DetailList'

const DetailListItem = DetailList.Item

export default {
  name: 'ReportDetails',
  components: {
    PageView,
    DetailList,
    DetailListItem,
    BlockStyleEditor
  },
  props: {
    readonly: {
      type: [Boolean, String],
      default: true
    },
    description: {
      type: String,
      default: 'Benchmark Report for Quartet Project'
    }
  },
  data () {
    return {
      report: {
        author: '曲丽丽',
        analysisType: 'XX服务',
        createdDate: '2018-08-07 08:59:00',
        relatedWorkflowId: '123',
        auditTime: '2018-08-09 08:59:00',
        reviewer: 'Choppy',
        description: '请于两个工作日内确认',
        status: 'Checked'
      },
      initData: {},
      savedData: {}
    }
  },
  computed: {
    switchBtnText () {
      if (this.report.status === 'Checked') {
        return 'Uncheck'
      } else {
        return 'Check'
      }
    }
  },
  methods: {
    getTitle () {
      return this.$route.meta.title
    },
    async onSave () {
      const editor = this.$refs.editor.editor
      if (editor) {
        const response = await editor.save()
        this.savedData = response
        console.log('savedData', this.savedData)
      }
    },
    onReady () {
      console.log('ready')
    },
    onChange () {
      console.log('changed')
    }
  },
  mounted () {
    getReport().then(res => {
      const that = this
      that.initData = res
      console.log('initData', that.initData)
    })
  },
  created () {

  }
}
</script>

<style lang="less" scoped>
.report {
  padding: 20px 80px 0px 20px;
  background: white;
  border-radius: 10px;
}

.detail-layout {
  margin-left: 44px;
}
.text {
  color: rgba(0, 0, 0, .45);
}

.heading {
  color: rgba(0, 0, 0, .85);
  font-size: 20px;
}

.mobile {
  .detail-layout {
    margin-left: unset;
  }

  .text {

  }

  .status-list {
    text-align: left;
  }
}
</style>
