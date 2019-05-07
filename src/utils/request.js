
function request(obj) {
  // 封装 Promise

  let url = obj.url || '';

  // 配置 基础路径
  url = 'https://www.zhengzhicheng.cn' + url

  let method = obj.method || 'get';
  let data = obj.data || {}
  // 其它参数...

  return new Promise(function (resolve, rejected) {
    mpvue.request({
      url: url,
      method: method,
      data: data,
      success: function (info) {
        resolve(info.data);
      }
    });
  });

}

export default request;
