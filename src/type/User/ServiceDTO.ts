export interface IUserLoginDTO{
    email:string,
    password:string,
    checkCode:string
}

export interface IUserEmailCodeDTO{
    email:string,
    emailCodeType:number
}

export interface IUserRegisterDTO{
    email:string,
    nickname: string
    password:string,
    emailCode:string
}

export interface IUserResetPasswordDTO{
    email:string,
    emailCode:string,
    checkCode:string,
    password:string,
    rePassword:string
}

export interface IUserEmailLoginDTO{
    email:string,
    emailCode:string
}


