<template>
  <div>
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form :form="form" layout="inline">
        <standard-form-row title="Topics" block style="padding-bottom: 11px;">
          <a-form-item>
            <tag-select>
              <tag-select-option value="choppy-app">Choppy App</tag-select-option>
            </tag-select>
          </a-form-item>
        </standard-form-row>

        <standard-form-row title="Advanced" grid last>
          <a-row>
            <a-col :lg="8" :md="10" :sm="10" :xs="24">
              <a-form-item :wrapper-col="{ sm: { span: 16 }, xs: { span: 24 } }" label="">
                <a-select
                  style="max-width: 200px; width: 100%;"
                  mode="multiple"
                  placeholder="Author"
                  v-decorator="['author']"
                  @change="handleChange"
                >
                  <a-select-option value="Yechao Huang">Yechao Huang</a-select-option>
                  <a-select-option value="Luyao Ren">Luyao Ren</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="10" :sm="10" :xs="24">
              <a-form-item :wrapper-col="{ sm: { span: 16 }, xs: { span: 24 } }" label="">
                <a-select
                  style="max-width: 200px; width: 100%;"
                  placeholder="Rate"
                  v-decorator="['rate']"
                >
                  <a-select-option value="good">Good</a-select-option>
                  <a-select-option value="normal">Normal</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </standard-form-row>
      </a-form>
    </a-card>

    <div class="ant-pro-pages-list-applications-filterCardList">
      <a-list :loading="loading" :data-source="data" :grid="{ gutter: 24, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }" style="margin-top: 16px;">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card :body-style="{ paddingBottom: 20 }" hoverable>
            <a-card-meta :title="item.title">
              <template slot="avatar">
                <avatar :username="item.title" :size="24"/>
              </template>
            </a-card-meta>
            <div class="">
              <div class="description">{{ item.description }}</div>
              <card-info active-user="100" new-user="999"></card-info>
            </div>
            <template slot="actions">
              <a-tooltip title="Install">
                <a-icon type="download" @click="onInstall(item)" />
              </a-tooltip>
              <a-tooltip title="View">
                <a-icon type="eye" @click="onView(item)" />
              </a-tooltip>
              <a-tooltip title="Share">
                <a-icon type="share-alt" @click="onShare(item)" />
              </a-tooltip>
              <a-dropdown>
                <a class="ant-dropdown-link">
                  <a-icon type="ellipsis" />
                </a>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a href="javascript:;">Uninstall</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </template>
          </a-card>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Avatar from '@/components/Avatar'
import { TagSelect, StandardFormRow, Ellipsis, AvatarList } from '@/components'
import CardInfo from './components/CardInfo'
import { getAppList } from '@/api/manage'

const TagSelectOption = TagSelect.Option
const AvatarListItem = AvatarList.AvatarItem

export default {
  components: {
    Avatar,
    AvatarList,
    AvatarListItem,
    Ellipsis,
    TagSelect,
    TagSelectOption,
    StandardFormRow,
    CardInfo
  },
  data () {
    return {
      data: [],
      form: this.$form.createForm(this),
      loading: true
    }
  },
  filters: {
    fromNow (date) {
      return moment(date).fromNow()
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    handleChange (value) {
      console.log(`selected ${value}`)
    },
    getList () {
      getAppList().then(res => {
        console.log('res', res)
        this.data = res.data
        this.loading = false
      })
    },
    onInstall (app) {

    },
    onView (app) {
      window.open(app.repoUrl, '_blank')
    },
    onShare (app) {
      this.$copyText(app.repoUrl).then(message => {
        this.$message.success('The application url has been copied to your clipboard!')
      }).catch(err => {
        console.log('onShare: ', err)
        this.$message.error('Copy failed.')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.antd-pro-components-standard-form-row-index-standardFormRow {
  display: flex;
  align-items: center;
}

.ant-pro-components-tag-select {
  /deep/ .ant-pro-tag-select .ant-tag {
    margin-right: 24px;
    padding: 0 8px;
    font-size: 14px;
  }
}

.ant-pro-pages-list-applications-filterCardList {
  .description {
    margin-top: 15px;
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
  }
}

.ant-pro-pages-list-workflows-cardList {
  margin-top: 24px;

  /deep/ .ant-card-meta-title {
    margin-bottom: 4px;
  }

  /deep/ .ant-card-meta-description {
    height: 44px;
    overflow: hidden;
    line-height: 22px;
  }

  .cardItemContent {
    display: flex;
    height: 20px;
    margin-top: 16px;
    margin-bottom: -4px;
    line-height: 20px;

    > span {
      flex: 1 1;
      color: rgba(0,0,0,.45);
      font-size: 12px;
    }

    /deep/ .ant-pro-avatar-list {
      flex: 0 1 auto;
    }
  }
}
</style>
