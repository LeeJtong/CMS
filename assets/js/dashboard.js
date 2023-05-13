// 1、制作饼状图
const setPie = function (setPieData) {
    let myChart = echarts.init(document.querySelector('.pie'))
    let option = {
        //圆例组件删除
        // 工具栏组件删除

        // 提示框
        tooltip: {
            // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
            // formatter: '各地学员分布 <br> 江苏省<b>7</b>人 占比12.5%',
            formatter: '{a} <br> {b}<b>{c}</b>人 占比{d}%',
        },

        //添加标题
        title: {
            text: '籍贯 Hometown',
            textStyle: {
                color: '#6d767e' // 标题演示
            },
        },
        series: [{
            name: '各地学员分布',
            type: 'pie',
            // 圆形半径  内圆和外圆
            radius: ['20%', '75%'],
            // 圆心位置
            center: ['50%', '50%'],
            // 面积模式(area)或者半径模式(radius)  这个由项目经理说了算
            roseType: 'radius',
            itemStyle: {
                // 圆角大小
                borderRadius: 4
            },
            // 数据
            data: setPieData
        }]
    }
    myChart.setOption(option)
};
setPie()
// 2、制作折线图
const setLine = function (setLineData) {
    // console.log(setLineData)
    const myChart = echarts.init(document.querySelector('.line'))
    let option = {
        // 提示框 不用改
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        // 新增图例组件
        legend: {
            top: 20,
        },
        // 标题
        title: {
            text: '薪资 Salary',
            textStyle: {
                color: '#6d767e',
            }
        },
        xAxis: {
            type: 'category', //类别
            boundaryGap: false, //两侧是否留白
            data: setLineData.name
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'] //数组，表示X与Y，Y轴就会影响最大值了。
            // 而X为0表示可以贴紧最左边  一般Y为50%就够了
        },

        // 缩放组件(滑动条)
        dataZoom: [{
            // slider只能通过拖动滑动条就缩放,不能通过鼠标滚轮(默认值)
            // inside既可以通过滚轮也可以通过拖动,inside还得设置多一个起始和结束位置的值
            type: 'inside',
            // start和end是滚动条开始位置和结束位置
            start: 0,
            end: 50,
        }, {
            start: 0,
            end: 50,
        }],

        series: [{
                name: '期待薪资',
                type: 'line',
                //转折点圆滑
                smooth: true,
                // 要不要点
                symbol: 'rect',
                itemStyle: {
                    color: 'rgb(255, 70, 131)'
                },
                data: setLineData.salary,
            },
            {
                name: '实际薪资',
                type: 'line',
                smooth: true, //丝滑
                // 线上要不要点
                symbol: 'rect',
                itemStyle: {
                    color: '#5470c6'
                },
                data: setLineData.truesalary,
            },

        ]
    };
    myChart.setOption(option)
}
// setLine()
// 3、制作柱形图
const setBar = function (setBarData) {
    // console.log(setBarData)
    let myChart = echarts.init(document.querySelector('.barChart'))
    let option = {
        // 网格（整个图表区域设置）
        grid: {
            top: 30,
            bottom: 30,
            left: '7%',
            right: '7%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross', //十字标线，但是有了x轴的阴影就会变得不明显
                crossStyle: {
                    color: '#999' //十字标线的颜色
                }
            }
        },
        //图例组件
        legend: {},
        xAxis: [{
            type: 'category',
            data: setBarData.group,
            axisPointer: {
                type: 'shadow' //鼠标放到x轴元素上，出现阴影
            }
        }],
        yAxis: [{
                type: 'value',
                min: 0, //最小值
                max: 100, //最大值
                interval: 10, //间隔
                axisLabel: {
                    formatter: '{value}分' //显示内容格式化
                }
            },
            {
                type: 'value',
                min: 0,
                max: 10,
                interval: 1,
                axisLabel: {
                    formatter: '{value}人' //显示内容格式化
                }
            }
        ],
        series: [{
                name: '平均分',
                type: 'bar',
                data: setBarData.avgScore,
                barWidth: '15', //柱宽

            },
            {
                name: '低于60分人数',
                type: 'bar',
                data: setBarData.lt60,
                barWidth: '15',
                yAxisIndex: 1, //以哪个Y轴为准  0代表第一个y轴，1代表第二个Y轴 默认是0
            },
            {
                name: '60到80分之间',
                type: 'bar',
                data: setBarData.gt60,
                barWidth: '15', //柱宽
                yAxisIndex: 1, //以哪个Y轴为准  0代表第一个 默认是0

            },
            {
                name: '高于80分人数',
                type: 'bar',
                data: setBarData.gt80,
                barWidth: '15', //柱宽
                yAxisIndex: 1, //以哪个Y轴为准  0代表第一个 默认是0
            },
        ]
    };
    myChart.setOption(option)
}
// axios请求之后调用了，不用一开始就调用了
// setBar()

// 4、制作地图  (借助社区)
const setMap = function (a, b) {
    const myChart = echarts.init(document.querySelector('.map'))

    // 位置 + 经纬度
    var chinaGeoCoordMap = a
    var chinaDatas = b

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = chinaGeoCoordMap[dataItem[0].name];
            var toCoord = [116.4551, 40.2539]; // 目标点经纬度（北京顺义校区）
            if (fromCoord && toCoord) {
                res.push([{
                    coord: fromCoord,
                    value: dataItem[0].value
                }, {
                    coord: toCoord,
                }]);
            }
        }
        return res;
    };
    var series = [];
    [
        ['顺义校区', chinaDatas]
    ].forEach(function (item, i) {
        series.push({
                type: 'lines',
                zlevel: 2,
                effect: {
                    show: true,
                    period: 4, //箭头指向速度，值越小速度越快
                    trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                    symbol: 'arrow', //箭头图标
                    symbolSize: 5, //图标大小
                },
                lineStyle: {
                    normal: {
                        width: 1, //尾迹线条宽度
                        opacity: 1, //尾迹线条透明度
                        curveness: 0.2 //尾迹线条曲直度
                    }
                },
                data: convertData(item[1])
            }, {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: { //涟漪特效
                    period: 4, //动画时间，值越小速度越快
                    brushType: 'stroke', //波纹绘制方式 stroke, fill
                    scale: 4 //波纹圆环最大限制，值越大波纹越大
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right', //显示位置
                        offset: [5, 0], //偏移设置
                        formatter: function (params) { //圆环显示文字
                            return params.data.name;
                        },
                        fontSize: 12
                    },
                    emphasis: {
                        show: true
                    }
                },
                symbol: 'circle',
                symbolSize: function (val) {
                    return 4 + val[2] * 5; //圆环大小
                },
                itemStyle: {
                    normal: {
                        show: false,
                        color: '#f00'
                    }
                },
                data: item[1].map(function (dataItem) {
                    return {
                        name: dataItem[0].name,
                        value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                    };
                }),
            },
            //被攻击点
            {
                type: 'scatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    period: 4,
                    brushType: 'stroke',
                    scale: 4
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        offset: [5, 0],
                        color: '#9eca7f', // 目标点文字颜色
                        formatter: '{b}',
                        textStyle: {
                            color: "#9eca7f"
                        }
                    },
                    emphasis: {
                        show: true,
                        color: "#f60", // 目标点鼠标移入的颜色
                    }
                },
                symbol: 'pin',
                symbolSize: 50,
                data: [{
                    name: item[0],
                    value: chinaGeoCoordMap[item[0]].concat([10]),
                }],
            }
        );
    });

    let option = {
        title: {
            text: '来京路线 From',
            textStyle: {
                color: '#6d767e'
            }
        },
        // tooltip: {
        //   trigger: 'item',
        //   backgroundColor: 'rgba(166, 200, 76, 0.82)',
        //   borderColor: '#FFFFCC',
        //   showDelay: 0,
        //   hideDelay: 0,
        //   enterable: true,
        //   transitionDuration: 0,
        //   extraCssText: 'z-index:100',
        //   formatter: function (params, ticket, callback) {
        //     //根据业务自己拓展要显示的内容
        //     var res = "";
        //     var name = params.name;
        //     var value = params.value[params.seriesIndex + 1];
        //     res = "<span style='color:#fff;'>" + name + "</span><br/>数据：" + value;
        //     return res;
        //   }
        // },
        // backgroundColor: "#013954",
        // visualMap: { //图例值控制
        //   min: 0,
        //   max: 1,
        //   calculable: true,
        //   show: false,
        //   color: ['#f44336', '#fc9700', '#ffde00', '#ffde00', '#00eaff'],
        //   textStyle: {
        //     color: '#fff'
        //   }
        // },
        geo: {
            map: 'china',
            zoom: 1.2,
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true, //是否允许缩放
            itemStyle: {
                normal: {
                    // color: 'rgba(51, 69, 89, .5)', //地图背景色
                    // color: '#5a6fc0', //地图背景色
                    // borderColor: '#516a89', //省市边界线00fcff 516a89
                    borderWidth: 1
                },
                emphasis: {
                    color: 'rgba(37, 43, 61, .5)' //悬浮背景
                }
            }
        },
        series: series
    };

    myChart.setOption(option)
}
// setMap()

// 5、dashboard页面班级信息数据渲染，页面一加载就要发送请求
axios({
    method: 'get',
    url: '/student/overview',
    // dashboard发送请求的时候是需要token验证的，但是在common.js写了
}).then(res => {
    // console.log(res.data)
    if (res.data.code === 0) {
        getRender(res.data.data)
    }
})
const getRender = function (data) {
    document.querySelector('.total').innerHTML = data.total
    document.querySelector('.avgSalary').innerHTML = data.avgSalary
    document.querySelector('.avgAge').innerHTML = data.avgAge
    document.querySelector('.proportion').innerHTML = data.proportion
}

// 6、成绩模块的更多按钮的显示与隐藏
let flag = true //节流阀
document.querySelector('.icon-youcecaidan').addEventListener('click', function () {
    if (flag) {
        document.querySelector('#batch').style.display = 'block'
    } else {
        document.querySelector('#batch').style.display = 'none'
    }
    flag = !flag
})

// 7、给成绩模块的更多按钮的每个小li绑定事件
// 因为待会的axios请求数据需要传参，传的是第几次的值，所以可以利用querySelectorAll生成数组，利用数组索引号加1
const lis = document.querySelectorAll('#batch>li>a') //伪数组
// 伪数组转真
// const liss = Array.from(lis)
const liss = [...lis]

// console.log(liss)
liss.forEach(function (item, index) {
    // 第一个item对应的index是0
    item.addEventListener('click', function () {
        let batch = index + 1
        // console.log(batch)
        // 发送ajax  获取指定次数的成绩
        axios({
            method: 'get',
            url: '/score/batch',
            params: {
                batch, //batch:batch   对象解构 简写
            }
        }).then(({
            data //{data:data} 提取res里面的data属性并且命名为data
        }) => {
            // console.log(data)
            // console.log(data.data)
            if (data.code === 0) {
                // toastr.success(data.message)
                setBar(data.data)
            }
        })
    })
})
// 默认一打开页面就显示第一次的成绩，而且要写在绑定事件之后，因为绑定事件之后再点击，才会触发axios。如果写在绑定事件之前，那点击了之后相当于白点，因为在绑定事件之前没有任何事件操作
liss[0].click()

// 8、薪资折线图 地图  饼图的制作(来源于同一接口)
axios({
    method: 'get',
    // 如果method不写，默认是get请求(因此get请求也可以省去method)
    url: '/student/list',
}).then(({
    // 解构再解构
    data: {
        code,
        data
    }
}) => {
    if (code === 0) {
        // console.log(data)
        // let newData = data.data

        // 1. 折线图数据(要传给折线图，需要三个数组。但axios请求回来的是数组对象，需要处理)
        let lineData = {
            name: [],
            // 期望薪资
            salary: [],
            // 实际薪资 
            truesalary: [],
        }

        // 2、饼图数据(从上面的数据可知，饼图数据是一个数组对象)
        // 数组中的元素是： {value: 40,name: '北京'}
        let pieData = []

        // 3、地图数据(从上面的数据可知，地图数据需要两组，一组是对象里面包着数组，一组是数组里面包着数组(二维数组)，而数组还包着对象)
        // 第一组：let mapData1 = {"顺义校区":[116.4551,40.2539],"海拉尔区":[116.4551,40.2539]}  各个地区  需要设置一个默认的目的地  而这里就是顺义校区  所以可以直接给第一个参数写死数据
        // 第二组：let mapData2 = [[{"name":"海拉尔区","value":0}],[{"name":"市中区","value":0}]]
        let mapData1 = {
            "顺义校区": [116.4551, 40.2539]
        }
        let mapData2 = [
            /* [{
                "name": "海拉尔区",
                "value": 0
            }],
            [{
                "name": "市中区",
                "value": 0
            }] */
        ]


        // 开始遍历
        // console.log(data)
        // data是数组对象，item就是数组元素，也就是对象。
        data.forEach(item => {
            // console.log(item.name)
            //  1.1折线图数据 数组追加
            lineData.name.push(item.name)
            lineData.salary.push(item.salary)
            lineData.truesalary.push(item.truesalary)

            // 2.1 饼图  根据学员所在省份生成一个一个的对象，name省份，value是多少人
            //   *思路————首先，通过饼图设计的数据可知，他的数据格式应该是一个数组对象[{value: 40,name: '北京'},{value: 40,name: '北京'}]，因此我们先声明一个空数组pieData(501行)，然后要进行判断，默认情况下，数组是为空的，但是如果后续数据的话，那就要判断axios请求回来的数据的province值(也就是省份)是否已经存在数组里面。比如说，数组里面有个元素是{value: 40,name: '北京'}，那么后续还有axios请求回来的数据的province值为"北京"的话，那就不是新增数组元素了，而是这个元素的value值++。怎么判断呢？可以通过数组的findIndex()，判断条件是：如果数组里面的元素(对象)的name属性===axios请求返回的数据的province属性，说明这个省份已经在数组里面了，同时findIndex就会给我们返回这个省份在数组里面的索引号，那么就可以通过这个索引号找到这个元素的value然后进行自增。如果数组里面的元素(对象)的name属性!==axios请求返回的数据的province属性，那么findIndex就会给我们返回一个-1的值，所以，如果index===-1，说明这个省份还没在数组里面，那就可以给数组追加元素了(value起始值为1)：peiData.push({value:1，name:item.province})

            // 这里的ele就是数组pieData的元素(也就是对象)
            let index = pieData.findIndex(function (ele) {
                return ele.name === item.province //findIndex的判断条件  要么返回-1  要么返回数组元素的索引号
            })
            // 如果index是-1，说明数组里面的元素(对象)的name属性并不存在从axios返回来的province值(就是省份并不在数组里面)
            if (index === -1) {
                // 不存在那就要追加数组元素(对象)
                pieData.push({
                    value: 1,
                    name: item.province
                })
            } else {
                // 否则(返回的index就是索引号)(就是省份已经在数组里面了，那就通过这个index给这个元素的value自增)
                pieData[index].value++
            }
            // 简单总结，就是要拿到索引号，通过Index，如果Index=-1，新增数组元素，如果是索引号，那就给这个索引号的value属性自增

            // 3.1 地图
            // 第一个参数  let mapData1 = {"顺义校区":[116.4551,40.2539]}
            // 这里不能用.形式来给mapData1进行属性的追加，因为要解析变量名   mapData1.item.county这么写肯定报错
            // console.log(item.county)
            // 给对象添加属性和值
            mapData1[item.county] = [item.jing, item.wei]

            // 第二个参数 let mapData2 = [ [{"name":"海拉尔区","value":0}],[{"name":"市中区","value":0}] ]
            // 思路：和上边一样，要判断从axios取回来的county属性是否已经在二维数组里面的name属性了
            // 可以先给mapData2写死数据，看看里面要怎么获取name属性
            // mapData2.forEach(function (item) {
            // console.log(item)
            //这里的item就是mapData2里面的数组元素[{"name":"海拉尔区","value":0}],[{"name":"市中区","value":0}]
            // console.log(item[0])
            //这里获取到的是二维数组里面的对象{name: '海拉尔区', value: 0},{name: '市中区', value: 0}
            // 这里是需要写索引号0的，因为对象在数组里面就只有1个，如果不写上0，后续如果写成item.name那是错的，item是数组，没有name属性
            // console.log(item[0].name) //这个就是二维数组里面的name属性了
            // })

            // 设置判断条件：如果二维数组里面的name属性 === axios请求回来的数据的county属性，那就返回索引号，给这个索引号的value++。否则返回-1，然后新增数组元素
            // e : [{"name":"海拉尔区","value":0}]
            // e[0] :{"name":"海拉尔区","value":0}
            // e[0].name : 海拉尔区
            let i = mapData2.findIndex(e => e[0].name === item.county)
            if (i === -1) {
                mapData2.push([{
                    name: item.county,
                    value: 1
                }])
            } else {
                // 数组中已存在某个元素，获取value值++   mapData[i][0]代表的是对象
                // [ [{"name":"海拉尔区","value":0}], [{"name":"海区","value":0}] ]
                // i和0不要颠倒了 以上一行数据为例子，如果i是1，那就先找到了[{"name":"海区","value":0}]，然后后面还有[0]，那就找到了{"name":"海区","value":0}
                // 如果0和i颠倒了，那就一直再给mapData2里面的第一个元素进行修改，那就错了
                mapData2[i][0].value++
            }
        })

        // 传送数据进行渲染
        setLine(lineData)
        setPie(pieData)
        // console.log(pieData)
        // console.log(mapData1)
        // console.log(mapData2)
        setMap(mapData1, mapData2)

    }
})