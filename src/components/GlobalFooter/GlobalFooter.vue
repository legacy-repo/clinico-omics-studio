<template>
  <div class="footer">
    <div class="links">
      <a href="https://www.3steps.cn" target="_blank">智汇医圈联盟</a>
      <a href="https://github.com/clinico-omics" target="_blank">
        <a-icon type="github" />
      </a>
      <a href="http://choppy.3steps.cn/">Choppy Platform</a>
    </div>
    <div class="copyright">
      Copyright
      <a-icon type="copyright" />2019
      <span>The Genius Medicine Consortium</span>
    </div>
    <div class="links">
      |&nbsp;
      <span v-for="item in metadata" :key="item.name">
        <a :href="item.repo">{{ item.name + ' ' + item.version }}</a>&nbsp;|&nbsp;
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalFooter',
  data() {
    return {
      metadata: [
        {
          name: 'tservice',
          version: 'v0.1.5-7c499b4c',
          repo: 'https://github.com/clinico-omics/tservice'
        },
        {
          name: 'tservice-plugins',
          version: 'v0.1.3-fa831e22',
          repo: 'https://github.com/clinico-omics/tservice-plugins'
        },
        {
          name: 'datains',
          version: 'v0.3.0-e530fc42',
          repo: 'https://github.com/clinico-omics/datains'
        },
        {
          name: 'dataseq-core',
          version: 'v0.2.1-302a6dc8',
          repo: 'https://github.com/clinico-omics/dataseq-core'
        }
      ]
    }
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
