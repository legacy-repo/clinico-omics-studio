<template>
  <a-row class="stat-studio" :gutter="8">
    <a-col class="left" :xxl="leftSpan" :xl="leftSpan" :lg="leftSpan" :md="24" :sm="24" :xs="24">
      <a-row class="left__panel">
        <a-tabs default-active-key="1" class="summary" size="default">
          <a-tab-pane key="1">
            <span slot="tab">
              <a-icon type="info-circle" />
              Summary
            </span>
            <vue-markdown :source="helpMsg" @rendered="update" class="markdown-viewer"></vue-markdown>
          </a-tab-pane>
          <a-button-group slot="tabBarExtraContent" style="margin-right: 5px">
            <a-tooltip>
              <template slot="title"> Reset Data and Arguments </template>
              <a-button type="danger" icon="stop"> Reset </a-button>
            </a-tooltip>
            <a-tooltip>
              <template slot="title"> Load Example Data </template>
              <a-button icon="database">{{ leftSpan >= 12 ? 'Example' : '' }}</a-button>
            </a-tooltip>
            <a-tooltip>
              <template slot="title"> Import Argument File </template>
              <a-button icon="upload">{{ leftSpan >= 12 ? 'Import' : '' }}</a-button>
            </a-tooltip>
            <a-tooltip>
              <template slot="title"> Export Argument File </template>
              <a-button icon="download">{{ leftSpan >= 12 ? 'Export' : '' }}</a-button>
            </a-tooltip>
          </a-button-group>
        </a-tabs>
        <a-tabs :activeKey="activeKey" class="arguments" @change="changeTab">
          <a-tab-pane :key="-1">
            <span slot="tab">
              <a-icon type="bar-chart" />
              Arguments
            </span>
            <form-builder
              class="form-builder"
              :nums="leftSpan <= 8 ? 1 : 2"
              :fields="fields"
              @action="onAction"
              @update="onUpdate"
            ></form-builder>
          </a-tab-pane>
          <a-tab-pane :key="index" v-for="(dataKey, index) in dataKeys">
            <span slot="tab">
              <a-icon type="database" />
              {{ dataKey.title }}
            </span>
            <a-col class="table-container">
              <chart-table :clientHeight="tableHeight" :data="dataKey.data" :key="leftSpan"></chart-table>
            </a-col>
          </a-tab-pane>
          <a-button slot="tabBarExtraContent" @click="switchImportForm" style="margin-right: 5px"> Load Data </a-button>
        </a-tabs>
      </a-row>
      <a-col class="divider" @mouseenter="resizeBtnActive = true" @mouseleave="resizeBtnActive = false">
        <a-button v-if="resizeBtnActive" class="resize-btn btn-1" size="small" @click="resize('1:1')"> 1:1 </a-button>
        <a-button v-if="resizeBtnActive" class="resize-btn btn-2" size="small" @click="resize('2:1')"> 2:1 </a-button>
        <a-button v-if="resizeBtnActive" class="resize-btn btn-3" size="small" @click="resize('1:2')"> 1:2 </a-button>
        <a-button v-if="resizeBtnActive" class="resize-btn btn-4" size="small" @click="resize('0:0')"> 0:0 </a-button>
      </a-col>
    </a-col>
    <a-col
      class="right"
      :xxl="rightSpan"
      :xl="rightSpan"
      :lg="rightSpan"
      :md="24"
      :sm="24"
      :xs="24"
      :style="{ padding: rightSpan === 24 ? '0px' : '0px 0px 0px 4px' }"
    >
      <a-row class="right__tabs">
        <a-tabs default-active-key="1" class="right__tabs-result" size="default">
          <a-tab-pane key="1">
            <span slot="tab">
              <a-icon type="bar-chart" />
              Figure
            </span>
            <a-col class="graph-container">
              <img style="width: 100%;" src="https://s1.imagehub.cc/images/2020/08/31/82-JCQ9Fx-tuya.jpg" />
              <!-- <div id="graph" ref="graph"></div> -->
            </a-col>
          </a-tab-pane>
          <a-tab-pane key="2">
            <span slot="tab">
              <a-icon type="snippets" />
              Result
            </span>
            Comming Soon...
          </a-tab-pane>
          <a-button-group slot="tabBarExtraContent" style="margin-right: 5px">
            <a-button> <a-icon type="bar-chart" /> Charts </a-button>
            <a-button> <a-icon type="history" /> History </a-button>
          </a-button-group>
        </a-tabs>
        <a-tabs default-active-key="1" class="right__tabs-log">
          <a-tab-pane key="1">
            <span slot="tab">
              <a-icon type="issues-close" />
              <span style="margin-right: 8px;">Log</span>
              <a-badge count="100" :overflowCount="100" :number-style="{ backgroundColor: '#52c41a' }" />
            </span>
            <p v-html="logMsg"></p>
          </a-tab-pane>
        </a-tabs>
      </a-row>
    </a-col>
    <div class="mask-window" v-if="importFormActive" @click="switchImportForm"></div>
    <import-form class="popup-form-container" v-if="importFormActive" @finished="switchImportForm"></import-form>
  </a-row>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import Prism from 'prismjs'
import ChartTable from './ChartTable'
import ImportForm from './ImportForm'
import FormBuilder from '@/views/formbuilder/FormBuilder'

export default {
  components: {
    ImportForm,
    FormBuilder,
    ChartTable,
    VueMarkdown
  },
  data() {
    return {
      importFormActive: false,
      activeKey: -1,
      helpMsg: '',
      logMsg: 'INFO [2021-07-19 14:52:50] Task started: basic/line-regression.\nINFO [2021-07-19 14:52:50] Reading parameters......\nList of 3\n $ dataArg: Named list()\n $ general:List of 23\n  ..$ cmd             : chr ""\n  ..$ imageExportType :List of 3\n  .. ..$ : chr "jpeg"\n  .. ..$ : chr "pdf"\n  .. ..$ : chr "plotly"\n  ..$ size            :List of 2\n  .. ..$ width : int 5\n  .. ..$ height: int 4\n  ..$ theme           : chr "theme_bw"\n  ..$ palette         : chr "lancet"\n  ..$ title           : chr "Line Reguression Plot"\n  ..$ xAxisTextAngle  : int 0\n  ..$ xAxisHjust      : num 0.5\n  ..$ xAxisVjust      : int 1\n  ..$ font            : chr "Arial"\n  ..$ legendPos       : chr "right"\n  ..$ legendDir       : chr "vertical"\n  ..$ titleSize       : int 12\n  ..$ axisTitleSize   : int 12\n  ..$ axisTextFontSize: int 10\n  ..$ legendTitleSize : int 10\n  ..$ legendTextSize  : int 10\n  ..$ transformX      : chr ""\n  ..$ transformY      : chr ""\n  ..$ taskname        : chr "07596860-e85b-11eb-b3a1-ddc28b0733a3"\n  ..$ clientVersion   : chr "v0.1.0"\n  ..$ paletteCustom   : list()\n  ..$ tmpcode         : chr "YCmd5AB"\n $ extra  :List of 6\n  ..$ addFunction         : logi TRUE\n  ..$ add_p               : logi FALSE\n  ..$ functionSize        : int 4\n  ..$ functionLabelPadding: int 5\n  ..$ nudgeX              : int 0\n  ..$ nudgeY              : int 0\nNULL\nINFO [2021-07-19 14:52:50] Checking data files...\nINFO [2021-07-19 14:52:50] Reading data...\n  value1 value2 group\n1   36.8  29.44    G1\n2   54.0  43.20    G1\n3   26.0  26.00    G1\n4   39.0  31.20    G1\n5   33.0  29.70    G1\n6   29.0  34.80    G1\nINFO [2021-07-19 14:52:54] Task done: basic/line-regression.\n─ Session info ───────────────────────────────────────────────────────────────\n setting  value                       \n version  R version 4.0.2 (2020-06-22)\n os       CentOS Linux 7 (Core)       \n system   x86_64, linux-gnu           \n ui       X11                         \n language (EN)                        \n collate  en_US.UTF-8                 \n ctype    en_US.UTF-8                 \n tz       Asia/Shanghai               \n date     2021-07-19                  \n\n─ Packages ───────────────────────────────────────────────────────────────────\n ! package          * version   date       lib\n P annotate           1.68.0    2020-10-27 [?]\n P AnnotationDbi      1.52.0    2020-10-27 [?]\n P assertthat         0.2.1     2019-03-21 [?]\n P backports          1.2.1     2020-12-09 [?]\n P base64enc          0.1-3     2015-07-28 [?]\n P bayestestR         0.9.0     2021-04-08 [?]\n P Biobase            2.50.0    2020-10-27 [?]\n P BiocGenerics       0.36.1    2021-04-16 [?]\n P BiocManager        1.30.15.3 2021-05-20 [?]\n P bit                4.0.4     2020-08-04 [?]\n P bit64              4.0.5     2020-08-30 [?]\n P bitops             1.0-7     2021-04-24 [?]\n P blob               1.2.1     2020-01-20 [?]\n P broom              0.7.6     2021-04-05 [?]\n P cachem             1.0.5     2021-05-15 [?]\n P Cairo              1.5-12.2  2020-07-07 [?]\n P callr            * 3.7.0     2021-04-20 [?]\n P caTools            1.18.2    2021-03-28 [?]\n P cellranger         1.1.0     2016-07-27 [?]\n P checkmate          2.0.0     2020-02-06 [?]\n P circlize           0.4.12    2021-01-08 [?]\n P cli                2.5.0     2021-04-26 [?]\n P clue               0.3-59    2021-04-16 [?]\n P cluster            2.1.2     2021-04-17 [?]\n P coda               0.19-4    2020-09-30 [?]\n P codetools          0.2-18    2020-11-04 [?]\n P colorspace         2.0-1     2021-05-04 [?]\n P ComplexHeatmap   * 2.6.2     2020-11-12 [?]\n P conquer            1.0.2     2020-08-27 [?]\n P cowplot          * 1.1.1     2020-12-30 [?]\n P crayon             1.4.1     2021-02-08 [?]\n P crosstalk          1.1.1     2021-01-12 [?]\n P curl               4.3.1     2021-04-30 [?]\n P data.table       * 1.14.0    2021-02-21 [?]\n P DBI                1.1.1     2021-01-15 [?]\n P dbplyr             2.1.1     2021-04-06 [?]\n P devEMF             4.0-2     2020-10-01 [?]\n P digest             0.6.27    2020-10-24 [?]\n P distributional     0.2.2     2021-02-02 [?]\n P doParallel         1.0.16    2020-10-16 [?]\n P dplyr            * 1.0.6     2021-05-05 [?]\n P DT                 0.18      2021-04-14 [?]\n P effectsize         0.4.4-1   2021-04-05 [?]\n P ellipsis           0.3.2     2021-04-29 [?]\n P emmeans            1.6.0     2021-04-24 [?]\n P estimability       1.3       2018-02-11 [?]\n P evaluate           0.14      2019-05-28 [?]\n P export           * 0.3.0     2021-05-20 [?]\n P extrafont        * 0.17      2014-12-08 [?]\n P extrafontdb        1.0       2012-06-11 [?]\n P fansi              0.4.2     2021-01-15 [?]\n P farver             2.1.0     2021-02-28 [?]\n P fastmap            1.1.0     2021-01-25 [?]\n P flextable          0.6.6     2021-05-17 [?]\n P forcats          * 0.5.1     2021-01-27 [?]\n P foreach            1.5.1     2020-10-15 [?]\n P foreign            0.8-81    2020-12-22 [?]\n P formatR            1.9       2021-04-14 [?]\n P Formula          * 1.2-4     2020-10-16 [?]\n P fs                 1.5.0     2020-07-31 [?]\n P furrr              0.2.2     2021-01-29 [?]\n P futile.logger    * 1.4.3     2016-07-10 [?]\n P futile.options     1.0.1     2018-04-20 [?]\n P future             1.21.0    2020-12-10 [?]\n P gdtools            0.2.3     2021-01-06 [?]\n P genefilter       * 1.72.1    2021-01-21 [?]\n P generics           0.1.0     2020-10-31 [?]\n P getopt             1.20.3    2019-03-22 [?]\n P GetoptLong         1.0.5     2020-12-15 [?]\n P ggcharts         * 0.2.1     2020-05-20 [?]\n P ggcorrplot         0.1.3     2019-05-19 [?]\n P ggdist           * 2.4.0     2021-01-04 [?]\n P ggplot2          * 3.3.3     2020-12-30 [?]\n P ggplotify        * 0.0.7     2021-05-11 [?]\n P ggpol              0.0.7     2020-11-08 [?]\n P ggrepel          * 0.9.1     2021-01-15 [?]\n P ggridges           0.5.3     2021-01-08 [?]\n P ggsci              2.9       2018-05-14 [?]\n P ggthemes         * 4.2.4     2021-01-20 [?]\n P GlobalOptions      0.1.2     2020-06-10 [?]\n P globals            0.14.0    2020-11-22 [?]\n P glue               1.4.2     2020-08-27 [?]\n P gplots           * 3.1.1     2020-11-28 [?]\n P gridBase           0.4-7     2014-02-24 [?]\n P gridExtra          2.3       2017-09-09 [?]\n P gridGraphics       0.5-1     2020-12-13 [?]\n P gtable             0.3.0     2019-03-25 [?]\n P gtools             3.8.2     2020-03-31 [?]\n P haven              2.4.1     2021-04-23 [?]\n P Hmisc            * 4.5-0     2021-02-28 [?]\n P hms                1.1.0     2021-05-17 [?]\n P htmlTable          2.2.1     2021-05-18 [?]\n P htmltools          0.5.1.1   2021-01-22 [?]\n P htmlwidgets      * 1.5.3     2020-12-10 [?]\n P httpuv             1.6.1     2021-05-07 [?]\n P httr               1.4.2     2020-07-20 [?]\n P igraph             1.2.6     2020-10-06 [?]\n P insight            0.14.0    2021-05-07 [?]\n P IRanges            2.24.1    2020-12-12 [?]\n P iterators          1.0.13    2020-10-15 [?]\n P jpeg               0.1-8.1   2019-10-24 [?]\n P jsonlite         * 1.7.2     2020-12-09 [?]\n P KernSmooth         2.23-20   2021-05-03 [?]\n P knitr              1.33      2021-04-24 [?]\n P labeling           0.4.2     2020-10-20 [?]\n P lambda.r           1.2.4     2019-09-18 [?]\n P later              1.2.0     2021-04-23 [?]\n P lattice          * 0.20-44   2021-05-02 [?]\n P latticeExtra       0.6-29    2019-12-19 [?]\n P lazyeval           0.2.2     2019-03-15 [?]\n P lifecycle          1.0.0     2021-02-15 [?]\n P listenv            0.8.0     2019-12-05 [?]\n P lubridate          1.7.10    2021-02-26 [?]\n P magrittr           2.0.1     2020-11-17 [?]\n P manipulateWidget   0.10.1    2020-02-24 [?]\n P MASS               7.3-54    2021-05-03 [?]\n P Matrix             1.3-3     2021-05-04 [?]\n P MatrixModels       0.5-0     2021-03-02 [?]\n P matrixStats        0.58.0    2021-01-29 [?]\n P memoise            2.0.0     2021-01-26 [?]\n P mgcv               1.8-35    2021-04-18 [?]\n P mime               0.10      2021-02-13 [?]\n P miniUI             0.1.1.1   2018-05-18 [?]\n P modelr             0.1.8     2020-05-19 [?]\n P multcomp           1.4-17    2021-04-29 [?]\n P munsell            0.5.0     2018-06-12 [?]\n P mvtnorm            1.1-1     2020-06-09 [?]\n P nlme               3.1-152   2021-02-04 [?]\n P NMF                0.23.0    2020-08-01 [?]\n P nnet               7.3-16    2021-05-03 [?]\n P officer            0.3.18    2021-04-02 [?]\n P openxlsx         * 4.2.3     2020-10-27 [?]\n P optparse         * 1.6.6     2020-04-16 [?]\n P pacman             0.5.1     2019-03-11 [?]\n P parallelly         1.25.0    2021-04-30 [?]\n P parameters         0.13.0    2021-04-08 [?]\n P patchwork        * 1.1.1     2020-12-17 [?]\n P pheatmap         * 1.0.12    2019-01-04 [?]\n P pillar             1.6.1     2021-05-16 [?]\n P pkgconfig          2.0.3     2019-09-22 [?]\n P pkgmaker           0.32.2    2020-10-20 [?]\n P plotly           * 4.9.3     2021-01-10 [?]\n P plumber          * 1.1.0     2021-03-24 [?]\n P plyr               1.8.6     2020-03-03 [?]\n P png                0.1-7     2013-12-03 [?]\n P polspline          1.1.19    2020-05-15 [?]\n P pROC               1.17.0.1  2021-01-13 [?]\n P processx           3.5.2     2021-04-30 [?]\n P promises           1.2.0.1   2021-02-11 [?]\n P ps                 1.6.0     2021-02-28 [?]\n P purrr            * 0.3.4     2020-04-17 [?]\n P quantreg           5.85      2021-02-24 [?]\n P R.methodsS3      * 1.8.1     2020-08-26 [?]\n P R.oo             * 1.24.0    2020-08-26 [?]\n P R.utils          * 2.10.1    2020-08-26 [?]\n P R6                 2.5.0     2020-10-28 [?]\n P RColorBrewer       1.1-2     2014-12-07 [?]\n P Rcpp               1.0.6     2021-01-15 [?]\n P readr            * 1.4.0     2020-10-05 [?]\n'.replaceAll('\n', '<br/>'),
      dataKeys: [
        {
          title: 'Data',
          data: []
        }
      ],
      title: 'Bar Chart',
      fields: [
        {
          tmplType: 'actions',
          span: 24,
          buttons: [
            {
              type: 'cancel',
              icon: 'reload',
              buttonType: 'danger',
              buttonLabel: 'Reset'
            },
            {
              type: 'submit',
              icon: 'bulb',
              buttonType: 'primary',
              buttonLabel: 'Run Analysis',
              validate: true
            }
          ]
        },
        {
          tmplType: 'select',
          type: 'string',
          label: 'X Axis Transform',
          name: 'sample_id',
          question: 'How many samples? For auto generating sample id.',
          placeholder: 'How many samples? For auto generating sample id.',
          model: 'sample_id',
          disabled: false,
          config: {
            initialValue: 'none',
            rules: [
              {
                type: 'number',
                required: true,
                message: 'Please input a number.'
              }
            ]
          }
        },
        {
          tmplType: 'select',
          type: 'string',
          label: 'Y Axis Transform',
          name: 'adapter_seq',
          placeholder: 'Please enter adapter sequence.',
          model: 'adapter_seq',
          config: {
            initialValue: 'none',
            rules: [
              {
                type: 'string',
                required: true,
                message: 'Please enter adapter sequence.'
              }
            ]
          }
        },
        {
          tmplType: 'select',
          type: 'number',
          label: 'Theme',
          name: 'randomBase_in_adapter',
          placeholder: 'Identify and remove random barcodes of this number of nucleotides.',
          model: 'randomBase_in_adapter',
          config: {
            initialValue: 'theme_bw',
            rules: [
              {
                type: 'number',
                required: true,
                message: 'Please input a number.'
              }
            ]
          }
        },
        {
          tmplType: 'select',
          type: 'string',
          label: 'Color Palette',
          name: 'adapter_seq',
          placeholder: 'Please enter adapter sequence.',
          model: 'adapter_seq',
          config: {
            initialValue: 'none',
            rules: [
              {
                type: 'string',
                required: true,
                message: 'Please enter adapter sequence.'
              }
            ]
          }
        },
      ],
      tableHeight: 250,
      resizeBtnActive: false,
      leftSpan: 12,
      rightSpan: 12
    }
  },
  methods: {
    loadHelpMsg(helpLink) {
      this.$http({
        url: helpLink,
        method: 'get',
        params: {}
      })
        .then(content => {
          this.helpMsg = content
          console.log('loadHelpMsg: ', content)
        })
        .catch(error => {
          this.helpMsg = 'No help document.'
          console.log('loadHelpMsg Error: ', error)
        })
    },
    update() {
      this.$nextTick(() => {
        Prism.highlightAll()
      })
    },
    switchImportForm(response) {
      this.importFormActive = !this.importFormActive
      if (this.activeKey < this.dataKeys.length) {
        console.log('switchImportForm: ', response, this.activeKey)
        this.$set(this.dataKeys[this.activeKey], 'data', response.data)
      }
    },
    changeTab(activeKey) {
      this.activeKey = activeKey
    },
    onAction() {},
    onUpdate() {},
    resizeHeight(height) {
      this.tableHeight = height
      console.log('resizeHeight: ', height)
    },
    resize(ratio) {
      if (ratio === '1:1') {
        this.leftSpan = 12
        this.rightSpan = 12
      } else if (ratio === '1:2') {
        this.leftSpan = 8
        this.rightSpan = 16
      } else if (ratio === '2:1') {
        this.leftSpan = 16
        this.rightSpan = 8
      } else if (ratio === '0:0') {
        this.leftSpan = 24
        this.rightSpan = 24
      }
    }
  },
  created() {
    this.loadHelpMsg('http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/test.md')
  }
}
</script>

<style lang="less" scoped>
.stat-studio {
  min-height: calc(100vh - 74px);
  display: flex;
  flex-wrap: wrap;

  .left {
    display: flex;
    flex-direction: row;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #d6d6d6;
    margin-bottom: 5px;

    .left__panel {
      overflow: scroll;
      width: calc(100% - 2px);

      .markdown-viewer {
        display: flex;
        flex-direction: column;
        overflow: scroll;
        max-height: 250px;
        padding: 10px;
      }
    }

    .arguments {
      height: calc(100vh - 392px);
    }

    .form-builder {
      width: 100%;
      padding: 0px 10px;
      min-width: 200px;
      overflow-y: scroll;
      height: calc(100vh - 450px);
    }

    .divider {
      width: 2px;
      padding: 0px !important;
      cursor: col-resize;

      .resize-btn {
        position: absolute;
        z-index: 1;
        left: -8px;
      }

      .btn-1 {
        top: 40%;
      }

      .btn-2 {
        top: calc(40% + 40px);
      }

      .btn-3 {
        top: calc(40% + 80px);
      }

      .btn-4 {
        top: calc(40% + 120px);
      }
    }
  }

  .right {
    margin-bottom: 5px;

    .right__tabs {
      padding: 0px 4px;
      border: 1px solid #d9d9d9;
      background-color: #fff;
      border-radius: 5px;
      height: calc(100vh - 80px);

      .right__tabs-result {
        height: calc(100% - 180px);
      }

      .right__tabs-log {
        height: 180px;

        p {
          height: 100px;
          padding: 0px 10px;
          overflow: scroll;
        }
      }
    }
  }
}
</style>

<style lang="less">
.stat-studio {
  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    padding: 10px;
    padding-left: 40px;
  }

  .ant-collapse-content > .ant-collapse-content-box {
    padding: 0px;
  }
}
</style>