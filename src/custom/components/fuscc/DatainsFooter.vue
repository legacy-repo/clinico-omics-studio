<template lang="html">
  <a-row class="footer">
    <a-row class="footer-wrapper">
      <a-col
        v-for="(itemObj, index) in footerContent"
        :key="index"
        :xs="24"
        :md="parseInt(itemObj.span)"
        :sm="parseInt(itemObj.span)"
        :lg="parseInt(itemObj.span)"
      >
        <a-row class="footer-list">
          <h2 class="footer-title">{{ itemObj.title }}</h2>
          <a-row v-for="(item, idx) in itemObj.contentList" :key="idx" class="footer-item">
            <a-row v-if="item.type == 'link'" class="item">
              <a :href="item.src" :target="item.target">{{ item.title }}</a>
            </a-row>
            <a-row v-if="item.type == 'image'" class="item">
              <a-row>
                <img :src="item.src" />
                <h2>{{ item.title }}</h2>
              </a-row>
            </a-row>
          </a-row>
        </a-row>
      </a-col>
    </a-row>
    <a-row class="navbar-text">
      <a-row>
        <img src="@/assets/logo.png" />
      </a-row>
      <a-row>
        <a-row>
          {{ website.name }}{{ website.copyright }} / {{ website.company_name }}
          <a href="http://www.miitbeian.gov.cn/" target="_blank">{{ website.icp_num }}</a>
        </a-row>
        <a-row>{{ website.address }}</a-row>
      </a-row>
    </a-row>
  </a-row>
</template>

<script>
export default {
  name: 'DatainsFooter',
  data () {
    return {
      website: {
        name: 'TGMC',
        href: 'https://fudan.edu.cn',
        product_name: 'ClinicoOmics Platform',
        company_name: 'Fudan University',
        copyright: '©2017-2019 ',
        icp_num: '苏ICP备17025715号-4',
        address: ''
      },
      footerContent: [
        {
          title: 'About',
          span: 4,
          contentList: [
            {
              title: 'About Us',
              src: 'https://pgx.fudan.edu.cn',
              type: 'link',
              target: '_blank'
            },
            {
              title: 'About Choppy',
              src: 'http://docs.3steps.cn',
              type: 'link',
              target: '_blank'
            },
            {
              title: 'Open Source',
              src: 'https://github.com/go-choppy',
              type: 'link',
              target: '_blank'
            },
            {
              title: 'ResearchGate',
              src: 'https://www.researchgate.net/lab/Leming-Shi-Lab?ec=headerMenu',
              type: 'link',
              target: '_blank'
            }
          ]
        },
        {
          title: 'Production',
          span: 5,
          contentList: [
            {
              title: 'Choppy Pipeline System',
              src: 'http://docs.choppy.com',
              type: 'link',
              target: '_blank'
            },
            {
              title: 'Fudan Data Portal',
              // src: 'http://data.3steps.cn',
              src: 'http://dataportal.prophetdb.org/cdataportal',  // Fudan Data Portal v3.6.14
              type: 'link',
              target: '_blank'
            }
          ]
        },
        {
          title: 'Cooperation',
          span: 5,
          contentList: [
            // {
            //   title: '苏州诺德拓生物科技有限公司',
            //   src: 'http://nordata.com.cn/',
            //   type: 'link',
            //   target: '_blank'
            // },
            // {
            //   title: '超存软件科技（苏州）有限公司',
            //   src: 'http://supersan.cn/',
            //   type: 'link',
            //   target: '_blank'
            // },
            {
              title: '复旦大学附属肿瘤医院',
              src: 'http://www.shca.org.cn/dazhong2',
              type: 'link',
              target: '_blank'
            },
            {
              title: '复旦大学附属中山医院',
              src: 'http://www.zs-hospital.sh.cn/',
              type: 'link',
              target: '_blank'
            },
            {
              title: '上海交通大学医学院附属瑞金医院',
              src: 'http://www.rjh.com.cn/',
              type: 'link',
              target: '_blank'
            }
          ]
        },
        {
          title: 'News',
          span: 10,
          contentList: [
            {
              title: '接连获批，医疗AI诊断决策支持的春天即将到来？',
              src: 'https://36kr.com/p/5127512.html',
              type: 'link',
              target: '_blank'
            },
            {
              title: '2018肿瘤趋势汇总，众多创新疗法展现，肿瘤药将迎来大爆发',
              src: 'http://vcbeat.net/OGRkMDQwZTk3ZTMzNDJiMmNkMWM1MjU2ZDA0OTFiNmU=',
              type: 'link',
              target: '_blank'
            },
            {
              title: '2017年全球肿瘤治疗趋势：肿瘤治疗越治越贵？',
              src: 'http://tech.sina.com.cn/d/f/2017-06-30/doc-ifyhrxtp6354099.shtml',
              type: 'link',
              target: '_blank'
            }
          ]
        }
      ]
    }
  },
  computed: {},
  created: function () {}
}
</script>

<style scoped lang="less">
@import '~@/assets/css/footer.less';
</style>
