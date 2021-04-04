<template>
  <!-- 首页上方区域 -->
  <el-row  class="top">
    <el-col :xs="14" :sm="9" :md="6" :lg="6" :xl="6" class="logout">
      <span class="welcome none hidden-sm-and-down" v-show="showWel"
        >欢迎，亲爱的 {{ userAccount }}</span
      >
      <span class="welcome" v-show="!showWel"
        >你好，请<router-link to="/login">登录</router-link></span
      >
      <span class="logout-btn" v-show="showWel" @click="logout">注销</span>
    </el-col>
    <el-col class="hidden-xs-only bar" :sm="{span:10,offset:5}" :md="{span:8,offset:10}" :lg="{span:7,offset:11}" :xl="{span:4,offset:14}" >
      <ul>
        <li class="select">组件A</li>
        <li class="none hidden-sm-and-down ">|</li>
        <li class="select">组件B</li>
        <li class="none hidden-sm-and-down ">|</li>
        <li class="select">组件C</li>
      </ul>
    </el-col>
      <div class="bar-btn" :class="{ activeBar : showBar }" @click="changeShowBar">
        <svg t="1617525153138" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2050" width="64" height="64">
          <path d="M128 303.104l750.592 0c47.104 0 84.992-38.912 84.992-84.992s-38.912-84.992-84.992-84.992L128 133.12c-47.104 0-84.992 38.912-84.992 84.992C47.104 264.192 84.992 303.104 128 303.104zM128 179.2l750.592 0c21.504 0 43.008 17.408 43.008 43.008 0 21.504-17.408 43.008-43.008 43.008L128 265.216c-21.504 0-43.008-17.408-43.008-43.008C89.088 196.608 106.496 179.2 128 179.2zM878.592 720.896 128 720.896c-47.104 0-84.992 38.912-84.992 84.992 0 47.104 37.888 84.992 84.992 84.992l750.592 0c47.104 0 84.992-38.912 84.992-84.992C964.608 759.808 925.696 720.896 878.592 720.896zM878.592 844.8 128 844.8c-21.504 0-43.008-17.408-43.008-43.008 0-21.504 17.408-43.008 43.008-43.008l750.592 0c21.504 0 43.008 17.408 43.008 43.008S904.192 844.8 878.592 844.8zM878.592 427.008 128 427.008c-47.104 0-84.992 38.912-84.992 84.992s37.888 84.992 84.992 84.992l750.592 0c47.104 0 84.992-38.912 84.992-84.992S925.696 427.008 878.592 427.008zM878.592 555.008 128 555.008c-21.504 0-43.008-17.408-43.008-43.008 0-21.504 17.408-43.008 43.008-43.008l750.592 0c21.504 0 43.008 17.408 43.008 43.008C921.6 533.504 904.192 555.008 878.592 555.008z" p-id="2051">
          </path>
        </svg>
        <div class="show-mini-bar" v-show="showBar"> 
          <ul class="mini-bar" @click.stop="changeShowBar">
            <li>
              <span class="welcome none" v-show="showWel">
                欢迎，亲爱的 <br>{{ userAccount }}
                <hr>
              </span>
            </li>
            <li >组件A</li>
            <li >组件B</li>
            <li >组件C</li>
          </ul>
        </div>
      </div>
  </el-row>

</template>

<script>
import { store } from "../util/getStore";
import { ref, watchEffect } from "vue";
export default {
  setup() {
    //登录、注销功能
    let userAccountRef = ref(localStorage.getItem("who"));
    let showWel = ref(store.isLogin.value);
    const logout = function () {
      store.isLogin.value = false;
      localStorage.setItem("isLogin", "false");
      localStorage.removeItem("who");
      location.reload();
    };

    //控制mini导航栏展开
    const showBar = ref(false);
    const changeShowBar = function(){
      showBar.value = !showBar.value
    }

    return {
      userAccount: userAccountRef,
      logout,
      showWel,
      showBar,
      changeShowBar,
    };
  },
};
</script>

<style scoped>
.top {
  height: 3em;
  line-height: 3em;
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
  font-size: 1em;
  padding: 0 1em;
  box-shadow: 0 1px 5px black;
  position: relative;
}
.top .logout-btn {
  color: gray;
  font-size: 0.9em;
  cursor: pointer;
}
.bar {
  text-align: right;
}
.bar ul{
  list-style: none;
}
.bar li {
  float: left;
  margin: 0 0.5em;
}
.bar li.select{
  cursor: pointer;
}
.bar li.select:hover{
  color: red;
}
.bar li.none{
  color: gray;
  user-select: none;
}
.bar.li::after {
  content: "";
  clear: both;
}
.bar-btn{
  display: none;
  width: 2em;
  height: 2em;
  position: absolute;
  right: 2em;
  top: 0.4em;
  text-align: center;
  transition: all .3s;
}
.bar-btn svg{
  width: 1.5em;
  height: 1.5em;
}
@media screen and (max-width: 768px){
  .bar-btn{
    display: block;
  }
}
.activeBar {
  transform: scale(1.3);
  border: 1px solid black;
  border-radius: 0.3em;
  background-color: aqua;
  transition: all .3s;
}
.mini-bar{
  width: 10em;
  position: absolute;
  z-index: 2;
  top: 2.2em;
  left: -8em;
  border: 1px solid gray;
  border-radius: 0 0 5px 5px;
  background-color: white;
  padding: 0.2em;
}
.mini-bar li{
  line-height: 2em;
  font-size: 1em;
}
.mini-bar li:hover{
  background-color: gray;
  color: white;
}
</style>