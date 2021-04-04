<template>
  <div id="welcome">
    <!-- 返回主页 -->
    <div class="return">
      <router-link to="/" >仍以访客身份浏览</router-link>
    </div>
    <!-- 背景视频 -->
    <div id="video" :style="{ height: clientHeight }">
      <video
        loop="loop"
        src="../assets/welcome/welcomeVideo.mp4"
        poster="../assets/welcome/poster.jpeg"
        class="bgVideo"
        :width="clientWidth"
      ></video>
      <!-- 遮罩层 -->
      <div
        class="mantle"
        :style="{ opacity: mantleOpacity }"
        @mousemove="mousemoving($event)"
      ></div>
    </div>
    <!-- 登录/注册 区域，点击注册时占满整行 -->
    <div
      class="login"
      @mouseenter="loginmouseenter"
      @mouseleave="loginmouseleave"
      :style="{ transform: `translateX(${getOut})` }"
    >
      <Before-login v-show="!isEnter" />
      <Login v-show="isEnter && !isRegister" />
      <Register v-show="isRegister" />
    </div>
    <!-- 左侧时间栏，点击注册时移动至左侧屏幕外 -->
    <div
      class="timeView"
      :style="{ width: timeViewWidth, perspectiveOrigin: origin }"
    >
      <strong class="timeText">{{ timeYMD }}</strong>
      &nbsp;
      <strong class="timeText">{{ timeHMS }}</strong>
      <br />
      <address class="positionText">当前位置： {{ address }}</address>
    </div>
  </div>
</template>

<script>
import {
  ref,
  onMounted,
  watchEffect,
  toRefs,
  readonly,
  defineAsyncComponent,
} from "vue";
import { getTimeYMD, getTimeHMS } from "../util/getTime";
import { getPosition, delay } from "../util/getPosition";
import { store } from "../util/getStore";
import Login from "../components/login.vue";
import BeforeLogin from "../components/before-login.vue";
import Loading from "../components/Loading.vue";

//动态获取组件
const Register = defineAsyncComponent({
  loader: async () => {
    await delay(5000);
    return import("../components/register.vue");
  },
  loadingComponent: Loading,
});

export default {
  components: {
    Login,
    BeforeLogin,
    Register,
  },
  setup(props, ctx) {
    // console.log(props, ctx);
    //背景铺满，自动播放
    let clientWidthRef = ref(document.documentElement.clientWidth + "px"); //视口宽度可能随浏览器改变，做一些特殊处理，高度同理，但此处不管了
    let clientHeight = document.documentElement.clientHeight;
    onMounted(() => {
      const video = document.getElementsByClassName("bgVideo")[0];
      video.play();
    });

    //登录区域打开时效果配置
    //调整蒙层亮度、调整时间栏宽度、增加鼠标移入判定，增加注册模块关闭判定
    let mantleOpacityRef = ref(0);
    let isEnterRef = ref(false);
    const loginmouseenter = function () {
      mantleOpacityRef.value = "0.6";
      timeViewWidthRef.value = "0";
      isEnterRef.value = true;
    };
    const loginmouseleave = function () {
      mantleOpacityRef.value = "0";
      timeViewWidthRef.value = clientWidthRef.value - 200 + "px";
      isEnterRef.value = false;
      store.isRegister.value = false;
    };

    //注册区域配置
    //获取当前是否为注册状态，如果是，则加载注册组件
    let isRegisterRef = readonly(store.isRegister);

    //登录窗共1000，不展开则为200，需 右移800px ,展开 600
    let getOutRef = ref("");
    watchEffect(() => {
      //每次移动，更新位移距离，更新时间栏宽度
      if (isEnterRef.value) {
        if (store.isRegister.value) {
          getOutRef.value = "0px";
          clientWidthRef.value = document.documentElement.clientWidth;
        } else {
          getOutRef.value = "400px";
          clientWidthRef.value = document.documentElement.clientWidth;
        }
      } else if (!isEnterRef.value) {
        getOutRef.value = "800px";
        clientWidthRef.value = document.documentElement.clientWidth;
      }
    });
    //告知子组件是否已经展开登录窗
    // provide("isEnter",isEnterRef); 该方法有些小bug：刚开始会执行一下，导致结果混乱，已经使用 模块化 将数据提取出。
    //左侧时间栏 + HTML5网络定位
    let timeYMDRef = ref(getTimeYMD());
    setInterval(() => {
      timeYMDRef.value = getTimeYMD();
    }, 1000);

    let timeHMSRef = ref(getTimeHMS());
    setInterval(() => {
      timeHMSRef.value = getTimeHMS();
    }, 1000);

    getPosition();
    let addressRef;
    //确保定位信息从空字符串变成具体信息时，能感知到并刷新页面
    watchEffect(() => {
      // console.log(position.addressRef.value);
      return (addressRef = store.addressRef);
    });

    const timeViewWidthRef = ref(clientWidthRef.value - 200 + "px");
    //时间栏3D视角：
    //通过保存蒙层上的鼠标移动轨迹，设置时间栏处的3D观察点
    const mouse = {
      x: ref(0),
      y: ref(0),
    };
    //存储观察点原点
    const originRef = ref("");
    const mousemoving = function (e) {
      mouse.x.value = e.pageX;
      mouse.y.value = e.pageY;
      originRef.value = `${mouse.x.value + "px"} ${mouse.y.value + "px"}`;
      // console.log(originRef.value);
    };

    return {
      clientWidth: clientWidthRef,
      clientHeight: clientHeight + "px",
      timeViewWidth: timeViewWidthRef,
      mantleOpacity: mantleOpacityRef,
      loginmouseenter,
      loginmouseleave,
      timeYMD: timeYMDRef,
      timeHMS: timeHMSRef,
      address: addressRef,
      mousemoving,
      origin: originRef,
      isEnter: isEnterRef,
      getOut: getOutRef,
      isRegister: isRegisterRef,
    };
  },
};
</script>

<style scoped>
#video {
  position: relative;
  overflow: hidden;
  background-color: #2e4e7e;
}
.bgVideo {
  width: 2000px;
}
.mantle {
  position: absolute;
  z-index: 2;
  background-color: black;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all ease-in-out 0.3s;
}
.timeView {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.3);
  perspective: 2000px;
  transform-style: preserve-3d;
  transform: translateZ(150px);
  left: 0;
  top: 20%;
  /* z-index: 1; */
  height: 500px;
  /* width: calc(100% - 200px); */
  text-align: center;
  overflow: hidden;
  transition: all ease-in-out 0.3s;
}
.timeView .timeText {
  color: #fff;
  display: inline-block;
  line-height: 250px;
  font-size: 100px;
  font-family: "Times New Roman";
  font-weight: 1000;
  transform-style: preserve-3d;
  transform: translateZ(150px);
}
.timeView .positionText {
  color: #fff;
  display: inline-block;
  line-height: 250px;
  font-size: 60px;
  font-family: Arial;
  transform-style: preserve-3d;
  transform: translateZ(150px);
}
.login {
  position: fixed;
  z-index: 999;
  right: 0;
  top: 20%;
  width: 1000px;
  height: 500px;
  background-color: #eee;
  opacity: 0.3;
  transition: all ease-out 0.3s;
}
/* width: 600px;  1000px
  height: 500px; */
.login:hover {
  opacity: 0.8;
  /* box-shadow: 5px 5px 5px black; */
  /* transform: translateX(0px); */
  transition: all ease-in 0.3s;
}
.return {
  position: fixed;
  z-index: 20;
  right: 2em;
  top: 1em;
  background-color: #eee;
  color: black;
  width: 9em;
  height: 2em;
  line-height: 2em;
  text-align: center;
  cursor: pointer;
}
</style>
