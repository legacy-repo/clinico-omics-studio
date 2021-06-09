<template>
  <a-row class="task-submitter">
    <a-col class="uploader">
      <a-divider style="margin: 0px 0px 16px;">Upload VCF Files</a-divider>
      <a-upload-dragger 
        :disabled="uploadSuccessList.length === 2"
        :remove="handleRemove" 
        :multiple="true"
        :beforeUpload="beforeUpload"
        :customRequest="uploadFile"
        @change="handleChange">
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-text">Click or drag file to this area to upload</p>
        <p class="ant-upload-hint">A maximum of 2 matched files can be uploaded at a time.</p>
      </a-upload-dragger>
      <p class="help-text">
        File naming conventions:
        <br />1. A file name can contain only UTF-8 characters. <br />2. A file name is case-sensitive. <br />3. A
        file name must be 1 to 1023 bytes in length. <br />4. A file name cannot start with a forward slash (/) or
        consecutive backslashes (\).
        <br />
      </p>
    </a-col>
    <a-col class="metadata-container">
      <a-divider style="margin: 0px 0px 16px;">Metadata for Personal Genome Interpreter</a-divider>
      <a-form :form="form" layout="vertical" @submit="submitModels">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="Patient ID">
              <a-input
                disabled
                v-decorator="['patient_id', { initialValue: patientId, rules: [{ required: true, message: 'Please input the patient id!' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Disease Type">
              <a-select
                v-decorator="[
                  'disease_type',
                  { initialValue: 'TNBC', rules: [{ required: true, message: 'Please select the disease type!' }] },
                ]"
                placeholder="Select a option and change input text above"
              >
                <a-select-option value="TNBC">
                  Triple Negtive Breast Cancer
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="VCF File (Germline)">
              <a-select
                v-decorator="[
                  'germline_file_name',
                  {
                    rules: [
                      { required: true, message: 'Please select your vcf file for germline!', type: 'string' },
                    ],
                  },
                ]"
                placeholder="Please select vcf file."
              >
                <a-select-option v-for="filename in uploadSuccessList" :key="filename" :value="filename">
                  {{ filename }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="VCF File (Somatic)">
              <a-select
                v-decorator="[
                  'somatic_file_name',
                  {
                    rules: [
                      { required: true, message: 'Please select your vcf file for somatic!', type: 'string' },
                    ],
                  },
                ]"
                placeholder="Please select vcf file."
              >
                <a-select-option v-for="filename in uploadSuccessList" :key="filename" :value="filename">
                  {{ filename }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Models">
              <a-select
                v-decorator="[
                  'models',
                  {
                    rules: [
                      { required: true, message: 'Please select your models!', type: 'array' },
                    ],
                  },
                ]"
                mode="multiple"
                placeholder="Please select models"
              >
                <a-select-option v-for="model in modelOptions" :key="model.label" :value="model.value">
                  {{ model.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Knowledge Database">
              <a-select
                v-decorator="[
                  'knowledge_database',
                  {
                    initialValue: 'pgi-v20210531',
                    rules: [
                      { required: true, message: 'Please select your knowledge database!', type: 'string' },
                    ],
                  },
                ]"
                placeholder="Please select the knowledge database"
              >
                <a-select-option v-for="db in knowledgeDbs" :key="db.label" :value="db.value">
                  {{ db.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-form-item class="action">
            <a-button @click="reset" style="margin-right: 5px;">Cancel</a-button>
            <a-button html-type="submit" type="primary" :disabled="submitBtnActive" :loading="loading">Submit</a-button>
          </a-form-item>
        </a-row>
      </a-form>
    </a-col>
  </a-row>
</template>

<script>
import axios from 'axios'
import map from 'lodash.map'
import { mapActions } from 'vuex'
import filter from 'lodash.filter'
import { submitPathologyAiTask } from '@/api/manage'

export default {
  data() {
    return {
      fileList: [],
      uploadSuccessList: [],
      form: this.$form.createForm(this, { name: 'coordinated' }),
      loading: false,
      modelOptions: [
        { label: 'SNV', value: 'SNV' },
        { label: 'CNV', value: 'CNV' },
        { label: 'SV', value: 'SV' }
      ],
      knowledgeDbs: [
        {
          label: 'PGI v20210531',
          value: 'pgi-v20210531'
        }
      ]
    }
  },
  watch: {
    uploadSuccessList(newValue, oldValue) {
      if (newValue.length === 2) {
        this.$message.success('The files have been successfully uploaded.')
      }
    }
  },
  computed: {
    patientId() {
      if (this.uploadSuccessList.length == 2) {
        return this.getFilePrefix(this.uploadSuccessList[0])
      } else {
        return ''
      }
    },
    submitBtnActive() {
      return this.uploadSuccessList.length !== 2
    },
    fileName() {
      if (this.uploadSuccessList.length == 2) {
        const filteredFiles = filter(this.uploadSuccessList, file => {
          return file.endsWith('ndpi')
        })

        if (filteredFiles.length === 1) {
          return filteredFiles[0]
        } else {
          return ''
        }
      } else {
        return ''
      }      
    }
  },
  methods: {
    ...mapActions({
      makeUploadUrl: 'MakeUploadUrl',
      getObjectMeta: 'GetObjectMeta'
    }),
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    reset() {
      this.fileList = []
      this.uploadSuccessList = []
      this.$emit('close')
    },
    submitModels(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          const filepath = `file:///attachments/pgi/${values.patient_id}.xml`

          const models = map(values.models, model => {
            return submitPathologyAiTask(filepath, model, JSON.stringify(values))
          })

          Promise.all(models)
            .then(results => {
              this.loading = false
              console.log('Run Models: ', values, results)
              this.reset()
            })
            .catch(error => {
              this.loading = false
              console.log('Run Models Error: ', error)
              this.$message.warning('Prediction AI Server is Down, Please Contact the Administrator.')
              this.reset()
            })
        }
      })
    },
    handleRemove(file) {
      const request = this.fileList[this.makeKey(file.name)]
      if (request) {
        request.cancel('Canceling Upload.')
      }
    },
    getFilePrefix(filename) {
      return filename.replace(/\.[^/.]+$/, "")
    },
    getFileExt(filename) {
      return filename.split('.').pop();
    },
    beforeUpload(file, fileList) {
      const fileNameList = map(fileList, file => {
        return this.getFilePrefix(file.name)
      })

      const fileExtList = map(fileList, file => {
        return this.getFileExt(file.name)
      })

      console.log('Before Upload: ', fileList, fileExtList, fileNameList)

      if (fileList.length === 2 && 
          fileExtList.length === 2 &&
          fileNameList[0] === fileNameList[1] &&
          fileExtList.includes('ndpi') && 
          fileExtList.includes('xml')) {
        return true
      } else {
        this.$message.warn('Please upload matched ndpi & xml files.')
        return false
      }
    },
    makeKey(filename) {
      return 'pathology/' + filename
    },
    existFile(filename) {
      return new Promise((resolve, reject) => {
        this.getObjectMeta({
          service: 'minio',
          name: 'attachments',
          key: this.makeKey(filename)
        }).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    uploadFile({ action, data, file, filename, headers, onError, onProgress, onSuccess, withCredentials }) {
      console.log('uploadFiles: ', file)
      this.existFile(file.name).then(response => {
        console.log(file.name, 'exist.', response)
        this.uploadSuccessList.push(file.name)
        onSuccess(response, file)
      }).catch(error => {
        console.log(error, ', so we can upload it...')
        this.makeUploadUrl({
          service: 'minio',
          name: 'attachments',
          key: this.makeKey(file.name)
        })
          .then(response => {
            const request = axios.CancelToken.source()
            this.fileList[this.makeKey(file.name)] = request
            const action = response.upload_url
            const formData = new FormData()
            if (data) {
              Object.keys(data).forEach(key => {
                formData.append(key, data[key])
              })
            }
            formData.append(filename, file)

            axios({
              url: action,
              method: 'put',
              data: file,
              processData: false,
              contentType: false,
              onUploadProgress: ({ total, loaded }) => {
                console.log('onUploadProgress: ', total, loaded, Math.round((loaded / total) * 100).toFixed(2))
                onProgress({ percent: Math.round((loaded / total) * 100) }, file)
              },
              cancelToken: request.token
            })
              .then(({ data: response }) => {
                console.log('Upload Files: ', response, file)
                this.uploadSuccessList.push(file.name)
                onSuccess(response, file)
              })
              .catch(error => {
                console.log('Upload Files (Error): ', error)
                onError(error)
              })

            return {
              abort() {
                console.log('upload progress is aborted.')
              }
            }
          })
          .catch(error => {
            console.log('getUploadUrl: ', error)
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.task-submitter {
  position: relative;

  .uploader {
    .help-text {
      border: 1px solid #eee;
      padding: 10px;
      margin-top: 10px;
      border-radius: 5px;
    }
  }

  .action {
    float: right;
    position: fixed;
    bottom: 5px;
    right: 25px;
    margin-bottom: 0px;
  }
}
</style>

<style lang="less">
.task-submitter {
  .uploader {
    .ant-divider-inner-text {
      top: 10px;
      position: relative;
    }
  }
}

.ant-drawer-body {
  .task-submitter {
    top: -16px;
  }
}
</style>