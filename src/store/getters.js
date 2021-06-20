const getters = {
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  feedbackEntrypoint: state => state.app.feedbackEntrypoint,
  policyEntrypoint: state => state.app.policyEntrypoint,
  helpEntrypoint: state => state.app.helpEntrypoint,
  clientId: state => state.app.clientId,
  clientSecret: state => state.app.clientSecret,
  appListConfig: state => state.app.appListConfig,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  isAuthenticated: state => state.user.isAuthenticated,
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab,
  lang: state => state.i18n.lang,
  tourMode: state => state.app.tourMode
}

export default getters
