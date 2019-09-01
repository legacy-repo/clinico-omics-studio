<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="Project Name"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            'name',
            {rules: [{ required: true, message: 'Please Enter Project Name' }]}
          ]"
          name="name"
          placeholder="Please Enter Project Name" />
      </a-form-item>
      <a-form-item
        label="Started Time"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
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
        label="Description"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-textarea
          rows="4"
          placeholder="Please enter a description of the project"
          v-decorator="[
            'description',
            {rules: [{ required: true, message: 'Please enter a description of the project' }]}
          ]" />
      </a-form-item>
      <a-form-item
        label="Owner"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          placeholder="Choose your name"
          v-decorator="[
            'customer',
            {rules: [{ required: true, message: 'Please enter your name' }]}
          ]" />
      </a-form-item>
      <a-form-item
        label="Team"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        :required="false"
      >
        <a-input placeholder="Please enter your team name" />
      </a-form-item>
      <a-form-item
        label="Upload"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        :required="true">
        <div class="dropbox">
          <a-upload-dragger
            v-decorator="['dragger', {
              valuePropName: 'fileList',
              getValueFromEvent: normFile,
            }]"
            name="files"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            list-type="picture"
          >
            <p class="ant-upload-drag-icon">
              <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p class="ant-upload-hint">
              Support for a single or bulk upload.
            </p>
          </a-upload-dragger>
        </div>
      </a-form-item>
      <a-form-item
        label="Permission"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        :required="false"
        help="Default: Private"
      >
        <a-radio-group v-model="value">
          <a-radio :value="1">Public</a-radio>
          <a-radio :value="2">Private</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
        <a-button htmlType="submit" type="primary">Submit</a-button>
        <a-button style="margin-left: 8px">Save</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
export default {
  name: 'BaseForm',
  data () {
    return {
      description: 'Upload metadata file and match related source data ( you can upload large file via <a href="http://docs.3steps.cn/docs/datains/datains-intro.html#%E4%B8%8B%E8%BD%BD%E5%B9%B6%E5%AE%89%E8%A3%85-datains-browser" target="_blank"><b>Datains Browser</b></a> / <a href="http://docs.3steps.cn/docs/datains/datains-intro.html#ossutil" target="_blank"><b>Fast File Transfer</b></a> ).',
      value: 2,
      // form
      form: this.$form.createForm(this)

    }
  },
  methods: {
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // eslint-disable-next-line no-console
          console.log('Received values of form: ', values)
        }
      })
    },
    normFile (e) {
      console.log('Upload event:', e)
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    }
  }
}
</script>

<style lang="less" scoped>
.dropbox {
  line-height: 1.5;
}
</style>
