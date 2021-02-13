import rawAxios from 'axios'

class PreQCService {
  getItem(filepath) {
    return new Promise((resolve, reject) => {
      rawAxios({
        url: 'http://serverless.3steps.c',
        method: 'post',
        data: {
          filepath: filepath
        }
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default new PreQCService()
