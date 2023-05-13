// 需求1：页面一旦被打开就要请求数据并且渲染
const scoreList = function () {
    // 发送请求
    axios({
        method: 'get',
        url: '/score/list',
    }).then(({
        data: {
            data,
            code
        }
    }) => {
        // console.log(data)
        if (code === 0) {
            /* // 我们要的数据是一组对象，需要通过数组的形式进行渲染
            let arrData = []
            // console.log(data)

            // 通过对象遍历
            for (let k in data) {
                // console.log(k) //属性名   就是要用的id
                // console.log(data[k]) //属性值  姓名 分数那些
                arrData.push(
                    `
                    <tr>
                        <th scope="row">${k}</th>
                        <td>${data[k].name}</td>
                        <td class="score">${data[k].score[0]}</td>
                        <td class="score">${data[k].score[1]}</td>
                        <td class="score">${data[k].score[2]}</td>
                        <td class="score">${data[k].score[3]}</td>
                        <td class="score">${data[k].score[4]}</td>
                    </tr>
                    `
                )
            }
            // console.log(arrData.join(''))
            document.querySelector('.table tbody').innerHTML = arrData.join('') */


            // Object.values()方法和Object.keys()方法  返回的是数组
            // console.log(Object.values(data))
            // console.log(Object.keys(data))
            let arrData = Object.values(data)
            // console.log(arrData)
            document.querySelector('.table tbody').innerHTML = arrData.map(function (item, index) {
                return `
                <tr>
                    <th scope="row">${Object.keys(data)[index]}</th>
                    <td>${item.name}</td>
                    <td data-id=${Object.keys(data)[index]} data-batch="1" class="score">${item.score[0]}</td>
                    <td data-id=${Object.keys(data)[index]} data-batch="2" class="score">${item.score[1]}</td>
                    <td data-id=${Object.keys(data)[index]} data-batch="3" class="score">${item.score[2]}</td>
                    <td data-id=${Object.keys(data)[index]} data-batch="4" class="score">${item.score[3]}</td>
                    <td data-id=${Object.keys(data)[index]} data-batch="5" class="score">${item.score[4]}</td>
                </tr>
                `
            }).join('')
        }
    })

}
scoreList()

// 需求2:修改学生成绩(td是动态生成的)，事件委托
document.querySelector('tbody').addEventListener('click', function (e) {
    e.preventDefault()
    // 如果点击的不是分数的格子，那后面的代码不执行
    if (!e.target.classList.contains('score')) return
    // console.log(111)
    // 创建一个新的input  因为一点击分数之后需要修改值
    let input = document.createElement('input')
    // 保存值  目的是点击了某个格子之后，能够弹出输入框且输入框显示的就是当前点击元素的分数，如果不执行这一步，点开之后input是空白的，不符合实际情况
    input.value = e.target.innerHTML
    //清空值  如果不清空，那就会双重显示
    e.target.innerHTML = ''
    // 给当前点击的元素追加input输入框
    e.target.appendChild(input)

    // 需求3：如果input失去对焦  那就恢复起初的值
    // 先存好input输入的值
    // let score = input.value
    // 当input失去光标时，
    document.querySelector('input').addEventListener('blur', function () {
        // 这里的e.target是td，当输入框失去焦点后，td显示的就是input的value值(有可能value修改了也可能没修改，反正就显示你最后的input的value)
        e.target.innerHTML = input.value
    })
    // 自动获取光标(从一个input点到另一个input 需要focus)
    input.focus()

    // 需求4：修改成绩 然后提交 需要axios请求
    document.querySelector('input').addEventListener('keyup', function (e) {
        // 如果不是按的回车， 那就不执行后面的代码
        if (e.key !== 'Enter') return
        axios({
            method: 'post',
            // 如果method不写，默认是get请求(因此get请求也可以省去method)
            url: '/score/entry',
            data: {
                // 学生id
                "stu_id": this.parentNode.dataset.id,
                // 第几次
                "batch": this.parentNode.dataset.batch,
                "score": this.value
            }
        }).then(res => {
            console.log(res)
            if (res.data.code === 0) {
                toastr.success(res.data.message)
                // 重新渲染
                scoreList()
            }
        })
    })
})