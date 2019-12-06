<template lang="html">
  <a-row class="search-page">
    <a-row class="search-container">
      <a-col :xs="20" :sm="20" :md="20" :lg="10">
        <a-row class="slogan">{{ slogan }}</a-row>
        <a-input-search placeholder="Search apps..." @search="onSearch"
                        enterButton size="large"/>
      </a-col>
    </a-row>
    <a-row class="show-window">
      <a-row class="show-window-header">
        <img class="logo" :src="require('../../assets/images/precision-medicine.png')" />
        <a-row class="news">
          <p class="slogan" v-html="news"></p>
        </a-row>
      </a-row>
      <a-row class="card-container" :gutter="30">
        <a-col v-for="(card, index) in webapps" :key="index" :xs="24" :sm="12" :md="8" :lg="8">
          <card :card="card"></card>
        </a-col>
      </a-row>
    </a-row>
  </a-row>
</template>

<script>
import Card from '@/components/Card'
import { getWebapps } from '@/api/manage'
import filter from 'lodash.filter'

export default {
  name: 'SearchPage',
  props: {},
  data() {
    return {
      queryString: '',
      slogan: 'PGx Webapps in Datains',
      placeholder: 'Search apps...',
      news: '<a href="http://www.nordata.cn">Webapps for Precision Medicine</a>',
      webapps: []
    }
  },
  methods: {
    onSearch(value) {
      getWebapps().then(res => {
        this.webapps = filter(res.data, function(o) {
          return o.name.match(value) || o.title.match(value) || o.content.match(value)
        })
      })
    }
  },
  components: { Card },
  computed: {},
  created() {
    this.onSearch()
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/search-page.less';
</style>
