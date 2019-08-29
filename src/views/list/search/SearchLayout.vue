<template>
  <div class="search-content">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'SearchLayout',
  data () {
    return {
      tabs: {
        items: [
          {
            key: '1',
            title: 'Projects'
          },
          {
            key: '2',
            title: 'Reports'
          },
          {
            key: '3',
            title: 'Applications'
          }
        ],
        active: () => {
          switch (this.$route.path) {
            case '/global/search/project':
              return '1'
            case '/global/search/report':
              return '2'
            case '/global/search/application':
              return '3'
            default:
              return '1'
          }
        },
        callback: (key) => {
          switch (key) {
            case '1':
              this.$router.push('/global/search/project')
              break
            case '2':
              this.$router.push('/global/search/report')
              break
            case '3':
              this.$router.push('/global/search/application')
              break
            default:
              this.$router.push('/workplace')
          }
        }
      },
      search: true
    }
  },
  computed: {

  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
  .search-head{
    background-color: #fff;
    margin: -25px -24px -24px;
    .search-input{
      text-align: center;
      margin-bottom: 16px;
    }
  }
  .search-content{
    margin-top: 10px;
  }
</style>
