<template>
  <a-row>
    <a-col v-for="item in factData" :xs="24" :md="12" :lg="6" :key="item.name">
      <div class="fact-item">
        <h4 class="fact-item-title">{{ item.title }}</h4>
        <div class="fact-info">
          <project-icon class="custom-icon fact-icon" v-if="item.name.toUpperCase() == 'PROJECTS'" />
          <sitemap-icon
            class="custom-icon fact-icon"
            v-if="item.name.toUpperCase() == 'PRIMARYSITES'"
          />
          <analysis-icon class="custom-icon fact-icon" v-if="item.name.toUpperCase() == 'CASES'" />
          <case-icon class="custom-icon fact-icon" v-if="item.name.toUpperCase() == 'FILES'" />
          <span class="fact-num" :class="'fact-num__' + item.name.toLowerCase()">{{ item.num }}</span>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import { projectIcon, sitemapIcon, analysisIcon, caseIcon } from '@/core/icons'
import { getCollections } from '@/api/manage'
import { mapActions } from 'vuex'
import filter from 'lodash.filter'
import { config } from '@/config/defaultSettings'

export default {
  name: 'Fact',
  components: {
    projectIcon,
    sitemapIcon,
    analysisIcon,
    caseIcon
  },
  data() {
    return {
      factData: [
        {
          title: 'MATERIALS',
          name: 'MATERIALS',
          num: '0'
        },
        {
          title: 'PLATFORMS',
          name: 'PLATFORMS',
          num: '0'
        },
        {
          title: 'FILES',
          name: 'FILES',
          num: '0'
        },
        {
          title: 'PRIMARY SITES',
          name: 'PRIMARYSITES',
          num: '0'
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      countCollections: 'CountCollections'
    }),
    setNum(field, num) {
      const items = filter(this.factData, o => {
        return o.name == field
      })

      if (items.length > 0) {
        items[0].num = String(num)
      }
    },
    getProjectCount() {
      this.countCollections({ group: 'project_name' })
        .then(data => {
          this.setNum('MATERIALS', data.length)
        })
        .catch(error => {
          console.log('getProjectCount: ', error)
        })
    },
    getPlatformCount() {
      this.countCollections({ group: 'platform' })
        .then(data => {
          this.setNum('PLATFORMS', data.length)
        })
        .catch(error => {
          console.log('getPlatformCount: ', error)
        })
    },
    getSiteCount() {
      this.countCollections({ group: 'site' })
        .then(data => {
          this.setNum('PRIMARYSITES', data.length)
        })
        .catch(error => {
          console.log('getSiteCount: ', error)
        })
    },
    getFileCount() {
      getCollections(config.defaultCollection, { page: 1, per_page: 1 }, {})
        .then(response => {
          this.setNum('FILES', this.formatNum(response.total))
        })
        .catch(error => {
          console.log('getFileCount: ', error)
        })
    },
    formatNum(num) {
      return num.toLocaleString('en-US');
    }
  },
  created() {
    this.getProjectCount()
    this.getSiteCount()
    this.getFileCount()
    this.getPlatformCount()
  }
}
</script>

<style lang="less" scoped>
.fact-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .fact-link:hover,
  .fact-link:active,
  .fact-link:-webkit-any-link {
    text-decoration: none;
  }

  .fact-item-title {
    font-family: Helvetica, sans-serif;
    color: #000000;
    font-size: 18px;
    margin-bottom: 10px;
  }

  .fact-info {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    // background-color: #d7d7d7;
    padding: 5px 15px;
    border-radius: 6px;
    width: 90%;
    cursor: pointer;

    .fact-icon {
      -webkit-box-align: center;
      -webkit-box-pack: center;
      // background-color: rgba(255, 255, 255, 0.35);
      width: 2rem;
      height: 2.1rem;
      vertical-align: middle;
      font-size: 1rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.5rem;
      margin-right: 5px;
    }

    .fact-num {
      // color: #fff;
      font-size: 2.1rem;
    }
  }
}
</style>
