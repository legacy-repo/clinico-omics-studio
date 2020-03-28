<template>
  <div class="report-list">
    <a-card style="margin-top: 10px" :bordered="false">
      <a-badge slot="extra" :count="pagination.total" :numberStyle="{backgroundColor: '#52c41a'}"/>
      <div slot="title">
        <a-radio-group disabled @change="onClickRadioBtn" defaultValue="total" :value="radioGroupValue">
          <a-radio-button value="total">Total</a-radio-button>
          <a-radio-button value="unchecked">Unchecked</a-radio-button>
          <a-radio-button value="checked">Checked</a-radio-button>
          <a-radio-button value="archived">Archived</a-radio-button>
        </a-radio-group>
        <a-input-search
          style="margin-left: 16px; width: 272px;"
          placeholder="Please Enter Report Name"
          :loading="loading"
          :value="searchStr"
          @search="searchReport"
        />
      </div>

      <a-list
        size="large"
        :loading="loading"
        :pagination="pagination">
        <a-list-item :key="index" v-for="(item, index) in data">
          <a-col :lg="10" :md="8" :sm="24" :xs="24">
            <a-list-item-meta>
              <div slot="description">
                <a-tag color="pink" v-if="item.status.checked">Checked</a-tag>
                <a-tag color="blue" v-if="item.status.archived">Archived</a-tag>
              </div>
              <a-popover slot="avatar" placement="rightTop">
                <template slot="content">
                  <vue-friendly-iframe :src="item.reportUrl" class="popover" frameborder="0" scrolling="auto"></vue-friendly-iframe>
                </template>
                <report-logo class="report-logo" />
              </a-popover>
              <a slot="title">{{ item.title }}</a>
            </a-list-item-meta>
          </a-col>
          <a-col class="list-content" :lg="10" :md="12" :sm="24" :xs="24">
            <div class="list-content-item">
              <span>Author</span>
              <p>{{ item.author }}</p>
            </div>
            <div class="list-content-item">
              <span>Started</span>
              <p>{{ item.startedAt }}</p>
            </div>
            <div class="list-content-item">
              <span>Finished</span>
              <p>{{ item.finishedAt }}</p>
            </div>
          </a-col>
          <div slot="actions">
            <a @click="onShowReport(item.title, item.id)" :disabled="!item.id">View</a>
            &nbsp;
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item><a>Update</a></a-menu-item>
                <a-menu-item><a>Delete</a></a-menu-item>
                <a-menu-item><a>Checked</a></a-menu-item>
                <a-menu-item><a>Archived</a></a-menu-item>
              </a-menu>
              <a disabled>More<a-icon type="down"/></a>
            </a-dropdown>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
import { getReportList } from '@/api/manage'
import VueFriendlyIframe from 'vue-friendly-iframe'
import Avatar from '@/components/Avatar'
import { reportLogo } from '@/core/icons'
import orderBy from 'lodash.orderby'

export default {
  name: 'ReportList',
  components: {
    Avatar,
    HeadInfo,
    VueFriendlyIframe,
    reportLogo
  },
  data () {
    return {
      searchStr: '',
      data: {},
      pagination: {
        pageSizeOptions: ['5', '10', '20', '30', '40', '50'],
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 5,
        total: 0,
        current: 1,
        onChange: (page, pageSize) => {
          this.searchReport(page, pageSize, this.searchStr)
        },
        onShowSizeChange: (current, pageSize) => {
          this.searchReport(1, pageSize, this.searchStr)
        }
      },
      loading: false,
      radioGroupValue: 'total'
    }
  },
  methods: {
    searchReport (page, pageSize, searchStr) {
      this.loading = true
      getReportList({
        page: page,
        per_page: pageSize,
        query_str: searchStr
      }).then(result => {
        const that = this
        that.data = orderBy(result.data, [item => item.title.toLowerCase()], ['asc'])
        that.pagination.pageSize = result.per_page
        that.pagination.total = result.total
        that.pagination.current = result.page
        this.loading = false
      })
    },
    onClickRadioBtn (event) {
      this.radioGroupValue = event.target.value
      console.log('Current Radio Button Value: ', this.radioGroupValue)
    },
    onShowReport (projectName, reportId) {
      this.$router.push({
        name: 'report-details',
        params: {
          reportId: reportId
        },
        query: {
          readonly: true,
          description: 'The Report of ' + projectName
        }
      })
    }
  },
  created () {
    this.searchReport(this.pagination.current, this.pagination.pageSize, this.searchStr)
  }
}
</script>

<style lang="less">
.report-list {
  .ant-list-item {
    flex-wrap: wrap;
  }

  .ant-avatar-lg {
    width: 48px;
    height: 48px;
    line-height: 48px;
  }

  .list-content {
    display: flex;
    flex-direction: row;
  }

  .ant-list-item-meta, .list-content-item {
    margin-top: 5px;
  }

  .ant-list-item-action {
    margin-left: 0px;
    float: right;
  }

  .list-content-item {
    color: rgba(0, 0, 0, 0.45);
    display: flex;
    flex-direction: column;
    vertical-align: middle;
    font-size: 14px;
    margin-right: 40px;

    .ant-tag {
      margin-bottom: 5px;
    }

    span {
      line-height: 20px;
    }

    p {
      margin-top: 4px;
      margin-bottom: 0;
      line-height: 22px;
    }
  }
}

.popover {
  iframe {
    width: 500px;
    min-height: 300px;
  }
}

.report-logo {
  font-size: 16px;
  padding: 4px;
  width: 60px;
  height: 60px;
  vertical-align: middle;
}
</style>
