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
    redirect: '/dashboard/workplace',
    children: [
      // Dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        hidden: false,
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: 'Dashboard', keepAlive: true, icon: 'dashboard', permission: [ 'dashboard' ] },
        children: [
          {
            path: '/dashboard/search',
            name: 'dashboard-search',
            hidden: true,
            component: () => import('@/views/list/search/SearchLayout'),
            redirect: '/global/search/application',
            meta: { title: 'Search', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            hidden: false,
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: 'Workplace', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            hidden: true,
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: 'Statistics', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // App Store
          {
            path: '/app-store',
            name: 'app-store',
            hidden: true,
            component: () => import('@/views/appstore/FilterPanel'),
            meta: { title: 'App Store', keepAlive: true, permission: [ 'table' ] }
          }
        ]
      },

      {
        path: '/global',
        name: 'global',
        redirect: '/global/search/application',
        hidden: true,
        component: PageView,
        meta: { title: 'Global', icon: 'table', permission: [ 'table' ] },
        children: [
          {
            path: '/global/search',
            name: 'global-search',
            component: () => import('@/views/list/search/SearchLayout'),
            redirect: '/global/search/application',
            meta: { title: 'Search', keepAlive: true, permission: [ 'table' ] },
            children: [
              {
                path: '/global/search/application',
                name: 'search-application',
                component: () => import('../views/list/search/Application'),
                meta: { title: 'Search List（Applications）', permission: [ 'table' ] }
              },
              {
                path: '/global/search/workflow',
                name: 'search-workflow',
                component: () => import('../views/list/search/Workflow'),
                meta: { title: 'Search List（Workflows）', permission: [ 'table' ] }
              },
              {
                path: '/global/search/report',
                name: 'search-report',
                component: () => import('../views/list/search/Report'),
                meta: { title: 'Search List（Reports）', permission: [ 'table' ] }
              }
            ]
          }
        ]
      },

      {
        path: '/data',
        name: 'data',
        component: RouteView,
        meta: { title: 'Data', icon: 'project', permission: [ 'form' ] },
        children: [
          {
            path: '/data/manager',
            name: 'Data Management',
            component: () => import('@/views/filemanager/FileManager'),
            meta: { title: 'Data Management', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },

      // Pipeline
      {
        path: '/choppy-pipe',
        name: 'choppy-pipe',
        component: RouteView,
        redirect: '/choppy-pipe/submit',
        meta: { title: 'Project', icon: 'play-circle', permission: [ 'table' ] },
        children: [
          {
            path: '/choppy-pipe/submit/:pageNo([1-9]\\d*)?',
            name: 'create-project',
            component: () => import('@/views/workflow/stepForm/StepForm'),
            meta: { title: 'Create Project', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/choppy-pipe/job-management',
            name: 'job-management',
            hidden: true,
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/workflow/WorkflowManagement'),
            props: (route) => ({ projectId: route.query.projectId }),
            meta: { title: 'Job Management', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/choppy-pipe/workflow/:workflowId',
            name: 'job-details',
            hidden: true,
            component: () => import('@/views/workflow/WorkflowDetails'),
            props: (route) => ({ readonly: route.query.readonly, description: route.query.description }),
            meta: { title: 'Job Details', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/choppy-pipe/project-management',
            name: 'project-management',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/workflow/ProjectManagement'),
            meta: { title: 'Project Management', keepAlive: true, permission: [ 'table' ] }
          }
        ]
      },

      // Report
      {
        path: '/datains-report',
        name: 'datains-report',
        component: RouteView,
        redirect: '/datains-report/report-management',
        meta: { title: 'Report', icon: 'solution', permission: [ 'table' ] },
        children: [
          {
            path: '/datains-report/report-management',
            name: 'report-management',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/report/ReportManagement'),
            meta: { title: 'Report Management', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/datains-report/:reportId',
            name: 'report-details',
            hidden: true,
            component: () => import('@/views/report/ReportDetails'),
            props: (route) => ({ readonly: route.query.readonly, description: route.query.description }),
            meta: { title: 'Report Details', keepAlive: true, permission: [ 'table' ] }
          }
        ]
      },

      // Data Source
      {
        path: '/data-source',
        name: 'data-source',
        hidden: true,
        redirect: '/data-source/discovery',
        component: PageView,
        meta: { title: 'Data Source', icon: 'project', permission: [ 'form' ] },
        children: [
          {
            path: '/data-source/search',
            name: 'search-datasource',
            hidden: true,
            component: () => import('@/views/datasource/Search'),
            meta: { title: 'Search', hiddenHeaderContent: true, keepAlive: true, permission: [ 'form' ] }
          },
          {
            path: '/data-source/exploration',
            name: 'exploration',
            hidden: true,
            component: () => import('@/views/datasource/FilterPanel'),
            meta: { title: 'Exploration', hiddenHeaderContent: true, keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },

      // Data Portal
      {
        path: '/data-portal',
        name: 'data-portal',
        hidden: true,
        redirect: '/data-portal/import',
        component: RouteView,
        meta: { title: 'Data Portal', keepAlive: true, icon: 'file-search', permission: [ 'dashboard' ] },
        children: [
          {
            path: 'http://data.3steps.cn',
            name: 'portal',
            meta: { title: 'Choppy Data Portal', target: '_blank' }
          }
        ]
      },

      // Account
      {
        path: '/account',
        hidden: true,
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: 'User', icon: 'user', keepAlive: true, permission: [ 'user' ] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: 'User Center', keepAlive: true, permission: [ 'user' ] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: 'Profiles', hideHeader: true, permission: [ 'user' ] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'base-settings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: 'Basic Profiles', hidden: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/security',
                name: 'security-settings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: 'Secure Profiles', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/custom',
                name: 'custom-settings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: 'Customization', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/binding',
                name: 'binding-settings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: 'Binding Settings', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/notification',
                name: 'notification-settings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: 'Notifications', hidden: true, keepAlive: true, permission: [ 'user' ] }
              }
            ]
          }
        ]
      },

      {
        path: '/documentation',
        name: 'documentation',
        hidden: true,
        component: RouteView,
        meta: { title: 'Docs', keepAlive: false, icon: 'question-circle', permission: [ 'dashboard' ] },
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

      // Exception
      {
        path: '/exception',
        hidden: true,
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning', permission: [ 'exception' ] },
        children: [
          {
            path: '/exception/403',
            name: 'exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: [ 'exception' ] }
          },
          {
            path: '/exception/404',
            name: 'exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: [ 'exception' ] }
          },
          {
            path: '/exception/500',
            name: 'exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: [ 'exception' ] }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
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
    props: (route) => ({ src: 'http://metabase.3steps.cn', toPath: '/dashboard' }),
    component: () => import('@/views/iframe/EmbededFrame')
  },

  {
    path: '/api-mgmt',
    name: 'API Management Iframe',
    props: (route) => ({ src: 'http://yapi.3steps.cn', toPath: '/dashboard' }),
    component: () => import('@/views/iframe/EmbededFrame')
  },

  {
    path: '/jupyter',
    name: 'Jupyter Iframe',
    props: (route) => ({ src: 'http://jupyterhub.3steps.cn', toPath: '/dashboard' }),
    component: () => import('@/views/iframe/EmbededFrame')
  },

  {
    path: '/webapps',
    name: 'Webapps',
    props: (route) => ({ src: route.query.src, toPath: '/welcome' }),
    component: () => import('@/views/iframe/EmbededFrame')
  }
]
