<template>
  <a-row class="search-page">
    <a-col class="left" :xl="8" :lg="8" :md="24" :sm="24">
      <a-row class="header-content">
        <span class="title">{{ title }}</span>
        <p class="description" v-html="description"></p>
      </a-row>
      <a-input-search
        placeholder="Search for a Project, Primary Site, Case"
        @search="onSearch"
        enterButton="Search"
        size="large"
        class="search-bar"
      />
      <a-row class="btn-group" :gutter="16">
        <a-col>
          <a-tooltip placement="top" title="View Materials Status" :arrowPointAtCenter="true">
            <router-link class="span-btn" aria-current="false" :to="{ name: 'materials'}" style="background-color: #FFC65D;">
              <span class="span-icon"><a-icon type="experiment" /></span>&nbsp;
              <span style="vertical-align: middle;">Materials</span>
            </router-link>
          </a-tooltip>
        </a-col>
        <a-col>
          <a-tooltip placement="top" title="Browse and Download Data" :arrowPointAtCenter="true">
            <router-link class="span-btn" aria-current="false" :to="{ name: 'data' }" style="background-color: #F16745;">
              <span class="span-icon"><a-icon type="deployment-unit" /></span>&nbsp;
              <span style="vertical-align: middle;">Data</span>
            </router-link>
          </a-tooltip>
        </a-col>
        <a-col>
          <a-tooltip placement="top" title="Discovery Project Data" :arrowPointAtCenter="true">
            <router-link class="span-btn" aria-current="false" :to="{ name: 'visualization' }" style="background-color: #4CC3D9;">
              <span class="span-icon"><a-icon type="dot-chart" /></span>&nbsp;
              <span style="vertical-align: middle;">Visualization</span>
            </router-link>
          </a-tooltip>
        </a-col>
        <a-col>
          <a-tooltip placement="top" title="Launch Various Analysis using Custom Sets" :arrowPointAtCenter="true">
            <router-link class="span-btn" aria-current="false" :to="{ name: 'appstore' }" style="background-color: #7BC8A4;">
              <span class="span-icon"><a-icon type="hdd" /></span>&nbsp;
              <span style="vertical-align: middle;">QC Tools</span>
            </router-link>
          </a-tooltip>
        </a-col>
      </a-row>
      <a-row class="title">
        <span>Version: </span>
        <span class="date">Data Release 1.0 - July 15, 2020</span>
      </a-row>
    </a-col>
    <a-col class="right">
      <fact class="fact-container"></fact>
      <img style="width: 100%;" src="https://nordata-cdn.oss-cn-shanghai.aliyuncs.com/choppy/quality-platform-framework-v3.png">
    </a-col>
  </a-row>
</template>

<script>
import Fact from './Fact.vue'

export default {
  name: 'Search',
  data () {
    return {
      title: 'The ClinicoOmics Platform',
      description: 'The ClinicoOmics Platform is an open and standard multi-omics data infrastructure for unlocking technical errors, improving high-throughput multi-omics technologies reproducibility, accelerating research and clinical decision-making with reference data, and enhancing the quality consciousness.<br><br><b><i>Get Started by Exploring:</i></b>'
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

<style lang="less" scoped>
.search-page {
  height: 100%;
  width: 100%;
  background-color: #fff;
  min-height: 650px;

  .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 20px;
    min-width: 500px;

    .fact-container {
      margin-top: 2rem;
      margin-bottom: 1rem;
      width: 100%;
    }
  }

  .left {
    padding: 2rem;

    .header-content {
      .description {
        font-size: 1rem;
        margin: 20px 0px 0px;
        text-align: justify;
      }

      .title {
        font-size: 2rem;
      }
    }

    .title {
      font-size: 1.1rem;
      font-weight: 500;
      text-align: center;

      .date {
        font-size: 1rem;
        font-weight: 400;
      }
    }

    .search-bar {
      width: 100%;
      margin: 10px auto;
    }

    .btn-group {
      display: flex;
      flex-direction: column;

      .span-btn {
        display: inline-block;
        white-space: wrap;
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
  }
}
</style>
