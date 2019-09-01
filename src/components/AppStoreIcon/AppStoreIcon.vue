<template>
  <a-popover
    v-model="visible"
    trigger="click"
    placement="bottomRight"
    overlayClassName="header-notice-wrapper"
    :getPopupContainer="() => $refs.noticeRef.parentElement"
    :autoAdjustOverflow="true"
    :arrowPointAtCenter="true"
    :overlayStyle="{ width: '300px', top: '50px' }"
  >
    <template slot="content">
      <a-row class="app-store-block">
        <a-col v-for="app in apps" :key="app.name" :span="12" class="app-item" @click="onShowApp(app.link)">
          <a-icon class="icon" :type="app.icon" />
          <div class="text">{{ app.name }}</div>
        </a-col>
      </a-row>
    </template>
    <span @click="fetchNotice" class="header-notice" ref="noticeRef">
      <app-store-icon class="custom-icon" />
    </span>
  </a-popover>
</template>

<script>
import { appStoreIcon } from '@/core/icons'

export default {
  name: 'HeaderAppStore',
  components: {
    appStoreIcon
  },
  data () {
    return {
      loadding: false,
      visible: false,
      apps: [
        {
          name: 'TGMC Home',
          icon: 'home',
          link: 'https://www.3steps.cn'
        },
        {
          name: 'Data Portal',
          icon: 'file-search',
          link: 'http://data.3steps.cn'
        },
        {
          name: 'Fast File Transfer',
          icon: 'thunderbolt',
          link: 'http://docs.3steps.cn/docs/datains/datains-intro.html#ossutil'
        }, {
          name: 'Datains Browser',
          icon: 'global',
          link: 'http://docs.3steps.cn/docs/datains/datains-intro.html#%E4%B8%8B%E8%BD%BD%E5%B9%B6%E5%AE%89%E8%A3%85-datains-browser'
        }, {
          name: 'Datains API',
          icon: 'api',
          link: ''
        }
      ]
    }
  },
  methods: {
    fetchNotice () {
      if (!this.visible) {
        this.loadding = true
        setTimeout(() => {
          this.loadding = false
        }, 2000)
      } else {
        this.loadding = false
      }
      this.visible = !this.visible
    },
    onShowApp (link) {
      if (link.match(/http/g)) {
        window.open(link, '_blank')
      } else {
        this.$router.push({
          name: link
        })
      }
    }
  }
}
</script>

<style lang="css">
  .header-notice-wrapper {
    top: 60px !important;
  }
</style>

<style lang="less" scoped>
.header-notice{
  display: inline-block;
  transition: all 0.3s;

  span {
    vertical-align: initial;
  }

  .custom-icon {
    font-size: 16px;
    padding: 4px;
    width: 36px;
    height: 36px;
    vertical-align: middle;
  }
}

.app-store-block {
  cursor: pointer;

  .app-item {
    text-align: center;
    margin-top: 10px;
    padding: 10px 0px;

    .icon {
      font-size: 26px;
      padding: 4px;
    }

    .text {
      font-size: 1em;
    }
  }
}

.app-item:hover {
  background-color: rgb(237, 237, 237);
}
</style>
