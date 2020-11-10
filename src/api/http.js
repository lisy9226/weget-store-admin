// 1.引入所需依赖: axios,Vue,store,router,工具函数 toast 等等...
import axios from 'axios';
import Vue from 'vue';

// 创建 axios 实例
const Axios = axios.create({
    // 添加初始化配置
    baseURL: process.env.BASE_API, // 基地址
    timeout: 10000, // 超时
    // withCredentials: true, // send cookies when cross-domain requests
});

// const TOKEN = window.sessionStorage.getItem('token'); // when set token

// 请求拦截器
Axios.interceptors.request.use(
    config => {
        // TODO: 添加请求头处理逻辑,如添加 token; 还可以设置开启请求 loading 动画
        // config.headers['X-Token'] = TOKEN
        
        return config;
    },
    error => {
        console.log('request error:', error); // for debug
        return Promise.reject(error);
    }
);

/**
 * 两种方式做统一处理
 * 1.通过 http状态码status:   response.status 和 error.response.status处理
 * 2.通过 response.data中自定义的状态码code:  response.data.code 处理(异常处理直接在第一个回调重处理)
 */

// 响应拦截器
Axios.interceptors.response.use(
    response => {
        const res = response.data;
        // 1.通过自定义 code 做统一处理
        // 2.也可以通过 response.status === 200 处理; 这里采用 1
        if (res.status.code === 0) {
            return res.data; // 成功
        } else {
            // for example: 异常的 code 进行自定义处理
            if (res.status.code === 50008 || res.status.code === 50012) {
                // 做一些提示的 toast 处理或者跳转
                alert('有错误!!!');
            }
            return Promise.reject(new Error(res.status.message || 'Error'));
        }
        
    },
    error => {
        // 响应错误处理: 如超时,断网,权限等...
        console.log('response error:', error); // for debug 本地开发下没有状态码显示
        console.log(error.response); // for debug
        // const res = error.response;
        // if (res) {
        //     // 请求已发出，但是不在2xx的范围
        //     errorHandle(response.status, response.data.message);
        //     return Promise.reject(res);
        // } else {
        //     // 处理断网或超时...
        //     // 网络状态可以在app.vue中控制着一个全局的断网提示组件的显示隐藏
        //     if (!window.navigator.onLine) {
        //         console.log('断网了....');
        //     } else {
        //         return Promise.reject(error);
        //     }
        // }
    }
);

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, tips) => {
    // 状态码判断
    switch (status) {
        //     // 401: 未登录状态，跳转登录页
        //     case 401:
        //         toLogin();
        //         break;
        //     // 403 token过期
        //     // 清除token并跳转登录页
        //     case 403:
        //         tip('登录过期，请重新登录');
        //         localStorage.removeItem('token');
        //         store.commit('loginSuccess', null);
        //         setTimeout(() => {
        //             toLogin();
        //         }, 1000);
        //         break;
        // 404请求不存在
        case 404:
            console.log('请求的资源不存在');
            break;
        default:
            console.log(tips);
    }
};

// 实现插件, 暴露install方法, 可以给 vue 实例使用
// 通过 this.$http.post 或者 get 去请求
export const http = {
    install(Vue) {
        Vue.prototype.$http = Axios;
    }
}

// 导出 Axios实例
export default Axios
