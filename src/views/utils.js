import v from 'voca'

export const formatTitle = function(self, title) {
  const key = v.camelCase(title)
  const formatedTitle = self.$t('router.meta.' + key)
  if (formatedTitle === 'router.meta.' + key) {
    return title
  } else {
    return formatedTitle
  }
}
