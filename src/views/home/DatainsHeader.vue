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
          <a-col v-for="item in menu" :key="item.title">
            <a :href="item.link">{{ item.title }}</a>
          </a-col>
          <a-col>
            <a v-if="oidcIsAuthenticated" href @click.prevent="signOut">Sign out</a>
            <a v-else href @click.prevent="authenticateOidcPopup">Sign in</a>
          </a-col>
        </a-row>
      </a-col>
    </nav>
  </a-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'DatainsHeader',
  props: {

  },
  data () {
    return {
      menu: [
        {
          title: 'Dashboard',
          link: '/dashboard/workplace'
        }
      ]
    }
  },
  methods: {
    handleSelect: function () {},
    ...mapActions('oidcStore', [
      'authenticateOidcPopup',
      'removeOidcUser'
    ]),
    userLoaded: function (e) {
      console.log('I am listening to the user loaded event in vuex-oidc', e.detail)
    },
    oidcError: function (e) {
      console.log('I am listening to the oidc error event in vuex-oidc', e.detail)
    },
    signOut: function () {
      this.removeOidcUser().then(() => {
        this.$router.push('/welcome')
      })
    }
  },
  computed: {
    ...mapGetters('oidcStore', [
      'oidcIsAuthenticated'
    ]),
    hasAccess: function () {
      return this.oidcIsAuthenticated || this.$route.meta.isPublic
    }
  },
  mounted () {
    window.addEventListener('vuexoidc:userLoaded', this.userLoaded)
    window.addEventListener('vuexoidc:oidcError', this.oidcError)
  },
  destroyed () {
    window.removeEventListener('vuexoidc:userLoaded', this.userLoaded)
    window.removeEventListener('vuexoidc:oidcError', this.oidcError)
  },
  components: {},
  activated () {},
  created: function () {

  }
}
</script>

<style scoped lang="less">
@import '../../assets/css/header.less';
</style>
