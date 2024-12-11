<template>
  <div class="body">
    <div class="login-panel">
      <el-form ref="loginFormRef" :model="formData" :rules="formRules" class="form">
        <div class="title">Hohai云盘</div>
        <!--          --------------登陆部分 -->
        <el-form-item prop="email">
          <el-input
              placeholder="请输入邮箱"
              v-model.trim="formData.email"
              maxLength="150"
              prefix-icon="Message"
              clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="nickname" v-show="onType === LoginShowEnum.REGISTER">
          <el-input
              placeholder="请输入用户名"
              v-model.trim="formData.nickname"
              maxLength="150"
              prefix-icon="Message"
              clearable
          >
          </el-input>
        </el-form-item>
        <!-- 密码部分-->
        <el-form-item prop="password"
                      v-show="[LoginShowEnum.LOGIN,LoginShowEnum.REGISTER, LoginShowEnum.RESET_PASSWORD].includes(onType)">
          <el-input
              :placeholder="passwordPlaceholder"
              v-model.trim="formData.password"
              type="password"
              maxLength="20"
              prefix-icon="Lock"
              clearable
              show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item v-show="[LoginShowEnum.REGISTER, LoginShowEnum.RESET_PASSWORD].includes(onType)">
          <el-input
              placeholder="请再次输入密码"
              v-model.trim="formData.rePassword"
              type="password"
              maxLength="20"
              prefix-icon="Lock"
              clearable
              show-password
          >
          </el-input>
        </el-form-item>
        <!--验证码部分-->
        <el-form-item prop="checkCode" v-show="onType === LoginShowEnum.LOGIN">
          <div class="check-code-panel">
            <el-input
                placeholder="请输入验证码"
                v-model.trim="formData.checkCode"
                prefix-icon="EditPen"
                maxlength="5"
            />
            <img :src="checkCodeUrl" class="check-code" @click="changeCheckCode()" alt="验证码"/>
          </div>
        </el-form-item>
        <el-form-item prop="emailCode" v-show="[1, 2, 3, 4].includes(onType)">
          <div class="send-email-panel">
            <el-input
                placeholder="请输入邮箱验证码"
                v-model.trim="formData.emailCode"
                prefix-icon="EditPen"
            />
            <el-button class="send-mail-btn" type="primary" @click="getEmailCode">
              获取邮箱验证码
            </el-button>
          </div>
          <el-popover placement="bottom" :width="500" trigger="click">
            <div>
              <p>1、在垃圾箱中查找邮箱验证码</p>
              <p>2、在邮箱中头像->设置->反垃圾->白名单->设置邮箱地址白名单</p>
              <p>3、将邮箱【3296299414@qq.com】添加到白名单</p>
            </div>
            <template #reference>
              <el-link type="primary" :underline="false">未收到邮箱验证码？</el-link>
            </template>
          </el-popover>
        </el-form-item>
        <!--          --------------组件部分 -->
        <!-- 登录跳转 -->
        <el-form-item v-if="onType === LoginShowEnum.LOGIN">
          <div class="remember-me-panel">
            <el-checkbox label="记住我"/>
          </div>
          <div class="jump">
            <el-link type="primary" :underline="false" @click="showPanel(LoginShowEnum.RESET_PASSWORD)">忘记密码？
            </el-link>
            <el-link type="primary" :underline="false" @click="showPanel(LoginShowEnum.EMAIL_LOGIN)">邮箱验证码登录
            </el-link>
            <el-link type="primary" :underline="false" @click="showPanel(LoginShowEnum.REGISTER)">没有账号？</el-link>
          </div>
        </el-form-item>
        <!-- 注册跳转 -->
        <el-form-item v-if="onType === LoginShowEnum.REGISTER">
          <div class="jump">
            <el-link type="primary" :underline="false" @click="showPanel(LoginShowEnum.LOGIN)">已有账号？</el-link>
          </div>
        </el-form-item>
        <!-- 找回密码跳转 -->
        <el-form-item v-if="onType === LoginShowEnum.RESET_PASSWORD">
          <div class="jump">
            <el-link type="primary" :underline="false" @click="showPanel(LoginShowEnum.LOGIN)"><= 去登陆</el-link>
          </div>
        </el-form-item>
        <!-- 邮箱验证码登录跳转 -->
        <el-form-item v-if="onType === LoginShowEnum.EMAIL_LOGIN">
          <div class="jump">
            <el-link type="primary" :underline="false" @click="showPanel(LoginShowEnum.LOGIN)"><= 账密登录</el-link>
          </div>
        </el-form-item>
        <!--提交按钮-->
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="doSubmit">
            <span v-if="onType === LoginShowEnum.LOGIN||onType === LoginShowEnum.EMAIL_LOGIN">登陆</span>
            <span v-if="onType === LoginShowEnum.REGISTER">注册</span>
            <span v-if="onType === LoginShowEnum.RESET_PASSWORD">重置密码</span>
          </el-button>
          <div>
            <el-button type="primary" @click="test()" class="dialog-button" plain round>
              test
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!--    发送邮箱的窗口-->
    <el-dialog
        v-model="showEmailDialog"
        title="获取邮箱验证码"
        width="400"
    >
      <el-form
          :model="emailCodeForm"
          label-width="80px"
          ref="emailCodeFormRef"
          :rules="formRules"
      >
        <el-form-item label="邮箱">
          {{ formData.email }}
        </el-form-item>
        <el-form-item label="验证码" prop="checkCode">
          <div class="check-code-panel">
            <el-input
                placeholder="请输入验证码"
                v-model.trim="emailCodeForm.checkCode"
                prefix-icon="EditPan"
                maxlength="5"
            />
            <img :src="checkCodeUrl" class="check-code" @click="changeCheckCode()" alt=""/>
          </div>
          <div class="dialog-footer">
            <el-button type="primary" @click="sendMailCode(onType)" class="dialog-button" plain round>
              确认
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, nextTick} from "vue";
import Verify from "@/utils/Verify.ts"
import qs from "qs";
import {
  API, userEmailLoginService,
  userLoginService,
  userRegisterService,
  userResetPasswordService,
  userSendEmailCodeService
} from "@/api/UserApi.ts";
import type {FormData} from "@/type/User/FormData.ts";
import {type EmailCodeForm} from "@/type/User/EmailCodeForm.ts"
import {LoginShowEnum} from "@/enums/login/loginShowEnum.ts";
import {EmailCodeType} from "@/enums/login/EmailCodeType.ts";
import type {
  IUserEmailLoginDTO,
  IUserLoginDTO,
  IUserRegisterDTO,
  IUserResetPasswordDTO
} from "@/type/User/ServiceDTO.ts";

const loginFormRef = ref()
const formData: FormData = reactive({
  email: '',
  nickname: '',
  password: '',
  checkCode: '',
  emailCode: '',
  rePassword: ''
})
const reSetForm = () => {
  changeCheckCode()
  loginFormRef.value.resetFields()
}
const reSetCode = () => {
  loginFormRef.value.resetFields("checkCode")
  loginFormRef.value.resetFields("emailCode")
}

//密码placeholder动态
const passwordPlaceholder = ref("请输入密码")
//校验
const checkRePassword = (rule: any, value: string, callback: any) => {
  if (formData.password !== value) {
    return callback(new Error('两次密码不一致'))
  }
  return callback()
}
const formRules = reactive({
  email: [
    {required: true, message: '请输入邮箱', trigger: 'blur'},
    {validator: Verify.email, message: '请输入正确的邮箱', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {validator: Verify.password, message: '密码只能是数字, 字母, 特殊字符6-18位', trigger: 'blur'}
  ],
  nickname: [{required: true, message: '请输入昵称', trigger: 'blur'}],
  rePassword: [
    {required: true, message: '请再次输入密码', trigger: 'blur'},
    {validator: checkRePassword, message: '两次密码不一致', trigger: 'blur'}
  ],
  checkCode: [{required: true, message: '请输入图片验证码'}],
  emailCode: [{required: true, message: '请输入邮箱验证码'}]
})

//当前显示的类型 0:登陆 1:注册 2:重置密码 3:邮箱验证码登录
const onType = ref(LoginShowEnum.LOGIN)
const showPanel = (type: number) => {
  onType.value = type
  if (type === LoginShowEnum.RESET_PASSWORD) {
    passwordPlaceholder.value = '请输入新的密码'
  } else {
    passwordPlaceholder.value = '请输入密码'
  }
  reSetForm()
}

//提交按钮逻辑
const doSubmit = () => {
  loginFormRef.value.validate(async (valid: boolean) => {
    if (!valid) {
      //return
    }
    const {email, nickname, password, rePassword, checkCode, emailCode} = formData;
    try {
      let data: any
      let msg: string = ''
      switch (onType.value) {
        case LoginShowEnum.LOGIN:
          data = {email, password, checkCode} as IUserLoginDTO
          await userLoginService(data);
          msg = "登陆成功!"
          break
        case LoginShowEnum.REGISTER:
          data = {email, nickname, password, rePassword, emailCode} as IUserRegisterDTO
          await userRegisterService(data);
          msg = "注册成功! 请进行登录";
          showPanel(LoginShowEnum.LOGIN)
          break
        case LoginShowEnum.RESET_PASSWORD:
          data = {email, password, rePassword, checkCode, emailCode} as IUserResetPasswordDTO
          await userResetPasswordService(data);
          msg = "重置密码成功! 请进行登录";
          showPanel(LoginShowEnum.LOGIN)
          break
        case LoginShowEnum.EMAIL_LOGIN:
          data = {email, emailCode} as IUserEmailLoginDTO
          await userEmailLoginService(data);
          msg = "邮箱登录成功!"
          break
        default:
          ElNotification({
            title: "ERROR",
            message: "逻辑错误 请勿修改客户端!!",
            type: 'error'
          })
          break
      }
      ElNotification({
        title: 'Success',
        message: msg,
        type: 'success'
      })
    } catch (e) {
      if (onType.value === LoginShowEnum.LOGIN) {
        changeCheckCode()
      }
    } finally {
      reSetCode()
    }
  })
}

//验证码部分
const checkCodeUrl = ref(API.CHECK_CODE_URL)
const changeCheckCode = () => {
  const params = {
    type: onType.value,
    timestamp: new Date().getTime()
  }
  checkCodeUrl.value = API.CHECK_CODE_URL + '?' + qs.stringify(params)
}
//邮箱验证码部分
const showEmailDialog = ref(false)
const emailCodeFormRef = ref()
const emailCodeForm: EmailCodeForm = reactive({
  email: '',
  checkCode: '',
  emailCodeType: EmailCodeType.REGISTER,
})
const getEmailCode = () => {
  //validateField	验证具体的某个字段。
  loginFormRef.value.validateField('email', (valid: boolean) => {
    if (!valid) {
      return
    }
    emailCodeForm.email = formData.email
    showEmailDialog.value = true
  })
}
const sendMailCode = (type: number) => {
  emailCodeFormRef.value.validate(async (valid: boolean) => {
    if (!valid) {
      return
    }
    emailCodeForm.emailCodeType = type
    try {
      await userSendEmailCodeService(emailCodeForm)
      ElNotification({
        title: "发送成功",
        message: "验证码已发送到您的邮箱 请注意查收!",
        type: 'success'
      })
      showEmailDialog.value = false
    } catch (error) {
      //出错了重新尝试
      changeCheckCode()
      emailCodeFormRef.value.resetFields()
    }
  })
}


const test = () => {
  ElNotification({
    title: "❤❤❤❤❤❤❤❤❤❤",
    message: "❤❤❤❤❤❤❤❤❤❤",
    type: 'success'
  })
}
</script>

<style lang="scss" scoped>
.body {
  height: calc(100vh);
  display: flex;
  justify-content: right;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('/login_bg.png');

  .login-panel {
    width: 360px;
    margin-right: 15%;
    margin-top: calc((100vh - 500px) / 2);

    .form {
      padding: 25px;
      background: #fff;
      border-radius: 5px;

      .title {
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .jump {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      img {
        height: 24px;
        margin-left: 10px;
      }

      .send-email-panel {
        display: flex;
        width: 100%;
        justify-content: space-between;

        .send-mail-btn {
          margin-left: 5px;
        }
      }

      .remember-me-panel {
      }

      .check-code-panel {
        width: 100%;
        display: flex;

        .check-code {
          margin-left: 5px;
          cursor: pointer;
          height: 30px;
        }
      }
    }
  }
}

</style>