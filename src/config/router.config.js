// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

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
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: 'Dashboard', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
        children: [
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: 'Workbench', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: 'Statistics', keepAlive: false, permission: [ 'dashboard' ] }
          }
        ]
      },

      // Data Source
      {
        path: '/data-source',
        name: 'data-source',
        redirect: '/data-source/discovery',
        component: PageView,
        meta: { title: 'DataSource', icon: 'form', permission: [ 'form' ] },
        children: [
          {
            path: '/data-source/submit',
            name: 'submit-data',
            component: () => import('@/views/form/BasicForm'),
            meta: { title: 'Submit Data', keepAlive: true, permission: [ 'form' ] }
          },
          {
            path: '/data-source/discovery',
            name: 'Discovery',
            component: () => import('@/views/form/stepForm/StepForm'),
            meta: { title: 'Discovery', keepAlive: true, permission: [ 'form' ] }
          },
          {
            path: '/data-source/visualizer',
            name: 'Visualizer',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: 'Visualizer', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },

      // list
      {
        path: '/choppy-pipe',
        name: 'choppy-pipe',
        component: PageView,
        redirect: '/choppy-pipe/submit',
        meta: { title: 'Pipeline', icon: 'table', permission: [ 'table' ] },
        children: [
          {
            path: '/choppy-pipe/submit/:pageNo([1-9]\\d*)?',
            name: 'submit-workflow',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/list/TableList'),
            meta: { title: 'Submit Workflow', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/choppy-pipe/task',
            name: 'Task',
            component: () => import('@/views/list/StandardList'),
            meta: { title: 'Task', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/choppy-pipe/report',
            name: 'Report',
            component: () => import('@/views/list/CardList'),
            meta: { title: 'Report', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/choppy-pipe/apps',
            name: 'Apps',
            component: () => import('@/views/list/search/SearchLayout'),
            redirect: '/list/search/article',
            meta: { title: 'Applications', keepAlive: true, permission: [ 'table' ] },
            children: [
              {
                path: '/list/search/article',
                name: 'SearchArticles',
                component: () => import('../views/list/search/Article'),
                meta: { title: 'Search List（Articles）', permission: [ 'table' ] }
              },
              {
                path: '/list/search/project',
                name: 'SearchProjects',
                component: () => import('../views/list/search/Projects'),
                meta: { title: 'Search List（Projects）', permission: [ 'table' ] }
              },
              {
                path: '/list/search/application',
                name: 'SearchApplications',
                component: () => import('../views/list/search/Applications'),
                meta: { title: 'Search List（Applications）', permission: [ 'table' ] }
              }
            ]
          }
        ]
      },

      // Data Portal
      {
        path: '/data-portal',
        name: 'data-portal',
        redirect: '/data-portal/import',
        component: RouteView,
        meta: { title: 'Data Portal', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
        children: [
          {
            path: '/data-portal/import',
            name: 'import-data',
            component: () => import('@/views/form/BasicForm'),
            meta: { title: 'Import Data', keepAlive: true, permission: [ 'form' ] }
          },
          {
            path: 'http://data.3steps.cn',
            name: 'Portal',
            meta: { title: 'Choppy Data Portal', target: '_blank' }
          }
        ]
      },

      // PreMedKB
      {
        path: '/premedkb',
        name: 'premedkb',
        component: RouteView,
        meta: { title: 'PreMedKB', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
        children: [
          {
            path: 'http://www.fudan-pgx.org/premedkb/',
            name: 'PreMedKB',
            meta: { title: 'Query', target: '_blank' }
          }
        ]
      },

      // profile
      {
        path: '/next-service-engine',
        name: 'PluginService',
        component: RouteView,
        redirect: '/next-service-engine/plugins',
        meta: { title: 'Plugins & Services', icon: 'profile', permission: [ 'profile' ] },
        children: [
          {
            path: '/next-service-engine/plugins',
            name: 'Plugins',
            component: () => import('@/views/profile/basic/Index'),
            meta: { title: 'Plugins', permission: [ 'profile' ] }
          },
          {
            path: '/next-service-engine/services',
            name: 'Services',
            component: () => import('@/views/profile/advanced/Advanced'),
            meta: { title: 'Services', permission: [ 'profile' ] }
          }
        ]
      },

      // result
      {
        path: '/nccn',
        name: 'NCCN',
        component: PageView,
        redirect: '/nccn/editor',
        meta: { title: 'NCCN', icon: 'check-circle-o', permission: [ 'result' ] },
        children: [
          {
            path: '/nccn/editor',
            name: 'Editor',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
            meta: { title: 'Editor', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
          },
          {
            path: '/nccn/materials',
            name: 'Materials',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
            meta: { title: 'Materials', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
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
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: [ 'exception' ] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: [ 'exception' ] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: [ 'exception' ] }
          }
        ]
      },

      // account
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
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: 'Basic Profiles', hidden: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: 'Secure Profiles', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: 'Customization', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: 'Binding Settings', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: 'Notifications', hidden: true, keepAlive: true, permission: [ 'user' ] }
              }
            ]
          }
        ]
      },

      // other
      {
        path: '/other',
        name: 'otherPage',
        hidden: true,
        component: PageView,
        meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
        redirect: '/other/icon-selector',
        children: [
          {
            path: '/other/icon-selector',
            name: 'TestIconSelect',
            component: () => import('@/views/other/IconSelectorView'),
            meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/other/list',
            component: RouteView,
            meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
            redirect: '/other/list/tree-list',
            children: [
              {
                path: '/other/list/tree-list',
                name: 'TreeList',
                component: () => import('@/views/other/TreeList'),
                meta: { title: '树目录表格', keepAlive: true }
              },
              {
                path: '/other/list/edit-table',
                name: 'EditList',
                component: () => import('@/views/other/TableInnerEditList'),
                meta: { title: '内联编辑表格', keepAlive: true }
              },
              {
                path: '/other/list/user-list',
                name: 'UserList',
                component: () => import('@/views/other/UserList'),
                meta: { title: '用户列表', keepAlive: true }
              },
              {
                path: '/other/list/role-list',
                name: 'RoleList',
                component: () => import('@/views/other/RoleList'),
                meta: { title: '角色列表', keepAlive: true }
              },
              {
                path: '/other/list/system-role',
                name: 'SystemRole',
                component: () => import('@/views/role/RoleList'),
                meta: { title: '角色列表2', keepAlive: true }
              },
              {
                path: '/other/list/permission-list',
                name: 'PermissionList',
                component: () => import('@/views/other/PermissionList'),
                meta: { title: '权限列表', keepAlive: true }
              }
            ]
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
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
