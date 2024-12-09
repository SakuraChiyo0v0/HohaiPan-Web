import Request from "@/utils/request.ts";
import type {LoginForm} from "@/type/User/LoginForm.ts";
import type {EmailCodeForm} from "@/type/User/EmailCodeForm.ts";
import qs from "qs";

export const API = {
    LOGIN_URL: '/login',
    SEND_EMAIL_CODE_URL: '/sendEmailCode',
    CHECK_CODE_URL: '/api/checkCode'
}

export const userLoginService=(data:LoginForm):any=>{
    return Request.post(API.LOGIN_URL,data)
}

export const userSendEmailCodeService = (data:EmailCodeForm):any=>{
    let params = qs.stringify(data)
    console.log(data)
    return Request.post(API.SEND_EMAIL_CODE_URL,params)
}
