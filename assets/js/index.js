/**
 * 侧边导航关闭折叠控制
 */
// 侧边栏打开关闭折叠控制
function toggleSlide() {
  $('.nav > li > a').on('click', function () {
    let childMenu = $(this).next('ul');
    childMenu.slideToggle(400);
    let icon = childMenu.prev().find('.toggle');
    if (icon.hasClass('open')) {
      icon.removeClass('open').addClass('close');
    } else {
      icon.removeClass('close').addClass('open');
    }
  })

  // 默认第一个菜单展开
  $('.nav > li > a').eq(0).trigger('click');

  // 所有子菜单切换时加背景色
  $('.nav ul a').on('click', function () {
    $(this).addClass('active')
    $('.nav ul a').not($(this)).removeClass('active');
  })

}

toggleSlide();

// 需求1 ：退出功能 
const logout = document.querySelector('.logout a')
logout.addEventListener('click', function () {
  // 点击之后弹出对话框   confirm()，返回布尔值
  const out = confirm("确定退出登录？")
  if (out === true) {
    // 确定退出，那就跳转到登录页
    location.href = './login.html'
    // 移除本地存储的token，token后面有实际用处的，但是退出了也要移除。也就是说登陆的时候会给用户发令牌，但是退出了就得收回令牌
    localStorage.removeItem('myToken')
  }
})

// 需求2 ：初始化数据
document.querySelector('.init').addEventListener('click', function () {
  axios({
    method: 'get',
    url: '/init/data',
    // 添加token身份认证，否则请求数据失败
    // headers 即将被发送的自定义请求头
    // 在全局JS文件(common.js)设置了全局token认证之后就可以不用写下面这行代码了。而且不只是请求初始化数据需要身份验证，后面还有很多都需要，但执行的操作都一样，所以放进请求拦截器里面
    /* headers: {
      // Authorization就是一个请求头  专门设置token的
      Authorization: localStorage.getItem('myToken')
    } */
  }).then(({
    data
  }) => {
    // console.log(data)
    if (data.code === 0) {
      // 成功提示
      toastr.success('初始化数据成功')
      // 刷新验证
      location.reload()
    }
  })
})