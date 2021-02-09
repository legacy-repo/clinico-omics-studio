<template>
  <a-row class="dashboard">
    <a-col class="header">
      <a class="title" @click="redirectHome">{{ title }}</a>
      <div class="datetime">{{ dateTime }}</div>
    </a-col>
    <a-row class="mainbox" :gutter="16">
      <a-col :span="9">
        <div class="panel bar">
          <!-- <h2>Materials Tubes</h2> -->
          <h2>Number of Samples By Metro Line</h2>
          <v-chart class="chart" :options="materialsTubes" :autoresize="true"></v-chart>
          <div class="panel-footer"></div>
        </div>
        <!-- <div class="panel line">
          <h2>Temperature</h2>
          <v-chart class="chart" :options="temperature" :autoresize="true"></v-chart>
          <div class="panel-footer"></div>
        </div>-->
        <div class="panel pie">
          <h2>Distribution of Samples</h2>
          <v-chart class="chart" :options="sampleTypeTubes" :autoresize="true"></v-chart>
          <div class="panel-footer"></div>
        </div>
        <div class="panel" id="baidumap" style="padding: 0px;"></div>
      </a-col>
      <a-col :span="15">
        <div class="no">
          <div class="no-hd">
            <ul>
              <li>2,226 Tubes</li>
              <li>12,554 GB</li>
            </ul>
          </div>
          <div class="no-bd">
            <ul>
              <!-- <li>Request Tubes</li> -->
              <li>Number of Samples</li>
              <li>Data Volume</li>
            </ul>
          </div>
        </div>
        <div class="map">
          <v-chart class="chart" :options="getMapOptions()" :autoresize="true"></v-chart>
          <div class="map1"></div>
          <div class="map2"></div>
          <div class="map3"></div>
        </div>
      </a-col>
      <a-col :span="9" style="display: none;">
        <div class="panel bar1">
          <h2>Tubes in SampleType</h2>
          <v-chart class="chart" :options="sampleTypeTubesBar" :autoresize="true"></v-chart>
          <div class="panel-footer"></div>
        </div>
        <div class="panel line1">
          <h2>Tubes in Date</h2>
          <v-chart class="chart" :options="tubesDateLine" :autoresize="true"></v-chart>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie1">
          <h2>Materials Tubes</h2>
          <v-chart class="chart" :options="materialsTubesPie" :autoresize="true"></v-chart>
          <div class="panel-footer"></div>
        </div>
      </a-col>
    </a-row>
    <p
      style="position: fixed; right: 30%; bottom: 10px; color: #fff; font-size: 14px;"
    >The part of materials come from the Internet</p>
  </a-row>
</template>

<script>
import moment from 'moment'
import { registerChinaMap, getMapOptions, getPointMap } from './map'
import {
  materialsTubes,
  temperature,
  sampleTypeTubes,
  sampleTypeTubesBar,
  tubesDateLine,
  materialsTubesPie
} from './chart'

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/lines'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'
import 'echarts/extension/bmap/bmap'
import 'zrender/lib/svg/svg'
import * as echarts from 'echarts'

registerChinaMap(ECharts)

export default {
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      timer: '',
      title: 'MetaSUB Project',
      dateTime: '',
      materialsTubes,
      temperature,
      sampleTypeTubes,
      sampleTypeTubesBar,
      tubesDateLine,
      materialsTubesPie
    }
  },
  methods: {
    getPointMap,
    getMapOptions,
    updateDateTime() {
      this.dateTime = moment().format('YYYY-MM-DD hh:mm:ss')
    },
    redirectHome() {
      this.$router.push({
        name: 'data'
      })
    }
  },
  mounted() {
    this.timer = setInterval(this.updateDateTime, 1000)
    var bmapChart = echarts.init(document.getElementById('baidumap'))
    bmapChart.setOption(getPointMap())
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  created() {}
}
</script>

<style lang="less" scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-bottom: 0px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li {
  list-style: none;
}

@font-face {
  font-family: electronicFont;
  src: url('../../assets/font/DS-DIGIT.TTF');
}

.dashboard {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
  font-size: 56px;
  /*  背景图定位 / 背景图尺寸  cover 完全铺满容器  contain 完整显示在容器内 */
  background: url('../../assets/images/bg.jpg') no-repeat #000;
  background-size: cover;
  /* 行高是字体1.15倍 */
  line-height: 1.15;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 10%;
    background: url('../../assets/images/head_bg.png') no-repeat top center;
    background-size: 100% 100%;

    .title {
      width: 100%;
      height: 56px;
      margin-bottom: 10px;
      font-size: 0.6em;
      color: #fff;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .datetime {
      position: absolute;
      top: 20px;
      right: 0.375em;
      line-height: 0.9375em;
      font-size: 0.4em;
      color: rgba(255, 255, 255, 0.7);
    }
  }

  .mainbox {
    min-width: 1024px;
    max-width: 1920px;
    padding: 0.125em 0.125em 0 0.125em;
    margin: 0px 0px !important;
    display: flex;
    height: 95%;

    .ant-col {
      height: 100%;
    }
  }

  .panel {
    height: 30%;
    position: relative;
    border: 1px solid #00ffb52b;
    background: rgba(255, 255, 255, 0.04) url('../../assets/images/line.png');
    padding: 0.2em 0.1875em 0.35em;
    margin-bottom: 0.1875em;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      width: 10px;
      height: 10px;
      border-top: 2px solid #02a6b5;
      border-left: 2px solid #02a6b5;
    }

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      content: '';
      width: 10px;
      height: 10px;
      border-top: 2px solid #02a6b5;
      border-right: 2px solid #02a6b5;
    }

    .panel-footer {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;

      &::before {
        position: absolute;
        bottom: 0;
        left: 0;
        content: '';
        width: 10px;
        height: 10px;
        border-bottom: 2px solid #02a6b5;
        border-left: 2px solid #02a6b5;
      }

      &::after {
        position: absolute;
        bottom: 0;
        right: 0;
        content: '';
        width: 10px;
        height: 10px;
        border-bottom: 2px solid #02a6b5;
        border-right: 2px solid #02a6b5;
      }
    }

    h2 {
      text-align: center;
      color: #fff;
      font-size: 0.3em;
      font-weight: 400;

      a {
        margin: 0 0.1875em;
        color: #fff;
        text-decoration: underline;
      }
    }

    .chart {
      width: 100%;
      height: calc(100% - 20px);
      margin-top: 10px;
    }
  }

  .no {
    height: 20%;
    background: rgba(101, 132, 226, 0.1);

    .no-hd {
      height: 70%;
    }

    .no-bd {
      height: 30%;
    }

    .no-hd {
      position: relative;
      border: 1px solid rgba(25, 186, 139, 0.17);

      &::before {
        content: '';
        position: absolute;
        width: 30px;
        height: 10px;
        border-top: 2px solid #02a6b5;
        border-left: 2px solid #02a6b5;
        top: 0;
        left: 0;
      }

      &::after {
        content: '';
        position: absolute;
        width: 30px;
        height: 10px;
        border-bottom: 2px solid #02a6b5;
        border-right: 2px solid #02a6b5;
        right: 0;
        bottom: 0;
      }

      ul {
        height: 100%;
        display: flex;

        li {
          height: 100%;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          text-align: center;
          line-height: 1em;
          font-size: 0.875em;
          color: #ffeb7b;
          padding: 0.05em 0;
          // font-family: electronicFont;
          font-weight: bold;

          &:first-child::after {
            content: '';
            position: absolute;
            height: 50%;
            width: 1px;
            background: rgba(255, 255, 255, 0.2);
            right: 0;
            top: 25%;
          }
        }
      }
    }

    .no-bd ul {
      height: 100%;
      display: flex;

      li {
        height: 100%;
        display: flex;
        justify-content: center;
        flex: 1;
        line-height: 1.6em;
        text-align: center;
        font-size: 0.3em;
        align-items: center;
        color: rgba(255, 255, 255, 0.7);
        padding-top: 0.125em;
      }
    }
  }

  .map {
    position: relative;
    height: 80%;

    .chart {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 5;
      height: 100%;
      width: 100%;
    }

    .map1,
    .map2,
    .map3 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 6.475em;
      height: 6.475em;
      background: url('../../assets/images/map.png') no-repeat;
      background-size: 100% 100%;
      opacity: 0.3;
    }

    .map2 {
      width: 8.0375em;
      height: 8.0375em;
      background-image: url('../../assets/images/lbx.png');
      opacity: 0.6;
      animation: rotate 15s linear infinite;
      z-index: 2;
    }

    .map3 {
      width: 7.075em;
      height: 7.075em;
      background-image: url('../../assets/images/jt.png');
      animation: rotate1 10s linear infinite;
    }
  }
}
</style>

<style lang="less">
.anchorBL {
  display: none;
}

@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes rotate1 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}

@media screen and (max-width: 1024px) {
  html {
    font-size: 42px !important;
  }

  .dashboard {
    font-size: 56px !important;
  }
}
@media screen and (min-width: 1920px) {
  html {
    font-size: 80px !important;
  }

  .dashboard {
    font-size: 80px !important;
  }
}
</style>