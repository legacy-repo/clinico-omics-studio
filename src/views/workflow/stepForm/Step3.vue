<template>
  <div>
    <a-row class="info">
      <a-col :sm="18" :xs="19" :md="19" :lg="20" class="project-info">
        <a-row v-for="(value, key) in projectData" :key="key">
          <a-col :sm="8" :xs="24">{{ formatKey(key) }}</a-col>
          <a-col :sm="16" :xs="24">{{ value }}</a-col>
        </a-row>
      </a-col>
      <a-col :sm="5" :xs="4" :md="4" :lg="3" class="btn-group">
        <a-button block type="default" @click="prevStep">Previous Step</a-button>
        <a-button block type="default" @click="showJobs">Show Jobs</a-button>
        <a-button block type="default" @click="showProjects">Show Projects</a-button>
        <a-button block type="primary" @click="submitProject">Submit Project</a-button>
      </a-col>
    </a-row>
    <argument-table :header="header" :body="body"></argument-table>
  </div>
</template>

<script>
import v from 'voca'
import { Result } from '@/components'
import ArgumentTable from '@/views/workflow/stepForm/ArgumentTable'

export default {
  name: 'Step3',
  components: {
    Result,
    ArgumentTable
  },
  data () {
    return {
      projectData: {},
      header: [],
      body: []
    }
  },
  methods: {
    loadAppData () {
      const appData = JSON.parse(localStorage.getItem('appData'))
      const sampleIds = JSON.parse(localStorage.getItem('sampleIds'))
      const tableHeader = Object.keys(appData)

      if (!(sampleIds && appData)) {
        this.prevStep()
      }

      var tableBody = []
      for (const idx in sampleIds) {
        const record = []
        for (const key of tableHeader) {
          if (typeof appData[key] === 'object') {
            record.push(appData[key][idx])
          } else {
            if (key === 'sample_id') {
              record.push(sampleIds[idx])
            } else {
              record.push(appData[key])
            }
          }
        }

        tableBody.push(record)
      }

      console.log('Argument Table: ', appData, tableBody, tableHeader)

      return {
        header: tableHeader,
        body: tableBody
      }
    },
    loadProjectData () {
      const projectData = JSON.parse(localStorage.getItem('projectData'))
      if (projectData) {
        return projectData
      } else {
        this.prevStep()
      }
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
    submitProject () {
      const finalData = JSON.parse(localStorage.getItem('finalData'))
      const data = {
        projectData: this.projectData,
        jobData: finalData
      }
      console.log('Submit Project: ', data)
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
  padding: 24px 40px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.btn-group {
  margin: 0px auto;

  .ant-btn {
    margin-bottom: 5px;
  }
}
</style>
