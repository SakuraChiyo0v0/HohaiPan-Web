import { defineStore } from 'pinia'
import {ref} from "vue";

export const useTokenStore = defineStore('token', () => {
    const token = ref('')
    const setToken=(val:string)=>{
        token.value=val
    }

    const removeToken=()=>{
        token.value=''
    }


    return { token, setToken ,removeToken}
},{
    persist:true//持久化存储
});