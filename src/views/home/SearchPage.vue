<template lang="html">
  <a-row class="search-page">
    <a-row class="search-container">
      <a-col :xs="20" :sm="20" :md="20" :lg="10">
        <a-row class="slogan">{{ slogan }}</a-row>
        <a-input-search placeholder="Search apps..." @search="onSearch"
                        enterButton size="large" v-model="queryString" />
      </a-col>
    </a-row>
    <a-row class="show-window">
      <a-row class="show-window-header">
        <img class="logo" :src="require('../../assets/images/precision-medicine.png')" />
        <a-row class="news">
          <p class="slogan" v-html="news"></p>
        </a-row>
      </a-row>
      <a-form class="search-form" :form="form">
        <a-row class="form-header">
          <a-col :span="12" :style="{ textAlign: 'left' }">
            <p class="slogan">Total of Webapps: {{ webapps.length }}</p>
          </a-col>
          <a-col :span="12" :style="{ textAlign: 'right' }">
            <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
              Collapse <a-icon :type="expand ? 'up' : 'down'" />
            </a>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col v-for="field, index in fieldList" :key="index" :lg="8" :md="8" :sm="12" :xs="24"
                 :style="{ display: index < count ? 'block' : 'none' }"
                 class="form-column">
            <a-form-item :label="field.label" :label-col="{ xs: 6 }">
              <a-select :placeholder="`Please select ${field.name}`" allowClear
                        :mode="field.mode" v-decorator="[field.name]">
                <a-select-option v-for="option in field.options" :key="option"
                                 :value="option">
                  {{ option }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-row class="card-container" :class="{'not-found': webapps.length == 0}" :gutter="20">
        <a-col v-for="(card, index) in webapps" :key="index"
               :xs="24" :sm="12" :md="8" :lg="colSpan"
               v-if="webapps.length > 0">
          <simple-card :card="card" @click.native="emitPage(card)" v-if="showSimpleCard"></simple-card>
          <card :card="card" @click.native="emitPage(card)" v-else></card>
        </a-col>
        <a-col v-if="webapps.length == 0">Not Found</a-col>
      </a-row>
      <!-- <a-row class="paginator">
        <a-pagination showSizeChanger @showSizeChange="onShowSizeChange" :total="total" />
      </a-row> -->
    </a-row>
  </a-row>
</template>

<script>
import Card from '@/components/Card'
import SimpleCard from '@/components/SimpleCard'
import { getWebapps } from '@/api/manage'
import filter from 'lodash.filter'
import sortBy from 'lodash.sortby'
import uniq from 'lodash.uniq'
import flatten from 'lodash.flatten'
import map from 'lodash.map'
import { websiteName } from '@/utils/util'

export default {
  name: 'SearchPage',
  props: {},
  data() {
    return {
      total: 10,
      slogan: `PGx Webapps in the ${ websiteName } Platform`,
      placeholder: 'Search apps...',
      news: '<a href="http://datains.3steps.cn">Webapps for Precision Medicine</a>',
      webapps: [],
      showSimpleCard: false,
      colSpan: 8, // colSpan support 6 when showSimpleCard is true, and 8 when showSimpleCard is false.
      form: null,
      expand: false,
      fieldList: [
        {
          label: 'Private',
          name: 'private',
          options: [],
          mode: 'default'
        }, {
          label: 'Author',
          options: [],
          name: 'author',
          mode: 'default'
        }, {
          label: 'Version',
          options: [],
          name: 'version',
          mode: 'default'
        }, {
          label: 'Tags',
          options: [],
          name: 'tags',
          mode: 'tags'
        }
      ],
      selectedData: {},
      queryString: ''
    }
  },
  methods: {
    filterApp(key, value, data) {
      const type = typeof(value)
      if (value === undefined || value.length === 0) {
        return data
      } else {
        const filteredData = filter(data, function(o) {
          if (type === 'string') {
            // TODO: o[key] may be undefined
            return o[key].match(value)
          } else if (type === 'object') {
            // for tags filter
            const result = filter(o[key], function(i) {
              return value.includes(i)
            })

            if (result.length == 0) {
              return false
            } else {
              return true
            }
          }
        })
        return filteredData
      }
    },
    filterAll(callback) {
      getWebapps().then(res => {
        // Search
        const value = this.queryString
        this.total = res.total
        let webapps = filter(res.data, function(o) {
          return o.name.match(value) || o.title.match(value) || o.content.match(value)
        })

        // Select
        for (let [key, value] of Object.entries(this.selectedData)) {
          webapps = this.filterApp(key, value, webapps)
          console.log('filterApp', key, value, this.selectedData, webapps)
        }

        this.webapps = sortBy(webapps, function(o) { return o.name })
        this.total = this.webapps.length

        if (typeof(callback) === 'function') {
          callback(this.webapps)
        }
      })
    },
    onFormChange(values) {
      this.selectedData = this.form.fieldsStore.getAllValues()
      this.selectedData = Object.assign(this.selectedData, values)

      this.filterAll()
    },
    toggle() {
      this.expand = !this.expand
    },
    onSearch() {
      console.log("queryString", this.queryString)
      this.form.resetFields()
      // 每次搜索需要重置form
      this.selectedData = []
      this.filterAll(this.makeOptionList)
    },
    emitPage(card) {
      console.log('Emit Page', card)
      this.$emit('show-page', card)
    },
    onShowSizeChange(current, size) {

    },
    makeOptionList(webapps) {
      for (let field of this.fieldList) {
        const name = field.name
        field['options'] = uniq(flatten(map(webapps, name)))
      }
      console.log('makeOptionList', webapps, this.fieldList)
    }
  },
  components: { 
    Card,
    SimpleCard
  },
  computed: {
    count() {
      return this.expand ? 11 : 5
    }    
  },
  created() {
    this.form = this.$form.createForm(this, {
      name: 'global_state',
      onValuesChange: (_, values) => {
        console.log('Form changed: ', values)
        this.$emit('change', values)
      }
    })

    this.$on('change', this.onFormChange)
    // Init
    this.onSearch()
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/search-page.less';
</style>

<style lang="less">
.search-form {
  .ant-form-item {
    display: flex;
    padding: 10px 0px;
    margin-bottom: 0px;
  }

  .ant-form-item-control-wrapper {
    flex: 1;
  }

  .ant-form {
    max-width: none;
  }
}
</style>
