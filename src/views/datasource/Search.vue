<template>
  <a-row class="search-page">
    <a-col class="left" :xl="14" :lg="14" :md="24" :sm="24">
      <a-row class="header-content">
        <span class="title">{{ title }}</span>
        <p class="description" v-html="description"></p>
      </a-row>
      <a-row class="btn-group" :gutter="16">
        <a-col :xl="6" :lg="6" :md="6" :sm="12" :xs="12">
          <a-tooltip placement="top" title="View Project Data" :arrowPointAtCenter="true">
            <a class="span-btn" aria-current="false" href="/data-source/exploration" style="background-color: rgb(28, 121, 96);">
              <span class="span-icon"><a-icon type="project" /></span>&nbsp;
              <span style="vertical-align: middle;">Projects</span>
            </a>
          </a-tooltip>
        </a-col>
        <a-col :xl="6" :lg="6" :md="6" :sm="12" :xs="12">
          <a-tooltip placement="top" title="Discover Cases, Genes and Mutations" :arrowPointAtCenter="true">
            <a class="span-btn" aria-current="false" href="/exploration" style="background-color: rgb(117, 54, 133);">
              <span class="span-icon"><a-icon type="dot-chart" /></span>&nbsp;
              <span style="vertical-align: middle;">Exploration</span>
            </a>
          </a-tooltip>
        </a-col>
        <a-col :xl="6" :lg="6" :md="6" :sm="12" :xs="12">
          <a-tooltip placement="top" title="Launch Various Analysis using Custom Sets" :arrowPointAtCenter="true">
            <a class="span-btn" aria-current="false" href="/analysis" style="background-color: rgb(102, 104, 195);">
              <span class="span-icon"><a-icon type="deployment-unit" /></span>&nbsp;
              <span style="vertical-align: middle;">Analysis</span>
            </a>
          </a-tooltip>
        </a-col>
        <a-col :xl="6" :lg="6" :md="6" :sm="12" :xs="12">
          <a-tooltip placement="top" title="Browse and Download Data" :arrowPointAtCenter="true">
            <a class="span-btn" aria-current="false" href="/repository" style="background-color: rgb(3, 111, 173);">
              <span class="span-icon"><a-icon type="hdd" /></span>&nbsp;
              <span style="vertical-align: middle;">Repository</span>
            </a>
          </a-tooltip>
        </a-col>
      </a-row>
      <a-input-search
        placeholder="Search for a Project, Primary Site, Case"
        @search="onSearch"
        enterButton="Search"
        size="large"
        class="search-bar"
      />
      <a-row class="title">
        <span>Data Portal Summary</span>&nbsp;&nbsp;&nbsp;
        <span class="date">Data Release 18.0 - July 08, 2019</span>
      </a-row>
      <fact class="fact-container"></fact>
    </a-col>
    <a-col class="right" :xl="10" :lg="10" :md="24" :sm="24">
      <img style="width: 560px; margin: 50px 0px;" src="http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/choppy/bodymap.png">
    </a-col>
  </a-row>
</template>

<script>
import Fact from './Fact.vue'

export default {
  name: 'Search',
  data () {
    return {
      title: 'Genomic Data Commons Data Portal',
      description: 'The GDC Data Portal is a robust data-driven platform that allows cancer researchers and bioinformaticians to search and download cancer data for analysis.<br><br><b><i>Get Started by Exploring:</i></b>'
    }
  },
  props: {},
  methods: {
    onSearch () {

    }
  },
  components: {
    Fact
  }
}
</script>

<style lang="less">
.search-bar {
  .ant-input-search-button {
    height: 50px;
  }
}
</style>

<style lang="less" scoped>
.search-page {
  height: 100%;
  width: 100%;
  background-color: #fff;
  min-height: 650px;

  .right {
    display: flex;
    justify-content: center;
  }

  .left {
    padding: 2rem;

    .header-content {
      .description {
        font-size: 14px;
        margin: 20px 0px;
      }
    }

    .title {
      margin-bottom: 1rem;
      font-size: 1.5rem;
      text-align: center;

      .date {
        font-size: 1rem;
      }
    }

    .fact-container {
      width: 100%;
    }

    .btn-group {
      .span-btn {
        display: inline-block;
        white-space: nowrap;
        text-align: left;
        font-size: 1rem;
        height: 3rem;
        width: 100%;
        color: white !important;
        padding: 0.5rem 1rem 0.5rem 0.5rem;
        margin-bottom: 5px;
        border-radius: 6px;
        transition: all 0.25s ease 0s;
        text-decoration: none !important;

        .span-icon {
          -webkit-box-align: center;
          -webkit-box-pack: center;
          background-color: rgba(255, 255, 255, 0.35);
          width: 2rem;
          height: 2.1rem;
          vertical-align: middle;
          font-size: 1rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.5rem;
        }
      }

      .span-btn:hover {
        opacity: 0.8;
      }
    }

    .search-bar {
      width: 100%;
      height: 50px;
      margin-bottom: 2rem;
      margin-top: 2rem;
    }
  }
}
</style>
