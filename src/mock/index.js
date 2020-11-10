const Mock = require('mockjs');
// const Random = Mock.Random;/

const adminInfo=[
  {
    name:'admin',
    password:'admin',
    email:'4399@qq.com'
  },{
    name:'test',
    password:'test',
    email:'1341313944@qq.com'
  },{
    name:'admin',
    password:'abc123',
    email:'112360@qq.com'
  },{

  }

]

Mock.mock('/login','post',adminInfo);