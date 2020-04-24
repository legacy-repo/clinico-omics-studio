<template>
  <div class="user-wrapper">
    <div class="content-box">
      <a href="https://fudan-pgx.yuque.com/choppy-platform/clinico-omics" target="_blank">
        <span class="action">
          <a-icon type="question-circle-o"></a-icon>
        </span>
      </a>
      <notice-icon class="action"/>
      <lang-select />
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" size="small" :src="avatar"/>
          <span style="vertical-align: middle;">{{ nickname }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="0">
            <router-link :to="{ name: 'center' }">
              <a-icon type="user"/>
              <span>User Center</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1">
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting"/>
              <span>Settings</span>
            </router-link>
          </a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="2">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout"/>
              <span>Logout</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <app-store-icon class="action"/>
    </div>
  </div>
</template>

<script>
import NoticeIcon from '@/components/NoticeIcon'
import AppStoreIcon from '@/components/AppStoreIcon'
import { mapActions, mapGetters } from 'vuex'
import LangSelect from '@/components/tools/LangSelect'

export default {
  name: 'UserMenu',
  components: {
    LangSelect,
    NoticeIcon,
    AppStoreIcon
  },
  computed: {
    ...mapGetters(['nickname', 'avatar'])

  },
  methods: {
    ...mapActions(['Logout']),
    handleLogout () {
      this.$confirm({
        title: 'Notice',
        content: 'Really want to log out ?',
        onOk: () => {
          return this.Logout({}).then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 16)
          }).catch(err => {
            this.$message.error({
              title: 'Error',
              description: err.message
            })
          })
        },
        onCancel () {
        }
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
