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

const titleLst = [
  '阿里云账户可能在15天内欠费的提醒',
  '阿里云文件存储NAS服务升级通知',
  '参加文件存储NAS满意度调研，说出您的心声，有机会收获100元无门槛代金券',
  '立省85%！为您奉上OSS存储使用秘籍！',
  '内置堡垒机，行云主机管家助力云上ECS运维',
  '阿里云账户可能在7天内欠费的提醒',
  '阿里云账户可能在3天内欠费的提醒',
  '【邀您体验】API调试利器—OpenAPI Explorer',
  '《阿里云提示：您的产品快报已生成，请及时确认》',
  '服务器异常登录提醒'
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

const typeLst = [
  'sync-app',
  'created-project',
  'sync-app',
  'created-project',
  'sync-app',
  'created-project',
  'sync-app',
  'created-project',
  'sync-app',
  'created-project'
]

const createdTimeLst = [
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

const statusLst = [
  'read',
  'unread',
  'read',
  'unread',
  'read',
  'unread',
  'read',
  'unread',
  'read',
  'unread'
]

const notification = (options) => {
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
      key: ids[num],
      title: titleLst[num],
      notificationType: typeLst[num],
      description: descriptionLst[num],
      createdAt: createdTimeLst[num],
      status: statusLst[num]
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

Mock.mock(/\/notifications\?.*/, 'get', notification)
