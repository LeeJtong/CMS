// 全局axios默认值
// axios基地址
axios.defaults.baseURL = 'http://www.itcbc.com:8000'
// axios默认请求路径，添加token认证(但是如果写在这，把不需要身份验证的也进行了一次身份验证)(可以通过请求拦截器)
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('myToken')


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // config包含了很多配置参数，通过辨别，可以从配置参数里面的url字符串做判断，如果包含了/api/，就是登录注册，不需要token令牌验证。否则，需要token令牌验证
    if (!(config.url.includes('/api/'))) {
        // 给config里面添加属性
        config.headers.Authorization = localStorage.getItem('myToken')
    }
    // console.log(config)
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


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

    // 下面是登陆拦截

    // 1、没有登陆的情况下去访问index.html，首先这是不允许的，其次是因为没有登陆没有获取到token，导致身份认证失败
    // 2、token期限到了之后也会导致身份认证失败
    // 总结：以上两种情况称为登陆拦截(身份认证失败那就得默认跳转到登录页)
    // 登陆拦截是在响应拦截器里面做得，可以同时在请求拦截器的error区和响应拦截器的error区同时输出，看看是哪个拦截器进行登陆拦截
    // console.log(222)  //最后输出了222，所以是在响应拦截器
    // 用对象形式输出error
    // console.dir(error)  //error里面有很多属性，其中response属性里面的data属性就是我们要进行判断的
    // if之所以这么写是想更清晰一点，层层判断，当然也可以一步到位，直接检查是否有message
    if (error && error.response && error.response.data && error.response.data.message === '身份认证失败') {
        // 身份认证既然失败了那就需要跳转到登录界面了,而且如果token存在但还是身份认证失败(token有限期到了)那也要销毁token
        // 但不是所有的ajax一旦出现身份认证失败就要跳转的，如果是index.html,那直接跳转，如果是iframe里面的网页出现了失败的情况，那应该是让他的父网页(index.html)跳转
        // 需要加个判断
        // console.log(location) 通过location得知，里面有个href属性，是个字符串，装的是网页的URL信息
        if (location.href.includes('index.html')) {
            location.href = './login.html'
        } else {
            // 其他网页的话让父页面跳转
            window.parent.location.href = './login.html'
        }
        // 销毁无效的token
        localStorage.removeItem('myToken')
    } else {
        // 普通错误，那就直接提示就ok了
        toastr.error(error.response.data.message)
    }
    return Promise.reject(error);
});