<template>
  <div>
    <a-row class="info" :gutter="10" style="margin-left: 0px">
      <a-col :sm="18" :xs="19" :md="19" :lg="20" class="project-info">
        <a-row v-for="(value, key) in projectData" :key="key">
          <a-col :sm="8" :xs="24">{{ formatKey(key) }}</a-col>
          <a-col :sm="16" :xs="24">{{ value }}</a-col>
        </a-row>
      </a-col>
      <a-col :sm="6" :xs="5" :md="5" :lg="4" class="btn-group">
        <a-button block type="default" @click="prevStep">Previous Step</a-button>
        <a-button block type="default" @click="showJobs">Show Jobs</a-button>
        <a-button block type="default" @click="showProjects">Show Projects</a-button>
        <a-button block type="primary" @click="postProject">Submit Project</a-button>
      </a-col>
    </a-row>
    <argument-table :header="header" :body="body" v-if="formMode === 'batch'"></argument-table>
    <argument-json :header="header" :body="body" v-else></argument-json>
  </div>
</template>

<script>
import v from 'voca'
import zipObject from 'lodash.zipobject'
import { Result } from '@/components'
import ArgumentTable from '@/views/workflow/stepForm/ArgumentTable'
import ArgumentJson from '@/views/workflow/stepForm/ArgumentJson'
import { mapActions } from 'vuex'
import filter from 'lodash.filter'

export default {
  name: 'Step3',
  components: {
    Result,
    ArgumentTable,
    ArgumentJson
  },
  data () {
    return {
      projectData: {},
      header: [],
      body: [],
      formMode: 'batch'
    }
  },
  methods: {
    ...mapActions({
      submitProject: 'SubmitProject'
    }),
    getResetIdx (current, length) {
      if (current < length) {
        return current
      } else {
        return this.getResetIdx(current - length, length)
      }
    },
    loadAppData () {
      const appData = JSON.parse(localStorage.getItem('datains_APP_DATA'))
      const sampleIds = JSON.parse(localStorage.getItem('datains_SAMPLE_IDS'))
      const formMode = localStorage.getItem('datains_formMode')

      if (formMode === 'batch') {
        const tableHeader = Object.keys(appData)

        if (!(sampleIds && appData)) {
          this.prevStep()
        }

        var tableBody = []
        for (const idx in sampleIds) {
          const record = []
          for (const key of tableHeader) {
            if (typeof appData[key] === 'object') {
              const length = appData[key].length
              if (idx >= length) {
                const resetIdx = this.getResetIdx(idx, length)
                record.push(appData[key][resetIdx])
              } else {
                record.push(appData[key][idx])
              }
            } else {
              if (key === 'sample_id') {
                record.push(sampleIds[idx])
              } else {
                record.push(appData[key])
              }
            }
            // console.log('appData[key]: ', key, appData[key], record)
          }

          tableBody.push(record)
        }

        console.log('Argument Table: ', appData, tableBody, tableHeader)

        return {
          header: tableHeader,
          body: tableBody
        }
      } else {
        appData['sample_id'] = sampleIds[0]
        return {
          header: Object.keys(appData),
          body: appData
        }
      }
    },
    loadProjectData () {
      const projectData = JSON.parse(localStorage.getItem('datains_PROJECT_DATA'))
      if (projectData) {
        return projectData
      } else {
        this.prevStep()
      }
    },
    getFormMode () {
      return localStorage.getItem('datains_formMode')
    },
    showJobs () {
      this.$router.push({ name: 'job-management' })
    },
    showProjects () {
      this.$router.push({ name: 'project-management' })
    },
    prevStep () {
      this.$emit('prevStep')
    },
    finish () {
      this.$emit('finish')
    },
    filterData (data) {
      return filter(data, function (o) {
        return o.every(function (i) { return i == null }) === false
      })
    },
    formatSamples (header, body, formMode) {
      const samples = []
      const filteredBody = this.filterData(body)

      if (formMode === 'batch') {
        for (const record of filteredBody) {
          const sample = zipObject(header, record)
          samples.push(sample)
        }
      } else {
        samples.push(filteredBody)
      }

      console.log('formatSamples: ', samples, header, body, filteredBody)
      return samples
    },
    prepareJobData () {
      const finalData = JSON.parse(localStorage.getItem('datains_FINAL_APP_DATA'))
      const appData = this.loadAppData()
      let samples = []

      if (finalData && finalData.body) {
        samples = this.formatSamples(finalData.header, finalData.body, this.formMode)
      } else {
        samples = this.formatSamples(appData.header, appData.body, this.formMode)
      }

      return samples
    },
    postProject () {
      const data = {
        ...this.projectData,
        samples: this.prepareJobData()
      }

      this.submitProject(data).then(result => {
        console.log('postProject: ', result)
        this.$message.success('Create Project Successfully.')
        this.$emit('finished', result)
      }).catch(error => {
        console.log('postProject: ', error)
        this.$message.error('Unkonwn Error, Please Check Your Input.')
      })
    },
    formatKey (key) {
      return v.titleCase(key)
    }
  },
  created () {
    this.projectData = this.loadProjectData()
    const appData = this.loadAppData()
    this.header = appData.header
    this.body = appData.body
    this.formMode = this.getFormMode()
  }
}
</script>

<style lang="less" scoped>
.info {
  display: flex;
  flex-direction: row;
  margin: 10px 0px;
}

.project-info {
  padding: 24px 40px !important;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.json-viewer {
  height: 400px;
}

.btn-group {
  margin: 0px auto;

  .ant-btn {
    margin-bottom: 5px;
  }
}
</style>
