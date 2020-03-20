<template>
  <ejs-filemanager
    id="file-manager"
    height="560px"
    :enablePersistence="enablePersistence"
    :ajaxSettings="ajaxSettings"
    :success="onAjaxSuccess"
    :failure="onAjaxFailure"
  >
  </ejs-filemanager>
</template>

<script>
import Vue from 'vue'
import api from '@/api/manage'
import { FileManagerPlugin, DetailsView, NavigationPane, Toolbar } from '@syncfusion/ej2-vue-filemanager'

Vue.use(FileManagerPlugin)
export default {
  data () {
    return {
      ajaxSettings: api.filemanager,
      allowDragAndDrop: true,
      enablePersistence: true
    }
  },
  provide: {
    filemanager: [DetailsView, NavigationPane, Toolbar]
  },
  methods: {
    // File Manager's file Drag start event function
    onFileDragStart (args) {
      console.log('File Drag Start')
    },
    // File Manager's file Drag stop event function
    onFileDragStop (args) {
      console.log('File Drag Stop')
    },
    // File Manager's file Dragging event function
    onFileDragging (args) {
      console.log('File Dragging')
    },
    // File Manager's file Dropped event function
    onFileDropped (args) {
      console.log('File Dropped')
    },
    // File Manager's file onSuccess function
    onAjaxSuccess (args) {
      console.log('Ajax request successful')
    },
    // File Manager's file onError function
    onAjaxFailure (args) {
      console.log('Ajax request has failed')
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
