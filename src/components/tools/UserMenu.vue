<template>
  <div class="user-wrapper">
    <div class="content-box">
      <a-tooltip placement="bottom">
        <template slot="title">
          <span>{{ $t('components.tools.userMenu.tour') }}</span>
        </template>
        <a @click="startTour">
          <span class="action">
            <a-icon type="compass"></a-icon>
          </span>
        </a>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template slot="title">
          <span>{{ $t('components.tools.userMenu.feedback') }}</span>
        </template>
        <a :href="feedbackEntrypoint" target="_blank">
          <span class="action">
            <a-icon type="message" />
          </span>
        </a>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template slot="title">
          <span>{{ $t('components.tools.userMenu.policies') }}</span>
        </template>
        <a :href="policyEntrypoint" target="_blank">
          <span class="action">
            <a-icon type="safety-certificate" />
          </span>
        </a>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template slot="title">
          <span>{{ $t('components.tools.userMenu.documentation') }}</span>
        </template>
        <a :href="helpEntrypoint" target="_blank">
          <span class="action">
            <a-icon type="question-circle-o"></a-icon>
          </span>
        </a>
      </a-tooltip>
      <notice-icon class="action" />
      <lang-select />
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" size="small" :src="avatar" />
          <span style="vertical-align: middle">{{ nickname }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="0">
            <router-link :to="{ name: 'center' }" disabled>
              <a-icon type="user" />
              <span>{{ $t('components.tools.userMenu.userCenter') }}</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1">
            <router-link :to="{ name: 'settings' }" disabled>
              <a-icon type="setting" />
              <span>{{ $t('components.tools.userMenu.settings') }}</span>
            </router-link>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="2">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout" />
              <span>{{ $t('components.tools.userMenu.logout') }}</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <app-store-icon class="action" />
    </div>
  </div>
</template>

<script>
import NoticeIcon from '@/components/NoticeIcon'
import AppStoreIcon from '@/components/AppStoreIcon'
import { mapActions, mapGetters } from 'vuex'
import LangSelect from '@/components/Tools/LangSelect'

export default {
  name: 'UserMenu',
  components: {
    LangSelect,
    NoticeIcon,
    AppStoreIcon
  },
  computed: {
    ...mapGetters(['nickname', 'avatar', 'feedbackEntrypoint', 'policyEntrypoint', 'helpEntrypoint'])
  },
  methods: {
    ...mapActions(['Logout']),
    startTour() {
      this.$store.dispatch(
        'ToggleTourMode',
        Math.random()
          .toString(36)
          .slice(-8)
      )
    },
    handleLogout() {
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
  }
}
</script>

<style lang="less" scoped>
.action {
  font-size: 16px;
  vertical-align: middle;
}
</style>
