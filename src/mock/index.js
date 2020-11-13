const Mock = require('mockjs');
// const Random = Mock.Random;/
// ユーザー情報
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

// 売上情報
const saleInfo = [
  {
    title : '今日',
    sales : '4567',
    salesVolume : '37'
  },
  {
    title : '昨日',
    sales : '8494',
    salesVolume : '77'
  },
  {
    title : '今月',
    sales : '13456',
    salesVolume : '465'
  },
  {
    title : '今年',
    sales : '789542',
    salesVolume : '65421'
  },
]

// 注文状況
const orderInfo = [
  {
    title : '新規受付',
    no : '66',
  },
]

// 出荷状況
const shipInfo = [
  {
    title : '未出荷',
    no : '89',
  },
  {
    title : '出荷済み',
    no : '12',
  },
]

// ログイン画面
Mock.mock('/pwdChange', 'post', function(options){
  let flg = false
  adminInfo.forEach(function (item) {
    if (item.mail === options.body) {
      flg = true
    }
  })

  if (flg) {
    return "200"
  } else {
    return null
  }

})
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

// トップページ画面
Mock.mock('/topPage/sales', 'get', saleInfo);
Mock.mock('/topPage/order', 'get', orderInfo);
Mock.mock('/topPage/ship', 'get', shipInfo);