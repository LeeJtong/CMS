// 1、制作饼状图
const setPie = function () {
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
            data: [{
                    value: 40,
                    name: '北京'
                },
                {
                    value: 38,
                    name: '广州'
                },
                {
                    value: 32,
                    name: '上海'
                },
                {
                    value: 30,
                    name: '深圳'
                },
                {
                    value: 28,
                    name: '武汉'
                },
                {
                    value: 26,
                    name: '杭州'
                },
                {
                    value: 22,
                    name: '厦门'
                },
                {
                    value: 18,
                    name: '香港'
                }
            ]
        }]
    }
    myChart.setOption(option)
};
setPie()
// 2、制作折线图
const setLine = function () {
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
            data: ['张三', '李四', '张五', '黄六', '王七', '谢八', ]
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
                data: [10888, 7698, 13111, 9222, 15412, 10241],
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
                data: [8500, 13999, 10011, 13222, 12412, 9241],
            },

        ]
    };
    myChart.setOption(option)
}
setLine()
// 3、制作柱形图
const setBar = function () {
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
            data: ['1', '2', '3', '4', '5', '6', '7', '8'],
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
                data: [83, 57, 90, 78, 66, 76, 77, 87, 69, 92, 88, 78],
                barWidth: '15', //柱宽

            },
            {
                name: '低于60分人数',
                type: 'bar',
                data: [2, 1, 3, 4, 2, 5, 2, 2, 4, 1, 6, 2],
                barWidth: '15',
                yAxisIndex: 1, //以哪个Y轴为准  0代表第一个y轴，1代表第二个Y轴 默认是0
            },
            {
                name: '60到80分之间',
                type: 'bar',
                data: [1, 4, 2, 4, 5, 2, 1, 3, 3, 2, 2, 4],
                barWidth: '15', //柱宽
                yAxisIndex: 1, //以哪个Y轴为准  0代表第一个 默认是0

            },
            {
                name: '高于80分人数',
                type: 'bar',
                data: [3, 2, 1, 5, 1, 2, 3, 4, 5, 2, 2, 4],
                barWidth: '15', //柱宽
                yAxisIndex: 1, //以哪个Y轴为准  0代表第一个 默认是0
            },
        ]
    };
    myChart.setOption(option)
}
setBar()

// 4、制作地图  (借助社区)
const setMap = function () {
    const myChart = echarts.init(document.querySelector('.map'))

    // 位置 + 经纬度
    var chinaGeoCoordMap = {
        "顺义校区": [
            116.4551,
            40.2539
        ],
        "海拉尔区": [
            119.736279,
            49.212189
        ],
        "市中区": [
            116.997777,
            36.651474
        ],
    };
    var chinaDatas = [
        [{
            "name": "海拉尔区",
            "value": 0 //值越大，红点越大
        }],
        [{
            "name": "市中区",
            "value": 0
        }],
    ];

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
setMap()