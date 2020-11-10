import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import store from '../store/index'

Vue.use(VueRouter)


// 1.创建路由对象
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    // 2.添加路由配置，通过routes来添加路由配置
    routes: [
        //3.添加具体的路由配置：配置的本质就是将路由映射到组件
        //一般来说，我们可以设置为如下几个选项：name path component redirect children
        // name:路由名称
        //path:路由路径
        //component:路由所映射的组件对象
        {
            name: 'login',
            path: '/login',
            // 异步引入组件，确保匹配了路由才加载组件，否则不利于优化
            component: Login,
            meta:{
                requireAuth:false
            }
        },
        {
            name: 'adminTop',
            path: '/adminTop',
            // 异步引入组件，确保匹配了路由才加载组件，否则不利于优化
            component: () => import('../components/admin_page/AdminTop.vue'),
            meta:{
                requireAuth:true
            }
        },

    ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
    const isLogin = store.getters.isLogin;
    console.log('isLogin :'+isLogin)
    if (to.path == '/login') {
        next();
    } else {
        // 是否在登录状态下
        isLogin ? next() : next('/login');
    }
});


// 4.暴露
export default router