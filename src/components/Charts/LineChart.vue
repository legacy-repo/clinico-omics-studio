<template>
  <div :style="{ padding: '0 0 32px 32px' }">
    <h4 :style="{ marginBottom: '20px' }">{{ title }}</h4>
    <v-chart
      :forceFit="true"
      :height="height"
      :data="data"
      :padding="padding"
      :scale="scale"
    >
      <v-tooltip :crosshairs="false"></v-tooltip>
      <v-legend :attachLast="true"></v-legend>
      <v-line 
        position="date*temperature"
      >
      </v-line>
      <v-point 
        position="date*temperature"
      >
      </v-point>
      <v-axis
        dataKey="date"
        :label="label"
      >
      </v-axis>
      <v-axis
        dataKey="temperature"
        :label="label"
      >
      </v-axis>
    </v-chart>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 254
    },
    data: {
      type: Array,
      required: true
    },
    padding: {
      type: Array,
      default: () => {
        return ['auto', 'auto', '40', '50']
      }
    },
  },
  mounted(){

  },
  methods:{ 
    
  },
  data() {
    return {
      label:{
        textStyle: {
          fill: '#aaaaaa'
        }
      },
      scale:[
        {
        dataKey:'temperature',
        max: -50,
        min: -100
      }]
    };
  }
};
</script>
