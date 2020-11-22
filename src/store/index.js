import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import workflow from './modules/workflow'
import report from './modules/report'
import project from './modules/project'
import notification from './modules/notification'
import choppyApp from './modules/choppy_app'
import fs from './modules/fs'
import data from './modules/data_commons'
import chartStudio from './modules/chart_studio'
import chart from './modules/chart'
import materials from './modules/materials'
import i18n from './modules/i18n'
import permission from './modules/permission'
import oidcStore from './modules/oidc'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    workflow,
    report,
    project,
    notification,
    choppyApp,
    fs,
    materials,
    data,
    chart,
    chartStudio,
    i18n,
    permission,
    oidcStore
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
