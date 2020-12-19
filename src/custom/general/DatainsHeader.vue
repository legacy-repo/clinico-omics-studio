<template lang="html">
  <a-row class="header">
    <nav class="navbar">
      <a-col :xs="12" :sm="10" :md="8" :lg="6">
        <router-link :to="{ name: 'welcome' }" class="logo">
          <img :src="websiteLogo" />
          <span>{{ websiteName }}</span>
        </router-link>
      </a-col>
      <a-col :xs="12" :sm="14" :md="16" :lg="18" class="menu">
        <a-row class="pc-list" :gutter="16">
          <a-col v-for="item in menu" :key="item.title">
            <router-link :to="{ name: item.link }">
              {{ item.title }}
            </router-link>
          </a-col>
          <a-col>
            <a v-if="isAuthenticated" href @click.prevent="signOut">Sign out</a>
            <a v-else href @click.prevent="redirectLogin">Sign in</a>
          </a-col>
          <a-col>
            <app-store-icon class="action" theme="light"/>
          </a-col>
        </a-row>
      </a-col>
    </nav>
  </a-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppStoreIcon from '@/components/AppStoreIcon'
import { websiteLogo, websiteName } from '@/config/defaultSettings'

export default {
  name: 'DatainsHeader',
  props: {},
  data() {
    return {
      websiteLogo,
      websiteName,
      menu: [
        {
          title: 'Dashboard',
          link: 'index'
        }
      ],
      loginWindowActive: false
    }
  },
  methods: {
    ...mapActions(['Logout']),
    redirectLogin() {
      this.$router.push({ name: 'login' })
    },
    signOut() {
      this.$confirm({
        title: 'Notice',
        content: 'Really want to log out ?',
        onOk: () => {
          return this.Logout({})
            .then(() => {
              setTimeout(() => {
                window.location.reload()
              }, 16)
            })
            .catch(err => {
              this.$message.error({
                title: 'Error',
                description: err.message
              })
            })
        },
        onCancel() {}
      })
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    hasAccess: function() {
      return this.isAuthenticated || this.$route.meta.isPublic
    }
  },
  mounted() {},
  destroyed() {},
  components: {
    AppStoreIcon
  },
  activated() {},
  created: function() {}
}
</script>

<style scoped lang="less">
@import '../../assets/css/header.less';
</style>
