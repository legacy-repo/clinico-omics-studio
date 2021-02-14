import rawAxios from 'axios'
import { initPreQCHost } from '@/config/defaultSettings'

class PreQCService {
  getItem(filepath) {
    return new Promise((resolve, reject) => {
      rawAxios({
        url: `${initPreQCHost()}/fastq-meta`,
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
