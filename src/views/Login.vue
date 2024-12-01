<script setup lang="ts">
import {reactive, ref} from "vue";
import Verify from "@/utils/Verify.ts"

const loginFormRef = ref()
const formData = ref({
  email: '',
  password: '',
  nickname: '',
  reRegisterPassword: '',
  checkCode: ''
})

//表单校验
const checkRePassword = (rule: any, value: string, callback: any) => {
  if (value !== formData.value.password) {
    callback(new Error('两次密码不一致'))
  } else {
    callback()
  }
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
  reRegisterPassword: [
    {required: true, message: '请再次输入密码', trigger: 'blur'},
    {validator: checkRePassword, message: '两次密码不一致', trigger: 'blur'}
  ],
  checkCode: [{required: true, message: '请输入图片验证码'}],
  emailCode: [{required: true, message: '请输入邮箱验证码'}]
})

// 当前显示
// 0:注册，1:登陆，2:重置密码
const onType = ref(1);
const showPanel = (type:number) => {
  onType.value = type;
  reSetForm();
}
//重置表单
const reSetForm=()=>{
  loginFormRef.value.resetFields()
}
</script>

<template>
  <div class="login-body">
    <div class="login-panel">
      <div class="form">
        <el-form :model="formData" :rules="formRules" ref="loginFormRef" class="login-register">
          <div class="login-title">Hohai云盘</div>
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
          <el-form-item prop="password" v-if="onType===1">
            <el-input
                placeholder="请输入密码"
                v-model.trim="formData.password"
                type="password"
                maxLength="20"
                prefix-icon="Lock"
                clearable
                show-password
            >
            </el-input>
          </el-form-item>
          <!--          --------------注册部分 -->
          <div v-if="onType===0||onType===2">
            <el-form-item prop="emailCode">
              <div class="send-email-panel">
                <el-input
                    placeholder="请输入邮箱验证码"
                    v-model.trim="formData.emailCode"
                    prefix-icon="EditPen"
                />
                <el-button class="send-mail-btn" type="primary" @click="getMailCode">
                  获取邮箱验证码
                </el-button>
              </div>
              <el-popover placement="left" :width="500" trigger="click">
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
            <el-form-item prop="nickname" v-if="onType===0">
              <el-input
                  placeholder="请输入昵称"
                  v-model.trim="formData.nickname"
                  prefix-icon="User"
                  maxLength="20"
              />
            </el-form-item>
            <!-- 注册密码，找回密码 -->
            <el-form-item prop="password">
              <el-input
                  show-password
                  type="password"
                  placeholder="请输入密码"
                  v-model.trim="formData.password"
                  prefix-icon="Lock"
                  maxLength="20"
              />
            </el-form-item>
            <el-form-item prop="reRegisterPassword">
              <el-input
                  show-password
                  type="password"
                  placeholder="请再次输入密码"
                  v-model.trim="formData.reRegisterPassword"
                  prefix-icon="Lock"
                  maxLength="20"
              />
            </el-form-item>
          </div>
          <!--  验证码部分-->
          <el-form-item prop="checkCode">
            <div class="check-code-panel">
              <el-input
                  placeholder="请输入验证码"
                  v-model.trim="formData.checkCode"
                  prefix-icon="EditPen"
                  maxlength="5"
              />
              <img :src="checkCodeUrl" class="check-code" @click="changeCheckCode(0)"/>
            </div>
          </el-form-item>
          <!--          登录-->
          <el-form-item v-if="onType === 1">
            <!-- <div class="rememberme-panel">
              <el-checkbox v-model="formData.rememberMe" label="记住我" />
            </div> -->
            <div class="no-account">
              <el-link type="primary" :underline="false" @click="showPanel(2)">忘记密码？</el-link>
              <el-link type="primary" :underline="false" @click="showPanel(0)">没有账号？</el-link>
            </div>
          </el-form-item>
          <!-- 找回密码 -->
          <el-form-item v-if="onType === 2">
            <div class="no-account">
              <el-link type="primary" :underline="false" @click="showPanel(1)">去登陆</el-link>
            </div>
          </el-form-item>
          <!-- 注册 -->
          <el-form-item v-if="onType === 0">
            <div class="no-account">
              <el-link type="primary" :underline="false" @click="showPanel(1)">已有账号？</el-link>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="doSubmit">
              <span v-if="onType === 0">注册</span>
              <span v-if="onType === 1">登陆</span>
              <span v-if="onType === 2">重置密码</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-body {
  height: calc(100vh);
  display: flex;
  justify-content: right;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('public/login_bg.png');

  .login-panel {
    width: 360px;
    margin-right: 15%;
    margin-top: calc((100vh - 500px) / 2);

    .login-register {
      padding: 25px;
      background: #fff;
      border-radius: 5px;

      .login-title {
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .send-email-panel {
        display: flex;
        width: 100%;
        justify-content: space-between;

        .send-mail-btn {
          margin-left: 5px;
        }
      }

      .rememberme-panel {
        width: 100%;
      }

      .no-account {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      .login-btn-qq {
        width: 100%;
        text-align: center;
        font-size: 14px;
        color: gray;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          height: 24px;
          margin-left: 10px;
        }
      }
    }
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

.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}
</style>