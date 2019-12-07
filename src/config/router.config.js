// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'
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
            component: () => import('@/views/list/search/SearchLayout'),
            redirect: '/global/search/application',
            meta: { title: 'Search', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: 'Workplace', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: 'Statistics', keepAlive: false, permission: [ 'dashboard' ] }
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

      // Pipeline
      {
        path: '/choppy-pipe',
        name: 'choppy-pipe',
        component: RouteView,
        redirect: '/choppy-pipe/submit',
        meta: { title: 'Workflow', icon: 'play-circle', permission: [ 'table' ] },
        children: [
          {
            path: '/choppy-pipe/submit/:pageNo([1-9]\\d*)?',
            name: 'submit-workflow',
            component: () => import('@/views/workflow/stepForm/StepForm'),
            meta: { title: 'Submit Workflow', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/choppy-pipe/workflow-management',
            name: 'workflow-management',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/workflow/WorkflowManagement'),
            props: (route) => ({ projectId: route.query.projectId }),
            meta: { title: 'Workflow Management', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/choppy-pipe/workflow/:workflowId',
            name: 'workflow-details',
            hidden: true,
            component: () => import('@/views/workflow/WorkflowDetails'),
            props: (route) => ({ readonly: route.query.readonly, description: route.query.description }),
            meta: { title: 'Workflow Details', keepAlive: true, permission: [ 'table' ] }
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
        redirect: '/data-source/discovery',
        component: PageView,
        meta: { title: 'Data Source', icon: 'project', permission: [ 'form' ] },
        children: [
          {
            path: '/data-source/submit',
            name: 'submit-data',
            component: () => import('@/views/form/BasicForm'),
            meta: { title: 'Submit Data', keepAlive: true, permission: [ 'form' ] }
          },
          {
            path: '/data-source/search',
            name: 'search-datasource',
            hidden: false,
            component: () => import('@/views/datasource/Search'),
            meta: { title: 'Search', hiddenHeaderContent: true, keepAlive: true, permission: [ 'form' ] }
          },
          {
            path: '/data-source/exploration',
            name: 'exploration',
            hidden: false,
            component: () => import('@/views/datasource/FilterPanel'),
            meta: { title: 'Exploration', hiddenHeaderContent: true, keepAlive: true, permission: [ 'form' ] }
          },
          {
            path: '/data-source/databank',
            name: 'databank',
            hidden: true,
            component: () => import('@/views/form/BasicForm'),
            meta: { title: 'Data Bank', keepAlive: true, permission: [ 'form' ] }
          },
          {
            path: '/data-source/visualizer',
            name: 'visualizer',
            hidden: true,
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: 'Visualizer', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },

      // Data Portal
      {
        path: '/data-portal',
        name: 'data-portal',
        hidden: false,
        redirect: '/data-portal/import',
        component: RouteView,
        meta: { title: 'Data Portal', keepAlive: true, icon: 'file-search', permission: [ 'dashboard' ] },
        children: [
          {
            path: '/data-portal/import',
            name: 'import-data',
            component: () => import('@/views/form/BasicForm'),
            meta: { title: 'Import Data', keepAlive: true, permission: [ 'form' ] }
          },
          {
            path: 'http://data.3steps.cn',
            name: 'portal',
            meta: { title: 'Choppy Data Portal', target: '_blank' }
          }
        ]
      },

      // Next Service Engine
      {
        path: '/next-service-engine',
        name: 'plugin-service',
        hidden: true,
        component: RouteView,
        redirect: '/next-service-engine/plugins',
        meta: { title: 'Plugins & Services', icon: 'api', permission: [ 'profile' ] },
        children: [
          {
            path: '/next-service-engine/plugins',
            name: 'plugins',
            component: () => import('@/views/profile/basic/Index'),
            meta: { title: 'Plugin Management', permission: [ 'profile' ] }
          },
          {
            path: '/next-service-engine/services',
            name: 'services',
            component: () => import('@/views/profile/advanced/Advanced'),
            meta: { title: 'Service Management', permission: [ 'profile' ] }
          }
        ]
      },

      // NCCN
      {
        path: '/nccn',
        name: 'nccn',
        hidden: false,
        component: PageView,
        redirect: '/nccn/editor',
        meta: { title: 'NCCN', icon: bxAnaalyse, permission: [ 'result' ] },
        children: [
          {
            path: '/nccn/editor',
            name: 'editor',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
            meta: { title: 'NCCN Editor', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
          },
          {
            path: '/nccn/materials',
            name: 'materials',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
            meta: { title: 'NCCN Materials', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
          }
        ]
      },

      // App Store
      {
        path: '/app-store',
        name: 'app-store',
        hidden: false,
        component: () => import('@/views/appstore/FilterPanel'),
        meta: { title: 'App Store', keepAlive: true, icon: 'appstore', permission: [ 'table' ] }
      },

      // App Store
      {
        path: '/test-panel',
        name: 'test-panel',
        hidden: false,
        component: () => import('@/views/appstore/TestPanel'),
        meta: { title: 'Test Panel', keepAlive: true, icon: 'appstore', permission: [ 'table' ] }
      },

      // Account
      {
        path: '/account',
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
        hidden: false,
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
    name: 'home',
    component: () => import('@/views/home/Home'),
    meta: {
      isPublic: true
    }
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
  }
]
