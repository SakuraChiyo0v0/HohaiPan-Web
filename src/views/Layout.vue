<script setup lang="ts">
import {CaretBottom, Crop, EditPen, SwitchButton, User} from "@element-plus/icons-vue";
import {ref,reactive} from "vue";
import defaultAvatar from "@/assets/defaultAvatar.png"
import {useUserInfoStore} from "@/store/UserInfoStore.ts";
import Logo from "@/components/Logo.vue";
import type {MenuItem} from "@/type/Layout/MenuItem.ts";
import type {SubMenuItem} from "@/type/Layout/SubMenuItem.ts";
import Router from "@/router";
import {loginOut} from "@/utils/LoginOut.ts";
const userInfoStore = useUserInfoStore();
const Menus:MenuItem[] = [
  {
    name: '首页',
    allShow: true,
    icon: 'yunpan1',
    path: '/file',
    children: [{
      name: '全部',
      icon: 'all-fill',
      path: '/file/all',
    },
      {
        name: '视频',
        icon: 'video02',
        path: '/file/video'
      },
      {
        name: '音频',
        icon: 'yinpin',
        path: '/file/music'
      },
      {
        name: '图片',
        icon: 'zhaopian',
        path: '/file/image'
      },
      {
        name: '文档',
        icon: 'DOC',
        path: '/file/doc'
      },
      {
        name: '其他',
        icon: 'qita1',
        path: '/file/others'
      }]
  },
  {
    name: '分享',
    allShow: true,
    icon: 'wenjianfenxiang',
    path: '/share',
    children: [{
      name: '分享文件',
      path: '/share/file'
    },
    {
      name: '分享记录',
      path: '/share/record'
    }]
  },
  {
    name: '回收站',
    allShow: true,
    icon: 'huishouzhan1',
    path: '/recycle',
    children: [{
      name: '回收站',
      path: '/recycle'
    }]
  },
  {
    name: '系统设置',
    allShow: true,
    icon: 'shezhi',
    path: '/setting',
    children: [{
      name: '修改个人资料',
      path: '/setting/info'
    },
      {
      name: '修改头像',
      path: '/setting/avatar'
    },
      {
      name: '修改密码',
      path: '/setting/resetPwd'
    }]
  }
]

//菜单的跳转逻辑
const currentItem = ref(Menus[0])
const currentSubItem = ref(Menus[0].children[0])
const jump = (item:MenuItem)=>{
  currentItem.value = item
  currentSubItem.value = item.children[0]
  let path = item.children[0].path
  Router.push(path)
}
const subJump = (item:SubMenuItem)=>{
  currentSubItem.value = item
  Router.push(item.path)
}
//下拉框逻辑
const handleCommand=(command:string)=>{
  console.log(command)
  switch (command) {
    case 'info':
      currentItem.value = Menus[3]
      currentSubItem.value = Menus[3].children[0]
      Router.push(Menus[3].children[0].path)
      break;
    case 'avatar':
      currentItem.value = Menus[3]
      currentSubItem.value = Menus[3].children[1]
        Router.push(Menus[3].children[1].path)
      break;
    case 'resetPwd':
      currentItem.value = Menus[3]
      currentSubItem.value = Menus[3].children[2]
        Router.push(Menus[3].children[2].path)
      break;
    case 'loginOut':
      loginOut()
      break;
    default:
      console.log('未知命令');
      break;
  }
}
</script>

<template>
  <el-container class="layout-container">
    <el-header class="header">
      <Logo></Logo>
      <el-dropdown placement="bottom-end" @command="handleCommand">
        <span class="el-dropdown__box">
            <el-avatar :src="userInfoStore.userInfo?.avatar? userInfoStore.userInfo.avatar:defaultAvatar"/>
            <el-icon>
                <CaretBottom/>
            </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="info" :icon="User">基本资料</el-dropdown-item>
            <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
            <el-dropdown-item command="resetPwd" :icon="EditPen">重置密码</el-dropdown-item>
            <el-dropdown-item command="loginOut" :icon="SwitchButton">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside class="menu">
        <div class="menu-list">
          <div
              v-for="item in Menus"
              :class="['menu-item',item.name===currentItem.name?'active':'']"
              @click="jump(item) ">
            <div :class="['iconfont','icon-'+item.icon]"></div>
            <div class="text">{{ item.name }}</div>
          </div>
        </div>
      </el-aside>
      <el-container>
        <el-aside class="menu">
          <div class="menu-sub-list">
            <div
                v-for="subItem in currentItem.children"
                :class="['menu-sub-item',subItem.name===currentSubItem.name?'active':'']"
                @click="subJump(subItem) ">
              <div :class="['iconfont','icon-'+subItem.icon]" v-if="subItem.icon"></div>
              <div class="text">{{ subItem.name }}</div>
            </div>
<!--            <div class="space-info">-->
<!--              <div class="percent">-->
<!--                <el-progress :percentage="percentage" :show-text="false" color="#ffd821"></el-progress>-->
<!--              </div>-->
<!--              <div class="space-use">-->
<!--                <div class="use">-->
<!--                  {{ userInfoStore.userInfo?.useSpace }} / {{ userInfoStore.userInfo?.totalSpace }}-->
<!--                </div>-->
<!--                <el-icon class="refresh" :size="14" @click="getUseSpace"></el-icon>-->
<!--              </div>-->
<!--            </div>-->
          </div>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer class = "foot">
            foot
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.layout-container {
  height: 100vh;
  min-width: 1080px;

  .header {
    box-shadow: 0 3px 10px 0 rgb(0 0 0 / 6%);
    height: 60px;
    padding-left: 24px;
    padding-right: 24px;
    position: relative;
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .menu {
    border-right: 1px solid #f1f2f4;
    display: flex;
    width: auto;

    .menu-list {
      width: 80px;
      padding-bottom: 30px;
      color: #636d7e;
      box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.06);
      border-right: 1px solid #f1f2f4;

      .menu-item {
        text-align: center;
        font-size: 13px;
        cursor: pointer;
        padding: 15px 0;

        &:hover {
          background: #f3f3f3;
        }

        .iconfont {
          font-weight: normal;
          font-size: 32px;
        }

        .icon-yunpan1{
          font-size : 42px;
        }

        .icon-huishouzhan1{
          font-size: 42px;
        }


        .item-img img {
          width: 36px;
          height: auto;
        }

        .text {
          margin-top: 8px;
          max-width: 80px;
          font-weight: bold;
        }
      }

      .active {
        color: #06a7ff;
        font-weight: 700;
      }
    }

    .menu-sub-list {
      width: 200px;
      padding: 20px 0px;
      position: relative;
      color: #636d7e;

      .menu-sub-item {
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: center;
        margin-left: 12px;
        width: 177px;
        font-size: 16px;
        font-weight: 700;
        border-radius: 12px;
        cursor: pointer;

        &:hover {
          background: #fafafa;
        }

        .iconfont {
          font-weight: normal;
          font-size: 18px;
          margin-right: 8px;
        }


        .body {
          padding-left: 50px;

          .text {
            color: #636d7e;
            font-size: 14px;
          }
        }
      }

      .active {
        background-color: #eef9fe;
        color: #06a7ff;
        font-weight: 700;
      }

      .tip {
        margin-top: 10px;
        color: #888888;
        font-size: 13px;
      }

      .space-info {
        position: absolute;
        bottom: 25px;
        width: 100%;
        padding: 0px 20px;
        font-size: 14px;

        .space-use {
          margin-top: 5px;
          color: #afb3bf;
          font-size: 12px;
          display: flex;
          justify-content: space-around;

          .use {
            flex: 1;
          }

          .refresh {
            cursor: pointer;
            color: #05a1f5;
          }
        }
      }
    }
  }

  .foot {
    height: 40px;
  }
}
</style>