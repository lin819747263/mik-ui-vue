<template>
  <div>
    <el-container>
      <el-header class="header" height="58px">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handleSelect"
        >
          <el-menu-item index="1">Processing Center</el-menu-item>
          <el-sub-menu index="2">
            <template #title>Workspace</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-sub-menu index="2-4">
              <template #title>item four</template>
              <el-menu-item index="2-4-1">item one</el-menu-item>
              <el-menu-item index="2-4-2">item two</el-menu-item>
              <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="3" disabled>Info</el-menu-item>
          <el-menu-item index="4">Orders</el-menu-item>
          <el-avatar :size="size" :src="circleUrl" class="avatar"/>
        </el-menu>
        
      </el-header>
      <el-container class="content">
        <el-aside height = "100%" width="240px" >
          <el-col style = "height:100%;">
            <el-menu
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="menu-left"
              default-active="2"
              text-color="#fff"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><location /></el-icon>
                  <span>Navigaetor On</span>
                </template>
                <el-menu-item-group title="Group One">
                  <el-menu-item index="1-1">item one</el-menu-item>
                  <el-menu-item index="1-2">item two</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group Two">
                  <el-menu-item index="1-3">item three</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                  <template #title>item four</template>
                  <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-sub-menu>
              </el-sub-menu>

              <el-sub-menu index="2">
                <template #title>
                  <el-icon><location /></el-icon>
                  <span>系统管理</span>
                </template>
                <el-menu-item index="2-1" @click="toUser">用户管理</el-menu-item>
                <el-menu-item index="2-2" @click="toMenu">菜单管理</el-menu-item>
                <el-menu-item index="2-3" @click="toRole">角色管理</el-menu-item>
              </el-sub-menu>

              <el-menu-item index="3" disabled>
                <el-icon><document /></el-icon>
                <span>Navigator Three</span>
              </el-menu-item>
              <el-menu-item index="4">
                <el-icon><setting /></el-icon>
                <span>Navigator Four</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>
        <el-container>
          <el-main class="mian">
            <RouterView></RouterView> 
          </el-main>
          <el-footer class="footer">Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
  

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

let size = ref(50);

const toUser=()=>{
    router.push("/home/user")
}
const toMenu=()=>{
    router.push("/home/menu")
}
const toRole=()=>{
    router.push("/home/role")
}

</script>

<style lang="less" scoped>
.header {
    padding-left: 0px;
    padding-right: 0px;

    .avatar{
        float: right;
        margin-right: 60px;
    }
    
}

.el-menu-demo {
    border-bottom-color: #545c64;
}

.content {
    height: calc(100vh - 60px);
}


.menu-left {
    height: 100%;
}

.main {
    margin: 0px;
}

.footer {
    padding: 0px;
}

</style>