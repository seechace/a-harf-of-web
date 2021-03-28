<template>
  <div id="register">
    <h2>让我们来创建一个新账号吧！</h2>
    <div class="wrapper">
      <ul class="registerView">
        <li>
          <label>用户名</label>
          <input type="text" v-model="username" autocomplete="off" title="用户名是您的昵称，由于api的不支持，目前无法正常获取用户名，请见谅"/>
        </li>
        <li>
          <label>账号</label>
          <input
            type="password"
            v-model="account"
            autocomplete="off"
            onfocus="this.type = 'text' "
            title="账号作为您登录使用，丢失无法找回，请谨慎保管"
          />
        </li>
        <li>
          <label>密码</label>
          <input type="password" v-model="password" ondblclick="this.type = 'text' " title="双击输入框查看密码"/>
        </li>
        <li>
          <label>确认密码</label>
          <input type="password" v-model="rePassword" autocomplete="off" ondblclick="this.type = 'text' " title="双击输入框查看密码"/>
        </li>
      </ul>
      <div class="btn-box">
        <ul>
          <li class="warn">🔺用户名4-16位，支持数字字母 - _</li>
          <li class="warn">🔺账号必须为8-16位纯数字</li>
          <li class="warn">🔺密码必须包含英文和数字</li>
          <li class="warn">🔺密码中不支持任何符号</li>
          <li class="tips" @click="handleRegister">{{ tips }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { check } from "../util/check";
import { sendMessage } from "../util/ajax";
import { delay } from "../util/getPosition";
import { useRouter } from "vue-router";
import { store } from "../util/getStore";
export default {
  setup() {
    let tipsRef = ref("点击这里注册");
    let registerMsg = {};
    const accountRef = ref("");
    const usernameRef = ref("");
    const passwordRef = ref("");
    const rePasswordRef = ref("");
    let count = 0; //节流锁
    const router = useRouter();

    //注册处理函数
    const handleRegister = async function () {
      if (!count) {
        count++;
        registerMsg = {
          account: accountRef.value,
          username: usernameRef.value,
          password: passwordRef.value,
          rePassword: rePasswordRef.value,
        };
        const result = check(registerMsg);
        if (result.state) {
          tipsRef.value = "🐇注册中...";
          await delay(1000);
          sendMessage("register", registerMsg, true, function (response) {
            if (response.status) {
              tipsRef.value = "注册成功！";
              setTimeout(() => {
                router.push("/home");
                //存储登录状态
                localStorage.setItem("isLogin", "true");
                //平台通用登录状态
                store.isLogin.value = true ;
                localStorage.setItem("who", usernameRef.value);
                tipsRef.value = "点击这里注册";
              }, 1000);
            } else {
              tipsRef.value = response.msg;
            }
          });
        } else {
          tipsRef.value = result.msg;
          await delay(1000);
          tipsRef.value = "点击这里注册";
        }
        count = 0;
      } else {
        return;
      }
    };

    return {
      tips: tipsRef,
      account: accountRef,
      username: usernameRef,
      password: passwordRef,
      rePassword: rePasswordRef,
      handleRegister,
    };
  },
};
</script>

<style scoped>
#register {
  box-sizing: border-box;
  height: 500px;
  width: 1000px;
  border-left: 50px solid #f00056;
  background: #eee;
  padding: 10px;
}
.wrapper {
  display: flex;
  justify-content: space-between;
  width: 800px;
  height: 200px;
}
.btn-box {
  box-sizing: border-box;
  height: 200px;
  width: 300px;
  border: 1px solid #000;
  background-color: #fff;
  border-radius: 3px 5px;
  box-shadow: 5px 5px 10px #000;
  padding: 5px;
}
h2 {
  /* 边框50+左边10+自身左内40 = 100 */
  /* 上下20自身50 共 90 */
  font-size: 50px;
  font-weight: bolder;
  line-height: 200px;
}
.registerView {
  display: flex;
  box-sizing: border-box;
  height: 300px;
  width: 400px;
  flex-direction: column;
  font-size: 20px;
  margin-left: 50px;
}
.registerView li {
  display: flex;
  width: 400px;
  height: 50px;
  justify-content: space-between;
}
.registerView label {
  display: inline-block;
  width: 100px;
  height: 30px;
  line-height: 30px;
  align-self: center;
}
.registerView input {
  display: inline-block;
  font-size: 25px;
  width: 300px;
  height: 30px;
  line-height: 30px;
  padding: 0;
  border: none;
  border-bottom: 2px solid black;
  outline: none;
  background-color: #eee;
  align-self: center;
}
.registerView li input:focus {
  border-bottom: 2px solid #f00056;
}
/* .v-enter {
  transform: translateY(-200px) scale(0.8);
}
.v-enter-active {
  transition: all 0.5s;
}
.v-enter-to {
  transform: translateY(0px) scale(1);
} */
.btn-box .warn {
  display: inline-block;
  margin: 5px 0;
}
.btn-box .tips {
  display: inline-block;
  box-sizing: border-box;
  height: 50px;
  width: 190px;
  text-align: center;
  line-height: 50px;
  margin: 20px 50px;
  font-size: 25px;
  border: 1px solid #000;
  cursor: pointer;
  background-color: #fff;
  transition: all 0.3s;
}
.btn-box .tips:hover {
  background-color: #f00056;
  color: #fff;
  transition: all 0.3s;
}
</style>