<template>
  <div class="service-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <a-spin :spinning="confirmLoading">
          <a-form layout="vertical" :form="form" @submit="handleSubmit">
            <a-form-item label="Service Host / Domain">
              <a-input :placeholder="placeholder" v-decorator="['service', {initialValue: localServiceHost, rules:[{required: true, message: 'Please enter a service host or domain, e.g. http://10.157.72.53'}]}]" />
            </a-form-item>
            <a-form-item label="Endpoint Prefix">
              <a-input placeholder="e.g. /api" v-decorator="['prefix', {initialValue: localEndpointPrefix, rules:[{required: true, message: 'Please enter a endpoint prefix, e.g. /api'}]}]" />
            </a-form-item>
            <a-form-item>
              <a-button style="margin-left: 8px" html-type="submit">Save</a-button>
            </a-form-item>
          </a-form>
        </a-spin>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { serviceHost, saveServiceHost, endpointPrefix, saveEndpointPrefix } from '@/utils/util'

export default {
  components: {},
  data () {
    return {
      form: this.$form.createForm(this),
      placeholder: 'Which service do you want to connect to?',
      confirmLoading: false,
      localServiceHost: serviceHost() || 'http://localhost:3000',
      localEndpointPrefix: endpointPrefix() || '/api'
    }
  },
  methods: {
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('Save service into webstorage.', values)

          saveEndpointPrefix(values.prefix)
          saveServiceHost(values.service)

          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            this.$message.success('Save Successfully!')
            this.$emit('ok', values)
          }, 500)
        } else {
          this.confirmLoading = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
