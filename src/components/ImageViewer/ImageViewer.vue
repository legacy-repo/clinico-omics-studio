<template>
  <a-row class="image-viewer" v-if="images && images.length">
    <viewer :options="options" rebuild :images="images" @inited="inited" class="viewer" ref="viewer">
      <template slot-scope="scope">
        <figure class="images">
          <div class="image-wrapper" v-for="image in scope.images" :key="image.source">
            <img class="image" :src="image.source" :data-source="image.source" :alt="image.title" />
          </div>
        </figure>
      </template>
    </viewer>
  </a-row>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer/src/component.vue'

const options = {
  inline: true,
  button: true,
  navbar: true,
  title: true,
  toolbar: true,
  tooltip: true,
  movable: true,
  zoomable: true,
  rotatable: true,
  scalable: true,
  transition: true,
  fullscreen: true,
  keyboard: true,
  url: 'data-source'
}

export default {
  props: {},
  components: {
    Viewer
  },
  props: {
    zoomTo: {
      type: Number,
      required: false,
      default: 1
    }
  },
  data() {
    return {
      index: 0,
      images: [],
      options: options
    }
  },
  methods: {
    inited(viewer) {
      this.$viewer = viewer
      this.$viewer.view(this.index)
      this.$viewer.element.addEventListener('viewed', () => {
        this.$viewer.zoomTo(this.zoomTo)
      })
    },
    view(index) {
      this.index = index
      this.$viewer.view(this.index)
    },
    show(images, index = 0) {
      if (this.images === images) {
        this.view(index)
        return
      }
      this.images = images
      this.index = index
    }
  }
}
</script>

<style lang="less" scoped>
.image-viewer {
  width: 100%;
  height: 100%;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 5px;

  .viewer {
    border-radius: 5px;
    height: 100%;

    .images {
      overflow: scroll;
      border-radius: 5px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-content: center;
      align-items: center;
      flex-wrap: wrap;
      padding: 5px;

      .image-wrapper {
        display: inline-block;
        // width: 150px;
        margin: 5px 5px 0 5px;

        .image {
          // width: 100%;
          cursor: pointer;
          display: inline-block;
        }
      }
    }
  }
}
</style>