export default {
  // Views
  dashboard: {
    workplace: {
      projects: 'Projects',
      jobs: 'Jobs',
      reports: 'Reports',
      ongoingProjects: 'Ongoing Projects',
      allProjects: 'All Projects',
      total: 'Total',
      running: 'Running',
      failed: 'Failed',
      finished: 'Finished',
      quickStart: 'Quick Start / Navigation',
      addBtn: 'Add',
      dataTask: 'Data Task',
      activity: 'Activity'
    }
  },
  workflow: {
    stepForm: {
      argumentJson: {
        download: 'Download',
        jobParameters: 'Job Parameters'
      },
      argumentTable: {
        download: 'Download',
        save: 'Save',
        reset: 'Reset',
        jobParameters: 'Job Parameters',
        refreshSuccessfully: 'Refresh Successfully',
        saveSuccessfully: 'Save Successfully'
      },
      step1: {
        projectName: 'Project Name',
        enterProjectName: 'Please Enter Your Project Name',
        description: 'Description',
        enterProjectDescription: 'Please Enter a Description of the Project',
        startedTime: 'Started Time',
        group: 'Group',
        choppyApp: 'Choppy App',
        next: 'Next',
        chooseAppPlaceholder: 'Please Choose a Choppy App'
      },
      step2: {
        helpTitle: 'Help Documentation'
      },
      step3: {
        previousStep: 'Previous Step',
        showJobs: 'Show Jobs',
        showProjects: 'Show Projects',
        submitProject: 'Submit Project'
      },
      stepForm: {
        projectInformation: 'Project Information',
        jobParameters: 'Job Parameters',
        submit: 'Submit'
      }
    },
    projectManagement: {
      createProject: 'Create Project'
    },
    itemList: {
      projectList: {
        total: 'Total',
        running: 'Running',
        failed: 'Failed',
        finished: 'Finished',
        aborted: 'Archived',
        archive: 'Archive',
        notice: 'Notice',
        noticeContent: 'Mark the project as deletion, sure?',
        searchPlaceholder: 'Search By App',
        enterProjectName: 'Please Enter Project Name',
        appName: 'App Name',
        noContent: 'No Content',
        startedTime: 'Started',
        finishedTime: 'Finished',
        status: 'Status',
        totalJobs: 'Total Jobs',
        submittedJobs: 'Submitted Jobs',
        runningJobs: 'Running Jobs',
        failedJobs: 'Failed Jobs',
        succeededJobs: 'Succeeded Jobs',
        warningJobs: 'Warning Jobs',
        view: 'View',
        report: 'Report'
      },
      workflowList: {
        numberOfJobs: 'Number of Jobs',
        total: 'Total',
        submitted: 'Submitted',
        running: 'Running',
        failed: 'Failed',
        succeeded: 'Finished',
        enterJobName: 'Please Enter Job Name',
        noContent: 'No Content',
        copyWorkflowId: 'Copy WorkflowId',
        started: 'Started',
        finished: 'Finished',
        logs: 'Logs',
        metadata: 'Metadata',
        results: 'Results',
        moreActions: 'More Actions',
        resubmit: 'Resubmit',
        jobParameters: 'Job Parameters'
      }
    },
    workflowManagement: {
      projectMetadata: 'Project Metadata',
      totalJobs: 'Total Jobs',
      submittedJobs: 'Submitted Jobs',
      runningJobs: 'Running Jobs',
      failedJobs: 'Failed Jobs',
      succeededJobs: 'Succeeded Jobs',
      warningJobs: 'Warning Jobs',
      startedTime: 'Started Time',
      finishedTime: 'Finished Time',
      description: 'Description',
      relatedReport: 'Related Report',
      relatedApp: 'Related App',
      report: 'Report',
      stop: 'Stop',
      restart: 'Restart',
      archive: 'Archive',
      name: 'Name',
      author: 'Author',
      status: 'Status'
    },
    results: {
      search: 'Search',
      reset: 'Reset',
      accessWorkingDirectory: 'Access Working Directory',
      fileName: 'File Name',
      fileIndex: 'File Index',
      project: 'Project',
      jobName: 'Job Name',
      fileType: 'File Type'
    },
    logContainer: {
      loading: 'Loading...',
      selectLogFile: 'Select Log File',
      standardOut: 'Standard Output',
      standardError: 'Standard Error',
      chooseLogKey: 'Choose a log key from the dropdown menu.',
      notFoundLog: 'Not Found Log.'
    }
  },
  tools: {
    xps2pdf: {
      convert: 'Convert',
      uploadText: 'Click this area to upload',
      uploadHint: 'Support for a single or bulk upload.',
      download: 'Download',
      taskHistory: 'Task History',
      fileName: 'File Name',
      createdTime: 'Created Time',
      status: 'Status',
      pdfFile: 'PDF File',
      zipFile: 'ZIP File',
      helpMsg: 'No Help Documentation.',
      removeHistorySuccessfully: 'Remove History Successfully.',
      onlyXpsFormat: 'Only support XPS format.',
      convertSuccessfully: 'Convert successfully.',
      convertFailed: 'Convert failed.',
    },
    sigma: {
      parameters: 'Parameters',
      run: 'Run',
      help: 'Help',
      fileType: 'File Type',
      selectOption: 'Select an Option',
      fileTypeMessage: 'Please Select a File Type',
      tumorType: 'Tumor Type',
      tumorTypeMessage: 'Please Select a Tumor Type',
      dataType: 'Data Type',
      doAssign: 'Do Assign',
      doMva: 'Do MVA',
      liteFormat: 'Lite Format',
      checkMSI: 'Check MSI',
      uploadText: 'Click this area to upload',
      uploadHint: 'Support for a single VCF file or MAF file upload.',
      taskHistory: 'Task History',
      download: 'Download',
      helpDocumentation: 'Help Documentation',
      fileName: 'File Name',
      createdTime: 'Created Time',
      status: 'Status',
      result: 'Result'
    }
  },
  account: {
    login: {
      accountLogin: 'Account Login',
      usernamePasswordInValid: 'Username or password is not valid',
      inputUsername: 'Please enter your username.',
      inputPassword: 'Please enter your password.',
      register: 'Register',
      forgetPassword: 'Forget Password',
      loginBtn: 'Login'
    }
  },
  // Components
  components: {
    tools: {
      userMenu: {
        tour: 'Tour',
        feedback: 'Feedback',
        policies: 'Policies',
        documentation: 'Documentation',
        userCenter: 'User Center',
        settings: 'Settings',
        logout: 'Logout'        
      }
    },
    globalFooter: {
      copyright: 'Copyright',
      companyName: 'The Genius Medicine Consortium'
    }
  },
  // Layouts
  layouts: {
    userLayout: {
      dataPolicies: 'Data Policies',
      help: 'Help',
      feedback: 'Feedback',
      terms: 'Terms',
      copyright: 'Copyright ©️2021 The Genius Medicine Consortium'
    },
    pageView: {
      search: 'Search',
      searchPlaceholder: 'Please Enter...'
    }
  }
}
