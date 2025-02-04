<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>更换头像</span>
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <el-upload
            ref="uploadRef"
            class="avatar-uploader"
            :show-file-list="false"
            :auto-upload="true"
            action="/updateUserAvatar"
            name="file"
            :headers="{'Authorization':userInfoStore.userInfo.token}"
            :on-success="uploadSuccess"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar"  alt=""/>
          <img v-else :src="defaultAvatar" width="278"  alt=""/>
        </el-upload>
        <br />
        <el-button type="primary" :icon="Plus" size="large"  @click="uploadRef.$el.querySelector('input').click()">
          选择图片
        </el-button>
        <el-button type="success" :icon="Upload" size="large" @click="updateAvatar">
          上传头像
        </el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>

import defaultAvatar from "@/assets/defaultAvatar.png"
import {useUserInfoStore} from "@/store/UserInfoStore.ts";
import {ref} from "vue";
import {ElMessage} from "element-plus";
import {Plus, Upload} from "@element-plus/icons-vue";

const userInfoStore = useUserInfoStore();

const uploadRef = ref()
//用户头像地址
const imgUrl= ref(userInfoStore.userInfo.avatar)
const handleUploadFile =(file)=>{

}

//图片上传成功的回调函数
const uploadSuccess = (result)=>{
  imgUrl.value = result.data;
}

//头像修改
const updateAvatar = async ()=>{
  //调用接口
  let result = await userUpdateAvatarService(imgUrl.value);

  ElMessage.success(result.msg? result.msg:'修改成功')

  //修改pinia中的数据
  userInfoStore.userInfo.avatar = imgUrl.value
}
</script>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>