<template>
  <block-style-editor
    class="report"
    autofocus
    ref="editor"
    holder-id="codex-editor"
    save-button-id="save-button"
    :init-data="initData"
    @save="onSave"
    @ready="onReady"
    @change="onChange"
  />
</template>

<script>
import BlockStyleEditor from '@/components/BlockStyleEditor'
import { getReport } from '@/api/manage'

export default {
  name: 'Report',
  components: {
    BlockStyleEditor
  },
  props: {
    readonly: {
      type: Boolean,
      default: true
    },
    description: {
      type: String,
      default: 'Benchmark Report for Quartet Project'
    }
  },
  data () {
    return {
      initData: {},
      savedData: {}
    }
  },
  methods: {
    onSave (response) {
      console.log(JSON.stringify(response))
      this.savedData = response
    },
    onReady () {
      console.log('ready')
    },
    onChange () {
      console.log('changed')
    }
  },
  mounted () {
    getReport().then(res => {
      const that = this
      that.initData = res
      console.log(that.initData)
    })
  },
  created () {

  }
}
</script>

<style scoped>
.report {
  padding: 20px 80px 0px 20px;
  background: white;
  border-radius: 10px;
}
</style>
