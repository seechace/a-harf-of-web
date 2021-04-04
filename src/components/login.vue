<template>
  <div id="login">
    <h2 class="welcome">Hi，欢迎你来到这里</h2>
    <ul class="loginView">
      <li>
        <label for="account"
          >账号<input
            type="text"
            name="account"
            id="account"
            autocomplete="off"
            v-model="account"
        /></label>
      </li>
      <li>
        <label for="password"
          >密码<input
            type="password"
            name="password"
            id="password"
            v-model="password"
        /></label>
      </li>
    </ul>
    <!-- 登录中时改变背景颜色，并设置不可点击,改变vlaue显示为 登录中 -->
    <div class="btnBox">
      <!-- 发送ajax时，验证登录变为登陆中，logining 为 true ,结果成功返回后，isLogin改变为true，底色改变 -->
      <input
        class="btn"
        :class="{ flash: logining, fail: loginFail }"
        type="submit"
        :value="btnText"
        @click="goHome($event)"
      />

      <input
        class="btn"
        type="button"
        value="注册"
        title="前往注册一个账号"
        @click="changeRe"
      />
    </div>
    
  </div>
</template>

<script>
import { inject, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { store } from "../util/getStore";
import { delay } from "../util/getPosition";
import { sendMessage } from "../util/ajax";
export default {
  setup() {
    let btnTextRef = ref("登录");
    let loginingRef = ref(false);
    let loginFailRef = ref(false);
    //登录跳转
    const router = useRouter();
    //存储登录信息
    const loginMsg = {};
    const accountRef = ref("");
    const passwordRef = ref("");
    //登录判定
    const goHome = async function (e) {
      e.target.disabled = true;
      //切换按钮状态
      btnTextRef.value = "😀登录中...";
      loginingRef.value = true;
      //获取登录信息
      loginMsg.account = accountRef.value;
      loginMsg.password = passwordRef.value;
      await delay(1500);
      //发送ajax
      sendMessage("login", loginMsg, true, function (response) {
        if (response.status == "success") {
          //存储登录状态
          localStorage.setItem("isLogin", "true");
          //平台通用登录状态
          store.isLogin.value = true;
          localStorage.setItem("who", accountRef.value);
          //登录跳转
          btnTextRef.value = "登陆成功！";
          router.push("/");
        } else if (response.status == "fail") {
          btnTextRef.value = "😣登录失败！";
          loginFailRef.value = true;
          setTimeout(() => {
            btnTextRef.value = "登录";
            e.target.disabled = false;
            loginFailRef.value = false;
          }, 2000);
        }
      });
      loginingRef.value = false;
    };

    //从登录界面打开注册界面
    const isRegisterRef = ref(store.isRegister);
    const changeRe = function () {
      isRegisterRef.value = true;
    };
    watchEffect(() => {
      store.isRegister.value = isRegisterRef.value;
    });

    return {
      isLogin: store.isLogin,
      btnText: btnTextRef,
      logining: loginingRef,
      loginFail: loginFailRef,
      goHome,
      isRegister: isRegisterRef,
      changeRe,
      account: accountRef,
      password: passwordRef,
    };
  },
};
</script>
  
<style >
#login {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  border-left: 50px solid aqua;
  padding: 10px;
}
#login > .welcome {
  font-size: 50px;
  font-weight: bolder;
  line-height: 200px;
}

.loginView {
  margin-left: 50px;
}
.loginView li {
  margin-bottom: 20px;
  font-size: 30px;
  vertical-align: text-bottom;
}
.loginView li label {
  display: inline-block;
}
.loginView li input {
  margin-left: 1em;
  width: 260px;
  border: none;
  border-bottom: 2px solid black;
  outline: none;
  height: 30px;
  line-height: 30px;
  font-size: 25px;
  background-color: #eee;
}
.loginView li input:focus {
  border-bottom: 2px solid aqua;
}
.btnBox {
  margin-left: 50px;
  margin-top: 50px;
}
.btn {
  display: inline-block;
  margin-right: 50px;
  height: 50px;
  width: 150px;
  padding: 0;
  background: #eee;
  border-radius: 5px;
  line-height: 50px;
  font-size: 25px;
  box-sizing: border-box;
  border: 1px solid black;
  transition: all ease-in-out 0.3s;
  cursor: pointer;
  text-align: center;
}
@keyframes show {
  0% {
    opacity: 1;
    background-color: #eee;
  }
  50% {
    opacity: 0.2;
    background-color: #ff0;
  }
  100% {
    opacity: 1;
    background-color: #eee;
  }
}
.flash {
  animation: show 0.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
}
.fail {
  background-color: #f20c00;
  color: white;
  border: none;
}
</style>
