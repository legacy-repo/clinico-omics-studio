<template>
  <div class="footer">
    <div class="links">
      <a v-for="link in links" :key="link.href" :href="link.href" target="_blank">
        <a-icon :type="link.logo" v-if="link.logo" />
        {{ link.name }}
      </a>
    </div>
    <div class="copyright">
      {{ $t('components.globalFooter.copyright') }}
      <a-icon type="copyright" />2015-{{ (new Date()).getFullYear() }}
      <span>{{ $t('components.globalFooter.companyName') }}</span>
    </div>
    <div class="links">
      |&nbsp;
      <span v-for="item in metadata" :key="item.name">
        <a :href="item.repo">{{ item.name + ' ' + item.version }}</a
        >&nbsp;|&nbsp;
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalFooter',
  props: {
    metadata: {
      type: Array,
      required: true
    },
    links: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.footer {
  padding: 0 16px;
  margin: 10px 0;
  text-align: center;

  .links {
    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }

  .copyright {
    margin: 5px 0px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
