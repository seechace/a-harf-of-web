/**
 * 发送Ajax请求-内部函数不导出
 * @param {String} type 请求方式，默认 "GET"
 * @param {String} url 请求地址
 * @param {String} readyData 请求中发送的数据，格式：key1=value1&key2=value2
 * @param {Function} cb 请求成功后的回调函数，返回的结果会传入函数中
 * @param {Boolean} isAsync 是否异步进行，默认异步
 */
const ajax = function (type = "GET", url, readyData, cb, isAsync = true) {
  let xhr = null;
  //兼容
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject();
  };
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      //说明此时已经通信完毕
      if (xhr.status == 200) {
        //通信成功,执行回调函数，传入返回的信息对象
        // console.log("通信成功,执行回调函数",JSON.parse(xhr.responseText));
        cb(JSON.parse(xhr.responseText));
      }
    }
  };
  //GET方式的请求信息都在url中，可以直接操作
  if (type == "GET") {
    xhr.open("GET", url + "?" + readyData, isAsync);
    xhr.send();
  } else if (type == "POST") {
    //POST方式需要改变请求头信息，并且发送的信息需要位于content中。
    xhr.open("POST", url, isAsync);
    // 设置内容：信息主体：（应用层-万维网-表单式-url编码）式
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(readyData);
  } else {
    throw new Error("此ajax函数仅支持'GET'与'POST'的方式，请检查您使用的请求方式是否正确")
  }
}

/**
 * 根据要做的事自动选取合适的方式完成服务器通讯
 * @param {String} todo 要做什么？注册register，登录login
 * @param {String} data 发送的信息体,对象会自动处理
 * @param {Boolean} isAsync 是否异步
 * @param {Function} cb 成功后的回调函数
 */
export const sendMessage = function (todo, data, isAsync = true, cb) {
  const baseUrl = "http://open.duyiedu.com";
  let readyData = "";
  if (typeof data === "object") {
    for (let prop in data) {
      //ajax函数要用到的readyData格式应该为 key1=value1&key2=value2
      readyData += prop + "=" + data[prop] + "&";
    }
    //去除最后一个多余的 & 
    readyData = readyData.slice(0, readyData.length - 1);
  } else {
    //如果data不是对象，那么它应该是一个字符串，可以直接使用
    readyData = data;
  }
  readyData += "&appkey=fengchen_1596021863440"
  if (todo === "register") {
    //注册
    ajax("POST", baseUrl + "/api/student/stuRegister", readyData, function (response) {
      cb(response);
    }, isAsync);
  } else if (todo === "login") {
    //登录
    ajax("POST", baseUrl + "/api/student/stuLogin", readyData, function (response) {
      cb(response);
    }, isAsync);
  }
  // else if (todo ==="delete"){
  //   if(typeof +readyData != "number"){
  //     throw new Error("必须指定一个账号才能删除它！")
  //   }
  //   //删除
  //   ajax("GET", baseUrl + "/api/student/delBySno", readyData, function (response) {
  //     if (response.status === "success") {
  //         cb(response);
  //     } else {
  //         //失败后的处理：此处放置提示语或者弹窗
  //     }
  //   }, isAsync);
  // }
}

/**
 * 删除
 * sendMessage('GET', '/api/student/delBySno', {
                                    sNo: readyValue[pageIndex].sNo
                                }
  
 */