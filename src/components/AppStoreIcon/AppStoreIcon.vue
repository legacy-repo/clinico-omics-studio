<template>
  <a-popover
    v-model="visible"
    trigger="click"
    placement="bottomRight"
    overlayClassName="header-app-panel-wrapper"
    :getPopupContainer="() => $refs.appIconRef.parentElement"
    :autoAdjustOverflow="true"
    :arrowPointAtCenter="true"
    :overlayStyle="{ width: '300px', top: '50px' }"
  >
    <template slot="content">
      <a-row class="app-store-block">
        <a-col v-for="app in appListConfig" :key="app.name" :span="12" class="app-item" @click="onShowApp(app.link)">
          <a-icon class="icon" :type="app.icon" />
          <div class="text">{{ app.name }}</div>
        </a-col>
      </a-row>
    </template>
    <span @click="showAppPanel" class="header-app-panel" ref="appIconRef">
      <app-store-icon class="custom-icon" :class="{light: theme === 'light'}" />
    </span>
  </a-popover>
</template>

<script>
import { appStoreIcon } from '@/core/icons'
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderAppStore',
  components: {
    appStoreIcon
  },
  props: {
    theme: {
      type: String,
      required: false,
      default: 'dark'
    }
  },
  data () {
    return {
      loadding: false,
      visible: false
    }
  },
  computed: {
    ...mapGetters(['appListConfig']),
  },
  methods: {
    showAppPanel () {
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
  .header-app-panel-wrapper {
    top: 60px !important;
  }
</style>

<style lang="less" scoped>
.header-app-panel{
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

  .light {
    color: #fff;
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
