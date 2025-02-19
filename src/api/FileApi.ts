import Request from "@/utils/request.ts";
import qs from "qs";
import type {Result} from "@/type/Result.ts";

export const API = {
    GET_FILE_LIST_URL: '/file/list',
    UPLOAD_AVATAR_URL: '/file/avatar/upload',
    UPLOAD_FILE_URL: '/file/upload',
    DELETE_FILE_URL: '/file/delete',
    RENAME_FILE_URL: '/file/rename',
    CREATE_FOLDER_URL: '/file/createFolder',

}

export const getFileListService = (data: any): Promise<Result> => {
    const params = {...data}
    return Request.get(API.GET_FILE_LIST_URL, {params})
}

// 上传头像
export const uploadAvatarService = (data: any): Promise<Result> => {
    return Request.post(API.UPLOAD_AVATAR_URL, data)
}

//批量删除
export const deleteFileService = (fileIds: any): Promise<Result> => {
    return Request.delete(API.DELETE_FILE_URL + `/${fileIds}`)
}

//重命名
export const renameFileService = (data: any): Promise<Result> => {
    const params = {...data}
    return Request.put(API.RENAME_FILE_URL, null, {params})
}

//新建文件夹
export const createFolderService = (data: any): Promise<Result> => {
    const params = {...data}
    return Request.post(API.CREATE_FOLDER_URL, null, {params})
}