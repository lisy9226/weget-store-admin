export default{
    setAuthInfo(state,authInfo){
        let info = authInfo.authInfo
        state.authInfo.userInfo = info.userInfo,
        state.authInfo.token = info.token
    },
    setLoginState(state,status){
        state.isLogin = status
    },
}