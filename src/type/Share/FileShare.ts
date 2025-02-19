export interface FileShare {
    fileId: string;
    fileName: string;
    fileMd5: string;
    fileCover: string|null;
    createTime: string;
    updateTime: string;
    fileSize: number;
    fileCategory: string;
    fileType: number;
    shareTime: string;
    shareCode: string;
    userId: number;
    nickname: string;
    expireTime: string;
    useCount: number;
}