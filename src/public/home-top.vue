<template>
  <!-- 首页上方区域 -->
  <div class="top">
    <div class="logout">
      <span class="welcome" v-show="showWel"
        >欢迎，亲爱的 {{ userAccount }}</span
      >
      <span class="welcome" v-show="!showWel"
        ><router-link to="/">你好，请登录</router-link></span
      >
      <span class="logout-btn" v-show="showWel" @click="logout">注销</span>
    </div>

    <div class="bar">
      <ul>
        <li>我是导航a</li>
        <li>|</li>
        <li>我是导航b</li>
        <li>|</li>
        <li>我是导航c</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { store } from "../util/getStore";
import { ref, watchEffect } from "vue";
export default {
  setup() {
    let userAccountRef = ref(localStorage.getItem("who"));
    let showWel = ref(store.isLogin.value);
    const logout = function () {
      store.isLogin.value = false;
      localStorage.setItem("isLogin", "false");
      localStorage.removeItem("who");
      location.reload();
    };
    return {
      userAccount: userAccountRef,
      logout,
      showWel,
    };
  },
};
</script>

<style scoped>
.top {
  height: 50px;
  line-height: 50px;
  background: #a8ff78; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    rgb(168, 255, 120),
    rgb(120, 255, 214)
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    rgb(168, 255, 120),
    rgb(120, 255, 214)
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  font-size: 20px;
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  box-shadow: 0 3px 10px black;
}
.top .logout > .welcome {
  margin-right: 20px;
}
.top .logout-btn {
  color: gray;
  font-size: 17px;
  cursor: pointer;
}
.top .bar > ul {
  display: flex;
  justify-content: space-around;
}
.top .bar ul li {
  margin: 0 8px;
  cursor: pointer;
}
</style>