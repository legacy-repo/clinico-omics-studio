<template lang="html">
  <a-row class="header">
    <nav class="navbar">
      <a-col :xs="12" :sm="10" :md="8" :lg="6">
        <a href="/home" class="logo">
          <img src="~@/assets/logo.svg" />
          <span>Datains for Precision Medicine</span>
        </a>
      </a-col>
      <a-col :xs="12" :sm="14" :md="16" :lg="18" class="menu">
        <a-row class="pc-list" :gutter="16">
          <a-col :lg="2" :md="3" :sm="4" :xs="6" v-for="item in menu" :key="item.title">
            <a :href="item.link">{{ item.title }}</a>
          </a-col>
        </a-row>
      </a-col>
    </nav>
  </a-row>
</template>

<script>
export default {
  name: 'DatainsHeader',
  props: {

  },
  data () {
    return {
      menu: [
        {
          title: 'Login',
          link: '/'
        }
      ]
    }
  },
  methods: {
    handleSelect: function () {}
  },
  computed: {

  },
  components: {},
  activated () {},
  created: function () {}
}
</script>

<style scoped lang="less">
@import '../../assets/css/header.less';
</style>
