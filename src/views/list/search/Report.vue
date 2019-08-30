<template>
  <div>

    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form :form="form" layout="inline">
        <standard-form-row title="Status" block style="padding-bottom: 11px; margin-bottom: 0px;">
          <a-row type="flex" justify="space-between">
            <a-form-item>
              <tag-select>
                <tag-select-option value="Category1">Checked</tag-select-option>
                <tag-select-option value="Category2">Archived</tag-select-option>
                <tag-select-option value="Category3">Finished</tag-select-option>
                <tag-select-option value="Category4">NotFinished</tag-select-option>
              </tag-select>
            </a-form-item>
            <a-button type="primary" @click="onShowAdvancedForm(switchBtnText)">{{ switchBtnText }}</a-button>
          </a-row>
        </standard-form-row>

        <standard-form-row title="owner" grid v-if="advancedFormActive" style="margin-top: 16px;">
          <a-row>
            <a-col :md="24">
              <a-form-item :wrapper-col="{ span: 24 }">
                <a-select
                  style="max-width: 268px; width: 100%;"
                  mode="multiple"
                  placeholder="Choose Owner"
                  v-decorator="['owner']"
                  @change="handleChange"
                >
                  <a-select-option v-for="item in owners" :key="item.id">{{ item.name }}</a-select-option>
                </a-select>
                <a class="list-articles-trigger" @click="setOwner">Only Yourself</a>
              </a-form-item>
            </a-col>
          </a-row>
        </standard-form-row>

        <standard-form-row title="Advanced" grid last v-if="advancedFormActive">
          <a-row :gutter="16">
            <a-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8">
              <a-form-item label="" :wrapper-col="{ xs: 24, sm: 24, md: 12 }">
                <a-select placeholder="Active Report" style="max-width: 200px; width: 100%;">
                  <a-select-option value="monthly">Monthly</a-select-option>
                  <a-select-option value="weekly">Weekly</a-select-option>
                  <a-select-option value="today">Today</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8">
              <a-form-item label="" :wrapper-col="{ xs: 24, sm: 24, md: 12 }">
                <a-select placeholder="Rate" style="max-width: 200px; width: 100%;">
                  <a-select-option value="good">Good</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </standard-form-row>
      </a-form>
    </a-card>

    <a-card style="margin-top: 10px;" :bordered="false">
      <a-list
        size="large"
        rowKey="id"
        :loading="loading"
        itemLayout="vertical"
        :dataSource="data"
      >
        <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
          <template slot="actions">
            <icon-text type="star-o" :text="item.star" />
            <icon-text type="like-o" :text="item.like" />
            <icon-text type="message" :text="item.message" />
          </template>
          <a-list-item-meta>
            <router-link slot="title" :to="{ name: 'report-details', params: { reportId: item.id }}">{{ item.title }}</router-link>
            <template slot="description">
              <span>
                <a-tag>Mutation</a-tag>
                <a-tag>Patient</a-tag>
                <a-tag>WGS</a-tag>
              </span>
            </template>
          </a-list-item-meta>
          <report-list-content :description="item.description" :owner="item.owner" :avatar="item.avatar" :href="item.href" :updateAt="item.updatedAt" />
        </a-list-item>
        <div slot="footer" v-if="data.length > 0" style="text-align: center; margin-top: 16px;">
          <a-button @click="loadMore" :loading="loadingMore">Load More...</a-button>
        </div>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import { TagSelect, StandardFormRow, ReportListContent } from '@/components'
import IconText from './components/IconText'
const TagSelectOption = TagSelect.Option

const owners = [
  {
    id: 'wzj',
    name: '我自己'
  },
  {
    id: 'wjh',
    name: '吴家豪'
  },
  {
    id: 'zxx',
    name: '周星星'
  },
  {
    id: 'zly',
    name: '赵丽颖'
  },
  {
    id: 'ym',
    name: '姚明'
  }
]

export default {
  components: {
    TagSelect,
    TagSelectOption,
    StandardFormRow,
    ReportListContent,
    IconText
  },
  data () {
    return {
      owners,
      loading: true,
      loadingMore: false,
      data: [],
      form: this.$form.createForm(this),
      switchBtnText: 'More',
      advancedFormActive: false
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    onShowAdvancedForm (switchBtnText) {
      if (switchBtnText === 'More') {
        this.switchBtnText = 'Less'
      } else {
        this.switchBtnText = 'More'
      }
      this.advancedFormActive = !this.advancedFormActive
    },
    handleChange (value) {
      console.log(`selected ${value}`)
    },
    getList () {
      this.$http.get('/list/article').then(res => {
        console.log('res', res)
        this.data = res.result
        this.loading = false
      })
    },
    loadMore () {
      this.loadingMore = true
      this.$http.get('/list/article').then(res => {
        this.data = this.data.concat(res.result)
      }).finally(() => {
        this.loadingMore = false
      })
    },
    setOwner () {
      const { form: { setFieldsValue } } = this
      setFieldsValue({
        owner: ['wzj']
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

.list-articles-trigger {
  margin-left: 12px;
}
</style>
