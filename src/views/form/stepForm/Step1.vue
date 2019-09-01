<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="Project Name"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          placeholder="Please enter your project name"
          v-decorator="['projectName', { rules: [{required: true, message: 'Project name is required'}] }]">
          <a-select-option value="quartet">Quartet</a-select-option>
        </a-select>
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
          name="buildTime"
          style="width: 100%"
          v-decorator="[
            'buildTime',
            {rules: [{ required: true, message: 'Please choose started time' }]}
          ]"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
        />
      </a-form-item>
      <a-form-item
        label="Corporation"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input-group
          style="display: inline-block; vertical-align: middle"
          :compact="true"
        >
          <a-select defaultValue="alipay" style="width: 120px">
            <a-select-option value="alipay">Company</a-select-option>
            <a-select-option value="wexinpay">Organization</a-select-option>
          </a-select>
          <a-input
            :style="{width: 'calc(100% - 120px)'}"
            v-decorator="['payType', { initialValue: 'Fudan University', rules: [{required: true, message: 'Corporation is required'}]}]"
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
          <a-select-option value="Quality_control">Quality_control</a-select-option>
          <a-select-option value="RNAseq_Variant_Calling">RNAseq_Variant_Calling</a-select-option>
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
export default {
  name: 'Step1',
  data () {
    return {
      labelCol: { lg: { span: 6 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 18 }, sm: { span: 19 } },
      form: this.$form.createForm(this)
    }
  },
  methods: {
    nextStep () {
      const { form: { validateFields } } = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        if (!err) {
          this.$emit('nextStep')
        }
      })
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
