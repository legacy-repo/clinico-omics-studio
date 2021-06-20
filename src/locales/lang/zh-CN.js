export default {
  dashboard: {
    workplace: {
      projects: '项目数',
      jobs: ' 作业数',
      reports: '报告数',
      ongoingProjects: '进行中',
      allProjects: '所有项目',
      total: '全部',
      running: '运行中',
      failed: '失败',
      finished: '成功',
      quickStart: '快速开始',
      addBtn: '新增',
      dataTask: '数据任务',
      activity: '活动'
    }
  },
  workflow: {
    stepForm: {
      argumentJson: {
        download: '下载',
        jobParameters: '作业参数'
      },
      argumentTable: {
        download: '下载',
        save: '保存',
        reset: '重置',
        jobParameters: '作业参数',
        refreshSuccessfully: '刷新成功',
        saveSuccessfully: '保存成功'
      },
      step1: {
        projectName: '项目名称',
        enterProjectName: '请输入项目名称',
        description: '描述',
        enterProjectDescription: '请输入项目描述',
        startedTime: '开始时间',
        group: '项目组',
        choppyApp: '分析流程',
        next: '下一步',
        chooseAppPlaceholder: '请选择分析流程'
      },
      step2: {
        helpTitle: '帮助文档'
      },
      step3: {
        previousStep: '上一步',
        showJobs: '显示作业',
        showProjects: '显示项目',
        submitProject: '提交项目'
      },
      stepForm: {
        projectInformation: '项目信息',
        jobParameters: '作业参数',
        submit: '提交'
      }
    },
    projectManagement: {
      createProject: '创建项目'
    },
    workflowManagement: {
      projectMetadata: '项目元数据',
      totalJobs: '全部',
      submittedJobs: '已提交',
      runningJobs: '运行中',
      failedJobs: '失败',
      succeededJobs: '成功',
      warningJobs: '警告',
      startedTime: '开始时间',
      finishedTime: '完成时间',
      description: '描述',
      relatedReport: '关联报告',
      relatedApp: '关联APP',
      report: '报告',
      stop: '停止',
      restart: '重启',
      archive: '归档',
      name: '项目名',
      author: '创建者',
      status: '状态'
    },
    itemList: {
      projectList: {
        total: '所有项目',
        running: '运行中',
        failed: '失败',
        finished: '成功',
        aborted: '已归档',
        archive: '归档',
        notice: '注意',
        noticeContent: '确定将此项目标记为删除状态？',
        searchPlaceholder: '请选择APP',
        enterProjectName: '请输入项目名称',
        appName: 'APP名称',
        noContent: '暂无内容',
        startedTime: '开始时间',
        finishedTime: '完成时间',
        status: '状态',
        totalJobs: '所有作业',
        submittedJobs: '已提交',
        runningJobs: '运行中',
        failedJobs: '失败',
        succeededJobs: '成功',
        warningJobs: '警告',
        view: '查看',
        report: '报告'
      },
      workflowList: {
        numberOfJobs: '作业数目',
        total: '全部',
        submitted: '已提交',
        running: '运行中',
        failed: '失败',
        succeeded: '成功',
        enterJobName: '请输入作业名称',
        noContent: '暂无内容',
        copyWorkflowId: '复制Workflow ID',
        started: '起始时间',
        finished: '完成时间',
        logs: '日志',
        metadata: '元数据',
        results: '结果',
        moreActions: '更多操作',
        resubmit: '重新提交',
        jobParameters: '作业参数',
      }
    },
    results: {
      search: '搜索',
      reset: '重置',
      accessWorkingDirectory: '访问当前工作目录',
      fileName: '文件名',
      fileIndex: '文件索引',
      project: '项目',
      jobName: '作业名称',
      fileType: '文件类型'
    },
    logContainer: {
      loading: '加载中...',
      selectLogFile: '选择日志文件',
      standardOut: '标准输出',
      standardError: '标准错误',
      chooseLogKey: '点击下拉菜单选择日志',
      notFoundLog: '未找到相关日志'
    }
  },
  tools: {
    xps2pdf: {
      convert: '转换',
      uploadText: '点击当前区域上传文件',
      uploadHint: '支持单个文件或多个文件上传',
      download: '下载',
      taskHistory: '历史任务',
      fileName: '文件名',
      createdTime: '创建时间',
      status: '状态',
      pdfFile: 'PDF文件',
      zipFile: 'ZIP文件',
      helpMsg: '暂无帮助文档.',
      removeHistorySuccessfully: '成功移除历史任务',
      onlyXpsFormat: '仅支持XPS格式文件',
      convertSuccessfully: '转换成功',
      convertFailed: '转换失败',
    },
    sigma: {
      parameters: '参数',
      run: '点击运行',
      help: '帮助',
      fileType: '文件类型',
      selectOption: '选择其中一个选项',
      fileTypeMessage: '请选择文件类型',
      tumorType: '肿瘤类型',
      tumorTypeMessage: '请选择肿瘤类型',
      dataType: '数据类型',
      doAssign: 'Do Assign',
      doMva: 'Do MVA',
      liteFormat: 'Lite Format',
      checkMSI: 'Check MSI',
      uploadText: '点击当前区域上传文件',
      uploadHint: '支持上传单个VCF或MAF文件',
      taskHistory: '历史任务',
      download: '下载',
      helpDocumentation: '帮助文档',
      fileName: '文件名',
      createdTime: '创建时间',
      status: '状态',
      result: '结果'
    }
  },
  account: {
    login: {
      accountLogin: '账户登录',
      usernamePasswordInValid: '用户名/密码无效',
      inputUsername: '请输入您的账号',
      inputPassword: '请输入您的密码',
      register: '注册',
      forgetPassword: '忘记密码',
      loginBtn: '登录'
    }
  },
  components: {
    tools: {
      userMenu: {
        tour: '新手指南',
        feedback: '反馈',
        policies: '政策',
        documentation: '文档',
        userCenter: '用户中心',
        settings: '配置',
        logout: '登出'
      }
    },
    globalFooter: {
      copyright: '版权所有',
      companyName: '智汇医圈联盟'
    }
  },
  layouts: {
    userLayout: {
      dataPolicies: '数据政策',
      help: '帮助',
      feedback: '反馈',
      terms: '条款',
      copyright: '版权所有 ©️2021 智汇医圈联盟'
    },
    pageView: {
      search: '搜索',
      searchPlaceholder: '请输入...'
    }
  }
}
