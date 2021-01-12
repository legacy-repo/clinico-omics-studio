<template>
  <div class="logo">
    <router-link :to="{ name: 'welcome' }">
      <img :src="logo" width="50px" height="50px" alt="logo" />
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
      default: 'ClinicoOmics',
      required: true
    },
    logo: {
      type: String,
      required: false,
      default: require('@/assets/logo.png')
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
