import Mock from 'mockjs2'
import { getQueryParameters } from '../util'

const ids = [
  '1',
  '2',
  '3'
]

const titles = [
  'stderr',
  'stdout',
  'bcs-stdout'
]

const logTypes = [
  'Link',
  'Link',
  'Content'
]

const contents = [
  'http://localhost:3000/report/project-1/stderr',
  'http://localhost:3000/report/project-1/stdout',
  'This is a log content from bcs'
]

const log = (options) => {
  const queryParameters = getQueryParameters(options)
  console.log('Logs queryParameters', queryParameters)
  if (queryParameters && !queryParameters.per_page) {
    queryParameters.per_page = 5
  } else {
    queryParameters.per_page = parseInt(queryParameters.per_page)
  }
  const data = []
  for (let i = 0; i < titles.length; i++) {
    data.push({
      id: ids[i],
      title: titles[i],
      logType: logTypes[i],
      content: contents[i]
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

Mock.mock(/\/logs/, 'get', log)
