<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>更换头像</span>
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <!-- 上传头像组件 -->
        <el-upload
            ref="uploadRef"
            class="avatar-uploader"
            :show-file-list="false"
            :auto-upload="true"
            action="/api/file/avatar/upload"
        name="file"
        :headers="{'Authorization': tokenStore.token}"
        accept="image/*"
        :on-success="uploadSuccess"
        >
        <!-- 上传成功后显示新头像，否则显示默认头像 -->
        <img v-if="imgUrl" :src="imgUrl" class="avatar" alt="头像" />
        <img v-else :src="defaultAvatar" class="avatar" alt="默认头像" />
        </el-upload>
        <br />
        <el-button
            type="primary"
            :icon="Plus"
            size="large"
            @click=" uploadRef.$el.querySelector('input').click()"
        >
          选择图片
        </el-button>
        <el-button
            type="success"
            :icon="Upload"
            size="large"
            @click="updateAvatar"
        >
          上传头像
        </el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Upload } from '@element-plus/icons-vue'
import defaultAvatar from '@/assets/defaultAvatar.png'
import { useUserInfoStore } from '@/store/UserInfoStore'
import { useTokenStore } from '@/store/TokenStore'
import { userUpdateAvatarService } from '@/api/UserApi'

/**
 * 获取用户信息、token等
 */
const userInfoStore = useUserInfoStore()
const tokenStore = useTokenStore()

// el-upload 组件引用
const uploadRef = ref()
// 用于头像展示，初始值取自用户信息，如果没有则显示默认头像
const imgUrl = ref(userInfoStore.userInfo?.avatar || defaultAvatar)

const uploadSuccess = (result: any) => {
  imgUrl.value = result.data
}

const updateAvatar = async () => {
  try{
    let params = {
      userId: userInfoStore.userInfo?.userId,
      avatarURL: imgUrl.value
    }
    console.log(params)
    await userUpdateAvatarService (params)
    if (userInfoStore.userInfo) {
      userInfoStore.userInfo.avatar = imgUrl.value;
    }
    ElNotification({
      title: 'Success',
      message: '头像修改成功',
      type: 'success'
    })
  }catch (e){
    ElNotification({
      title: '上传失败',
      message: '请重试',
      type: 'error'
    })
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
      border-radius: 50%;
      object-fit: cover;
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
