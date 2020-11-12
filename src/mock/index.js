const Mock = require('mockjs');
// const Random = Mock.Random;/

const adminInfo = [
  {
    mail: 'p.yangrongwei@tlzs.co.jp',
    password: 'yang1031863260'
  },
  {
    mail: 'admin@gmail.com',
    password: '888'
  }
]
Mock.mock('/pwdChange', 'post', "200")
Mock.mock('/login', 'post', function (options) {
  let user = JSON.parse(options.body).userInfo
  let authInfo = null
  let flg = false
  adminInfo.forEach(function (item) {
    if (item.mail === user.mail && item.password === user.password) {
      flg = true
      authInfo = {
        userInfo: {
          mail: user.mail,
          password: user.password,
        },
        isLogin: true,
        token: "token-1001-1002-33333",
      }
    }
  })
  if (flg) {
    return authInfo
  } else {
    return null
  }

});