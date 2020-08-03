<template>
  <div class="service-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <a-spin :spinning="confirmLoading">
          <a-form layout="vertical" :form="form" @submit="handleSubmit">
            <!-- SeqFlow -->
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item label="Service Host / Domain for SeqFlow(Pipeline)">
                  <a-input
                    :placeholder="placeholder"
                    v-decorator="['seqFlowHost', {initialValue: seqFlowHost, rules:[{required: true, message: 'Please enter a service host or domain, e.g. http://10.157.72.53'}]}]"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <!-- TService -->
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item label="Service Host / Domain for TService(tools)">
                  <a-input
                    :placeholder="placeholder"
                    v-decorator="['tServiceHost', {initialValue: tServiceHost, rules:[{required: true, message: 'Please enter a service host or domain, e.g. http://10.157.72.53'}]}]"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <!-- FileManager -->
            <!-- <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item label="Service Host / Domain for FileManager">
                  <a-input
                    :placeholder="placeholder"
                    v-decorator="['fileManagerHost', {initialValue: fileManagerHost, rules:[{required: true, message: 'Please enter a service host or domain, e.g. http://10.157.72.53'}]}]"
                  />
                </a-form-item>
              </a-col>
            </a-row> -->
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
import {
  initSeqFlowHost,
  saveSeqFlowHost,
  initTServiceHost,
  saveTServiceHost,
  initFileManagerHost,
  saveFileManagerHost
} from '@/utils/util'

export default {
  components: {},
  data () {
    return {
      form: this.$form.createForm(this),
      placeholder: 'Which service do you want to connect to?',
      confirmLoading: false,
      seqFlowHost: initSeqFlowHost(),
      tServiceHost: initTServiceHost(),
      fileManagerHost: initFileManagerHost()
    }
  },
  methods: {
    handleSubmit () {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('Save service into webstorage.', values)

          // SeqFlow
          saveSeqFlowHost(values.seqFlowHost)

          // TService
          saveTServiceHost(values.tServiceHost)

          // FileManager
          saveFileManagerHost(values.fileManagerHost)

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
