<template lang="html">
  <a-row class="search-page">
    <a-row class="search-container">
      <a-col :xs="20" :sm="20" :md="20" :lg="10">
        <a-row class="slogan">{{ slogan }}</a-row>
        <a-input-search placeholder="Search apps..." @search="onSearch" enterButton size="large" />
      </a-col>
    </a-row>
    <a-row class="show-window">
      <a-row class="show-window-header">
        <img class="logo" :src="require('../../assets/images/precision-medicine.png')" />
        <a-row class="news">
          <p class="slogan" v-html="news"></p>
        </a-row>
      </a-row>
      <a-row class="card-container" :gutter="20">
        <a-col v-for="(card, index) in webapps" :key="index"
               :xs="24" :sm="12" :md="8" :lg="colSpan">
          <simple-card :card="card" @click.native="emitPage(card)" v-if="showSimpleCard"></simple-card>
          <card :card="card" @click.native="emitPage(card)" v-else></card>
        </a-col>
      </a-row>
      <a-row class="paginator">
        <a-pagination showSizeChanger @showSizeChange="onShowSizeChange" :total="total" />
      </a-row>
    </a-row>
  </a-row>
</template>

<script>
import Card from '@/components/Card'
import SimpleCard from '@/components/SimpleCard'
import { getWebapps } from '@/api/manage'
import filter from 'lodash.filter'
import sortBy from 'lodash.sortby'

export default {
  name: 'SearchPage',
  props: {},
  data() {
    return {
      total: 10,
      slogan: 'PGx Webapps in ClinicoOmics',
      placeholder: 'Search apps...',
      news: '<a href="http://datains.3steps.cn">Webapps for Precision Medicine</a>',
      webapps: [],
      showSimpleCard: false,
      colSpan: 8 // colSpan support 6 when showSimpleCard is true, and 8 when showSimpleCard is false.
    }
  },
  methods: {
    onSearch(value) {
      getWebapps().then(res => {
        this.total = res.total
        const webapps = filter(res.data, function(o) {
          return o.name.match(value) || o.title.match(value) || o.content.match(value)
        })
        this.webapps = sortBy(webapps, function(o) { return o.name; });
      })
    },
    emitPage(card) {
      console.log('Emit Page', card)
      this.$emit('show-page', card)
    },
    onShowSizeChange() {

    }
  },
  components: { 
    Card,
    SimpleCard
  },
  computed: {},
  created() {
    this.onSearch()
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/search-page.less';
</style>
