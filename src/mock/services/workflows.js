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

const projectIdList = [
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

const sampleIdList = [
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

const startedTimeLst = [
  1585500176200,
  1585500186200,
  1585500076200,
  1585500076200,
  1585500276200,
  1585500176200,
  1585500156200,
  1585500166200,
  1585500186200,
  1585500196200
]

const finishedTimeLst = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null
]

const jobParamsList = [
  {
    'status': 200,
    'error': '',
    'data': [
      {
        'news_id': 51184,
        'title': 'iPhone X Review: Innovative future with real black technology',
        'source': 'Netease phone'
      },
      {
        'news_id': 51183,
        'title': 'Traffic paradise: How to design streets for people and unmanned vehicles in the future?',
        'source': 'Netease smart'
      },
      {
        'news_id': 51182,
        'title': 'Teslamasks American Business Relations: The government does not pay billions to build factories',
        'source': 'AI Finance'
      }
    ]
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {}
]

const labelsList = [
  {
    project_name: 'This is a test',
    sample_name: 'test',
    sample_id: 'test'
  },
  {
    sample_name: 'test'
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {}
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

const workflow = (options) => {
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
      sample_id: sampleIdList[num],
      project_id: projectIdList[num],
      labels: labelsList[num],
      started_time: startedTimeLst[num],
      finished_time: finishedTimeLst[num],
      job_params: jobParamsList[num],
      status: statusLst[num],
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

Mock.mock(/\/workflows\?.*/, 'get', workflow)
