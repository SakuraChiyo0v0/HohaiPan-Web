import Request from "@/utils/request.ts";
import qs from "qs";
import type {Result} from "@/type/Result.ts";

export const API = {
    GET_FILE_LIST_URL: '/file/list',
}

export const getFileListService = (data:any):Promise<Result>=>{
    const params = {...data}
    return Request.get(API.GET_FILE_LIST_URL, {params})
}