<template>
  <a-list class="loadmore-list" itemLayout="horizontal" :dataSource="getData(length)">
    <div
      v-if="showLoadingMore && dataSource.length > expectedLength"
      slot="loadMore"
      :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
    >
      <a-button @click="onLoadMore">{{ dataSource.length }} More...</a-button>
    </div>
    <div
      v-if="!showLoadingMore"
      slot="loadMore"
      :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
    >
      <a-button @click="onShowLess">Less...</a-button>
    </div>
    <a-list-item slot="renderItem" slot-scope="item, index" class="filter-list-item">
      <a-checkbox @change="onChange(item, index, $event)" :defaultChecked="isChecked(item.checked)" v-if="checkboxMode">{{ item.name }}</a-checkbox>
      <a @click="onChange(item, index, $event)" v-else>{{ item.name }}</a>
      <a-tag>{{ item.count }}</a-tag>
    </a-list-item>
  </a-list>
</template>

<script>
export default {
  name: 'FilterList',
  data() {
    return {
      showLoadingMore: true,
      length: 5
    }
  },
  props: {
    dataSource: {
      type: Array,
      default: () => []
    },
    expectedLength: {
      type: Number,
      default: 5
    },
    checkboxMode: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  methods: {
    isChecked(status) {
      if (status == true) {
        return status
      } else {
        return false
      }
    },
    onChange(item, index, event) {
      console.log('onChange: ', item, index, event)
      this.$emit('select-filter', {
        key: item.key,
        name: item.name,
        count: item.count,
        checked: event.target.checked
      })
    },
    getData(expectedLength) {
      if (this.dataSource.length >= expectedLength) {
        return this.dataSource.slice(0, expectedLength)
      } else {
        return this.dataSource
      }
    },
    onLoadMore() {
      this.length = this.dataSource.length
      this.showLoadingMore = false
    },
    onShowLess() {
      this.length = this.expectedLength
      this.showLoadingMore = true
    }
  },
  mounted() {
    this.length = this.expectedLength
  },
  components: {}
}
</script>

<style lang="less">
.filter-list-item {
  .ant-list-item-content {
    justify-content: space-between;
  }
}
</style>

<style lang="less" scoped>
</style>
