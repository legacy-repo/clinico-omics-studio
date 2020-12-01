const api = {
  Login: '/auth/realms/master/protocol/openid-connect/token',
  Logout: '/auth/realms/master/protocol/openid-connect/logout',
  ForgePassword: '/auth/realms/master/login-actions/reset-credentials?client_id=security-admin-console',
  Register: '/auth/realms/master/login-actions/registration?client_id=security-admin-console',
  // get my info
  UserInfo: '/auth/realms/master/protocol/openid-connect/userinfo'
}

export default api
