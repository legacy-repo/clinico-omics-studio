<template>
  <form-builder ref="form" :fields="fields" @action="onAction" @update="onUpdate"></form-builder>
</template>

<script>
import appSchema from '@/appschema'
import FormBuilder from '@/components/FormBuilder'

export default {
  name: 'Step2',
  data () {
    return {
      fields: []
    }
  },
  methods: {
    loadAppSchema (appName) {
      return appSchema.huangyechaoAnnovarLatest.fields
    },
    onUpdate (data) {
      console.log('FormBuilder: ', data)
    },
    loadLocalData () {
      const appData = JSON.parse(localStorage.getItem('appData'))
      const projectData = JSON.parse(localStorage.getItem('projectData'))
      if (projectData) {
        return appData
      } else {
        this.prevStep()
      }
    },
    prevStep () {
      this.$emit('prevStep')
    },
    nextStep () {
      this.$emit('nextStep')
    },
    initSchema (appSchema, initData) {
      for (const key in initData) {
        const idx = appSchema.findIndex((element) => element.model === key)
        if (appSchema[idx].config) {
          appSchema[idx].config.initialValue = initData[key]
        }
      }

      console.log('appSchema: ', appSchema, initData)
      return appSchema
    },
    onAction (e) {
      if (e.type === 'cancel') {
        this.prevStep()
      } else if (e.type === 'submit') {
        localStorage.setItem('appData', JSON.stringify(e.formData))
        localStorage.setItem('sampleIds', JSON.stringify(e.sampleIds))
        this.nextStep()
      }
    }
  },
  created () {
    this.fields = this.initSchema(this.loadAppSchema(), this.loadLocalData())
  },
  components: {
    FormBuilder
  }
}
</script>

<style lang="less" scoped>
.a-form-builder {
  margin-top: 30px;
}
</style>
