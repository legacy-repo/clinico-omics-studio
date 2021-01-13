// eslint-disable-next-line
import { BasicLayout, RouteView, UserLayout } from '@/layouts'
import { getDnaHost, getRnaHost, initComponentSettings } from '@/config/defaultSettings'

const componentSettings = initComponentSettings()

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'Home' },
    redirect: '/dashboard',
    children: [
      // Dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        hidden: false,
        component: () => import('@/views/dashboard/Workplace'),
        meta: { title: 'Dashboard', icon: 'dashboard', permission: ['dashboard'], keepAlive: true }
      },

      // Data (Level 0 - 4)
      {
        path: '/data',
        name: 'data',
        hidden: false,
        redirect: '/data/omics-data-commons',
        component: RouteView,
        meta: { title: 'Data', icon: 'deployment-unit', keepAlive: true },
        children: [
          {
            path: '/data/data-model',
            name: 'metadata-definition',
            hidden: false,
            meta: { title: 'Metadata Definition', icon: 'info-circle', disabled: false },
            children: [
              {
                path: '/data/data-model/gdc',
                name: 'genomics-data-commons',
                hidden: false,
                redirect: {
                  name: 'embeded-frame',
                  query: {
                    src: `http://${window.location.host}/data-model/?project=gdc`
                  }
                },
                meta: { title: 'Genomics Data Commons', icon: 'dot-chart', keepAlive: true }
              },
              {
                path: '/data/data-model/quartet',
                name: 'chinese-quartet',
                hidden: false,
                redirect: {
                  name: 'embeded-frame',
                  query: {
                    src: `http://${window.location.host}/data-model/?project=chinese-quartet`
                  }
                },
                meta: { title: 'Chinese Quartet', icon: 'border-inner', keepAlive: true }
              },
              {
                path: '/data/data-model/omics-data-commons',
                name: 'Omics Data Commons',
                hidden: false,
                redirect: {
                  name: 'embeded-frame',
                  query: {
                    src: `http://${window.location.host}/data-model/?project=omics-data-commons`
                  }
                },
                meta: { title: 'Omics Data Commons', icon: 'retweet', keepAlive: true }
              },
              {
                path: '/data/data-model/chiglitazar',
                name: 'Chiglitazar',
                hidden: false,
                redirect: {
                  name: 'embeded-frame',
                  query: {
                    src: `http://${window.location.host}/data-model/?project=chiglitazar`
                  }
                },
                meta: { title: 'Chiglitazar', icon: 'play-circle', keepAlive: true }
              }
            ]
          },
          {
            path: '/data/git-management',
            name: 'git-management',
            hidden: false,
            component: () => import('@/views/git/GitList'),
            meta: { title: 'Metadata Collaboration', icon: 'history', permission: ['table'], keepAlive: true }
          },
          {
            path: 'http://metabase.3steps.cn',
            name: 'metadata-quality-review',
            hidden: false,
            meta: { title: 'Metadata Quality Review', icon: 'codepen-circle', target: '_blank' }
          },
          {
            path: '/data/omics-data-commons',
            name: 'omics-data-commons',
            hidden: false,
            component: () => import('@/views/datasource/FilterPanel'),
            meta: { title: 'Omics Data Commons', icon: 'dashboard', permission: ['dashboard'], keepAlive: true }
          },
          // Data Record
          {
            path: '/data/record-viewer',
            name: 'record-viewer',
            hidden: true,
            component: () => import('@/views/datasource/Record'),
            props: route => ({
              recordId: route.query.recordId,
              project: route.query.project
            }),
            meta: { title: 'Record Viewer', icon: 'dribbble', keepAlive: false }
          },
          {
            path: '/data/data-portal',
            name: 'portal',
            hidden: false,
            component: () => import('@/views/iframe/DataPortal'),
            meta: { title: 'Omics Data Portal', icon: 'file-search', keepAlive: true }
          },
          // Exploratory
          {
            path: '/data/exploratory',
            name: 'exploratory',
            hidden: componentSettings.disabledExploratory == 'true',
            component: () => import('@/views/exploratory/ChartStudio'),
            meta: { title: 'Data Exploratory', icon: 'dribbble', keepAlive: true }
          }
        ]
      },

      // SeqFlow
      {
        path: '/seq-flow',
        name: 'seq-flow',
        component: RouteView,
        redirect: '/seq-flow/submit',
        meta: { title: 'Workflow', icon: 'project', permission: ['table'], keepAlive: true },
        children: [
          {
            path: '/seq-flow/workplace',
            name: 'workplace',
            hidden: true,
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: 'Workplace', icon: 'dashboard', permission: ['dashboard'], keepAlive: true }
          },
          {
            path: '/seq-flow/app-store',
            name: 'appstore',
            hidden: false,
            component: () => import('@/views/appstore/FilterPanel'),
            meta: { title: 'Apps & Tools', icon: 'appstore', permission: ['table'], keepAlive: true }
          },
          {
            path: '/seq-flow/file-manager',
            name: 'file-manager',
            hidden: false,
            component: () => import('@/views/filemanager/FileBrowser'),
            props: route => ({
              path: route.query.path,
              enabledContextMenu: componentSettings.disabledContextMenu !== 'true'
            }),
            meta: { title: 'File Management', icon: 'codepen-circle', keepAlive: true }
          },
          {
            path: '/seq-flow/submit/:pageNo([1-9]\\d*)?',
            name: 'create-project',
            hidden: true,
            props: route => ({ appId: route.query.appId }),
            component: () => import('@/views/workflow/stepForm/StepForm'),
            meta: { title: 'Create Project', icon: 'file-add', permission: ['table'], keepAlive: false }
          },
          {
            path: '/seq-flow/job-management/:projectId',
            name: 'job-management',
            hidden: true,
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/workflow/WorkflowManagement'),
            meta: {
              title: 'Job Management',
              icon: 'file-sync',
              drawerMode: false,
              keepAlive: true,
              permission: ['table']
            }
          },
          {
            path: '/seq-flow/project-management',
            name: 'project-management',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/workflow/ProjectManagement'),
            meta: { title: 'Project Management', icon: 'solution', permission: ['table'], keepAlive: true }
          }
        ]
      },

      // Report
      {
        path: '/report',
        name: 'report',
        component: RouteView,
        redirect: '/report/report-management',
        meta: { title: 'Report', icon: 'dot-chart', keepAlive: true },
        children: [
          {
            path: '/report/report-management',
            name: 'report-management',
            hidden: false,
            props: route => ({ creationMode: route.query.creationMode, reportTool: route.query.reportTool }),
            component: () => import('@/views/report/ReportManagement'),
            meta: { title: 'Report Management', icon: 'file-done', permission: ['table'], keepAlive: true }
          }
        ]
      },

      // Embeded Frame
      {
        path: '/embeded-frame',
        name: 'embeded-frame',
        hidden: true,
        component: () => import('@/components/FullFrame'),
        props: route => ({ src: route.query.src }),
        meta: { title: 'Embeded Frame', icon: 'dot-chart', keepAlive: false }
      },

      // Account
      {
        path: '/account',
        hidden: true,
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: 'User', icon: 'user', keepAlive: false, permission: ['user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: 'User Center', keepAlive: false, permission: ['user'] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: 'Profiles', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/service',
                name: 'service-settings',
                component: () => import('@/views/account/settings/ServiceSetting'),
                meta: { title: 'Service Setting', hidden: true, permission: ['user'] }
              },
              {
                path: '/account/settings/base',
                name: 'base-settings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: 'Basic Profiles', hidden: true, permission: ['user'] }
              },
              {
                path: '/account/settings/security',
                name: 'security-settings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: 'Secure Profiles', hidden: true, keepAlive: false, permission: ['user'] }
              },
              {
                path: '/account/settings/custom',
                name: 'custom-settings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: 'Customization', hidden: true, keepAlive: false, permission: ['user'] }
              },
              {
                path: '/account/settings/binding',
                name: 'binding-settings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: 'Binding Settings', hidden: true, keepAlive: false, permission: ['user'] }
              },
              {
                path: '/account/settings/notification',
                name: 'notification-settings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: 'Notifications', hidden: true, keepAlive: false, permission: ['user'] }
              }
            ]
          }
        ]
      },

      // Documentation
      {
        path: '/documentation',
        name: 'documentation',
        hidden: true,
        component: RouteView,
        meta: { title: 'Docs', keepAlive: false, icon: 'question-circle', permission: ['dashboard'] },
        children: [
          {
            path: 'http://docs.3steps.cn',
            name: 'official-documentation',
            meta: { title: 'Basic Docs', target: '_blank' }
          },
          {
            path: 'https://tgmc.yuque.com',
            name: 'yuque',
            meta: { title: 'Advanced Docs', target: '_blank' }
          }
        ]
      },

      // Subcomponent - App Store
      {
        path: '/tool',
        name: 'tool',
        hidden: true,
        component: RouteView,
        meta: { title: 'Tool', keepAlive: true, icon: 'folder', permission: ['table'] },
        children: [
          {
            path: '/tool/xps2pdf',
            name: 'xps2pdf',
            hidden: true,
            component: () => import('@/views/tools/XPS2PDF'),
            meta: { title: 'XPS2PDF', keepAlive: true }
          },
          {
            path: '/tool/sigma',
            name: 'sigma',
            hidden: true,
            component: () => import('@/views/tools/SigMA'),
            meta: { title: 'SigMA', keepAlive: true }
          },
          {
            path: '/tool/igv',
            name: 'igv',
            hidden: true,
            component: () => import('@/components/GenomeViewer'),
            props: route => ({
              sampleName: route.query.sampleName,
              vcfUrl: route.query.vcfUrl,
              vcfIndexUrl: route.query.vcfIndexUrl,
              bamUrl: route.query.bamUrl,
              bamIndexUrl: route.query.bamIndexUrl,
              search: route.query.search
            }),
            meta: { title: 'Genome Viewer', keepAlive: true }
          }
        ]
      },

      // Subcomponent - Report
      {
        path: '/datains-report',
        name: 'datains-report',
        component: RouteView,
        hidden: true,
        redirect: '/datains-report/report-management',
        meta: { title: 'Report', icon: 'solution', permission: ['table'], keepAlive: true },
        children: [
          {
            path: '/datains-report/:reportId',
            name: 'report-details',
            hidden: true,
            component: () => import('@/views/report/ReportDetails'),
            props: route => ({ readonly: route.query.readonly }),
            meta: { title: 'Report Details', drawerMode: true, permission: ['table'], keepAlive: true }
          }
        ]
      },

      // Subcomponent - Notification
      {
        path: '/notifications',
        name: 'notifications',
        hidden: true,
        component: () => import('@/views/notification/NotificationTable'),
        meta: { title: 'Notifications', icon: 'notification', permission: ['table'] }
      },

      // Exception
      {
        path: '/exception',
        hidden: true,
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning', permission: ['exception'] },
        children: [
          {
            path: '/exception/403',
            name: 'exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: ['exception'] }
          },
          {
            path: '/exception/404',
            name: 'exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: ['exception'] }
          },
          {
            path: '/exception/500',
            name: 'exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: ['exception'] }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },

  {
    path: '/welcome',
    name: 'welcome',
    component: () => import('@/custom/general/Home'),
    meta: { isPublic: true, keepAlive: false }
  },

  {
    path: '/cool-dashboard',
    name: 'cool-dashboard',
    component: () => import('@/custom/quartet/CoolDashboard'),
    meta: { isPublic: true, keepAlive: false }
  },

  {
    path: '/metabase',
    name: 'Metabase Iframe',
    props: route => ({ src: 'http://metabase.3steps.cn', toPath: 'welcome' }),
    component: () => import('@/views/iframe/EmbededFrame')
  },

  {
    path: '/api-mgmt',
    name: 'API Management Iframe',
    props: route => ({ src: 'http://yapi.3steps.cn', toPath: 'welcome' }),
    component: () => import('@/views/iframe/EmbededFrame')
  },

  {
    path: '/jupyter',
    name: 'Jupyter Iframe',
    props: route => ({ src: 'http://jupyterhub.3steps.cn', toPath: 'welcome' }),
    component: () => import('@/views/iframe/EmbededFrame')
  },

  {
    path: '/webapps',
    name: 'Webapps',
    props: route => ({ src: route.query.src, toPath: 'welcome' }),
    component: () => import('@/views/iframe/EmbededFrame')
  },

  // User
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: '/user/login',
        name: 'login',
        component: () => import('@/views/account/Login')
      },
      {
        path: '/user/register',
        name: 'register',
        component: () => import('@/views/account/Register')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  }
]
