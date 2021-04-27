<template>
  <div class="data-repo-list">
    <a-card style="margin-top: 10px" :bordered="false">
      <a-badge slot="extra" showZero :count="total" :numberStyle="{ backgroundColor: '#52c41a' }" />
      <div slot="title">
        <a-input-search
          style="width: 272px"
          placeholder="Please Enter Repo Name"
          :loading="loading"
          :value="searchStr"
          @search="searchRepo"
        />
      </div>

      <a-list size="large" :loading="loading">
        <a-list-item :key="index" v-for="(item, index) in data">
          <a-col :lg="10" :md="8" :sm="24" :xs="24">
            <a-list-item-meta>
              <div slot="description">
                <span>{{ item.description }}</span>
              </div>
              <a-popover slot="avatar" placement="rightTop">
                <template slot="content">
                  <vue-json-pretty
                    class="json-popover"
                    v-if="Object.keys(item.config).length !== 0"
                    :data="formatJSON(item.config, item.files)"
                  ></vue-json-pretty>                  
                </template>
                <a-avatar icon="history" style="backgroundColor:#87d068" />
              </a-popover>
              <a slot="title">{{ item.name }}</a>
            </a-list-item-meta>
          </a-col>
          <a-col class="list-content" :lg="10" :md="12" :sm="24" :xs="24">
            <div class="list-content-item">
              <span>Started</span>
              <p>{{ item.created }}</p>
            </div>
            <div class="list-content-item">
              <span>Status</span>
              <p>{{ item.status }}</p>
            </div>
          </a-col>
          <div slot="actions">
            <a @click="onShowRepo(item.title, item.id)" :disabled="!item.id || !item.status.finished">View</a>
            &nbsp;
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item><a @click="downloadRepo(item.reportUrl)">Download</a></a-menu-item>
                <a-menu-item><a disabled>Update</a></a-menu-item>
                <a-menu-item><a disabled>Delete</a></a-menu-item>
              </a-menu>
              <a>More<a-icon type="down" /></a>
            </a-dropdown>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import VueJsonPretty from 'vue-json-pretty'

export default {
  name: 'RepoList',
  components: {
    VueJsonPretty
  },
  data() {
    return {
      searchStr: null,
      data: [],
      total: 0,
      loading: false
    }
  },
  methods: {
    ...mapActions({
      getRepoList: 'GetRepoList'
    }),
    formatJSON(config, files) {
      return {
        files: files,
        config: config
      }
    },
    downloadRepo(repoName) {},
    searchRepo(searchStr) {
      this.loading = true
      this.getRepoList().then(response => {
        this.data = response
        this.total = response.length
        console.log('Search Repo: ', response)
        this.loading = false
      })
    },
    onShowRepo(projectName, repoName) {
      this.$router.push({
        name: 'repo-details',
        params: {
          repoName: repoName
        }
      })
    }
  },
  created() {
    this.searchRepo(this.searchStr)
  }
}
</script>

<style lang="less">
.data-repo-list {
  .ant-card-body {
    padding: 0px 24px;
  }

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

  .ant-list-item-meta,
  .list-content-item {
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
</style>
