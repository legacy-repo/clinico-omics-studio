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
  domTitle: 'The ClinicoOmics Platform',
  // eslint-disable-next-line no-undef
  websiteLogo: require('@/assets/logo.png'),
  websiteName: 'ClinicoOmics',
  // websiteName: 'ClinicoOmics',
  websiteId: 'clinicoomics',
  noPermission: true,
  websiteDesc: 'The ClinicoOmics Platform for Clinico OMICS & BioMedGPS',
  defaultCollection: 'tcoa',
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
    },
    {
      key: 'tcoa',
      name: 'The Cancer Omics Atlas (TCOA)',
      description: 'Multi-omics Data for The Cancer Omics Atlas (TCOA).',
      tabs: [
        {
          title: 'Files',
          key: 'files',
          value: null
        },
        {
          title: 'Samples',
          key: 'samples',
          value: 'sample_id'
        },
        {
          title: 'Patients',
          key: 'patients',
          value: 'patient_id'
        }
      ]
    }
  ],
  feedbackEntrypoint: 'https://yuque.com/clinico-omics/topics',
  policyEntrypoint: 'https://yuque.com/clinico-omics/policies',
  helpEntrypoint: 'https://yuque.com/clinico-omics/help'
}

export function initBaseURL() {
  const apiService = 'http://service.3steps.cn'
  console.log(`BASE_API_URL: ${apiService}`)
  return apiService
}
