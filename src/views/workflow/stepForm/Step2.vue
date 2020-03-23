<template>
  <div>
    <form-builder v-if="schema" ref="form" v-model="model" :schema="schema" @action="onAction" @update="onUpdate"></form-builder>
    <argument-table v-else></argument-table>
  </div>
</template>

<script>
import appSchema from '@/appschema'
import FormBuilder from '@/components/FormBuilder'
import ArgumentTable from '@/views/workflow/ArgumentTable'

export default {
  name: 'Step2',
  data () {
    return {
      model: {},
      schema: {}
    }
  },
  methods: {
    nextStep () {
      const that = this
      that.loading = true
      console.log('表单 values', that.data)
      that.timer = setTimeout(function () {
        that.loading = false
        that.$emit('nextStep')
      }, 1500)
    },
    prevStep () {
      this.$emit('prevStep')
    },
    loadAppSchema (appName) {
      return appSchema.huangyechaoAnnovarLatest.schema
    },
    onUpdate (data) {
      console.log('FormBuilder: ', data)
    },
    onAction (e) {
      if (e.type === 'cancel') {
        this.prevStep()
      } else if (e.type === 'submit') {
        this.nextStep()
      }
    }
  },
  created () {
    console.log('AppSchema: ', appSchema)
    this.schema = this.loadAppSchema()
  },
  components: {
    FormBuilder,
    ArgumentTable
  }
}
</script>

<style lang="less" scoped>

</style>
