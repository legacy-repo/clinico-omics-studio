<template>
  <fullscreen ref="fullscreen">
    <a-row
      class="genome-viewer"
      v-show="isValid"
      :class="{ fullscreen: fullscreenActive, 'non-fullscreen': !fullscreenActive }"
    >
      <a-row class="viewer-header">
        <a-col class="title" :span="12">
          <span class="rainbow logo">Integrative Genomics Viewer</span>
        </a-col>
        <a-col class="button-group" :span="12">
          <a-button
            :size="buttonSize"
            icon="fullscreen"
            v-if="!fullscreenActive"
            @click="fullscreenChange"
          >Full Screen</a-button>
          <a-button :size="buttonSize" icon="fullscreen-exit" v-else @click="fullscreenChange">Exit</a-button>
          <a-button :size="buttonSize" icon="save" disabled>Save Session</a-button>
          <a-button :size="buttonSize" icon="plus" disabled>Add Track</a-button>
        </a-col>
      </a-row>
      <div :id="id" class="viewer-content" v-show="!loading"></div>
      <a-spin class="viewer-content" style="min-height: 300px; display: flex; justify-content: center; align-items: center;" v-if="loading" />
    </a-row>
    <a-empty class="empty-viewer" v-show="!isValid" />
  </fullscreen>
</template>

<script>
import igv from 'igv'

const genomeInfo = {
  hg38: {
    genome: 'hg38',
    name: 'Human (GRCh38/hg38)',
    fastaURL: 'https://s3.amazonaws.com/igv.broadinstitute.org/genomes/seq/hg38/hg38.fa',
    indexURL: 'https://s3.amazonaws.com/igv.broadinstitute.org/genomes/seq/hg38/hg38.fa.fai',
    cytobandURL: 'https://s3.amazonaws.com/igv.broadinstitute.org/annotations/hg38/cytoBandIdeo.txt'
  }
}

export default {
  props: {
    id: {
      type: String,
      default: Math.random()
        .toString(36)
        .slice(-8),
      required: false
    },
    search: {
      type: String,
      // 最大分辨率为40bp
      required: false
    },
    sampleName: {
      type: String,
      required: false,
      default: 'Phase3 Integrated'
    },
    vcfUrl: {
      type: String,
      required: false
    },
    vcfIndexUrl: {
      type: String,
      required: false
    },
    bamUrl: {
      type: String,
      required: false
    },
    bamIndexUrl: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      fullscreenActive: false,
      isValid: false,
      buttonSize: 'default',
      loading: false
    }
  },
  computed: {
    vcfTrackName() {
      if (this.sampleName) {
        return `${this.sampleName} VCF`
      } else {
        return 'VCF'
      }
    },
    bamTrackName() {
      if (this.sampleName) {
        return `${this.sampleName} BAM`
      } else {
        return 'BAM'
      }
    }
  },
  mounted() {
    let igvDiv = document.getElementById(this.id)
    console.log('GenomeViewer: ', this.makeOptions('hg38'))
    this.loadIGV(igvDiv, this.makeOptions('hg38'))
  },
  methods: {
    fullscreenChange() {
      const instance = this.$refs['fullscreen']
      if (instance.getState()) {
        instance.exit()
        this.fullscreenActive = false
      } else {
        instance.enter()
        this.fullscreenActive = true
      }
    },
    loadIGV(igvDiv, options) {
      igv.createBrowser(igvDiv, options).then(browser => {
        if (this.search) {
          browser.search(this.search)
        }

        this.loading = false
        console.log('Created IGV browser', browser)
      })
    },
    makeTrack(name, type, url, indexURL) {
      // TODO: how to deal with invalid track?
      if (url && indexURL) {
        return {
          type: type,
          format: type == 'variant' ? 'vcf' : 'bam',
          url: url,
          indexURL: indexURL,
          name: name,
          squishedCallHeight: 1,
          expandedCallHeight: 4,
          displayMode: 'expanded',
          visibilityWindow: 1000
        }
      } else {
        return null
      }
    },
    makeTracks(vcfTrack, bamTrack) {
      const tracks = []
      if (vcfTrack) {
        tracks.push(vcfTrack)
      }

      if (bamTrack) {
        tracks.push(bamTrack)
      }

      return tracks
    },
    makeOptions(genomeId) {
      const genome = genomeInfo[genomeId]
      let options = {
        id: genomeId,
        ...genome,
        tracks: this.makeTracks(
          this.makeTrack(this.vcfTrackName, 'variant', this.vcfUrl, this.vcfIndexUrl),
          this.makeTrack(this.bamTrackName, 'alignment', this.bamUrl, this.bamIndexUrl)
        )
      }

      return options
    },
    checkInputs() {
      if (!this.vcfUrl && !this.bamUrl) {
        this.isValid = false
        console.log('GenomeViewer Error: need to specify vcfUrl or bamUrl at least.')
      } else {
        this.isValid = true
        this.loading = true
      }
    }
  },
  created() {
    this.checkInputs()
  }
}
</script>

<style lang="less" scoped>
.genome-viewer {
  text-align: center;

  .viewer-header {
    display: flex;
    flex-direction: row;
    margin: 0px 10px;

    .title {
      font-weight: 500;
      display: flex;
      align-items: center;

      span.logo {
        font-size: 22px;
      }
    }

    .button-group {
      display: flex;
      justify-content: flex-end;
      height: 32px;

      .ant-btn {
        margin-left: 5px;
      }
    }
  }

  .viewer-content {
    width: 100%;
    height: calc(100% - 44px);
  }
}

.genome-viewer,
.empty-viewer {
  padding-top: 10px;
  width: 100%;
  height: 100%;
  padding-bottom: 10px;
  min-height: 500px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
}

.empty-viewer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@keyframes bling {
  from {
    background-position: 0;
  }
  to {
    background-position: 1063px;
  }
}
.rainbow {
  display: inline-block;
  position: relative;
  font-weight: 500;
  font-size: 100px;
  color: transparent;
  animation: bling 30s linear infinite;
  background-image: linear-gradient(to right, red, orange, yellow, lightgreen, skyblue, lightgreen, yellow, red);
  -webkit-background-clip: text;
  background-size: 1063px;
}
</style>