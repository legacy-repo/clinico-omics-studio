import Mock from 'mockjs2'
import { getQueryParameters } from '../util'

const titles = [
  'stderr',
  'stdout'
]

const links = [
  'http://localhost:3000/report/project-1/stdout',
  'http://localhost:3000/report/project-1/stderr'
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
  for (let i = 0; i < links.length; i++) {
    data.push({
      title: titles[i],
      link: links[i]
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
