import Mock from 'mockjs2'
import { getQueryParameters } from '../util'

const ids = [
  '5be4fe22-4b9a-40ae-90c2-251a07388e99',
  'd6fce494-f145-423f-bbc9-dd1d16059ff3',
  '2d88296f-06e0-4807-acd4-b5fac719edc6',
  '5fc360a3-4e1a-4c3b-8559-1776b895aebd',
  '56689ce2-078f-4bbc-a2a6-a09a61b7c0d1',
  '647b224a-4b00-4d38-b1df-acf0d1b33b7c',
  '292e95de-92f0-45be-be86-dd050a89c694',
  '6e960f73-89fb-48c9-bb11-1e194cf31564',
  'f5c9cba4-9b67-4162-8afd-1809d117e747',
  'ff9de2b8-ebfb-456e-a8b4-565b2ef6ac0b'
]

const reportNameLst = [
  'High Confidence Region Intergration',
  'RNAseq Variant Calling',
  'NGScheckMates',
  'Trimmomatic',
  'Fastqscreen',
  'concatVCF',
  'VQSR',
  'miRNAseq',
  'exRNA',
  'WES Project'
]

const owner = [
  '付小小',
  '吴加好',
  '周星星',
  '林东东',
  '曲丽丽',
  'XXYY',
  'ZZKK',
  'PPOO',
  'XXXJJ',
  'POPO'
]

const startedTimeLst = [
  '2019-09-01 08:30:00',
  '2019-09-01 09:30:00',
  '2019-09-01 09:40:00',
  '2019-09-01 08:35:00',
  '2019-09-01 08:40:00',
  '2019-09-01 08:31:00',
  '2019-09-01 08:28:00',
  '2019-09-01 08:32:00',
  '2019-09-01 08:28:00',
  '2019-09-01 08:32:00'
]

const finishedTimeLst = [
  '2019-09-01 08:30:00',
  '2019-09-01 09:30:00',
  '2019-09-01 09:40:00',
  '2019-09-01 08:35:00',
  '2019-09-01 08:40:00',
  '2019-09-01 08:31:00',
  '2019-09-01 08:28:00',
  '2019-09-01 08:32:00',
  '2019-09-01 08:28:00',
  '2019-09-01 08:32:00'  
]

const checkedTimeLst = [
  '2019-09-01 08:30:00',
  '2019-09-01 09:30:00',
  '2019-09-01 09:40:00',
  '2019-09-01 08:35:00'
]

const archivedTimeLst = [
  '2019-09-01 08:30:00',
  '2019-09-01 09:30:00'
]

const report = (options) => {
  const queryParameters = getQueryParameters(options)
  console.log('queryParameters', queryParameters)
  if (queryParameters && !queryParameters.page_size) {
    queryParameters.page_size = 10
  } else {
    queryParameters.page_size = parseInt(queryParameters.page_size)
  }
  const data = []
  const start = queryParameters.page_size * (queryParameters.page - 1)
  const end = queryParameters.page_size * queryParameters.page
  for (let num = start; num < end; num++) {
    data.push({
      id: ids[num],
      title: reportNameLst[num],
      description: '',
      reportUrl: 'http://localhost:3000/report/project-1/multiqc_report.html',
      author: owner[num],
      startedAt: startedTimeLst[num],
      finishedAt: finishedTimeLst[num],
      reportType: 'multiqc',
      status: {
        checked: Boolean(checkedTimeLst[num]),
        archived: Boolean(archivedTimeLst[num])
      },
      reportLog: 'This is a report log.'
    })
  }

  const response = {
    total: ids.length,
    page_size: parseInt(queryParameters.page_size),
    page: parseInt(queryParameters.page),
    message: 'success',
    data: data
  }
  return response
}

Mock.mock(/\/reports\?.*/, 'get', report)
