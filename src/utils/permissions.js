export function actionToObject(json) {
  try {
    return JSON.parse(json)
  } catch (e) {
    console.log('err', e.message)
  }
  return []
}

const userInfo = {
  id: '4291d7da9005377ec9aec4a71ea837f',
  name: 'Anonymous',
  username: 'anonymous',
  description: '[Past - A Cardiothoracic Surgeon] - [Present - A Software Developer] - [Future - A Data Scientist]',
  title: 'Software Developer',
  organization: 'Fudan University',
  address: 'Shanghai',
  password: '',
  avatar: 'https://nordata-cdn.oss-cn-shanghai.aliyuncs.com/clinico-omics/avatar2.png',
  status: 1,
  telephone: '',
  lastLoginIp: '27.154.74.117',
  lastLoginTime: 1534837621348,
  creatorId: 'admin',
  createTime: 1497160610259,
  merchantCode: 'TLif2btpzg079h15bk',
  deleted: 0,
  roleId: 'admin',
  role: {},
  tags: ['很有想法的', '专注设计', '海纳百川']
}

const permissionRole = {
  id: 'admin',
  name: '管理员',
  describe: '拥有所有权限',
  status: 1,
  creatorId: 'system',
  createTime: 1497160610259,
  deleted: 0,
  permissions: [
    {
      roleId: 'admin',
      permissionId: 'dashboard',
      permissionName: '仪表盘',
      actions:
        '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      actionEntitySet: [
        {
          action: 'add',
          describe: '新增',
          defaultCheck: false
        },
        {
          action: 'query',
          describe: '查询',
          defaultCheck: false
        },
        {
          action: 'get',
          describe: '详情',
          defaultCheck: false
        },
        {
          action: 'update',
          describe: '修改',
          defaultCheck: false
        },
        {
          action: 'delete',
          describe: '删除',
          defaultCheck: false
        }
      ],
      actionList: null,
      dataAccess: null
    },
    {
      roleId: 'admin',
      permissionId: 'exception',
      permissionName: '异常页面权限',
      actions:
        '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      actionEntitySet: [
        {
          action: 'add',
          describe: '新增',
          defaultCheck: false
        },
        {
          action: 'query',
          describe: '查询',
          defaultCheck: false
        },
        {
          action: 'get',
          describe: '详情',
          defaultCheck: false
        },
        {
          action: 'update',
          describe: '修改',
          defaultCheck: false
        },
        {
          action: 'delete',
          describe: '删除',
          defaultCheck: false
        }
      ],
      actionList: null,
      dataAccess: null
    },
    {
      roleId: 'admin',
      permissionId: 'result',
      permissionName: '结果权限',
      actions:
        '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      actionEntitySet: [
        {
          action: 'add',
          describe: '新增',
          defaultCheck: false
        },
        {
          action: 'query',
          describe: '查询',
          defaultCheck: false
        },
        {
          action: 'get',
          describe: '详情',
          defaultCheck: false
        },
        {
          action: 'update',
          describe: '修改',
          defaultCheck: false
        },
        {
          action: 'delete',
          describe: '删除',
          defaultCheck: false
        }
      ],
      actionList: null,
      dataAccess: null
    },
    {
      roleId: 'admin',
      permissionId: 'profile',
      permissionName: '详细页权限',
      actions:
        '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      actionEntitySet: [
        {
          action: 'add',
          describe: '新增',
          defaultCheck: false
        },
        {
          action: 'query',
          describe: '查询',
          defaultCheck: false
        },
        {
          action: 'get',
          describe: '详情',
          defaultCheck: false
        },
        {
          action: 'update',
          describe: '修改',
          defaultCheck: false
        },
        {
          action: 'delete',
          describe: '删除',
          defaultCheck: false
        }
      ],
      actionList: null,
      dataAccess: null
    },
    {
      roleId: 'admin',
      permissionId: 'table',
      permissionName: '表格权限',
      actions:
        '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"}]',
      actionEntitySet: [
        {
          action: 'add',
          describe: '新增',
          defaultCheck: false
        },
        {
          action: 'import',
          describe: '导入',
          defaultCheck: false
        },
        {
          action: 'get',
          describe: '详情',
          defaultCheck: false
        },
        {
          action: 'update',
          describe: '修改',
          defaultCheck: false
        }
      ],
      actionList: null,
      dataAccess: null
    },
    {
      roleId: 'admin',
      permissionId: 'form',
      permissionName: '表单权限',
      actions:
        '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      actionEntitySet: [
        {
          action: 'add',
          describe: '新增',
          defaultCheck: false
        },
        {
          action: 'get',
          describe: '详情',
          defaultCheck: false
        },
        {
          action: 'query',
          describe: '查询',
          defaultCheck: false
        },
        {
          action: 'update',
          describe: '修改',
          defaultCheck: false
        },
        {
          action: 'delete',
          describe: '删除',
          defaultCheck: false
        }
      ],
      actionList: null,
      dataAccess: null
    },
    {
      roleId: 'admin',
      permissionId: 'order',
      permissionName: '订单管理',
      actions:
        '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      actionEntitySet: [
        {
          action: 'add',
          describe: '新增',
          defaultCheck: false
        },
        {
          action: 'query',
          describe: '查询',
          defaultCheck: false
        },
        {
          action: 'get',
          describe: '详情',
          defaultCheck: false
        },
        {
          action: 'update',
          describe: '修改',
          defaultCheck: false
        },
        {
          action: 'delete',
          describe: '删除',
          defaultCheck: false
        }
      ],
      actionList: null,
      dataAccess: null
    },
    {
      roleId: 'admin',
      permissionId: 'permission',
      permissionName: '权限管理',
      actions:
        '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      actionEntitySet: [
        {
          action: 'add',
          describe: '新增',
          defaultCheck: false
        },
        {
          action: 'get',
          describe: '详情',
          defaultCheck: false
        },
        {
          action: 'update',
          describe: '修改',
          defaultCheck: false
        },
        {
          action: 'delete',
          describe: '删除',
          defaultCheck: false
        }
      ],
      actionList: null,
      dataAccess: null
    },
    {
      roleId: 'admin',
      permissionId: 'role',
      permissionName: '角色管理',
      actions:
        '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      actionEntitySet: [
        {
          action: 'add',
          describe: '新增',
          defaultCheck: false
        },
        {
          action: 'get',
          describe: '详情',
          defaultCheck: false
        },
        {
          action: 'update',
          describe: '修改',
          defaultCheck: false
        },
        {
          action: 'delete',
          describe: '删除',
          defaultCheck: false
        }
      ],
      actionList: null,
      dataAccess: null
    },
    {
      roleId: 'admin',
      permissionId: 'table',
      permissionName: '桌子管理',
      actions:
        '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      actionEntitySet: [
        {
          action: 'add',
          describe: '新增',
          defaultCheck: false
        },
        {
          action: 'get',
          describe: '详情',
          defaultCheck: false
        },
        {
          action: 'query',
          describe: '查询',
          defaultCheck: false
        },
        {
          action: 'update',
          describe: '修改',
          defaultCheck: false
        },
        {
          action: 'delete',
          describe: '删除',
          defaultCheck: false
        }
      ],
      actionList: null,
      dataAccess: null
    },
    {
      roleId: 'admin',
      permissionId: 'user',
      permissionName: '用户管理',
      actions:
        '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
      actionEntitySet: [
        {
          action: 'add',
          describe: '新增',
          defaultCheck: false
        },
        {
          action: 'import',
          describe: '导入',
          defaultCheck: false
        },
        {
          action: 'get',
          describe: '详情',
          defaultCheck: false
        },
        {
          action: 'update',
          describe: '修改',
          defaultCheck: false
        },
        {
          action: 'delete',
          describe: '删除',
          defaultCheck: false
        },
        {
          action: 'export',
          describe: '导出',
          defaultCheck: false
        }
      ],
      actionList: null,
      dataAccess: null
    }
  ]
}

userInfo.role = permissionRole

export { userInfo }
