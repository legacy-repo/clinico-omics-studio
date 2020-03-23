<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="Project Name"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input
          placeholder="Please enter your project name"
          @blur="validateProjectNameBlur"
          v-decorator="['projectName', { rules: [{required: true, message: 'Project name is required'}] }]" />
      </a-form-item>
      <a-form-item
        label="Description"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <a-textarea
          rows="4"
          placeholder="Please enter a description of the project"
          v-decorator="[
            'description',
            {rules: [{ required: true, message: 'Please enter a description of the project' }]}
          ]" />
      </a-form-item>
      <a-form-item
        label="Started Time"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <a-date-picker
          allowClear
          name="buildTime"
          style="width: 100%"
          v-decorator="[
            'buildTime',
            {initialValue: now(),
             rules: [{ required: true, message: 'Please choose started time' }]}
          ]"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
        />
      </a-form-item>
      <a-form-item
        label="Group"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input-group
          style="display: inline-block; vertical-align: middle"
          :compact="true"
        >
          <a-input
            :style="{width: 'calc(100% - 120px)'}"
            v-decorator="['group', { initialValue: 'Fudan University', rules: [{required: true, message: 'Group is required'}]}]"
          />
        </a-input-group>
      </a-form-item>
      <a-form-item
        label="Choppy App"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          placeholder="Please choose a choppy app"
          v-decorator="['choppyApp', { rules: [{required: true, message: 'Choppy app is required'}] }]">
          <a-select-option :value="item.id" v-for="item in installed_apps" :key="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button type="primary" @click="nextStep">Next</a-button>
      </a-form-item>
    </a-form>
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
import { getInstalledAppList, existProjectName } from '@/api/manage'
import orderBy from 'lodash.orderby'
import moment from 'moment'

export default {
  name: 'Step1',
  data () {
    return {
      labelCol: { lg: { span: 6 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 18 }, sm: { span: 19 } },
      installed_apps: [],
      form: this.$form.createForm(this)
    }
  },
  methods: {
    now () {
      return moment(new Date(), 'YYYY-MM-DD HH:mm:ss')
    },
    validateProjectNameBlur (e) {
      const validateProjectNameReg = /^[a-zA-Z_]+[0-9a-zA-Z]+$/
      var arr = []
      if (e.target.value && (!validateProjectNameReg.test(e.target.value) || e.target.value.length < 5)) {
        arr = [{
          message: 'Project name is not valid, only support [a-z0-9A-Z_] and at least five chars!',
          field: 'projectName'
        }]
      }

      // TODO: Check if project name exists.
      if (existProjectName(e.target.value)) {
        arr = [{
          message: 'The project name exists!',
          field: 'projectName'
        }]
      }

      if (arr.length > 0) {
        this.form.setFields({ projectName: { value: e.target.value, errors: arr } })
      }
    },
    getInstalledApps () {
      getInstalledAppList().then(res => {
        console.log('res', res)
        this.installed_apps = orderBy(res.data, [item => {
          item.name.toLowerCase()
        }], ['asc'])
      })
    },
    nextStep () {
      const { form: { validateFields } } = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        if (!err) {
          console.log('Project information: ', values)
          this.$emit('nextStep')
          this.$emit('projectData', values)
        }
      })
    }
  },
  created () {
    this.getInstalledApps()
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
