<template>
  <div>
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form :form="form" layout="inline">
        <standard-form-row title="Status" block style="padding-bottom: 11px;">
          <a-form-item>
            <tag-select>
              <tag-select-option value="running">Running</tag-select-option>
              <tag-select-option value="failed">Failed</tag-select-option>
              <tag-select-option value="finished">Finished</tag-select-option>
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
                  <a-select-option value="huangyechao">Yechao Huang</a-select-option>
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

    <div class="ant-pro-pages-list-workflows-cardList">
      <a-list :loading="loading" :data-source="data" :grid="{ gutter: 24, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card class="ant-pro-pages-list-workflows-card" hoverable>
            <img slot="cover" :src="item.cover" :alt="item.title" />
            <a-card-meta :title="item.title">
              <template slot="description">
                <ellipsis :length="50">{{ item.description }}</ellipsis>
              </template>
            </a-card-meta>
            <div class="cardItemContent">
              <span>{{ item.updatedAt | fromNow }}</span>
              <div class="avatarList">
                <avatar-list size="mini">
                  <avatar-list-item
                    v-for="(member, i) in item.members"
                    :key="`${item.id}-avatar-${i}`"
                    :src="member.avatar"
                    :tips="member.name"
                  />
                </avatar-list>
              </div>
            </div>
          </a-card>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { TagSelect, StandardFormRow, Ellipsis, AvatarList } from '@/components'
const TagSelectOption = TagSelect.Option
const AvatarListItem = AvatarList.AvatarItem

export default {
  name: 'Workflow',
  components: {
    AvatarList,
    AvatarListItem,
    Ellipsis,
    TagSelect,
    TagSelectOption,
    StandardFormRow
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
      this.$http.get('/list/article', { params: { count: 8 } }).then(res => {
        console.log('res', res)
        this.data = res.result
        this.loading = false
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
