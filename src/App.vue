<template>
  <div id="app">
   <el-container>
    <el-header>e洁家政服务平台</el-header>
    <el-container>
      <el-aside width="200px">
         <el-col :span="12"  style="height:100%;width:100%;border-top:1px solid white;">
          <el-menu
            router
            style="height:100%"
            default-active="/category"
            class="el-menu-vertical-demo"
          
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
             <el-menu-item index="/category">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>分类管理</span>
                </template>
                
             </el-menu-item>
              <el-menu-item index="/address">
                <i class="el-icon-menu"></i>
               <span>地址管理</span>
              </el-menu-item>
              <el-menu-item index="/comment">
                <i class="el-icon-s-comment"></i>
               <span>评论管理</span>
              </el-menu-item>
               <el-menu-item index="/customer">
                <i class="el-icon-s-custom"></i>
                <span>顾客管理</span>
              </el-menu-item>
               <el-menu-item index="/order">
                <i class="el-icon-s-order"></i>
               <span>订单管理</span>
              </el-menu-item>
              <el-menu-item index="/product">
                <i class="el-icon-s-goods"></i>
               <span>产品管理</span>
              </el-menu-item>
              <el-menu-item index="/waiter">
                <i class="el-icon-user-solid"></i>
                <span>员工管理</span>
              </el-menu-item>
            </el-menu>
          </el-col>
         <!-- <router-link to="/category">分类管理</router-link>
          <router-link to="/hello">hello</router-link> -->
      </el-aside>
      <el-container style="height:100%">
        <el-main style="height:100%">
          <router-view></router-view>
        </el-main>
        <el-footer>Mading Zhang</el-footer>
      </el-container>
    </el-container>
  </el-container>

  </div>
</template>

<script>


import router from './router'
export default {
  name: 'App',
  
  methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  },
  router
  // router
}
</script>

<style>
    #app{
      height: 100%;
    }
   .el-header, .el-footer {
    background-color:#545c64;
    color: #ffffff;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
  .el-container{
    height: 100%;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .nav_a{
    text-decoration: none;
    color:white;
  }
</style>
