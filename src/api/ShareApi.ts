import Request from "@/utils/request.ts";
import qs from "qs";
import type {Result} from "@/type/Result.ts";

export const API = {
    GET_SHARE_URL: '/share',
    GENERATE_SHARE_CODE_URL:'/share/generate',
}

export const getShareService = (shareCode:string):Promise<Result>=>{
    const params = {shareCode}
    return Request.get(API.GET_SHARE_URL, {params})
}

//生成分享码
export const generateShareCodeService = (fileId:any):Promise<Result>=>{
    const params = {fileId}
    return Request.post(API.GENERATE_SHARE_CODE_URL,null, {params})
}