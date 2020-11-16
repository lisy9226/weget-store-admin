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
        token:"token-0908-2132-3231",
        userInfo: {
          distributorId: "1001",
          email: user.mail,
          password: user.password,
          name: "楊さん",
          adminFlg: true,
          memo: "出品用",
          status: "1",
          createTime: "2020-11-16T01:22:59.914Z",
          updateUser: "楊さん",
          updateTime: "2020-11-16T01:22:59.915Z",
          version: 0,
          deleted: true
        },
        isLogin: true,
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
Mock.mock('/sales/summary', 'get', saleInfo);
Mock.mock('/order/summary', 'get', orderInfo);
Mock.mock('/shipment/summary', 'get', shipInfo);