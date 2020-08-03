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

const projectNameLst = [
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

const descriptionLst = [
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

const apps = [
  'huangyechao/annovar-latest',
  'huangyechao/wes-somatic-latest',
  'huangyechao/wgs-somatic-latest',
  'huangyechao/wes-germline-latest',
  'huangyechao/annovar-latest',
  'huangyechao/wes-somatic-latest',
  'huangyechao/wgs-somatic-latest',
  'huangyechao/wes-germline-latest',
  'huangyechao/annovar-latest',
  'huangyechao/wes-somatic-latest'
]

const appIds = [
  '4e03626e8634f388abf77cb94b49cb2',
  '4e03626e8634f388abf77cb94b49cb1',
  '4e03626e8634f388abf77cb94b49cb3',
  '4e03626e8634f388abf77cb94b49cb4',
  '4e03626e8634f388abf77cb94b49cb2',
  '4e03626e8634f388abf77cb94b49cb1',
  '4e03626e8634f388abf77cb94b49cb3',
  '4e03626e8634f388abf77cb94b49cb4',
  '4e03626e8634f388abf77cb94b49cb2',
  '4e03626e8634f388abf77cb94b49cb1'
]

const authors = [
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

const groupNameLst = [
  'Choppy Team',
  'Choppy Team',
  'Choppy Team',
  'Choppy Team',
  'Choppy Team',
  'Choppy Team',
  'Choppy Team',
  'Choppy Team',
  'Choppy Team',
  'Choppy Team',
  'Choppy Team'
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
  null,
  '2019-09-02 09:30:00',
  null,
  null,
  null,
  '2019-09-03 08:31:00',
  null,
  '2019-09-01 10:32:00',
  null,
  '2019-09-01 11:32:00'
]

const reportIds = [
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

const percentageList = [
  99,
  100,
  0,
  30,
  30,
  100,
  10,
  100,
  10,
  100
]

const statusLst = [
  'active',
  'success',
  'exception',
  'active',
  'exception',
  'success',
  'active',
  'success',
  'active',
  'success'
]

const project = (options) => {
  const queryParameters = getQueryParameters(options)
  console.log('queryParameters', queryParameters)
  if (queryParameters && !queryParameters.per_page) {
    queryParameters.per_page = 10
  } else {
    queryParameters.per_page = parseInt(queryParameters.per_page)
  }
  const data = []
  const start = queryParameters.per_page * (queryParameters.page - 1)
  const end = queryParameters.per_page * queryParameters.page
  for (let num = start; num < end; num++) {
    data.push({
      id: ids[num],
      title: projectNameLst[num],
      description: descriptionLst[num],
      author: authors[num],
      startedAt: startedTimeLst[num],
      finishedAt: finishedTimeLst[num],
      appId: appIds[num],
      appName: apps[num],
      groupName: groupNameLst[num],
      reportId: reportIds[num],
      status: statusLst[num],
      statusDetails: {
        success: 10,
        total: 100,
        error: 90
      },
      percentage: percentageList[num]
    })
  }

  const response = {
    total: ids.length,
    per_page: parseInt(queryParameters.per_page),
    page: parseInt(queryParameters.page),
    message: 'success',
    data: data
  }
  return response
}

Mock.mock(/\/projects\?.*/, 'get', project)
