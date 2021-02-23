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
        timeout: 180000  // 120s
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
