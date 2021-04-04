<template>
  <div>
    <!-- 首页基础模板组件，小组件放置区 -->
    <el-container class="base">
      <!-- 导航栏 + 搜索框 区域 -->
      <el-header><Home-top /></el-header>
       <!-- 侧边栏 + 主要内容 上中下 区域 -->
      <el-main><Home-container /></el-main>

      <el-footer><Home-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import { store } from "../util/getStore";
import HomeTop from "./home-top.vue";
import HomeContainer from "./home-container.vue";
import HomeFooter from "./home-footer.vue";
import { ref } from "vue";
export default {
  components: {
    HomeTop,
    HomeContainer,
    HomeFooter
  },
  setup() {
    //未登录状态localStorage的key为空串。
    const isLoginRef = ref(store.isLogin);
    if (localStorage.getItem("isLogin") == "true") {
      store.isLogin.value = true;
    }
    return {
      isLogin: isLoginRef,
    };
  },
};
</script>

<style >
.base {
  background-color: #eee;
}

.no-login {
  position: relative;
  margin-top: 100px;
  height: 300px;
  box-sizing: border-box;
  border-top: 20px solid #ff2121;
  background-color: #ff7500;
  border-bottom: 20px solid #ff2121;
  vertical-align: middle;
  text-align: center;
  line-height: 260px;
  font-style: oblique;
  font-size: 60px;
  font-weight: bolder;
}
.no-login::after {
  content: "";
  position: absolute;
  box-sizing: border-box;
  top: -20px;
  left: 0;
  display: block;
  /* background-color: #fff; */
  opacity: 0.5;
  height: 0px;
  width: 0px;
  border: 150px solid transparent;
  border-right: 150px solid #fff;
  border-bottom: 150px solid #fff;
  animation: roundLight 3s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
}
.no-login::before {
  content: "";
  position: absolute;
  box-sizing: border-box;
  top: -20px;
  left: 300px;
  display: block;
  opacity: 0.5;
  height: 0px;
  width: 0px;
  border: 150px solid transparent;
  border-top: 150px solid #fff;
  border-left: 150px solid #fff;
  animation: roundLight 3s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
}
@keyframes roundLight {
  0% {
    transform: translateX(-300px);
  }
  100% {
    transform: translateX(2000px);
  }
  /* 100% {
    transform: translateX(0);
  } */
}
</style>