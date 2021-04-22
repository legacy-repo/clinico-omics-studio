/**
 * 项目默认配置项
 * primaryColor - 默认主题色, 如果修改颜色不生效，请清理 localStorage
 * navTheme - sidebar theme ['dark', 'light'] 两种主题
 * colorWeak - 色盲模式
 * layout - 整体布局方式 ['sidemenu', 'topmenu'] 两种布局
 * fixedHeader - 固定 Header : boolean
 * fixSiderbar - 固定左侧菜单栏 ： boolean
 * autoHideHeader - 向下滚动时，隐藏 Header : boolean
 * contentWidth - 内容区布局： 流式 |  固定
 *
 * storageOptions: {} - Vue-ls 插件配置项 (localStorage/sessionStorage)
 *
 */
export const projectSettings = {
  primaryColor: '#2F54EB', // primary color of ant design
  navTheme: 'light', // theme for nav menu
  layout: 'topmenu', // nav menu position: sidemenu or topmenu
  contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
  hiddenHeader: false, // Hide header
  fixedHeader: true, // sticky header
  fixSiderbar: false, // sticky siderbar
  autoHideHeader: true, //  auto hide header
  colorWeak: false,
  multiTab: false,
  // eslint-disable-next-line
  production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true',
  // vue-ls options
  storageOptions: {
    namespace: 'pro__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local' // storage name session, local, memory
  },
  initialComponentSettings: {
    disabledContextMenu: 'true',
    disabledExploratory: 'true',
    dashboardName: 'QuartetDashboard'
  },
  domTitle: 'Quartet Data Portal', // The ClinicoOmics Platform
  // eslint-disable-next-line no-undef
  websiteLogo: require('@/assets/logo.png'),
  websiteName: 'QUARTET', // ClinicoOmics
  websiteId: 'quartet', // clinicoomics
  noPermission: true, // false
  websiteDesc: 'The Quartet Project for the Quality Control of Omics Data', // The ClinicoOmics Platform for Clinico OMICS & BioMedGPS
  defaultCollection: 'quartet',
  collections: [
    {
      key: 'quartet',
      name: 'Chinese Quartet & Sample ABCD',
      description: 'The Quartet Project for Quality Control of Multi-omics Profiling',
      tabs: [
        {
          title: 'Files',
          key: 'files',
          value: null
        },
        {
          title: 'Libraries',
          key: 'libraries',
          value: 'library_id'
        },
        {
          title: 'Donor',
          key: 'donor',
          value: 'donor_id'
        }
      ]
    }
  ],
  feedbackEntrypoint: 'https://yuque.com/quartet/topics?language=en-us',
  policyEntrypoint: 'https://yuque.com/quartet/policies?language=en-us',
  helpEntrypoint: 'https://yuque.com/quartet/help?language=en-us',
  clientId: 'clinico-omics',
  clientSecret: '97a7d2e8-94f4-48a7-aa90-c8ed206b89df',
  appListConfig: [
    {
      name: 'Home',
      icon: 'home',
      link: 'http://chinese-quartet.org'
    },
    {
      name: 'Fast File Transfer',
      icon: 'thunderbolt',
      link: 'http://docs.3steps.cn/docs/datains/datains-intro.html#ossutil'
    }, {
      name: 'File Browser',
      icon: 'global',
      link: 'http://docs.3steps.cn/docs/datains/datains-intro.html#%E4%B8%8B%E8%BD%BD%E5%B9%B6%E5%AE%89%E8%A3%85-datains-browser'
    }, {
      name: 'API Management',
      icon: 'api',
      link: 'http://yapi.3steps.cn/'
    }, {
      name: 'Documentation',
      icon: 'file-markdown',
      link: 'https://yuque.com/quartet/help'
    }
  ],
  footerConfig: {
    metadata: [
      {
        name: 'tservice',
        version: 'v0.1.7-b09dbb47',
        repo: 'https://github.com/clinico-omics/tservice'
      },
      {
        name: 'tservice-plugins',
        version: 'v0.1.4-1de22b3d',
        repo: 'https://github.com/clinico-omics/tservice-plugins'
      },
      {
        name: 'datains',
        version: 'v0.3.3-a48d05cb',
        repo: 'https://github.com/clinico-omics/datains'
      },
      {
        name: 'dataseq-core',
        version: 'v0.2.2-b2192d1d',
        repo: 'https://github.com/clinico-omics/dataseq-core'
      }
    ],
    links: [
      {
        href: 'https://www.3steps.cn',
        name: '智汇医圈联盟',
        target: '_blank'
      },
      {
        href: 'https://github.com/clinico-omics',
        target: '_blank',
        logo: 'github'
      },
      {
        href: 'http://choppy.3steps.cn/',
        target: '_blank',
        name: 'Choppy Platform'
      }
    ]
  }
}

export function initBaseURL() {
  // const apiService = 'http://quartet-backend.3steps.cn'
  const apiService = 'http://47.103.58.251'
  console.log(`BASE_API_URL: ${apiService}`)
  return apiService
}

export function getDnaHost() {
  return `${initBaseURL()}:8080/quartet-dna-vis/`
}

export function getRnaHost() {
  return `${initBaseURL()}:8080/quartet-rna-vis/`
}

export function getMetabolismHost() {
  return `${initBaseURL()}:8080/quartet-metabolism-vis/`
}

export function getProteinHost() {
  return `${initBaseURL()}:8080/quartet-protein-vis/`
}
