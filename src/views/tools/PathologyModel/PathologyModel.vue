<template>
  <a-row class="pathology-model-container">
    <a-row class="title" v-if="title">{{ title }}</a-row>
    <a-row class="content">
      <a-tabs>
        <a-tab-pane :key="index" v-for="(item, index) in data" :tab="item.model">
          <a-row class="info">
            <a-col :sm="24" :xs="24" :md="12" :lg="12" class="detail-info">
              <a-row class="title" style="padding-left: 0px">
                <span>Prediction</span>
              </a-row>
              <a-row v-for="(value, key) in item.patient" :key="key" class="content">
                <a-col :sm="8" :xs="24" class="key">{{ formatKey(key) }}</a-col>
                <a-tooltip placement="topLeft">
                  <template slot="title">
                    <span>{{ formatValue(value) }}</span>
                  </template>
                  <a-col :sm="16" :xs="24" class="value">{{ formatValue(value) }}</a-col>
                </a-tooltip>
              </a-row>
            </a-col>
            <a-col :sm="24" :xs="24" :md="12" :lg="12" class="data-info">
              <a-row class="title">Annotation</a-row>
              <a-row class="content">
                <p>{{ item.annotation }}</p>
              </a-row>
            </a-col>
          </a-row>
          <a-row>
            <a-icon v-show="imageViewerVisible" class="close-btn" @click="hideImageViewer" theme="filled" type="close-circle" />
            <image-viewer ref="viewer" class="image-viewer" v-show="imageViewerVisible"></image-viewer>
          </a-row>
          <vue-good-table
            class="vue-good-table"
            :search-options="{ enabled: true }"
            styleClass="vgt-table striped bordered condensed"
            :columns="genColumns(item.patch)"
            :rows="genRows(item.patch)"
            v-if="item.patch.length !== 0"
            :pagination-options="paginationOptions"
            :line-numbers="true"
          >
            <template slot="table-row" slot-scope="props">
              <a
                @click="showPatchImage(props.formattedRow[props.column.field], genImages(item.patch))"
                v-if="props.column.field.indexOf('name') >= 0"
              >
                {{ props.formattedRow[props.column.field] }}
              </a>
              <span v-else>{{ props.formattedRow[props.column.field] }}</span>
            </template>
          </vue-good-table>
        </a-tab-pane>
      </a-tabs>
    </a-row>
  </a-row>
</template>

<script>
import v from 'voca'
import { VueGoodTable } from 'vue-good-table'
import sortBy from 'lodash.sortby'
import orderBy from 'lodash.orderby'
import 'vue-good-table/dist/vue-good-table.css'
import { ImageViewer } from '@/components'
import { initBaseURL } from '@/config/defaultSettings'
import map from 'lodash.map'

export default {
  components: {
    VueGoodTable,
    ImageViewer
  },
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    imageId: {
      type: String,
      required: true,
      default: 'FUSCCTNBC001'
    },
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      paginationOptions: {
        enabled: true,
        mode: 'records',
        perPage: 10,
        position: 'top',
        perPageDropdown: [10, 20, 30, 50, 100],
        dropdownAllowAll: false,
        setCurrentPage: 1,
        nextLabel: 'next',
        prevLabel: 'prev',
        rowsPerPageLabel: 'Rows per page',
        ofLabel: 'of',
        pageLabel: 'page', // for 'pages' mode
        allLabel: 'All'
      },
      imageViewerVisible: false
    }
  },
  methods: {
    showPatchImage(patchId, images) {
      this.imageViewerVisible = true
      const index = images.findIndex(image => {
        return image.title === patchId
      })

      this.$refs.viewer[0].show(images.slice(index, index + 8), index)
    },
    hideImageViewer() {
      this.imageViewerVisible = false
    },
    formatKey(key) {
      const formattedKey = key.replace(/([A-Z])/g, ' $1')
      return v.titleCase(formattedKey.split('_').join(' '))
    },
    isFloat(n) {
      return Number(n) === n && n % 1 !== 0
    },
    formatValue(value) {
      if (this.isFloat(value)) {
        return value.toFixed(3)
      } else {
        return value
      }
    },
    genImages(rows) {
      return map(rows, row => {
        return {
          title: row.name,
          source: `${initBaseURL()}/attachments/pathology/${this.imageId}_models/norm_patches/${row.name}`
        }
      })
    },
    sortFn(x, y, col, rowX, rowY) {
      // x - row1 value for column
      // y - row2 value for column
      // col - column being sorted
      // rowX - row object for row1
      // rowY - row object for row2
      return x < y ? -1 : x > y ? 1 : 0
    },
    genColumns(rows) {
      var columns = []
      if (rows.length > 0) {
        const record = rows[0]
        for (const [key, value] of Object.entries(record)) {
          let config = {
            // label: this.formatKey(key),
            label: key,
            field: key,
            sortable: true,
            width: '180px',
            tdClass: 'text-center',
            thClass: 'text-center'
          }

          if (typeof record[key] === 'number') {
            config['sortFn'] = this.sortFn
          }

          columns.push(config)
        }
      }

      return sortBy(columns, o => {
        return o.label
      })
    },
    genRows(rows) {
      return orderBy(rows, ['score'], ['desc'])
    }
  }
}
</script>

<style lang="less" scoped>
.pathology-model-container {
  width: 100%;
  height: 100%;
  background-color: #fff;

  .title {
    font-size: 16px;
    background-color: #fff;
    color: #6b6262;
    padding: 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom: 1px solid #d9d9d9;
  }

  .content {
    padding: 0px 10px 10px;

    .info {
      display: flex;
      flex-direction: row;
      margin: 10px 0px;
      border-radius: 5px;
      border: 1px solid #d9d9d9;

      .detail-info {
        margin-right: 10px;
      }

      .detail-info,
      .data-info {
        width: calc(50% - 5px);
        background-color: #fff;
        font-size: 15px;
        border-radius: 5px;

        .key {
          // font-weight: 450;
        }

        .value {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        .ant-row {
          padding: 5px 10px;
          margin: 5px 10px;
        }

        .content.ant-row:nth-child(even) {
          // 利用css选择器，偶数列增加背景色
          background: #e8f4ff;
        }

        .title {
          padding: 10px 0px;
          font-size: 16px;
          margin-bottom: 10px;
          color: #6b6262;
          border-bottom: 1px solid #d9d9d9;
        }
      }
    }
  }

  .close-btn {
    z-index: 10;
    font-size: 16px;
    position: absolute;
    top: 5px;
    left: 5px;
  }

  .image-viewer {
    height: 450px;
    margin-bottom: 10px;
  }
}
</style>

<style lang="less">
.pathology-model-container {
  .ant-tabs-bar {
    margin: 0px;
  }
}
</style>