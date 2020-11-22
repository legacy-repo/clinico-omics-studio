import { getChartSchema, postChart } from '@/api/manage'

const chart = {
  state: {},

  mutations: {},

  actions: {
    // 获取用户信息
    GetChartSchema({ commit }, parameter) {
      const chartName = parameter.chart
      const filepath = parameter.filepath

      return new Promise((resolve, reject) => {
        getChartSchema(chartName, {
          filepath: filepath
        })
          .then(response => {
            console.log('GetChartSchema: ', chartName, filepath, response)

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    CreateChart({ commit }, payload) {
      const chartName = payload.chart
      delete payload['chart']

      return new Promise((resolve, reject) => {
        postChart(chartName, payload)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default chart
