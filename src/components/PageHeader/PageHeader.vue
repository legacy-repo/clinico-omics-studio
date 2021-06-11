<template>
  <div class="page-header" :class="{ 'drawer-mode': drawerMode }">
    <Animated enter="slideInDown" leave="slideOutUp">
      <div class="page-header-index-wide" v-show="activeHeader">
        <s-breadcrumb />
        <div class="detail">
          <div class="main" v-if="!$route.meta.hiddenHeaderContent">
            <div class="row">
              <img v-if="logo" :src="logo" class="logo"/>
              <h1 v-if="title" class="title">{{ title }}</h1>
              <div class="action">
                <slot name="action"></slot>
              </div>
            </div>
            <div class="row">
              <div v-if="avatar" class="avatar">
                <a-avatar :src="avatar" />
              </div>
              <div v-if="this.$slots.content" class="headerContent">
                <slot name="content"></slot>
              </div>
              <div v-if="this.$slots.extra" class="extra">
                <slot name="extra"></slot>
              </div>
            </div>
            <div>
              <slot name="pageMenu"></slot>
            </div>
          </div>
        </div>
      </div>
    </Animated>
    <div class="on-off-btn" v-if="drawerMode" @click="switchHeader()" :class="{ 'drawer-mode-btn': !activeHeader }">
      <a-tooltip placement="bottom">
        <template slot="title">
          <span>Click me and show more details.</span>
        </template>
        <a-icon theme="filled" type="up-circle" v-show="activeHeader"/>
        <a-icon theme="filled" type="down-circle" v-show="!activeHeader"/>
      </a-tooltip>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Tools/Breadcrumb'

export default {
  name: 'PageHeader',
  components: {
    's-breadcrumb': Breadcrumb
  },
  props: {
    title: {
      type: [String, Boolean],
      default: true,
      required: false
    },
    logo: {
      type: String,
      default: '',
      required: false
    },
    avatar: {
      type: String,
      default: '',
      required: false
    },
    drawerMode: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  methods: {
    switchHeader () {
      this.activeHeader = !this.activeHeader
    }
  },
  data () {
    return {
      activeHeader: !this.drawerMode
    }
  }
}
</script>

<style lang="less" scoped>
.drawer-mode {
  position: absolute;
  z-index: 10;
}

.page-header {
  width: 100%;

  .page-header-index-wide {
    border-bottom: 1px solid #e8e8e8;
    background: #fff;
    padding: 10px 32px 0;
  }

  .on-off-btn {
    cursor: pointer;
    text-align: center;
    margin-bottom: -15px;
    position: relative;
    top: -10px;

    .anticon {
      font-size: 20px;
    }
  }

  .drawer-mode-btn {
    height: 0px;
    margin: 0px 49vw;
    // Hide
    margin-bottom: 5px;
    top: 5px;
  }

  .breadcrumb {
    margin-bottom: 16px;
  }

  .detail {
    display: flex;
    /*margin-bottom: 16px;*/

    .avatar {
      flex: 0 1 72px;
      margin: 0 24px 8px 0;

      & > span {
        border-radius: 72px;
        display: block;
        width: 72px;
        height: 72px;
      }
    }

    .main {
      width: 100%;
      flex: 0 1 auto;

      .row {
        display: flex;
        width: 100%;

        .avatar {
          margin-bottom: 16px;
        }
      }

      .title {
        font-size: 20px;
        font-weight: 500;

        font-size: 20px;
        line-height: 28px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 16px;
        flex: auto;
      }
      .logo {
        width: 28px;
        height: 28px;
        border-radius: 4px;
        margin-right: 16px;
      }
      .content,
      .headerContent {
        flex: auto;
        color: rgba(0, 0, 0, 0.45);
        line-height: 22px;

        .link {
          margin-top: 16px;
          margin-bottom: 16px;
          line-height: 24px;

          a {
            font-size: 14px;
            margin-right: 32px;
          }
        }
      }
      .extra {
        flex: 0 1 auto;
        margin-left: 10px;
        min-width: 360px;
        text-align: right;
      }
      .action {
        margin-left: 56px;
        min-width: 266px;
        flex: 0 1 auto;
        text-align: right;
        &:empty {
          display: none;
        }
      }
    }
  }
}

.mobile .page-header {
  .main {
    .row {
      flex-wrap: wrap;

      .avatar {
        flex: 0 1 25%;
        margin: 0 2% 8px 0;
      }

      .content,
      .headerContent {
        flex: 0 1 100%;

        .link {
          margin-top: 16px;
          line-height: 24px;

          a {
            font-size: 14px;
            margin-right: 10px;
          }
        }
      }

      .extra {
        flex: 1 1 auto;
        margin-left: 0;
        min-width: 0;
        text-align: right;
      }

      .action {
        margin-left: unset;
        min-width: 266px;
        flex: 0 1 auto;
        text-align: left;
        margin-bottom: 12px;

        &:empty {
          display: none;
        }
      }
    }
  }
}
</style>
