<template>
  <div :style="{ padding: '0 0 32px 32px' }">
    <h4 :style="{ marginBottom: '20px' }">{{ title }}</h4>
    <v-chart :height="height" :data="data" :forceFit="true" :padding="padding">
      <v-tooltip />
      <v-axis />
      <v-legend position="top"/>
      <v-bar :position="position" :color="color" v-if="color" />
      <v-bar :position="position" v-else />
    </v-chart>
  </div>
</template>

<script>
export default {
  name: 'Bar',
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    scale: {
      type: Array,
      default: null
    },
    position: {
      type: String,
      default: 'x*y'
    },
    height: {
      type: Number,
      default: 254
    },
    color: {
      type: String,
      default: null
    },
    padding: {
      type: Array,
      default: () => {
        return ['auto', 'auto', '40', '50']
      }
    },
    adjust: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
    }
  }
}
</script>
