// eslint-disable-next-line
import { BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import OidcCallback from '@/views/OidcCallback.vue'
import OidcPopupCallback from '@/views/OidcPopupCallback.vue'

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
        component: () => import('@/views/datasource/Search'),
        meta: { title: 'Dashboard', keepAlive: true, icon: 'dashboard', permission: ['dashboard'] }
      },

      // Materials
      {
        path: '/materials',
        name: 'materials',
        hidden: false,
        component: () => import('@/views/dashboard/Analysis'),
        meta: { title: 'Materials', icon: 'experiment', keepAlive: true }
      },

      // Data (Level 0 - 4)
      {
        path: '/data',
        name: 'data',
        hidden: false,
        component: () => import('@/views/datasource/FilterPanel'),
        meta: { title: 'Data', icon: 'deployment-unit', keepAlive: true }
      },

      // SeqFlow
      {
        path: '/seq-flow',
        name: 'seq-flow',
        component: RouteView,
        redirect: '/seq-flow/submit',
        meta: { title: 'Analyses', icon: 'project', permission: ['table'] },
        children: [
          {
            path: '/seq-flow/workplace',
            name: 'workplace',
            hidden: true,
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: 'Workplace', keepAlive: true, icon: 'dashboard', permission: ['dashboard'] }
          },
          {
            path: '/seq-flow/app-store',
            name: 'appstore',
            hidden: false,
            component: () => import('@/views/appstore/FilterPanel'),
            meta: { title: 'Apps & Tools', keepAlive: true, icon: 'appstore', permission: ['table'] }
          },
          {
            path: '/seq-flow/file-manager',
            name: 'file-manager',
            hidden: false,
            component: () => import('@/views/filemanager/FileBrowser'),
            props: route => ({ path: route.query.path }),
            meta: { title: 'File Management', icon: 'codepen-circle', keepAlive: true }
          },
          {
            path: '/seq-flow/submit/:pageNo([1-9]\\d*)?',
            name: 'create-project',
            hidden: true,
            props: route => ({ appId: route.query.appId }),
            component: () => import('@/views/workflow/stepForm/StepForm'),
            meta: { title: 'Create Project', icon: 'file-add', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/seq-flow/job-management/:projectId',
            name: 'job-management',
            hidden: true,
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/workflow/WorkflowManagement'),
            meta: { title: 'Job Management', icon: 'file-sync', drawerMode: false, keepAlive: true, permission: ['table'] }
          },
          {
            path: '/seq-flow/project-management',
            name: 'project-management',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/workflow/ProjectManagement'),
            meta: { title: 'Project Management', icon: 'solution', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/seq-flow/report-management',
            name: 'report-management',
            hidden: false,
            props: route => ({ creationMode: route.query.creationMode, reportTool: route.query.reportTool }),
            component: () => import('@/views/report/ReportManagement'),
            meta: { title: 'Report Management', keepAlive: true, icon: 'file-done', permission: ['table'] }
          }
        ]
      },

      // Visualization
      {
        path: '/visualization',
        name: 'visualization',
        hidden: false,
        component: () => import('@/components/FullFrame'),
        props: route => ({ src: 'http://10.157.72.55:8081/quartet-vis/' }),
        meta: { title: 'Visualization', icon: 'dot-chart', keepAlive: true }
      },

      // Request Materials
      {
        path: '/request-materials',
        name: 'request-materials',
        hidden: true,
        component: () => import('@/views/dashboard/Request'),
        meta: { titile: 'Request Materials', icon: 'pull-request', keepAlive: true }
      },

      // Exploratory
      {
        path: '/exploratory',
        name: 'exploratory',
        hidden: false,
        component: () => import('@/views/exploratory/ChartStudio'),
        meta: { title: 'Exploratory', icon: 'dribbble', keepAlive: true }
      },

      // Account
      {
        path: '/account',
        hidden: true,
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: 'User', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: 'User Center', keepAlive: true, permission: ['user'] }
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
                meta: { title: 'Secure Profiles', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/custom',
                name: 'custom-settings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: 'Customization', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/binding',
                name: 'binding-settings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: 'Binding Settings', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/notification',
                name: 'notification-settings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: 'Notifications', hidden: true, keepAlive: true, permission: ['user'] }
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
        meta: { title: 'Report', icon: 'solution', permission: ['table'] },
        children: [
          {
            path: '/datains-report/:reportId',
            name: 'report-details',
            hidden: true,
            component: () => import('@/views/report/ReportDetails'),
            props: route => ({ readonly: route.query.readonly }),
            meta: { title: 'Report Details', drawerMode: true, keepAlive: true, permission: ['table'] }
          }
        ]
      },

      // Subcomponent - Data Portal
      {
        path: '/data-portal',
        name: 'data-portal',
        hidden: true,
        redirect: '/data-portal/import',
        component: RouteView,
        meta: { title: 'Data Portal', keepAlive: true, icon: 'file-search', permission: ['dashboard'] },
        children: [
          {
            path: 'http://data.3steps.cn',
            name: 'portal',
            meta: { title: 'Choppy Data Portal', target: '_blank' }
          }
        ]
      },

      // Subcomponent - Notification
      {
        path: '/notifications',
        name: 'notifications',
        hidden: true,
        component: () => import('@/views/notification/NotificationTable'),
        meta: { title: 'Notifications', keepAlive: true, icon: 'notification', permission: ['table'] }
      },

      // Subcomponent - Git
      {
        path: '/git-management',
        name: 'git-management',
        hidden: true,
        component: () => import('@/views/git/GitList'),
        meta: { title: 'Git', keepAlive: true, icon: 'history', permission: ['table'] }
      },

      // Subcomponent - FileBrowser
      {
        path: '/file-management',
        name: 'file-management',
        hidden: true,
        component: () => import('@/views/filemanager/FileBrowser'),
        meta: { title: 'File Browser', keepAlive: true, icon: 'history', permission: ['table'] }
      },

      // Subcomponent - Statistics
      {
        path: '/statistics',
        name: 'statistics',
        hidden: true,
        component: () => import('@/views/dashboard/Analysis'),
        meta: { title: 'Statistics', keepAlive: true, icon: 'dot-chart', permission: ['dashboard'] }
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
    component: () => import('@/views/home/Home'),
    meta: { isPublic: true, keepAlive: true }
  },

  {
    path: '/oidc-callback', // Needs to match redirectUri in you oidcSettings
    name: 'oidcCallback',
    component: OidcCallback
  },

  {
    path: '/oidc-popup-callback', // Needs to match popupRedirectUri in you oidcSettings
    name: 'oidcPopupCallback',
    component: OidcPopupCallback
  },

  {
    path: '/metabase',
    name: 'Metabase Iframe',
    props: route => ({ src: 'http://metabase.3steps.cn', toPath: 'dashboard' }),
    component: () => import('@/views/iframe/EmbededFrame')
  },

  {
    path: '/api-mgmt',
    name: 'API Management Iframe',
    props: route => ({ src: 'http://yapi.3steps.cn', toPath: 'dashboard' }),
    component: () => import('@/views/iframe/EmbededFrame')
  },

  {
    path: '/jupyter',
    name: 'Jupyter Iframe',
    props: route => ({ src: 'http://jupyterhub.3steps.cn', toPath: 'dashboard' }),
    component: () => import('@/views/iframe/EmbededFrame')
  },

  {
    path: '/webapps',
    name: 'Webapps',
    props: route => ({ src: route.query.src, toPath: 'welcome' }),
    component: () => import('@/views/iframe/EmbededFrame')
  }
]
