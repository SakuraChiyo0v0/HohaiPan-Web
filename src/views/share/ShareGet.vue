<script lang="ts" setup>
import {ref} from 'vue'
import {getShareService} from "@/api/ShareApi.ts";
import type {FileShare} from "@/type/Share/FileShare.ts"
import {size2Str} from "@/utils/size2Str.ts";
import type {File} from "@/type/File/File.ts";
import {formatDate} from "compatx";

const shareCode = ref('Pyng8M')
const dialogVisible = ref(false)
const data = ref<FileShare>({
  "fileId": "2cJd8bpEzU",
  "fileMd5": "9fe1f3f9666c8492b3ae2ac5933111da",
  "fileSize": 12542,
  "fileName": "Login.vue",
  "fileCover": null,
  "fileCategory": "doc",
  "fileType": 8,
  "createTime": "2023-06-11 11:43:25",
  "updateTime": "2023-06-11 11:43:25",
  "shareCode": "Pyng8M",
  "userId": 0,
  "nickname": "root",
  "shareTime": "2025-02-18 16:41:06",
  "expireTime": "2025-02-25",
  "useCount": 1
})
const fileTypeMap = ref({
  0: {desc: '目录', icon: 'folder'},
  1: {desc: '视频', icon: 'video'},
  2: {desc: '音频', icon: 'music'},
  3: {desc: '图片', icon: 'image'},
  4: {desc: 'pdf', icon: 'pdf'},
  5: {desc: 'doc', icon: 'word'},
  6: {desc: 'excel', icon: 'excel'},
  7: {desc: '纯文本', icon: 'txt'},
  8: {desc: '代码', icon: 'code'},
  9: {desc: '压缩包', icon: 'zip'},
  10: {desc: '其他文件', icon: 'others'}
})

const getImage = () => {
  let icon = fileTypeMap.value[data.value.fileType]?.icon || 'unknown'
  return new URL(`/src/assets/icon-image/${icon}.png`, import.meta.url).href
}

const submit = async () => {
  if (shareCode.value === '') {
    ElNotification({
      title: 'error',
      message: '请输入分享码',
      type: 'error'
    })
    return
  }
  let res = await getShareService(shareCode.value)
  data.value = res.data
  dialogVisible.value = true
}
</script>

<template>
  ShareGet
  <el-card>
    <el-input v-model="shareCode" style="width: 240px" placeholder="请输入分享码"/>
    <el-button type="primary" @click="submit" class="submit">
      获取文件
    </el-button>
  </el-card>

  <el-dialog v-model="dialogVisible" class="card" :body-style="{ padding: '20px' }">
    <div style="display: flex; justify-content: space-between;">
      <div style="flex: 1; padding-left: 20px;">
        <!-- 文件相关信息 -->
        <el-row>
          <el-col :span="24">
            <span class="file-icon">
               <img :src="getImage()" alt="">
             </span>
          </el-col>
          <el-col :span="24">
            <span><strong>文件名：</strong>{{ data.fileName }}</span>
          </el-col>
          <el-col :span="24">
            <span><strong>文件ID：</strong>{{ data.fileId }}</span>
          </el-col>
          <el-col :span="24">
            <span><strong>文件大小：</strong>{{ size2Str(data.fileSize) || '未知' }}</span>
          </el-col>
          <el-col :span="24">
            <span><strong>创建时间：</strong>{{ formatDate(data.createTime) }}</span>
          </el-col>
          <el-col :span="24">
            <span><strong>更新时间：</strong>{{ formatDate(data.updateTime) }}</span>
          </el-col>
          <el-col :span="24">
            <span><strong>分享人：</strong>{{ data.nickname }}</span>
          </el-col>
          <el-col :span="24">
            <span><strong>分享时间：</strong>{{ formatDate(data.shareTime) }}</span>
          </el-col>
          <el-col :span="24">
            <span><strong>有效期：</strong>{{ formatDate(data.expireTime) }}</span>
          </el-col>
          <el-col :span="24">
            <span><strong>使用次数：</strong>{{ data.useCount }}</span>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">
.submit {
  margin-left: 30px;
}
</style>