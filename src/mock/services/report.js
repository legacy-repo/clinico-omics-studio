import Mock from 'mockjs2'
import { getQueryParameters } from '../util'

const titles = [
  'High Confidence Region Intergration',
  'RNAseq Variant Calling',
  'NGScheckMates',
  'Trimmomatic',
  'Fastqscreen',
  'concatVCF',
  'VQSR',
  'miRNAseq'
]

const descriptions = [
  'High Confidence Region Integration',
  '从RNAseq数据中call突变',
  '从fastq文件中判断样本间的关系',
  '',
  '',
  '',
  '',
  '用于miRNA-seq二代测序数据分析'
]

const avatar = [
  'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/choppy/report.png',
  'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/choppy/report.png',
  'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/choppy/report.png',
  'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/choppy/report.png',
  'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/choppy/report.png'
]

const covers = [
  'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/choppy/report.png',
  'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/choppy/report.png',
  'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/choppy/report.png',
  'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/choppy/report.png',
  'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/choppy/report.png'
]

const owner = [
  '付小小',
  '吴加好',
  '周星星',
  '林东东',
  '曲丽丽'
]

const status = [
  {
    checked: true,
    archived: false
  },
  {
    checked: true,
    archived: false
  },
  {
    checked: true,
    archived: true
  },
  {
    checked: true,
    archived: true
  },
  {
    checked: true,
    archived: false
  },
  {
    checked: true,
    archived: false
  },
  {
    checked: true,
    archived: false
  },
  {
    checked: true,
    archived: false
  }
]

const checkedAt = [
  '2019-09-01 08:30:00',
  '2019-09-01 09:30:00',
  '2019-09-01 09:40:00',
  '2019-09-01 08:35:00',
  '2019-09-01 08:40:00',
  '2019-09-01 08:31:00',
  '2019-09-01 08:28:00',
  '2019-09-01 08:32:00'
]

const href = 'https://ant.design'

const report = (options) => {
  const queryParameters = getQueryParameters(options)
  console.log('queryParameters', queryParameters)
  if (queryParameters && !queryParameters.per_page) {
    queryParameters.per_page = 5
  } else {
    queryParameters.per_page = parseInt(queryParameters.per_page)
  }
  const data = []
  for (let i = 0; i < queryParameters.per_page; i++) {
    const tmpKey = i + 1
    const num = parseInt(Math.random() * (4 + 1), 10)
    data.push({
      id: tmpKey,
      avatar: avatar[num],
      owner: owner[num],
      href: href,
      title: titles[ i % 8 ],
      description: descriptions[ i % 8 ],
      // startedAt: Mock.mock('@datetime'),
      checkedAt: checkedAt[ i % 8 ],
      archivedAt: Mock.mock('@datetime'),
      status: status[ i % 8 ],
      report: tmpKey,
      cover: parseInt(i / 4, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)]
    })
  }

  const response = {
    total: data.length,
    per_page: parseInt(queryParameters.per_page),
    page: parseInt(queryParameters.page),
    message: 'success',
    data: data
  }
  return response
}

Mock.mock(/\/report-list/, 'get', report)
