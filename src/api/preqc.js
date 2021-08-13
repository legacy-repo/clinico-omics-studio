import { axios } from '@/utils/request'
import { initPreQCHost } from '@/config/defaultSettings'

class PreQCService {
  getItem(filepath) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${initPreQCHost()}/fastq-meta/`,
        method: 'post',
        data: {
          filepath: filepath
        },
        timeout: 600000  // 10min
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
