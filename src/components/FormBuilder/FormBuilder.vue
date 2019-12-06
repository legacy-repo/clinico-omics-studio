<template>
  <div class="a-form-builder">
    <a-form ref="form" :form="clonedModel" @submit="onAction"
    >
      <a-form-item
        v-for="(field, index) in schema.fields"
        :key="field.label + index"
        :label="field.label"
        :label-col="field.labelCol || { span: 5, offset: 2 }"
        :wrapper-col="field.wrapperCol || { span: 12 }"
      >
        <!-- Input -->
        <template
          v-if="field.tmplType === 'input'"
        >
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
            v-model="clonedModel[field.model]"
            :disabled="field.disabled"
            :showSearch="true"
            :name="field.name"
            :mode="field.mode"
            :allowClear="true"
            :data="field.options"
            :placeholder="field.placeholder"
            @change="onUpdate(field)"
          >
            <a-select-option v-for="i in field.options" :key="i.label">
              {{ i.value }}
            </a-select-option>
          </a-select>
        </template>
        <!-- Checkbox -->
        <template v-if="field.tmplType === 'checkbox'">
          <a-checkbox-group
            v-if="Array.isArray(clonedModel[field.model])"
            v-model="clonedModel[field.model]"
            :name="field.name"
            :options="field.options"
            @change="onUpdate(field)"
          >
          </a-checkbox-group>
          <a-checkbox
            v-else
            v-model="clonedModel[field.model]"
            @change="onUpdate(field)"
          />
        </template>
        <!-- Radio -->
        <template v-if="field.tmplType === 'radio'">
          <a-radio-group
            v-model="clonedModel[field.model]"
            :options="field.options"
            @change="onUpdate(field)"
          />
        </template>
        <!-- Actions -->
        <template v-if="field.tmplType === 'actions'">
          <a-button
            v-for="(i, idx) in field.buttons"
            :key="idx"
            :type="i.buttonType"
            @click="onAction(i.type)"
            class="form-btn"
          >
            {{ i.buttonLabel }}
          </a-button>
        </template>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'FormBuilder',
  components: {},
  props: {
    schema: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      clonedModel: this.$form.createForm(this)
    }
  },
  created () {

  },
  mounted () {
    // Hack to update validation
    this.$forceUpdate()
  },
  methods: {
    onUpdate (field) {
      this.$emit('update', this.clonedModel)
    },
    onAction (e) {
      this.$emit('action', { type: e, form: this.$refs.form })
    }
  }
}
</script>

<style lang="less" scoped>
.form-btn {
  margin-left: 10px;
}
</style>