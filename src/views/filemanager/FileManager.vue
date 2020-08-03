<template>
  <ejs-filemanager
    ref="ejs-filemanager"
    id="file-manager"
    :height="height"
    :enablePersistence="enablePersistence"
    :ajaxSettings="ajaxSettings"
    :success="onAjaxSuccess"
    :failure="onAjaxFailure"
    :fileSelect="onSelect"
    :contextMenuSettings="contextMenuSettings"
    :allowMultiSelection="allowMultiSelection"
    :allowDragAndDrop="allowDragAndDrop"
    :selectedItems="selectedItems"
    :view="view"
    :path="path"
    :toolbarSettings="toolbarSettings"
  >
  </ejs-filemanager>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import filter from 'lodash.filter'
import flatMap from 'lodash.flatmap'
import api from '@/api/manage'
import { FileManagerPlugin, DetailsView, NavigationPane, Toolbar } from '@syncfusion/ej2-vue-filemanager'

Vue.use(FileManagerPlugin)
export default {
  props: {
    standalone: {
      default: true,
      required: false,
      type: Boolean
    },
    height: {
      default: '560px',
      required: false,
      type: String
    },
    allowDragAndDrop: {
      default: true,
      required: false,
      type: Boolean
    },
    allowMultiSelection: {
      default: false,
      required: false,
      type: Boolean
    },
    path: {
      default: '/',
      required: false,
      type: String
    },
    view: {
      default: 'Details',
      required: false,
      type: String
    },
    enablePersistence: {
      default: false,
      required: false,
      type: Boolean
    },
    contextVisible: {
      default: false,
      required: false,
      type: Boolean
    },
    toolbarVisible: {
      default: true,
      required: false,
      type: Boolean
    },
    filterType: {
      required: false,
      default: '.vcf',
      type: String
    },
    enableItems: {
      default: () => [
        'NewFolder',
        'Upload',
        'Cut',
        'Copy',
        'Paste',
        // 'Delete',
        'Download',
        'Rename',
        'SortBy',
        'Refresh',
        'Selection',
        'View',
        'Details'
      ],
      required: false,
      type: Array
    }
  },
  data() {
    return {
      ajaxSettings: api.filemanager,
      contextMenuSettings: {
        visible: this.contextVisible
      },
      toolbarSettings: {
        visible: this.toolbarVisible,
        items: this.enableItems
      },
      selectedItems: []
    }
  },
  provide: {
    filemanager: [DetailsView, NavigationPane, Toolbar]
  },
  methods: {
    diffSet(a, b, noDup) {
      if (noDup) {
        a = [...new Set(a)]
        b = [...new Set(b)]
      }
      return a.filter(el => !b.includes(el))
    },
    // File Manager's file Drag start event function
    onFileDragStart(args) {
      console.log('File Drag Start')
    },
    // File Manager's file Drag stop event function
    onFileDragStop(args) {
      console.log('File Drag Stop')
    },
    // File Manager's file Dragging event function
    onFileDragging(args) {
      console.log('File Dragging')
    },
    // File Manager's file Dropped event function
    onFileDropped(args) {
      console.log('File Dropped')
    },
    // File Manager's file onSuccess function
    onAjaxSuccess(args) {
      console.log('Ajax request successful')
    },
    // File Manager's file onError function
    onAjaxFailure(args) {
      console.log('Ajax request has failed')
    },
    filterByType(files, fileType) {
      console.log(files, fileType)
      const pattern = new RegExp(fileType)
      return filter(files, function(o) { return o.name.length > 0 && pattern.test(o.name) })
    },
    getFileName(files) {
      return flatMap(files, (o) => o.name)
    },
    onSelect(args) {
      const selectedFiles = this.$refs['ejs-filemanager'].getSelectedFiles()

      if (this.standalone) {
        this.selectedItems = this.getFileName(selectedFiles)
      } else {
        const selectedItems = this.filterByType(selectedFiles, this.filterType)

        if (selectedItems.length !== selectedFiles.length) {
          this.$message.warn('Only support ' + this.filterType + ' files')
          this.selectedItems = this.getFileName(selectedItems)
        }

        this.$emit('file-select', selectedItems)
        console.log('File selection: ', args, selectedItems, this.selectedItems)
      }
    }
  }
}
</script>

<style scoped>
#file-manager {
  background-color: #fff;
  border-radius: 5px;
}
</style>

<style>
@import '../../../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-icons/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-layouts/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-grids/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-vue-filemanager/styles/material.css';
</style>
