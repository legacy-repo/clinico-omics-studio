<template>
  <div>
    <a-form-model ref="projectForm" :model="projectData" :rules="rules" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-model-item
        :label="$t('workflow.stepForm.step1.projectName')"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        prop="projectName"
        ref="projectName"
      >
        <a-input
          v-model="projectData.projectName"
          @blur="() => {$refs.projectName.onFieldBlur()}"
          :placeholder="$t('workflow.stepForm.step1.enterProjectName')"/>
      </a-form-model-item>
      <a-form-model-item
        :label="$t('workflow.stepForm.step1.description')"
        :labelCol="labelCol"
        ref="description"
        prop="description"
        :wrapperCol="wrapperCol">
        <a-textarea
          rows="4"
          v-model="projectData.description"
          :placeholder="$t('workflow.stepForm.step1.enterProjectDescription')"
          @blur="() => {$refs.description.onFieldBlur()}"/>
      </a-form-model-item>
      <a-form-model-item
        :label="$t('workflow.stepForm.step1.startedTime')"
        prop="createdTime"
        ref="createdTime"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <a-date-picker
          allowClear
          v-model="projectData.createdTime"
          name="createdTime"
          style="width: 100%"
          show-time
          format="YYYY-MM-DD HH:mm:ss"  
        />
      </a-form-model-item>
      <a-form-model-item
        :label="$t('workflow.stepForm.step1.group')"
        prop="group"
        ref="group"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input
          v-model="projectData.group"
          :style="{width: 'calc(100% - 120px)'}"
          v-decorator="['group', { initialValue: 'Fudan University', rules: [{required: true, message: 'Group is required'}]}]"
        />
      </a-form-model-item>
      <a-form-model-item
        :label="$t('workflow.stepForm.step1.choppyApp')"
        prop="appId"
        ref="appId"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          :placeholder="$t('workflow.stepForm.step1.chooseAppPlaceholder')"
          v-model="projectData.appId">
          <a-select-option :value="item.id" v-for="item in installedApps" :key="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item :wrapperCol="{span: 19, offset: 5}">
        <a-button type="primary" @click="nextStep('projectForm')">{{ $t('workflow.stepForm.step1.next') }}</a-button>
      </a-form-model-item>
    </a-form-model>
    <a-divider />
    <div class="step-form-style-desc">
      <h3>Notice</h3>
      <h4>Benchmark based on source data</h4>
      <p>You need to choose a choppy app which can handle source data, such as fastq, bam etc.</p>
      <h4>Benchmark based on result data</h4>
      <p>You need to choose a choppy app which can handle result data, such as vcf, matrix table etc.</p>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions } from 'vuex'
import orderBy from 'lodash.orderby'
import filter from 'lodash.filter'
import moment from 'moment'
import Vue from 'vue'
import { FormModel } from 'ant-design-vue'

Vue.use(FormModel)

export default {
  name: 'Step1',
  props: {
    appId: {
      required: false,
      type: String
    }
  },
  data () {
    return {
      labelCol: { lg: { span: 6 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 18 }, sm: { span: 19 } },
      installedApps: [],
      projectData: {},
      rules: {
        projectName: [
          { required: true, message: 'Please input project name.', trigger: 'blur' },
          { min: 5, max: 32, message: 'Length should be 5 to 32', trigger: 'blur' },
          { pattern: /^[a-zA-Z_]+[0-9a-zA-Z]+$/, message: 'Project name is not valid, only support [a-z0-9A-Z_]', trigger: 'blur' },
          { validator: this.existProject, trigger: 'blur' }
        ],
        description: [
          { required: true, message: 'Please input project description.', trigger: 'blur', whitespace: true }
        ],
        createdTime: [
          { required: true, message: 'Please select started time.', trigger: 'blur' }
        ],
        group: [
          { required: true, message: 'Please input group name.', trigger: 'blur', whitespace: true }
        ],
        appId: [
          { required: true, message: 'Please select choppy app.', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      getInstalledAppList: 'GetInstalledAppList',
      getAppList: 'GetAppList',
      checkProject: 'ExistProject'
    }),
    existProject (rule, value, callback) {
      this.checkProject(value).then(result => {
        if (result.total > 0) {
          callback(new Error('Project name exist!'))
        } else {
          callback()
        }
      }).catch(error => {
        console.log('existProject: ', error)
        callback()
      })
    },
    getInstalledApps () {
      this.getInstalledAppList().then(res => {
        console.log('res', res)
        this.installedApps = orderBy(res.data, [item => {
          item.name.toLowerCase()
        }], ['asc'])
      })
    },
    loadLocalData () {
      const localData = JSON.parse(localStorage.getItem('datains_PROJECT_DATA'))
      if (localData) {
        // localData.createdTime = moment(localData.createdTime)
        localData.createdTime = moment()  // Keep the createdTime with now().
        return localData
      } else {
        return {
          createdTime: moment(),
          group: 'Choppy Team'
        }
      }
    },
    nextStep (formName) {
      this.$refs[formName].validate(valid => {
        // 先校验，通过表单校验后，才进入下一步
        if (valid) {
          const app = filter(this.installedApps, (o) => { return o.id == this.projectData.appId })
          console.log('Project information: ', this.projectData, app)
          localStorage.setItem('datains_PROJECT_DATA', JSON.stringify({
            ...this.projectData,
            appName: app[0].name,
            author: 'Choppy'
          }))
          this.$emit('nextStep')
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }
  },
  created () {
    this.getInstalledApps()
    this.projectData = this.loadLocalData()
    if (this.appId) {
      this.projectData.appId = this.appId
    }
  }
}
</script>

<style lang="less" scoped>
.step-form-style-desc {
  padding: 0 56px;
  color: rgba(0,0,0,.45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0,0,0,.45);
    font-size: 16px;
    line-height: 32px;
  }

  h4 {
    margin: 0 0 4px;
    color: rgba(0,0,0,.45);
    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}
</style>
