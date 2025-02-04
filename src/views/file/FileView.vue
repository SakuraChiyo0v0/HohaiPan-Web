<template>
  <el-container class="main">
    <el-header class="main-header">
      <div class="toolbar">
        <div class="toolbar-group">
<!--          <div class="toolbar-group-item" v-show="selectedRows.length === 0">-->
<!--            <div class="action-main">-->
<!--              <el-upload-->
<!--                  :show-file-list="false"-->
<!--                  :with-credentials="true"-->
<!--                  :multiple="true"-->
<!--                  :http-request="addFile"-->
<!--                  :accept="fileAccept"-->
<!--              >-->
<!--                <el-button type="primary" round style="padding: 8px 24px">-->
<!--                  <el-icon size="16"><Upload /></el-icon>-->
<!--                  上传</el-button-->
<!--                >-->
<!--              </el-upload>-->
<!--            </div>-->
<!--          </div>-->
        </div>
        <div class="toolbar-customize">
          <div class="search">
            <el-input
                v-model="params.fileNameFuzzy"
                size="small"
                clearable
                placeholder="搜索我的文件"
                input-style="height: 32px"
                @keyup.enter="fileNameSearch"
                @clear="cleanFileNameSearch"
            >
              <template #suffix>
                <span class="text" @click="fileNameSearch">搜索</span>
              </template>
            </el-input>
          </div>
        </div>
      </div>
    </el-header>
    <el-main class="main-body">
      <div class="nav">
        <div class="nav-list">
          <div class="nav-left">
            RODO
          </div>
        </div>
      </div>
      <div class="file-list overflow-visible">
        <el-table :data="fileListData" style="width: 100%" max-height="530" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column width="100">
            <template #default="scope">
             <span class="file-icon"  @click="openFile(scope.row)">
               <img :src="getImage(scope.row)" alt="">
             </span>
            </template>
          </el-table-column>
          <el-table-column prop="fileName" label="文件名" show-overflow-tooltip width="500">
            <template #default="scope" >
                <span  @click="openFile(scope.row)">
                  {{scope.row.fileName}}
                </span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="修改时间" width="180" />
          <el-table-column prop="fileSize" label="大小" width="120">
            <template #default="scope" >{{ scope.row.fileSize==null ?  "" :size2Str(scope.row.fileSize)}}</template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
    <el-footer class="main-footer">
      <div class="file-list-footer">
        <el-pagination
            v-model:current-page="currentPage"
            :page-size="params.pageSize"
            size="default"
            background
            layout="total, prev, pager, next"
            :total="fileTotal"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </div>
    </el-footer>
  </el-container>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {onBeforeRouteUpdate} from 'vue-router'
import {size2Str} from "@/utils/size2Str.ts";
import {getFileListService} from "@/api/FileApi.ts";
import type {File} from "@/type/File/File.ts"

const fileListData = ref<File[]>([{
  "fileId": "Cwo2QlSPNk",
  "fileName": "激光雷达卫星探测.docx",
  "fileSize": 15642,
  "fileCategory": 4,
  "fileType": 5,
  "createTime": "2023-06-10 17:06:15",
}])

//分页部分
const fileTotal = ref(0)
const currentPage = ref(1)
const handleSizeChange = (val: number) => {
  console.log(`每页 ${val} 条`);
};
const handleCurrentChange = (val: number) => {
  console.log(`当前页: ${val}`);
};
const params = reactive({
  pageNum: 1,
  pageSize: 7,
  categoryCode: "all",
  fileNameFuzzy: "",
  filePid: ""
})

const selectRows = ref([])
const handleSelectionChange = ()=>{
  console.log('选择文件:'+selectRows.value)
}
// 监听路由变化
onBeforeRouteUpdate((to, from) => {
  params.categoryCode = String(to.params.categoryCode);
  console.log('路由变化为:'+params.categoryCode)
  loadFileListData()
});

//搜索文件逻辑
const fileNameSearch=()=>{
  console.log('搜索文件名:'+params.fileNameFuzzy)
  loadFileListData()
}
const cleanFileNameSearch=()=>{
  params.fileNameFuzzy=''
  loadFileListData()
}

//文件列表相关逻辑
const openFile=(row:File)=>{
  console.log('打开文件')
}
const fileTypeMap = ref( {
  0: { desc: '目录', icon: 'folder' },
  1: { desc: '视频', icon: 'video' },
  2: { desc: '音频', icon: 'music' },
  3: { desc: '图片', icon: 'image' },
  4: { desc: 'pdf', icon: 'pdf' },
  5: { desc: 'doc', icon: 'word' },
  6: { desc: 'excel', icon: 'excel' },
  7: { desc: '纯文本', icon: 'txt' },
  8: { desc: '代码', icon: 'code' },
  9: { desc: '压缩包', icon: 'zip' },
  10: { desc: '其他文件', icon: 'others' }
})
const getImage=(row:File)=>{
  let icon = fileTypeMap.value[row.fileType]?.icon || 'unknown'
  return new URL(`/src/assets/icon-image/${icon}.png`, import.meta.url).href
}
const loadFileListData=async ()=>{
  console.log('获取文件列表')
  console.log(params)
  let res = await getFileListService(params)
  fileListData.value = res.data.items
  fileTotal.value = res.data.total
}
loadFileListData()
</script>

<style lang="scss" scoped>
.main {
  padding-top: 20px;
}
.main-header {
  height: 40px;
  padding: 4px 24px;
  .toolbar {
    display: flex;
    align-items: center;
    .toolbar-action {
      width: 100%;

      .toolbar-group {
        display: flex;
        color: #fff;

        .el-icon {
          margin-right: 6px;
        }

        .action-list {
          :deep(button) {
            background-color: #f0faff;
            padding: 0 12px;
          }

          :deep(button.need-left-step) {
            &::after {
              height: 12px;
              width: 1px;
              position: absolute;
              background-color: rgba(6, 167, 255, 0.23);
              content: ' ';
              left: 0;
              top: 50%;
              margin-top: -6px;
            }
          }
        }
      }

      .action-main {
        margin-right: 16px;
      }
    }

    .toolbar-customize {
      .search {
        width: 270px;

        :deep(.el-input__wrapper) {
          border-radius: 18px;
          padding: 1px 15px;
        }

        .text {
          cursor: pointer;
        }
      }
    }
  }
}

.main-body {
  height: calc(100% - 40px);
  .nav {
    width: 100%;
    padding: 0 0 0 24px;
    box-sizing: border-box;
    height: 40px;

    .nav-list {
      height: 40px;
      line-height: 40px;
      position: relative;
      border-radius: 4px 4px 0 0;
      overflow: hidden;

      .nav-left {
        float: left;
        color: #03081a;
      }
    }
  }
  .file-list {
    padding-left: 8px;
    height: calc(100% - 40px);
  }
  .file-list-footer {
    height: 40px;
  }
  .table-empty {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
  }
  .file-icon {
    text-align: center;
    display: inline-block;
    border-radius: 3px;
    // overflow: hidden;
    width: 32px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}

.main-footer {
  height: 30px
}
</style>