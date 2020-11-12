const Mock = require('mockjs');
// const Random = Mock.Random;/

const adminInfo = [
  {
    userName: 'p.yangrongwei@tlzs.co.jp',
    userPwd: '666'
  },
  {
    userName: 'admin@gmail.com',
    userPwd: '888'
  }
]

Mock.mock('/login', 'post', function (options) {
  let user = JSON.parse(options.body).userInfo
  let flg = false
  adminInfo.forEach(function (item) {
    if (item.userName === user.userName && item.userPwd === user.userPwd) {
      flg = true
    }
  })
  if (flg) {
    return user
  } else {
    return null
  }

});