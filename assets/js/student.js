// 需求1 ：一旦打开就要渲染数据
// 最好封装成一个函数，因为后续还需要渲染
const initStuList = function () {
    axios({
        method: 'get',
        url: '/student/list',
    }).then(res => {
        // console.log(res)
        getRender(res)
    })
    // 渲染函数 
    const getRender = function ({
        data: {
            data
        }
    }) {
        // console.log(data)
        document.querySelector('.table tbody').innerHTML = data.map(item =>
            // console.log(item)
            `
        <tr>
            <th scope="row">${item.id}</th>
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.sex}</td>
            <td>${item.group}</td>
            <td>${item.phone}</td>
            <td>${item.salary}</td>
            <td>${item.truesalary}</td>
            <td>${item.province}${item.city}${item.county}</td>
            <td>
                <button type="button" class="update btn btn-primary btn-sm" data-bs-toggle="modal"
                data-bs-target="#updateModal" data-id=${item.id}>修改</button>
                <button type="button" class="delete btn btn-danger btn-sm" data-id=${item.id}>删除</button>
            </td>
        </tr>
        `
        ).join('')
    }
}
initStuList()


// 需求2：学员信息模块点击删除  删除学员信息 (动态生成的  需要事件委托)
const deleteStuMsg = function () {
    document.querySelector('.table tbody').addEventListener('click', function (e) {
        // if(!e.target.className.indexof('delete' !== -1)) return  //不等于-1说明包含了
        if (!e.target.classList.contains("delete")) return
        //这么写的目的是排除，如果当前点击的元素没有delete类名(此时为false)，说明点的就不是删除按钮，那后续的代码就不执行了(false取反，让if条件为真才会执行return)。 这么写可以省去很多if嵌套

        let re = window.confirm("您确定要删除吗？") //true or false 点击确定为true  点击取消为false
        if (!re) return //如果弹窗之后选择了取消(此时为false)，那说明用户不想删除，那后续代码就不用执行了(false取反，让if条件为真才会执行return) 这么写可以省去很多if嵌套

        // 获取自定义属性的id值
        const id = e.target.dataset.id
        // const id = e.target.getAttribute('data-id')
        axios({
            method: 'delete',
            url: '/student/delete',
            // params:传递查询参数   data:传递请求参数
            params: {
                id,
            }
        }).then(({
            data: { //response里面有data属性，data属性里面还有code属性和message属性
                code,
                message
            }
        }) => {
            if (code === 0) {
                toastr.success(message)
                // 删除成功后重新渲染页面
                initStuList()
            }
        })


    })
}
deleteStuMsg()

// 需求3 添加学员里面的籍贯(省市县联动)

// 但是后面的"修改"也一样要去获取“省”的信息，所以可以封装一个函数，通过传参(传表单)就可以了，form.querySelector在form表单里面找dom元素
const initProvince = function (form) {
    // "省"的渲染
    axios({
        method: 'get',
        url: '/geo/province',

    }).then(res => {
        // console.log(res)
        form.querySelector('[name="province"]').innerHTML += res.data.map(item =>
            // value值也要写上，因为后面需要通过这个value给到select，让select知道选择了哪个市，这样后面才会显示出该市的区，一样的后面的区也要将value只写上，这样才能选到该区的县
            ` <option value='${item}'>${item}</option>`
        ).join('')
        // 但是这样写完的话，会把--省--给覆盖掉了，有两种解决方式，一种是在innerHTML后面写成+=  就是在原本的基础上进行内容的追加
    })

    // "市"的渲染 当省发生变动的时候，就要发出axios请求，然后渲染：市 所以要给省注册改变事件
    form.querySelector('[name="province"]').addEventListener('change', function () {
        axios({
            method: 'get',
            url: '/geo/city',
            params: {
                pname: this.value
            }
        }).then(res => {
            // 先清空的目的是避免用户在form表单里面多次改变省市县的值，如果不清空，就会遗留上一次用户选择的某个省里面的某个市
            form.querySelector('[name="city"]').innerHTML = ''
            // 清完空后再补充  而且当省一旦在同一事件里面发生多次变动的时候，那市和县的选项框应该都改回--市--和--县--
            form.querySelector('[name="city"]').innerHTML = `<option value=''>--市--</option>`
            form.querySelector('[name="county"]').innerHTML = `<option value=''>--县--</option>`
            form.querySelector('[name="city"]').innerHTML += res.data.map(item => `
            <option value='${item}'>${item}</option>`).join('')
        })
    })

    // "县"的渲染  当市发生变动的时候，就要发出axios请求，然后渲染  给市注册改变事件
    form.querySelector('[name="city"]').addEventListener('change', function () {
        axios({
            method: 'get',
            url: '/geo/county',
            params: {
                pname: form.querySelector('[name="province"]').value,
                cname: this.value
            }
        }).then(res => {
            // 先清空的目的是避免用户在form表单里面多次改变省市县的值,如果不清空，就会遗留上一次用户选择的某个市里面的某个县
            form.querySelector('[name="county"]').innerHTML = ''
            form.querySelector('[name="county"]').innerHTML = `<option value=''>--县--</option>`
            form.querySelector('[name="county"]').innerHTML += res.data.map(item => `
            <option value='${item}'>${item}</option>`).join('')
        })
    })


}
// 调用
// 添加(获取添加的form表单然后传参进去)
initProvince(document.querySelector('.add-form'))
// 修改(获取修改的form表单然后传参进去)
initProvince(document.querySelector('.update-form'))

// 需求4  添加学员模块，点击确认添加按钮，进行数据添加
// 给添加表单绑定提交事件
document.querySelector('#addModal .add-form').addEventListener('submit', function (e) {
    e.preventDefault()
    // 发送axios请求
    axios({
        url: '/student/add',
        method: 'post',
        data: $(this).serialize()
    }).then(({
        data: {
            code,
            message
        }
    }) => {
        if (code === 0) {
            toastr.success("恭喜您，添加信息成功")
            document.querySelector('#addModal .btn-close').click()
            initStuList()
        }
    })
})

// 需求5  点击修改按钮，给弹出的修改框渲染上该学员的所有信息 (修改按钮是动态生成的，需要事件委托)
document.querySelector('tbody').addEventListener('click', function (e) {
    // 如果点击的不是修改按钮，那后续的代码就不执行了
    if (!e.target.classList.contains('update')) return
    // 如果是，那就要获取id然后axios传参
    let id = e.target.dataset.id
    axios({
        method: 'get',
        url: '/student/one',
        params: {
            id: id,
        }
    }).then(({
        data: {
            code,
            data
        }
    }) => {
        // console.log(data)
        if (code === 0) {
            // 姓名 年龄 手机 薪资
            document.querySelector('.update-form [name="name"]').value = data.name
            document.querySelector('.update-form [name="age"]').value = data.age
            document.querySelector('.update-form [name="phone"]').value = data.phone
            document.querySelector('.update-form [name="salary"]').value = data.salary
            document.querySelector('.update-form [name="truesalary"]').value = data.truesalary

            // 性别
            // 思路: 获取所有的radio属性的标签，然后检索他们的值是否和服务器请求回来的值一样，一样，就checked
            let sex = document.querySelectorAll('.update-form [name="sex"]')
            // 获取到了“男”和“女”两个标签，然后里面都有value值
            // console.log(sex)
            // <input class="form-check-input" type="radio" name="sex" value="男" checked="" checked>
            // <input class="form-check-input" type="radio" name="sex" value="女" checked="">
            // 将sex遍历，当遍历到dom元素的value值和axios请求返回的数据是一样的时候，就让这个dom元素被勾上
            for (let i = 0; i < sex.length; i++) {
                if (sex[i].value === data.sex) {
                    sex[i].checked = true
                }
            }

            // 组号
            // 思路和性别的思路一样
            let opt = document.querySelectorAll('.update-form [name="group"] option')
            // console.log(opt[1].value)
            for (let i = 0; i < opt.length; i++) {
                // 这里双等于就可以了，不能是全等于，因为有一个是字符串类型 有一个是num类型
                if (opt[i].value == data.group) {
                    opt[i].selected = true
                }
            }

            // 省市县
            document.querySelector('.update-form [name="province"]').value = data.province
            // 实际工作要求发送ajax渲染，此处简单实现
            let str1 = `<option selected value="${data.city}">${data.city}</option>`
            document.querySelector('.update-form [name="city"]').innerHTML = str1
            let str2 = `<option selected value="${data.county}">${data.county}</option>`
            document.querySelector('.update-form [name="county"]').innerHTML = str2
            // 隐藏域处理id修改需要id
            document.querySelector('.update-form [name="id"]').value = data.id
        }
    })
})

// 需求6:修改完成后，表单提交 同时需要更改页面的数据
document.querySelector('.update-form').addEventListener('submit', function (e) {
    e.preventDefault()
    axios({
        url: '/student/update',
        method: 'put',
        // JQ里的一个方法，将input表单里面的所有数据收集后当参数
        data: $(this).serialize()
    }).then(({
        data: {
            code,
            message
        }
    }) => {
        //成功回调
        // console.log(data)
        if (code === 0) {
            toastr.success(message)
            document.querySelector('#updateModal .btn-close').click()
            initStuList()
        }
    })
})