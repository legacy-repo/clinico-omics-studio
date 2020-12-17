<template>
  <full-frame :src="src" :onloadfn="onload"></full-frame>
</template>

<script>
import FullFrame from '@/components/FullFrame'

export default {
  name: 'DataPortal',
  components: {
    FullFrame
  },
  data() {
    return {
      src: 'http://data.3steps.cn',
      onload: function(id) {
        console.log('DataPortal: ', id)
        document.getElementById(id).contentWindow.postMessage({ hideHeader: true }, 'http://data.3steps.cn')
      }
    }
  }
}
</script>

<style>
</style>