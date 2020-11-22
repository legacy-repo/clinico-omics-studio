<template>
  <a-row class="modal-container">
    <a-row style="margin-bottom: 5px;">
      <a-checkbox @change="onCheck" :checked="demoActive" style="float: right;">Show Demo?</a-checkbox>
    </a-row>
    <a-row class="modal">
      <a-row class="form-item">
        <a-col class="label" :span="24" style="padding-bottom: 8px">
          <span class="ant-form-item-required">
            <b>Data File &nbsp;</b>
          </span>
          <a-tooltip placement="top">
            <template slot="title">
              <span>Where is the data file?</span>
            </template>
            <a-icon type="question-circle" />
          </a-tooltip>
        </a-col>
        <a-col class="content" :span="24">
          <a-button @click="selectFiles" :disabled="demoActive || inFileBrowser">
            <a-icon type="plus" />Select Files
          </a-button>
          <a-input
            placeholder="File Path"
            disabled
            :value="selectedFilePath"
            style="margin-top: 5px;"
          />
        </a-col>
      </a-row>
      <a-row class="form-item" v-if="!demoActive && fields.length > 0">
        <form-builder ref="form" :fields="fields" @action="onAction"></form-builder>
      </a-row>
      <a-row v-if="demoActive" class="form-item">
        <a-button-group style="float: right;">
          <a-button @click="onAction({type: 'cancel'})">Cancel</a-button>
          <a-button @click="onAction({type: 'submit', formData: {}})">Confirm</a-button>
        </a-button-group>
      </a-row>
    </a-row>
    <popup-file-browser
      filterType=".*.csv"
      @select-files="confirmSelectFiles"
      @cancel-select-files="cancelSelectFiles"
      v-if="fileManagerActive"
    ></popup-file-browser>
  </a-row>
</template>

<script>
import { mapActions } from 'vuex'
import FormBuilder from '@/views/formbuilder/FormBuilder'
import PopupFileBrowser from '@/views/filemanager/PopupFileBrowser'

export default {
  components: {
    FormBuilder,
    PopupFileBrowser
  },
  props: {
    chart: {
      required: true,
      type: String
    },
    inFileBrowser: {
      required: false,
      type: Boolean,
      default: false
    },
    filepath: {
      required: false,
      type: String,
      default: ''
    }
  },
  data() {
    return {
      demoActive: true,
      fields: [],
      selected: [],
      selectedFilePath: null,
      multiple: false,
      filterType: 'csv',
      fileManagerActive: false
    }
  },
  watch: {},
  methods: {
    ...mapActions({
      createChart: 'CreateChart',
      getChartSchema: 'GetChartSchema'
    }),
    onCheck(e) {
      this.demoActive = e.target.checked
      if (!this.demoActive && this.filepath.length > 0) {
        const filePath = this.filepath
        this.loadChartSchema(filePath)
      }
    },
    selectFiles() {
      this.fileManagerActive = !this.fileManagerActive
    },
    cancelSelectFiles() {
      this.fileManagerActive = !this.fileManagerActive
    },
    loadChartSchema(filePath) {
      this.selectedFilePath = filePath
      this.getChartSchema({ chart: this.chart, filepath: filePath })
        .then(response => {
          this.fields = response.fields
        })
        .catch(error => {
          console.log('Unknown error: ', error)
          this.$message.warning('Unknown error, please retry later.')
        })
    },
    confirmSelectFiles(filePathList) {
      this.fileManagerActive = false
      this.loadChartSchema(filePathList)
    },
    makeChart(src) {
      this.$router.push({
        name: 'embeded-frame',
        query: { src: src }
      })
    },
    cancel() {
      this.$emit('cancel')
    },
    onAction(e) {
      if (e.type === 'cancel') {
        this.cancel()
      } else if (e.type === 'submit') {
        this.createChart({
          chart: this.chart,
          data: {
            dataFile: this.filepath,
            dataType: 'csv'
          },
          attributes: {
            ...e.formData
          }
        })
          .then(response => {
            console.log('onAction: ', response)
            this.makeChart(response.access_url)
          })
          .catch(error => {
            console.log('onAction Error: ', error)
            this.$message.warning('Unknown Error.')
          })
        this.$emit('ok')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.modal-container {
  .modal {
    max-height: 350px;
    overflow: scroll;

    .form-item {
      width: 60%;
      min-width: 450px;
      margin: 0px 11px 10px 11px;
    }
  }

  .box {
    position: absolute;
    top: 10px;
  }
}
</style>