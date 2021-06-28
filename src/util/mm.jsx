class MUtil {
  request(param) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: param.type || "get",
        url: param.url || "",
        dataType: param.dataType || "json",
        data: param.data || null,
        success: (res) => {
          // 数据请求成功
          if (res.status === 0) {
            //先判断resolve类型是function
            typeof resolve === "function" && resolve(res.data, res.msg);
          }
          // 没有登录状态，强制登录
          else if (res.status === 10) {
            this.doLogin();
          } else {
            typeof reject === "function" && reject(res.msg || res.data);
          }
        },
        error: (err) => {
          // statusText 是 http请求err对象里面的东西
          typeof reject === "function" && reject(err.statusText);
        },
      });
    });
  }

  // 跳转登录
  doLogin() {
    // 跳转到登录也login还需要带上原来的路径部分，用来标记是从哪调过来的
    window.location.href =
      "/login?redirect=" + encodeURIComponent(window.location.pathname);
  }

  // 获取url参数
  getUrlParam(name) {
    // url传参的形式是 xxx.com?param=123&param1=456
    // 先把问号前面的部分去掉，window.location.search就是去掉问号前面的部分（?param=123&param1=456）
    // 然后再用split分割，取数组第二个,就可以把问号去掉（param=123&param1=456）
    let queryString = window.location.search.split("?")[1] || "";
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let result = queryString.match(reg);
    // result的值是 这种形式的 [ 'param=123','', 123, '&' ] 这种形式，把第三个元素返回
    return result ? decodeURIComponent(result[2]) : null;
  }

  // 错误提示
  errorTips(errMsg) {
    alert(errMsg || "好像哪里不对了");
  }

   // 本地存储
   setStorage(name, data){
    let dataType = typeof data;
    // json对象 存储的时候做一个JSON序列化处理
    if(dataType === 'object'){
        window.localStorage.setItem(name, JSON.stringify(data));
    }
    // 基础类型
    else if(['number','string','boolean'].indexOf(dataType) >= 0){
        window.localStorage.setItem(name, data);
    }
    // 其他不支持的类型
    else{
        alert('该类型不能用于本地存储');
    }
}
// 取出本地存储内容
getStorage(name){
    let data = window.localStorage.getItem(name);
    if(data){
        return JSON.parse(data);
    }
    else{
        return '';
    }
}
// 删除本地存储
removeStorage(name){
    window.localStorage.removeItem(name);
}
}

export default MUtil;
