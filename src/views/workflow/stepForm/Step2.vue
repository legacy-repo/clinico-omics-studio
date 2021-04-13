<template>
  <div>
    <a-button class="help-btn" type="primary" shape="circle" icon="question" @click="toggleHelp" />
    <form-builder :fields="fields" @action="onAction" @update="onUpdate"></form-builder>
    <a-drawer
      :title="helpTitle"
      class="help-viewer"
      placement="right"
      width="500"
      :get-container="false"
      :wrap-style="{ position: 'absolute' }"
      :mask="false"
      :closable="true"
      :visible="visible"
      @close="toggleHelp"
    >
      <vue-markdown :source="helpMsg" @rendered="update"></vue-markdown>
    </a-drawer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import v from 'voca'
import FormBuilder from '@/views/formbuilder/FormBuilder'
import VueMarkdown from 'vue-markdown'
import Prism from 'prismjs'

export default {
  name: 'Step2',
  data () {
    return {
      fields: [],
      formMode: 'batch',
      helpMsg: '',
      visible: false,
      helpTitle: this.$t('workflow.stepForm.step2.helpTitle')
    }
  },
  methods: {
    ...mapActions({
      getAppSchema: 'GetAppSchema',
      getHelpMsg: 'GetHelpMsg'
    }),
    update () {
      this.$nextTick(() => {
        Prism.highlightAll()
      })
    },
    toggleHelp () {
      this.visible = !this.visible
    },
    formatSchema (appName) {
      const cleanedAppName = appName.replace(/[\W_]+/g, ' ')
      const schemaName = v.camelCase(cleanedAppName)
      return schemaName
    },
    loadAppSchema (appName, localData) {
      this.getAppSchema(appName).then(response => {
        this.fields = this.initSchema(response.fields, localData.appData)
        this.formMode = response.formMode
      })
    },
    loadHelpMsg (appName) {
      this.getHelpMsg(appName).then(response => {
        this.helpMsg = response
        // console.log('loadHelpMsg: ', response)
      }).catch(error => {
        this.helpMsg = 'No help document.'
        console.log('loadHelpMsg Error: ', error)
      })
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
        localStorage.setItem('datains_formMode', this.formMode)
        this.nextStep()
      }
    }
  },
  created () {
    const localData = this.loadLocalData()
    const appName = localData.projectData.appName
    this.helpTitle = appName
    this.loadHelpMsg(appName)
    this.loadAppSchema(appName, localData)
  },
  components: {
    FormBuilder,
    VueMarkdown
  }
}
</script>

<style lang="less" scoped>
.a-form-builder {
  margin-top: 30px;
}

.help-btn {
  position: fixed;
  right: 15%;
  width: 32px;
  height: 32px;
  z-index: 10;
}

.help-btn:hover {
  cursor: pointer;
}

pre {
  max-width: 800px;
  margin: 0px auto;
  background-color: #eff0f1;
  border-radius: 5px;
}
</style>

<style lang="less">
blockquote {
  border-left: 4px solid #CCC;
  padding-left: 16px;
}
</style>

<style lang="less">
.help-viewer {
  .ant-drawer {
    z-index: 10;
  }
}
</style>
