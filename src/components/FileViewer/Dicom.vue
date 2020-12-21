<template>
  <a-row class="dicom-container">
    <div class="content">
      <div class="canvasList" ref="canvasList"></div>
      <div class="dicomMain" ref="dicomMain">
        <div class="btn-header">
          <a-tooltip v-for="btn in buttons" :key="btn.key">
            <template slot="title">{{ btn.name }}</template>
            <a-button
              :type="currentBtn === btn.key ? 'primary' : 'default' "
              :icon="btn.icon"
              @click="btnType(btn.key)"
              round
            ></a-button>
          </a-tooltip>
          <!--获取状态-->
          <!-- <a-button type="d" icon="el-icon-check" @click="getToolState()" round></a-button> -->

          <!--获取状态-->
          <!-- <a-button @click="rong()"></a-button> -->

          <!--颜色选择-->
          <!-- <el-color-picker class="picker" v-model="color"></el-color-picker> -->
        </div>
        <div ref="canvas" class="image-canvas" oncontextmenu="return false"></div>
        <div class="parameterMonitoringRight">
          <span>
            Img:
            {{
            newImageMonitoring.currentImageIdIndex ? newImageMonitoring.currentImageIdIndex : 1
            }}/{{
            currentImageList.length
            }}
          </span>
          <span>
            FPS:
            {{ newImageMonitoring.frameRate ? newImageMonitoring.frameRate : 0 }}
          </span>
          <span>
            Zoom: {{ imageRenderedMonitoring.zoom }}
          </span>
          <span>
            WW/WL: {{ imageRenderedMonitoring.wwwc }}
          </span>
          <span>
            renderTime: {{ imageRenderedMonitoring.renderTime }}
          </span>
        </div>
      </div>
    </div>
  </a-row>
</template>

<script>
import elementResizeDetectorMaker from 'element-resize-detector'
import { enable, parser, dicomTool, resize } from './components/dicomFun'
import { newDiv, arrayEquals } from './components/tool'

export default {
  name: 'Dicom',
  props: {
    // 根目录，形如`http://10.157.72.54/dicom`
    data: {
      type: Object,
      required: true,
      validator: data => {
        return (
          arrayEquals(['baseUrl', 'instanceId'], Object.keys(data)) &&
          typeof data['baseUrl'] == 'string' &&
          typeof data['instanceId'] == 'string'
        )
      }
    }
  },
  data() {
    return {
      seriesList: [],
      currentBtn: false,
      // 当前canvas的参数
      currentCanvas: '',
      currentImageList: '',
      // 工具类用到的值
      isInvert: false,
      imageRenderedMonitoring: {},
      newImageMonitoring: {},
      color: '#409EFF',
      // 默认数据
      dData: {},
      buttons: [
        {
          // 放大效果
          key: 'Magnify',
          name: 'Magnify',
          icon: 'search'
        },
        {
          // 亮度调整
          key: 'Wwwc',
          name: 'Brightness Adjustment',
          icon: 'thunderbolt'
        },
        {
          // 放大
          key: 'Zoom',
          name: 'Zoom',
          icon: 'zoom-in'
        },
        {
          key: 'Pan',
          name: 'Pan',
          icon: 'drag'
        },
        {
          key: 'StackScrollTool',
          name: 'Stack Scroll Tool',
          icon: 'column-height'
        },
        {
          key: 'Length',
          name: 'Length',
          icon: 'line'
        },
        {
          key: 'Angle',
          name: 'Angle',
          icon: 'left'
        },
        {
          key: 'Probe',
          name: 'Probe',
          icon: 'compass'
        },
        {
          key: 'RectangleRoi',
          name: 'RectangleRoi',
          icon: 'border-outer'
        },
        {
          key: 'EllipticalRoi',
          name: 'EllipticalRoi',
          icon: 'minus-circle'
        },
        {
          key: 'Bidirectional',
          name: 'Bidirectional',
          icon: 'plus'
        },
        {
          key: 'Eraser',
          name: 'Eraser',
          icon: 'delete'
        }
      ]
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    instanceId() {
      return this.data.instanceId
    },
    baseUrl() {
      return this.data.baseUrl
    }
  },
  methods: {
    // 返回真实地址
    realUrl(url, imageId) {
      const baseUrl = url.replace(/http[s]?:\/\//gi, '')
      console.log('realUrl: ', url, baseUrl)

      // nordata-cdn.oss-cn-shanghai.aliyuncs.com/dicomFiles
      return `wadouri://${baseUrl}/${imageId}`
    },
    // dicom开始
    dicomStart() {
      console.log('seriesList: ', this.seriesList)
      // 渲染列表
      this.seriesList.map(item => {
        if (item.instanceList[0]) {
          let imageId = item.instanceList[0].imageId
          // 找到要渲染的元素
          let canvas = newDiv()
          canvas.onclick = () => {
            this.dicomOpen(item)
          }
          this.$refs.canvasList.appendChild(canvas)
          // 注册cornerstone
          enable(canvas)
          // 获取真实url 解析dicom
          parser(this.realUrl(this.baseUrl, imageId), canvas)
        }
      })

      // 直接打开第一个
      if (this.$refs.canvasList.children[0]) {
        this.$refs.canvasList.children[0].click()
      }
    },
    // 点击事件 打开dicom
    dicomOpen(item) {
      let imageList = item.instanceList
      // 找到要渲染的元素
      let canvas = this.$refs.canvas

      // 注册cornerstone
      enable(canvas)

      // 获取真实url 解析dicom
      parser(this.realUrl(this.baseUrl, imageList[0].imageId), canvas)

      this.currentCanvas = canvas
      this.currentImageList = imageList

      // 图片列表
      let allImageIds = []
      this.currentImageList.forEach(item => {
        allImageIds.push(this.realUrl(this.baseUrl, item.imageId))
      })

      // 开启工具栏
      dicomTool.init(canvas, allImageIds)

      // 监听各个参数
      dicomTool.addEventListener(this, canvas)

      this.newImageMonitoring.currentImageIdIndex = 1

      console.log('dicomOpen: ', this.dData)

      // // 渲染默认数据
      // if (this.dData) {
      //   dicomTool.dData(canvas, this.dData)
      // }

      // 修改窗口大小
      elementResizeDetectorMaker().listenTo(this.$refs.dicomMain, () => {
        resize(canvas)
      })
    },
    // 功能按钮的抽象方法
    btnType(type) {
      // let canvas = this.currentCanvas;
      if (this.currentBtn === type) {
        // 关闭功能 禁用全部
        this.currentBtn = ''
        dicomTool.disableAllTools()
        return false
      } else {
        this.currentBtn = type
        dicomTool.disableAllTools()
        dicomTool.toolCollection(type)
      }
    },
    // 保存按钮
    getToolState() {
      let data = dicomTool.saveToolState()
      console.log(data)
      // console.log(data);
      // console.log(JSON.stringify(data));
    },
    rong() {
      let canvas = this.$refs.canvas
      dicomTool.rong(canvas)
    },
    // 初始化
    init() {
      this.$http
        .get(`${this.baseUrl}/${this.instanceId}.json`)
        .then(res => {
          this.seriesList = res
          this.dicomStart()
        })
        .catch(error => {
          this.seriesList = []
          this.$message.warn(`Can not find ${this.instanceId}`)
          console.log(`Dicom(${error}): can not found ${this.instanceId}`)
        })
    }
  }
}
</script>

<style lang="less">
.dicom-container {
  display: flex;
  height: 99%;
  background: white;
  flex-direction: column;

  .content {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: row;

    .canvasList {
      width: 200px;
      height: 100%;
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      background: black;

      .list {
        display: block;
        width: 200px;
        cursor: pointer;
      }
    }

    .dicomMain {
      display: block;
      height: 100%;
      margin-left: 10px;
      position: relative;
      width: calc(~'100% - 200px');
      background: black;

      .btn-header {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 100%;
        top: 0px;
        z-index: 10;
        margin-top: 10px;

        .ant-btn {
          width: 30px;
          height: 30px;
          padding: 0;
          margin-left: 5px;
        }

        .picker {
          margin-left: 10px;
        }
      }

      .image-canvas {
        width: 100%;
        height: 100%;
        overflow: hidden;

        canvas {
          width: 100% !important;
          height: 100% !important;
        }
      }

      .parameterMonitoringRight {
        justify-content: center;
        position: absolute;
        right: 0;
        bottom: 0;
        color: #e4ad00;
        width: 100%;
        display: flex;

        span {
          display: flex;
          align-items: center;
          margin-right: 20px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
