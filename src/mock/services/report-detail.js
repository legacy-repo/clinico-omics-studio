import Mock from 'mockjs2'
import { getQueryParameters } from '../util'

const id = '5be4fe22-4b9a-40ae-90c2-251a07388e99'

const reportName = 'High Confidence Region Intergration'

const owner = '付小小'

const startedTime = '2019-09-01 08:30:00'

const finishedTime = '2019-09-01 08:30:00'

const checkedTime = '2019-09-01 08:30:00'

const archivedTime = '2019-09-01 08:30:00'

const report = (options) => {
  const queryParameters = getQueryParameters(options)
  console.log('queryParameters', queryParameters)

  const data = {
    id: id,
    title: reportName,
    description: '',
    reportUrl: 'http://localhost:3000/report/project-1/multiqc_report.html',
    author: owner,
    startedAt: startedTime,
    finishedAt: finishedTime,
    reportType: 'multiqc',
    status: {
      checked: Boolean(checkedTime),
      archived: Boolean(archivedTime)
    },
    reportLog: 'This is a report log.',
    relatedWorkflowId: '123',
    groupName: 'Choppy'
  }

  console.log('Mock Report Record: ', data)

  return {
    data: data
  }
}

Mock.mock(/\/reports\/5be4fe22-4b9a-40ae-90c2-251a07388e99/, 'get', report)
