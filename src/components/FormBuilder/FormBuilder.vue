<template>
  <div class="a-form-builder">
    <a-form ref="form" :form="clonedModel" @submit="onAction">
      <a-form-item
        v-for="(field, index) in fields"
        :key="field.label + index"
        :label="field.label"
        :label-col="field.labelCol || { span: 5, offset: 2 }"
        :wrapper-col="field.wrapperCol || { span: 12 }"
      >
        <template v-if="field.tmplType === 'sample-id'">
          <a-input-number
            :placeholder="field.placeholder"
            :key="field.name + index"
            :id="field.id || ''"
            :min="field.min || 1"
            :max="field.max || 100"
            :disabled="field.disabled || false"
            :ref="field.name"
            v-decorator="[field.model, field.config]"
            @change="onUpdate(field)">
          </a-input-number>
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
            @change="onUpdate(field)"/>
        </template>
        <!-- Select -->
        <template v-if="field.tmplType === 'select'">
          <a-select
            v-decorator="[field.model, field.config]"
            :disabled="field.disabled"
            :showSearch="true"
            :name="field.name"
            :mode="field.mode"
            :allowClear="true"
            :data="field.options"
            :placeholder="field.placeholder"
            @change="onUpdate(field)">
            <a-select-option v-for="i in field.options" :key="i.label">
              {{ i.value }}
            </a-select-option>
          </a-select>
        </template>
        <!-- Checkbox -->
        <template v-if="field.tmplType === 'checkbox'">
          <a-checkbox-group
            v-if="Array.isArray(clonedModel[field.model])"
            v-decorator="[field.model, field.config]"
            :name="field.name"
            :options="field.options"
            @change="onUpdate(field)">
          </a-checkbox-group>
          <a-checkbox
            v-else
            v-decorator="[field.model, field.config]"
            @change="onUpdate(field)"/>
        </template>
        <!-- Radio -->
        <template v-if="field.tmplType === 'radio'">
          <a-radio-group
            v-decorator="[field.model, field.config]"
            :options="field.options"
            @change="onUpdate(field)"/>
        </template>
        <!-- Actions -->
        <template v-if="field.tmplType === 'actions'">
          <a-button
            v-for="(i, idx) in field.buttons"
            :key="idx"
            :type="i.buttonType"
            @click="onAction(i)"
            class="form-btn">
            {{ i.buttonLabel }}
          </a-button>
        </template>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import v from 'voca'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'FormBuilder',
  components: {},
  props: {
    fields: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {

    }
  },
  created () {
    this.clonedModel = this.$form.createForm(this)
    this.$voca = v
  },
  mounted () {
    // Hack to update validation
    this.$forceUpdate()
  },
  methods: {
    genSampleIds (numStr) {
      // Init
      const num = parseInt(this.clonedModel.getFieldValue(numStr))
      var sampleIds = []

      if (num > 0 && num < 100) {
        for (const idx in Array(num).fill().map((_, i) => i * i)) {
          sampleIds.push(uuidv4())
        }
      }

      console.log('genSampleIds: ', num, sampleIds)
      return sampleIds
    },
    onUpdate (field) {
      this.$emit('update', this.clonedModel)
    },
    onAction (e) {
      if (e.validate) {
        this.clonedModel.validateFields((err, values) => {
          // console.log('Received values of form: ', values)
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

<style lang="less" scoped>
.form-btn {
  margin-left: 10px;
}

.ant-input-number {
  width: 100%;
}

.autobox:hover {
  cursor: pointer;
}
</style>
