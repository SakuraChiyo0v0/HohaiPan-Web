import {useUserInfoStore} from "@/store/UserInfoStore.ts";
import {useTokenStore} from "@/store/TokenStore.ts";
import Router from "@/router";
const userInfoStore = useUserInfoStore()
const tokenStore = useTokenStore()
export const  loginOut = async () => {
    tokenStore.removeToken()
    userInfoStore.removeUserInfo()
    await Router.push({path: '/login'})
}