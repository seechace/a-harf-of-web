<template>
<!-- 计划： welcome欢迎页内置登录与注册组件，登录成功后跳转到主页。 -->
<!-- 登录按钮就是router-link按钮，但是服务器必须返回true(或本地根据返回结果判断为true)router才能完成跳转，否则点击无效 -> 实现： 对router-link的点击事件加锁。 -->
  <div id="app">
    <!-- <welcome /> -->
    <!-- <router-link to="/home">home</router-link> -->
    <router-view />
  </div>

</template>

<script>
export default {
  components:{
  },
  setup(){

  }
}
</script>
<style>
  @import url(./assets/reset.css);
</style>
