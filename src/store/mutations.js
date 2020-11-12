export default{
    setAuthInfo(state,authInfo){
        let info = authInfo.authInfo
        state.authInfo.userInfo = info.userInfo,
        state.authInfo.isLogin = info.isLogin,
        state.authInfo.token = info.token
    }
}