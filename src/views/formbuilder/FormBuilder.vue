<template>
  <div class="a-form-builder">
    <a-form :form="clonedModel" @submit="onAction" layout="vertical">
      <a-row :gutter="8">
        <a-col v-for="(field, index) in fields" :key="field.label + index" :span="field.span ? field.span : 24 / nums">
          <a-form-item v-if="showComponent(field.visibleVariable, field.expectedValue)">
            <span slot="label" v-if="field.label">
              {{ field.label }}&nbsp;
              <a-tooltip :title="field.question" v-if="field.question">
                <a-icon type="question-circle-o" />
              </a-tooltip>
            </span>
            <template v-if="field.tmplType === 'file'">
              <a-button @click="selectFiles(field.model, field.multiple, field.filterType)">
                <a-icon type="plus" />Select Files
              </a-button>
              <a-select
                :allowClear="field.allowClear || true"
                :mode="field.multiple ? 'multiple' : 'default'"
                :placeholder="field.placeholder"
                :maxTagCount="3"
                :disabled="field.readOnly || !options[field.model]"
                v-decorator="[field.model, field.config]"
              >
                <a-select-option v-for="d in options[field.model]" :key="d.value">{{ d.text }}</a-select-option>
              </a-select>
            </template>
            <template v-if="field.tmplType === 'sample_id'">
              <a-input-number
                :placeholder="field.placeholder"
                :key="field.name + index"
                :id="field.id || ''"
                :min="field.min === undefined ? 1 : field.min"
                :max="field.max === undefined ? 100 : field.max"
                :disabled="field.disabled || false"
                :ref="field.name"
                v-decorator="[field.model, field.config]"
                @change="onUpdate(field)"
              ></a-input-number>
            </template>
            <!-- Input Number -->
            <template v-if="field.tmplType === 'input_number'">
              <a-input-number
                :placeholder="field.placeholder"
                :key="field.name + index"
                :id="field.id || ''"
                :min="field.min === undefined ? 0 : field.min"
                :max="field.max === undefined ? 100 : field.max"
                :disabled="field.disabled || false"
                :ref="field.name"
                v-decorator="[field.model, field.config]"
                @change="onUpdate(field)"
              ></a-input-number>
            </template>
            <!-- Input -->
            <template v-if="field.tmplType === 'input'">
              <a-input
                :addonAfter="field.addonAfter || ''"
                :addonBefore="field.addonBefore || ''"
                :disabled="field.disabled || false"
                :id="field.id || ''"
                :prefix="field.prefix || ''"
                :size="field.size || 'default'"
                :suffix="field.suffix || ''"
                :type="field.type || 'text'"
                :allowClear="field.allowClear || false"
                :placeholder="field.placeholder"
                :autosize="field.autosize || false"
                :key="field.name + index"
                :ref="field.name"
                v-decorator="[field.model, field.config]"
                @change="onUpdate(field)"
              />
            </template>
            <!-- Select -->
            <template v-if="field.tmplType === 'select'">
              <a-select
                v-decorator="[field.model, field.config]"
                :disabled="field.disabled"
                :showSearch="true"
                :name="field.name"
                :mode="field.mode"
                :allowClear="field.allowClear || true"
                :data="field.options"
                :placeholder="field.placeholder"
                @change="onUpdate(field)"
              >
                <a-select-option v-for="i in field.options" :key="i.label">{{ i.value }}</a-select-option>
              </a-select>
            </template>
            <!-- Checkbox -->
            <template v-if="field.tmplType === 'checkbox'">
              <a-checkbox-group
                v-if="Array.isArray(clonedModel[field.model])"
                v-decorator="[field.model, field.config]"
                :name="field.name"
                :options="field.options"
                @change="onUpdate(field)"
              ></a-checkbox-group>
              <a-checkbox v-else v-decorator="[field.model, field.config]" @change="onUpdate(field)" />
            </template>
            <!-- Radio -->
            <template v-if="field.tmplType === 'radio'">
              <a-radio-group
                v-decorator="[field.model, field.config]"
                :options="field.options"
                @change="onUpdate(field)"
              />
            </template>
            <!-- Actions -->
            <template v-if="field.tmplType === 'actions'">
              <div class="actions">
                <a-button
                  v-for="(i, idx) in field.buttons"
                  :key="idx"
                  :icon="i.icon"
                  :type="i.buttonType"
                  @click="onAction(i)"
                  class="form-btn"
                  >{{ i.buttonLabel }}</a-button
                >
              </div>
            </template>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-row class="box" v-show="fileManagerActive">
      <popup-file-browser
        @select-files="confirmSelectFiles"
        @cancel-select-files="cancelSelectFiles"
        :multiple="multiple"
        :filterType="filterType"
        :selected="selected"
      ></popup-file-browser>
    </a-row>
  </div>
</template>

<script>
import v from 'voca'
import flatMap from 'lodash.flatmap'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'FormBuilder',
  components: {
    // [Vue warn]: Unknown custom element: <file-browser> - did you register the component correctly? For recursive components, make sure to provide the "name" option.
    // 解决方案1 组件间循环依赖：https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E7%BB%84%E4%BB%B6%E4%B9%8B%E9%97%B4%E7%9A%84%E5%BE%AA%E7%8E%AF%E5%BC%95%E7%94%A8
    // 解决方案2 异步组件：https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6
    FileBrowser: () => import('@/views/filemanager/FileBrowser'),
    PopupFileBrowser: () => import('@/views/filemanager/PopupFileBrowser')
  },
  props: {
    fields: {
      type: Array,
      default: () => []
    },
    nums: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      fileManagerActive: false,
      whichFileManager: '',
      filterType: '',
      multiple: true,
      files: [],
      selected: [],
      options: {},
      autoGenMode: true
    }
  },
  created() {
    this.clonedModel = this.$form.createForm(this)
    this.$voca = v
  },
  mounted() {
    // Hack to update validation
    this.$forceUpdate()
  },
  methods: {
    showComponent(fieldName, expectedValue) {
      if (fieldName && expectedValue) {
        if (this.clonedModel.getFieldValue(fieldName) === expectedValue) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    },
    selectFiles(model, multiple, filterType) {
      // Reset all related values
      this.fileManagerActive = true
      this.whichFileManager = model
      this.filterType = filterType
      this.multiple = multiple
      this.options[model] = []
      const value = this.clonedModel.getFieldValue(model)
      console.log('selected: ', value, typeof value)
      if (typeof value == 'string') {
        this.selected = [value]
      } else {
        this.selected = value
      }

      console.log('Registry File Manager: ', model, multiple, filterType, this.selected)
    },
    resetFileBrowser() {
      this.fileManagerActive = false
      this.selected = []
    },
    cancelSelectFiles() {
      this.resetFileBrowser()
    },
    getPath(file) {
      return file.path
    },
    getFilePathLst(files) {
      const filePaths = flatMap(files, this.getPath)
      // return filePaths.join('\n')
      return filePaths
    },
    confirmSelectFiles(filePathList) {
      this.resetFileBrowser()

      const fields = {}
      if (this.multiple) {
        fields[this.whichFileManager] = filePathList
      } else {
        fields[this.whichFileManager] = filePathList[0]
      }

      this.options[this.whichFileManager] = flatMap(filePathList, o => ({ value: o, text: o }))
      this.clonedModel.setFieldsValue(fields)
      console.log('Selected Files: ', fields, this.whichFileManager, filePathList)
    },
    genSampleIds(numStr) {
      // Init
      const num = parseInt(this.clonedModel.getFieldValue(numStr))
      var sampleIds = []

      if (num > 0 && num < 100) {
        for (const idx in Array(num)
          .fill()
          .map((_, i) => i * i)) {
          sampleIds.push(uuidv4())
        }
      }

      console.log('genSampleIds: ', num, sampleIds)
      return sampleIds
    },
    onUpdate(field) {
      if (field.registerMethod && field.registerMethod.arguments && field.registerMethod.body) {
        const registerMethod = field.registerMethod
        // {"registerMethod": {"arguments": "model", "body": "return a*b+c;"}}
        const func = new Function(registerMethod.arguments, registerMethod.body)
        func(this.clonedModel)
      }

      console.log('onUpdate: ', field, this.clonedModel)
      this.$emit('update', this.clonedModel)
    },
    onAction(e) {
      if (e.validate) {
        this.clonedModel.validateFields((err, values) => {
          console.log('Received values of form: ', values)
          const sampleIds = this.genSampleIds('sample_id')

          if (!err) {
            this.$emit('action', { type: e.type, formData: values, sampleIds: sampleIds })
          }
        })
      } else {
        this.$emit('action', { type: e.type, formData: this.clonedModel })
      }
    }
  }
}
</script>

<style lang="less">
.a-form-builder {
  .ant-form {
    .ant-form-item-label {
      font-weight: 500;
    }

    .ant-form-item {
      margin: 0px auto;
      margin-bottom: 10px;
    }
  }
}
</style>

<style lang="less" scoped>
.a-form-builder {
  width: 60%;
  margin: 0px auto;
  min-width: 450px;

  .ant-btn {
    margin-bottom: 5px;
  }

  .actions {
    float: right;

    .form-btn {
      margin-left: 10px;
    }
  }

  .ant-input-number {
    width: 100%;
  }

  .autobox:hover {
    cursor: pointer;
  }

  .box {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 10;

    .file-manager-container {
      top: 35%;
    }
  }
}
</style>
