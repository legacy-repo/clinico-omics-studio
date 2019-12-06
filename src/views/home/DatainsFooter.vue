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
        <img src="~@/assets/logo.svg" />
      </a-row>
      <a-row>
        <a-row>
          {{ website.name }}{{ website.copyright }}/{{ website.company_name }}
          <a href="http://www.miitbeian.gov.cn/" target="_blank">{{ website.icp_num }}</a>
        </a-row>
        <a-row>Address: {{ website.address }}</a-row>
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
        name: '智汇医圈',
        href: 'http://www.nordata.cn',
        product_name: '智汇医圈-ClideSys决策支持系统',
        company_name: '苏州诺德拓生物科技有限公司',
        copyright: '©2017-2018 ',
        icp_num: '苏ICP备17025715号-4',
        address: '上海市杨浦区四平路2158号1305室（地铁五角场3号口）'
      },
      footerContent: [
        {
          title: 'Wechat/Website',
          span: 3,
          contentList: [
            {
              title: '智汇医圈Plus',
              src: require('@/assets/images/genius-community-plus.png'),
              type: 'image'
            },
            {
              title: '智汇医圈训练营',
              src: require('@/assets/images/duanshu.png'),
              type: 'image'
            }
          ]
        },
        {
          title: '临床决策服务',
          span: 5,
          contentList: [
            {
              title: 'ClideSys临床决策支持系统',
              src: '',
              type: 'link',
              target: ''
            },
            {
              title: 'Swarm®肿瘤大数据分析平台',
              src: 'https://iwmtw.duanshu.com/2ejd7567dedb9480b1/#/',
              type: 'link',
              target: ''
            },
            {
              title: '肿瘤药物查询系统',
              src: 'https://nordata.com.cn/journal/index.html#/journals',
              type: 'link',
              target: ''
            }
          ]
        },
        {
          title: '临床助手服务',
          span: 4,
          contentList: [
            {
              title: '智汇医圈训练营',
              src: 'https://iwmtw.duanshu.com/2ejd7567dedb9480b1/#/',
              type: 'link',
              target: '_blank'
            },
            {
              title: '期刊/影响因子查询系统',
              src: 'https://nordata.com.cn/journal/index.html#/journals',
              type: 'link',
              target: '_blank'
            },
            {
              title: '临床科研服务',
              src: 'https://genius-community-frontend.oss-cn-shanghai.aliyuncs.com/%E5%AE%A3%E4%BC%A0%E5%86%8C.pdf',
              type: 'link',
              target: '_blank'
            }
          ]
        },
        {
          title: '合作单位/企业',
          span: 5,
          contentList: [
            {
              title: '苏州诺德拓生物科技有限公司',
              src: 'http://nordata.com.cn/',
              type: 'link',
              target: '_blank'
            },
            {
              title: '超存软件科技（苏州）有限公司',
              src: 'http://supersan.cn/',
              type: 'link',
              target: '_blank'
            },
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
          title: '新闻报道',
          span: 7,
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
@import '../../assets/css/footer.less';
</style>
