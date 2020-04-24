<template>
  <div class="logo">
    <router-link :to="{ name: 'welcome' }">
      <img src="@/assets/iseq-logo.png" alt="logo" />
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    title: {
      type: String,
      default: 'iSEQ Analyzer',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>

<style scoped>
.logo h1 {
  vertical-align: middle;
}
</style>
