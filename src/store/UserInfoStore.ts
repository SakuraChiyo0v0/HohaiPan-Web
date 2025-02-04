import { defineStore } from 'pinia'
import {type Ref, ref} from "vue";
import type {IUserInfoDTO} from "@/type/User/ServiceDTO.ts";

export const useUserInfoStore = defineStore('userInfo', () => {
    const userInfo:Ref<IUserInfoDTO|undefined> = ref()
    const setUserInfo=(val:IUserInfoDTO)=>{
        userInfo.value=val
    }

    const removeUserInfo=()=>{
        userInfo.value=undefined
    }


    return { userInfo, setUserInfo ,removeUserInfo}
},{
    persist: true//持久化存储
});