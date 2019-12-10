<template lang="html">
  <a-row class="simple-card">
    <a-row class="content">
      <a-col class="image">
        <img :src="card.image_src" />
      </a-col>
      <a-col class="desc">
        <h4>{{ card.name }}</h4>
        <p>{{ card.content }}</p>
      </a-col>
    </a-row>
    <a-row class="meta">
      <a-col :span="12" class="left">{{ card.author || card.editor }}</a-col>
      <a-col :span="12" class="right">{{ card.version }}</a-col>
    </a-row>
  </a-row>
</template>

<script>
export default {
  name: 'SimpleCard',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
@import './card.less';
</style>
</style>
