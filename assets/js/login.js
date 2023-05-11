// 需求1：点击a链接，实现注册登录页面显示隐藏
document.querySelector('.login .row a').addEventListener('click', function () {
    document.querySelector('.login').style.display = 'none'
    document.querySelector('.register').style.display = 'block'
})
document.querySelector('.register .row a').addEventListener('click', function () {
    document.querySelector('.login').style.display = 'block'
    document.querySelector('.register').style.display = 'none'
})


// 需求2：判断内容是否符合标准
// 注册页面的用户名校验 
let reinput = document.querySelector('.register [type="text"]')
// 注册页面的密码校验
let teinput = document.querySelector('.register [type="password"]')
// 登录页面的用户名校验
let loinput = document.querySelector('.login [type="text"]')
// 注册页面的密码校验
let lopwinput = document.querySelector('.login [type="password"]')
// 封装一个input校验
const verify = function (ele, txt1, reg, txt2) {
    ele.addEventListener('keyup', function () {
        // 非空判断
        if (this.value.trim() === '') {
            this.nextElementSibling.style.display = 'block'
            this.nextElementSibling.innerHTML = txt1
            // 如果判断为空，那就要终止后续的代码了，就不需要下面的正则校验了
            return
        } else {
            this.nextElementSibling.style.display = 'none'
        }
        // 长度校验  \S代表非空白字符串
        if (reg.test(this.value.trim())) {
            // 为true  校验正确
            this.nextElementSibling.style.display = 'none'
        } else {
            // false  那就要提示了
            this.nextElementSibling.style.display = 'block'
            this.nextElementSibling.innerHTML = txt2
        }
    })
}
// 调用
verify(reinput, '用户名不能为空', /^[\S]{2,15}$/, '用户长度不能小于2位或者超过15位')
verify(teinput, '密码不能为空', /^[\S]{6,15}$/, '密码长度不能小于6位或超过15位')
verify(loinput, '用户名不能为空', /^[\S]{2,15}$/, '用户长度不能小于2位或者超过15位')
verify(lopwinput, '密码不能为空', /^[\S]{6,15}$/, '密码长度不能小于6位或超过15位')

// 需求3：注册功能(给表单)
const fromReg = document.querySelector('.register form')
fromReg.addEventListener('submit', function (e) {
    e.preventDefault()

    // 发送axios请求
    axios({
        method: 'post',
        url: '/api/register',
        // Content-Type:application/x-www-form-urlencoded,
        // 那数据就应该是a=1&b=2……
        // data: `username=${reinput.value}&password=${teinput.value}`
        /* 
            如果是请求头是JSON类型
            data:{
                username : reinput.value
                password : teinput.value
            }
        */

        // JQ里面有一种更快速简便的方法可以获取form表单里面的input的value
        // data: $(fromReg).serialize()
        data: $(this).serialize()
    }).then(({ //这里也可以把拿到的response里面的data属性进行解构且命名({data:data})(左边的data是response里面的data属性，右边的data是解构的名字),但实际这里是解构后命名为data，因为属性值和属性名同名，简写了
        data
    }) => {
        console.log(data) //0

        // 注册成功，在自己的axios里面，注册失败，在拦截器里面

        // 如果code为0，说明注册成功
        if (data.code === 0) {
            toastr.success(data.message)
            document.querySelector('.register .row a').click()
            // 表单重置
            fromReg.reset()
        }
    })
})

// 需求4 登录功能
const loginform = document.querySelector('.login form')
loginform.addEventListener('submit', function (e) {
    e.preventDefault()
    axios({
        method: 'post',
        url: '/api/login',
        data: `username=${loinput.value}&password=${lopwinput.value}`
    }).then(({
        data
    }) => {
        // console.log(data.token)
        // 注册成功和登录成功，code=0都有各自需要执行的代码。所以没有放入common.js中，而code=1是一样的，所以可以放入拦截器里
        if (data.code === 0) {
            // 成功提示
            toastr.success(data.message)
            // 页面跳转login.js是被引用到login.html的 和index.html同级目录
            // 如果直接跳转，会看不见成功登录的提示，那就开个计时器,1秒后再执行
            setTimeout(function () {
                location.href = './index.html'
            }, 1000)
            // 保存token(后面需要使用)
            localStorage.setItem('myToken', data.token)
        }
    })
})