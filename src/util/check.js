/**
 * 检查输入内容是否合规
 * @param {Object} target 传入一个对象来检查每一项
 * @returns {Object} {state：true/false , msg: ""/"xxx"}
 */
export const check = function (target) {
  const accountReg = /^\d{8,16}$/;
  if (target.account.search(accountReg) == "-1") {
    return {
      state: false,
      msg: "账号不合规"
    }
  }
  if (target.rePassword != target.password) {
    return {
      state: false,
      msg: "确认密码错误"
    }
  }
  const passwordReg = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
  if (target.password.search(passwordReg) == "-1") {
    return {
      state: false,
      msg: "密码不合规"
    }
  }
  const usernameReg = /^[a-zA-Z0-9_-]{4,16}$/;
  if (target.username.search(usernameReg) == "-1") {
    return {
      state: false,
      msg: "用户名不合规"
    }
  }
  return {
    state: true,
    msg: "各项合法，可以注册"
  }
}