import Request from "@/utils/request.ts";
import type {FormData} from "@/type/User/FormData.ts";
import type {EmailCodeForm} from "@/type/User/EmailCodeForm.ts";
import qs from "qs";
import type {
    IUserEmailLoginDTO,
    IUserLoginDTO,
    IUserRegisterDTO,
    IUserResetPasswordDTO
} from "@/type/User/ServiceDTO.ts";

export const API = {
    LOGIN_URL: '/login',
    REGISTER_URL: '/register',
    RESET_PASSWORD_URL: '/resetPwd',
    EMAIL_LOGIN_URL: '/emailLogin',
    SEND_EMAIL_CODE_URL: '/sendEmailCode',
    CHECK_CODE_URL: '/api/checkCode'
}

export const userLoginService=(data:IUserLoginDTO):any=>{
    return Request.post(API.LOGIN_URL,data)
}

export const userRegisterService=(data:IUserRegisterDTO):any=>{
    return Request.post(API.REGISTER_URL,data)
}

export const userResetPasswordService=(data:IUserResetPasswordDTO):any=>{
    return Request.put(API.RESET_PASSWORD_URL,data)
}

export const userEmailLoginService = (data:IUserEmailLoginDTO):any=>{
    return Request.post(API.EMAIL_LOGIN_URL,data)
}
export const userSendEmailCodeService = (data:EmailCodeForm):any=>{
    let params = qs.stringify(data)
    console.log(data)
    return Request.post(API.SEND_EMAIL_CODE_URL,params)
}
