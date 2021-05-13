import { initBaseURL } from '@/config/defaultSettings'
import map from 'lodash.map'

const randomString = Math.random()
  .toString(36)
  .slice(-8)

const pathologyMixins = {
  methods: {
    getModelResult(instanceId, modelName) {
      const url = `${initBaseURL()}/attachments/pathology/${instanceId}_models/${modelName}/prediction.json?random=${randomString}`
      return new Promise((resolve, reject) => {
        this.$http
          .get(url)
          .then(response => {
            console.log('Model: ', response)
            resolve(response)
          })
          .catch(error => {
            console.log('Get Model Result: ', error)
            reject(undefined)
          })
      })
    },
    refreshModel(instanceId, modelName) {
      return new Promise((resolve, reject) => {
        this.getModelResult(instanceId, modelName)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    batchLoad(instanceId, models) {
      const modelRequests = map(models, modelName => {
        return this.getModelResult(instanceId, modelName)
      })

      return new Promise((resolve, reject) => {
        Promise.all(
          modelRequests.map(function(promiseItem) {
            return promiseItem.catch(function(err) {
              return err
            })
          })
        )
          .then(results => {
            resolve(results)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default pathologyMixins
