<template>
  <div class="service-settings-info-view">
    <a-row :gutter="16" style="margin: 0px 0px;">
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
            <!-- TService -->
            <a-col :span="12">
              <a-form-item label="Service Host / Domain for TService(tools)">
                <a-input
                  :placeholder="placeholder"
                  v-decorator="['tServiceHost', {initialValue: tServiceHost, rules:[{required: true, message: 'Please enter a service host or domain, e.g. http://10.157.72.53'}]}]"
                />
              </a-form-item>
            </a-col>
            <!-- DataSeq -->
            <a-col :span="12">
              <a-form-item label="Service Host / Domain for Omics Data Commons">
                <a-input
                  :placeholder="placeholder"
                  v-decorator="['dataSeqHost', {initialValue: dataSeqHost, rules:[{required: true, message: 'Please enter a service host or domain, e.g. http://10.157.72.53'}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <!-- Component Settings -->
            <a-col :span="12">
              <a-form-item label="Disable ContextMenu for FileBrowser?">
                <a-select
                  v-decorator="['disabledContextMenu', {initialValue: componentSettings.disabledContextMenu}]"
                >
                  <a-select-option value="true">Yes</a-select-option>
                  <a-select-option value="false">No</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="Disable Exploratory Component?">
                <a-select
                  v-decorator="['disabledExploratory', {initialValue: componentSettings.disabledExploratory}]"
                >
                  <a-select-option value="true">Yes</a-select-option>
                  <a-select-option value="false">No</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="Which dashboard?">
                <a-select
                  v-decorator="['dashboardName', {initialValue: componentSettings.dashboardName}]"
                >
                  <a-select-option value="QuartetDashboard">Quartet Dashboard</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item>
            <a-button html-type="submit">Save</a-button>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-row>
  </div>
</template>

<script>
import {
  initSeqFlowHost,
  saveSeqFlowHost,
  initTServiceHost,
  saveTServiceHost,
  initDataSeqHost,
  saveDataSeqHost,
  initComponentSettings,
  saveComponentSettings
} from '@/config/defaultSettings'

export default {
  components: {},
  data() {
    return {
      form: this.$form.createForm(this),
      placeholder: 'Which service do you want to connect to?',
      confirmLoading: false,
      seqFlowHost: initSeqFlowHost(),
      tServiceHost: initTServiceHost(),
      dataSeqHost: initDataSeqHost(),
      componentSettings: initComponentSettings()
    }
  },
  methods: {
    handleSubmit() {
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

          // DataSeq
          saveDataSeqHost(values.dataSeqHost)

          // Component Settings
          saveComponentSettings({
            disabledContextMenu: values.disabledContextMenu,
            disabledExploratory: values.disabledExploratory
          })

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
