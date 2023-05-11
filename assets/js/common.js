// axios基地址
axios.defaults.baseURL = 'http://www.itcbc.com:8000'


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log(response)
    // response就相当于then(res)里的res了

    // 如果请求成功但注册失败(用户已存在)，那就弹窗提示错误
    if (response.data.code === 1) {
        toastr.warning(response.data.message)
    }
    return response;
}, function (error) {
    // 对响应错误做点什么  这里的错误应该是指那些红码错误，如404 501这些
    return Promise.reject(error);
});