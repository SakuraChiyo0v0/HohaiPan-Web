<script setup lang="ts">
import {reactive, ref} from "vue";
import Verify from "@/utils/Verify.ts";
import {ElNotification} from "element-plus";
import {useUserInfoStore} from "@/store/UserInfoStore.ts";
import {userResetPasswordService} from "@/api/UserApi.js";
import type {IUserResetPasswordDTO} from "@/type/User/ServiceDTO.js";
import {loginOut} from "@/utils/LoginOut.ts";

const formRef=ref()

const userInfoStore = useUserInfoStore()

const formData:IUserResetPasswordDTO=reactive({
  email: userInfoStore.userInfo?.email,
  emilCode: "",
  isLogin: true,
  oldPassword:"",
  password:""
})

const checkRePassword = (rule, value, callback) => {
  if(value === formData.oldPassword){
    callback(new Error('新的密码不能和旧的相同'))
  }else{
    callback()
  }
}

const formRules=reactive({
  oldPassword: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {validator: Verify.password, message: '密码只能是数字, 字母, 特殊字符6-18位', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {validator: Verify.password, message: '密码只能是数字, 字母, 特殊字符6-18位', trigger: 'blur'},
    {validator: checkRePassword, message: '新的密码不能和旧的相同', trigger: 'blur'}
  ],
})

const reSetForm=()=>{
  formRef.value.resetFields()
}
const onSubmit=()=>{
  formRef.value.validate(async (valid:any) => {
    if(!valid){
      return
    }
    await userResetPasswordService(formData)
    ElNotification({
      title: 'Success',
      message: "密码已重置!请重新登录",
      type: 'success'
    })
    reSetForm()
    loginOut()
  })
}
</script>

<template>
  <el-card>
    <el-form :model="formData" :rules="formRules" label-width="80px" ref="formRef">
      <el-form-item class="currentPwd" prop="oldPassword">
        <div class="text">请输入当前的密码:</div>
        <el-input
            show-password
            v-model.trim="formData.oldPassword"
            style="width: 240px"
            placeholder="在此输入旧密码"
            clearable
        />
      </el-form-item>
      <el-form-item class="updatePwd" prop="password">
        <div class="text">请输入要修改的密码:</div>
        <el-input
            show-password
            v-model.trim="formData.password"
            style="width: 240px"
            placeholder="在此输入新密码"
            clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定修改</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped lang="scss">
.updatePwd{
  margin-top: 30px;
}
.currentPwd{

}
.text{
  margin-bottom: 8px;
  width: 140px;
  font-weight: bold;
}
</style>