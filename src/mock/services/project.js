import Mock from 'mockjs2'

const project = (options) => {
  console.log('postData', options)

  return {
    'status': 'success'
  }
}

Mock.mock(/\/projects/, 'post', project)
