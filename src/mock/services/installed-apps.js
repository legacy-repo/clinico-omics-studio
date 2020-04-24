import Mock from 'mockjs2'

const ids = [
  '4e03626e8634f388abf77cb94b49cb2',
  '4e03626e8634f388abf77cb94b49cb1',
  '4e03626e8634f388abf77cb94b49cb3',
  '4e03626e8634f388abf77cb94b49cb4'
]

const names = [
  'huangyechao/annovar-latest',
  'huangyechao/wes-somatic-latest',
  'huangyechao/wgs-somatic-latest',
  'huangyechao/wes-germline-latest'
]

const installedApps = (options) => {
  const data = []
  for (let i = 0; i < 4; i++) {
    data.push({
      id: ids[i],
      name: names[i]
    })
  }

  const response = {
    total: data.length,
    data: data
  }
  return response
}

Mock.mock(/\/installed-apps/, 'get', installedApps)
