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
  tourMode: false,
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
    disabledExploratory: 'false',
    dashboardName: 'QuartetDashboard'
  },
  domTitle: 'The ClinicoOmics Platform',
  // eslint-disable-next-line no-undef
  websiteLogo: require('@/assets/logo.png'),
  websiteName: 'ClinicoOmics',
  // websiteName: 'ClinicoOmics',
  websiteId: 'clinicoomics',
  noPermission: false,
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
  helpEntrypoint: 'https://yuque.com/clinico-omics/help',
  clientId: 'clinico-omics',
  clientSecret: '97a7d2e8-94f4-48a7-aa90-c8ed206b89df',
  appListConfig: [
    {
      name: 'Fast File Transfer',
      icon: 'thunderbolt',
      link: 'http://docs.3steps.cn/docs/datains/datains-intro.html#ossutil'
    },
    {
      name: 'File Browser',
      icon: 'global',
      link:
        'http://docs.3steps.cn/docs/datains/datains-intro.html#%E4%B8%8B%E8%BD%BD%E5%B9%B6%E5%AE%89%E8%A3%85-datains-browser'
    },
    {
      name: 'API Management',
      icon: 'api',
      link: 'http://yapi.3steps.cn/'
    },
    {
      name: 'Documentation',
      icon: 'file-markdown',
      link: 'https://yuque.com/clinico-omics/help'
    }
  ],
  localTools: [
    {
      title: 'PreQC Pack for FASTQ File',
      shortName: 'preqc-pack-meta',
      version: 'v0.1.0',
      home: 'https://github.com/clinico-omics/datains-frontend',
      hidden: false,
      author: 'Jingcheng Yang',
      description: 'Computing QC Metrics for FASTQ File',
      icons: [
        {
          sizes: '192x192',
          src: '',
          type: 'image/png'
        }
      ],
      category: 'Tool',
      source: 'PGx'
    },
    {
      title: 'Pathology AI Model',
      shortName: 'pathology-ai-model',
      version: 'v0.1.0',
      home: 'https://github.com/clinico-omics/datains-frontend',
      hidden: true,
      author: 'FUSCC',
      description: 'AI models for pathology images.',
      icons: [
        {
          sizes: '192x192',
          src: '',
          type: 'image/png'
        }
      ],
      category: 'Tool',
      source: 'FUSCC'
    },
    {
      title: 'Personal Genome Interpreter',
      shortName: 'pgi',
      version: 'v0.1.0',
      home: 'https://github.com/clinico-omics/pgi',
      hidden: true,
      author: 'Fudan PGx',
      description:
        'Personal Genome Interpreter (PGI) is designed to support the identification of tumor alterations that drive the disease and detect those that may be therapeutically actionable. PGI relies on existing knowledge collected from several resources and on computational methods that annotate the alterations in a tumor according to distinct levels of evidence.',
      icons: [
        {
          sizes: '192x192',
          src: '',
          type: 'image/png'
        }
      ],
      category: 'Tool',
      source: 'FUSCC'
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
  },
  tourSteps: {
    appstore: [
      {
        attachTo: { element: '[data-v-step="workflow"]', on: 'bottom' },
        title: 'Click the workflow button',
        text: 'Test',
        id: 'workflow',
        popperOptions: {
          modifiers: [{ name: 'offset', options: { offset: [0, 12] } }]
        },
        nextRouteName: 'appstore'
      },
      {
        attachTo: { element: '[data-v-step="appstore-filter-panel-search"]', on: 'right' },
        title: 'Select an App',
        text: 'Test',
        id: 'appstore',
        popperOptions: {
          modifiers: [{ name: 'offset', options: { offset: [0, 12] } }]
        }
      },
      {
        attachTo: { element: '.filter-panel .right .ant-card .anticon-eye', on: 'bottom' },
        title: 'Run an app',
        text: 'Test',
        id: 'appstore-selector',
        popperOptions: {
          modifiers: [{ name: 'offset', options: { offset: [0, 12] } }]
        }
      }
    ]
  }
}

export function initBaseURL() {
  // const apiService = 'http://service.3steps.cn'
  const apiService = 'http://47.101.207.113'
  console.log(`BASE_API_URL: ${apiService}`)
  return apiService
}
