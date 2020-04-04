<template>
  <div>
    <form-builder ref="form" :fields="fields" @action="onAction" @update="onUpdate"></form-builder>
    <prism language="markdown" :code="helpMsg"></prism>
  </div>
</template>

<script>
import appSchema from '@/appschema'
import v from 'voca'
import FormBuilder from '@/views/formbuilder/FormBuilder'
import Prism from 'vue-prismjs'
import 'prismjs/themes/prism.css'

export default {
  name: 'Step2',
  data () {
    return {
      fields: [],
      helpMsg: ''
    }
  },
  methods: {
    formatSchema (appName) {
      const cleanedAppName = appName.replace(/[\W_]+/g, ' ')
      const schemaName = v.camelCase(cleanedAppName)
      return schemaName
    },
    loadAppSchema (appName) {
      const schemaName = this.formatSchema(appName)
      console.log('App Schema Name: ', schemaName)
      return appSchema[schemaName].fields
    },
    loadHelpMsg (appName) {
      const schemaName = this.formatSchema(appName)
      return appSchema[schemaName].help
    },
    onUpdate (data) {
      console.log('FormBuilder: ', data)
    },
    loadLocalData () {
      const appData = JSON.parse(localStorage.getItem('datains_APP_DATA'))
      const projectData = JSON.parse(localStorage.getItem('datains_PROJECT_DATA'))
      if (projectData) {
        return {
          appData: appData,
          projectData: projectData
        }
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
        if (idx < 0) {
          return appSchema
        } else if (appSchema[idx].config) {
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
        localStorage.setItem('datains_APP_DATA', JSON.stringify(e.formData))
        localStorage.setItem('datains_SAMPLE_IDS', JSON.stringify(e.sampleIds))
        this.nextStep()
      }
    }
  },
  created () {
    const localData = this.loadLocalData()
    const appName = localData.projectData.appName
    this.helpMsg = this.loadHelpMsg(appName)
    this.fields = this.initSchema(this.loadAppSchema(appName), localData.appData)
  },
  components: {
    FormBuilder,
    Prism
  }
}
</script>

<style lang="less" scoped>
.a-form-builder {
  margin-top: 30px;
}

pre {
  max-width: 800px;
  margin: 0px auto;
  background-color: #eff0f1;
  border-radius: 5px;
}
</style>
