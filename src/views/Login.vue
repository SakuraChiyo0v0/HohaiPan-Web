<template>
  <div class="body">
    <div class="login-panel">
      <el-form ref="formData" :model="formData" class="form">
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
        <el-form-item prop="password">
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
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="doSubmit">
            <span v-if="onType === 0">登陆</span>
            <span v-if="onType === 1">注册</span>
            <span v-if="onType === 2">重置密码</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue";
import {userLoginService} from "@/api/UserApi.ts";

const formData = reactive({
  email: '',
  password: ''
})

//当前显示的类型 0:登陆 1:注册 2:重置密码
const onType = ref(0)

//提交按钮逻辑
const doSubmit = () => {
  console.log(onType.value)
  userLoginService(formData)
}
</script>

<style lang="scss" scoped>
.body {
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
    }
  }
}

</style>