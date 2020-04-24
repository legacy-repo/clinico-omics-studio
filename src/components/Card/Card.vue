<template lang="html">
  <a-card class="box-card">
    <a-row :class="{ 'journal-card-header': journalMode, 'card-header': !journalMode }">
      <a-row class="journal" v-if="journalMode">
        <a-col :span="18" class="left">{{ card.name }}</a-col>
        <a-col :span="6" class="right" v-if="showRate"> {{ card.rate }} </a-col>
      </a-row>
      <a-row :class="{ 'journal-title': journalMode, title: !journalMode }" v-if="showTitle">
        {{ card.title }}
      </a-row>
    </a-row>
    <a-row class="image" v-if="showImage">
      <img :src="card.image_src" />
    </a-row>
    <a-row class="content">
      {{ card.content }}
    </a-row>
    <a-row class="tag-container">
      <span v-for="tag in card.tags" :key="tag">{{ tag }}</span>
    </a-row>
    <a-row class="detail">
      <a-col :span="12" class="left">{{ card.author || card.editor }}</a-col>
      <a-col :span="12" class="right">{{ card.version }}</a-col>
    </a-row>
  </a-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    card: {
      type: Object,
      required: true
    },
    journalMode: {
      type: Boolean,
      required: false,
      default: true
    },
    showTitle: {
      type: Boolean,
      required: false,
      default: true
    },
    showImage: {
      type: Boolean,
      required: false,
      default: true
    },
    showRate: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
@import './card.less';
</style>

<style lang="less">
.box-card {
  .ant-card-body {
    padding: 0px;
  }
}
</style>
