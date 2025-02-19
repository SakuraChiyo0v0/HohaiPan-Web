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
import type {Result} from "@/type/Result.ts";

export const API = {
    LOGIN_URL: '/login',
    REGISTER_URL: '/register',
    RESET_PASSWORD_URL: '/resetPwd',
    EMAIL_LOGIN_URL: '/emailLogin',
    SEND_EMAIL_CODE_URL: '/sendEmailCode',
    CHECK_CODE_URL: '/api/checkCode',
    USER_INFO_URL: '/userInfo',
    UPDATE_AVATAR_URL: '/updateAvatar'
}

export const userLoginService=(data:IUserLoginDTO):Promise<Result>=>{
    return Request.post(API.LOGIN_URL,data)
}

export const userRegisterService=(data:IUserRegisterDTO):Promise<Result>=>{
    return Request.post(API.REGISTER_URL,data)
}

export const userResetPasswordService=(data:IUserResetPasswordDTO):Promise<Result>=>{
    return Request.put(API.RESET_PASSWORD_URL,data)
}

export const userEmailLoginService = (data:IUserEmailLoginDTO):Promise<Result>=>{
    return Request.post(API.EMAIL_LOGIN_URL,data)
}

export const userGetInfoService = ():Promise<Result>=>{
    return Request.get(API.USER_INFO_URL)
} 
export const userSendEmailCodeService = (data:EmailCodeForm):Promise<Result>=>{
    let params = qs.stringify(data)
    console.log(data)
    return Request.post(API.SEND_EMAIL_CODE_URL,params)
}

export const userUpdateAvatarService = (data:any):Promise<Result>=>{
    return Request.put(API.UPDATE_AVATAR_URL,data)
}