import Request from "@/utils/request.ts";

export const userLoginService=(data:any):any=>{
    return Request.post('/login',data)
}