<template>
  <a-row class="results-container">
    <a-input-search style="margin-bottom: 8px" placeholder="Search Results" @change="onChange" />
    <a-tree
      :expanded-keys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      :tree-data="data"
      @expand="onExpand"
      @select="onSelect"
    >
      <template slot="title" slot-scope="{ name }">
        <span v-if="name.indexOf(searchValue) > -1">
          {{ name.substr(0, name.indexOf(searchValue)) }}
          <span style="color: #f50">{{ searchValue }}</span>
          {{ name.substr(name.indexOf(searchValue) + searchValue.length) }}
        </span>
        <span v-else>{{ name }}</span>
      </template>
    </a-tree>
  </a-row>
</template>

<script>
import { mapActions } from 'vuex'
import uniq from 'lodash.uniq'
import map from 'lodash.map'
import filter from 'lodash.filter'

export default {
  props: {
    results: {
      required: false,
      default: () => {},
      type: Object
    }
  },
  data() {
    return {
      expandedKeys: [],
      autoExpandParent: true
    }
  },
  computed: {
    data() {
      return this.dataSource
    }
  },
  methods: {
    ...mapActions({}),
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onSelect(selectedKeys, node) {
      console.log('onSelect: ', selectedKeys, node)
    },
    getJobNames(keys) {
      // e.g. sample64f.samtools.out_percent
      return uniq(
        map(keys, o => {
          return o.split('.')[1]
        })
      )
    },
    getJobOutputName(key) {
      return key.split('.')[2]
    },
    filterKeys(pattern, keys) {
      return filter(keys, o => {
        return o.match(pattern)
      })
    },
    translateToSubTree(pattern, output) {
      let keys = this.filterKeys(pattern, Object.keys(output))
      return map(keys, o => {
        return {
          name: this.getJobOutputName(o),
          key: output[o]
        }
      })
    },
    translateToTree(output) {
      let keys = Object.keys(output)
      let jobNames = this.getJobNames(keys)
      return map(jobNames, o => {
        return {
          name: o,
          key: o,
          child: this.translateToSubTree(o, output)
        }
      })
    },
    transformResults(results) {
      let tree = {
        name: 'workflowRoot',
        key: results.workflowOutput,
        child: this.translateToTree(results.output)
      }

      return tree
    }
  },
  mounted() {},
  created() {}
}
</script>
<style scoped>
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>