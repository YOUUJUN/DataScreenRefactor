<template>
    <div class="card-body-inner">
        <div class="fingernail-wrap">
            <div class="fingernail bg1">
                <div class="fingernail-top">{{fingernailData.people_count}}</div>
                <div class="fingernail-bottom">老人总数</div>
            </div>

            <div class="fingernail bg2">
                <div class="fingernail-top">{{fingernailData.nursing_count}}</div>
                <div class="fingernail-bottom">护工人数</div>
            </div>

            <div class="fingernail bg3">
                <div class="fingernail-top">{{fingernailData.bed_count}}</div>
                <div class="fingernail-bottom">床位数</div>
            </div>

            <div class="fingernail bg4">
                <div class="fingernail-top">{{fingernailData.rate}}</div>
                <div class="fingernail-bottom">入住率</div>
            </div>
        </div>

        <div class="chart-wrap">
            <div id="chart-left" ref="leftTopChart1"></div>

            <div id="chart-right" ref="leftTopChart2"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fingernailData : {},
        };
    },

    created(){
        let {people_count, nursing_count, bed_count, rate} = box1;
        this.fingernailData = Object.assign({}, {
            people_count,
            nursing_count,
            bed_count,
            rate,
        })
    },

    mounted() {
        this.initMenChart();
        this.initWomenChart();
    },

    methods: {
        initMenChart() {
            let chartShell = this.$refs.leftTopChart1;
            //初始化echarts实例
            let myChart = this.$echarts.init(
                chartShell
            );
            //指定图表配置项和数据
            let getmax = 100;
            //要改变的数据
            let getvalue = box1.male_rate;
            let option = {
                //  backgroundColor:'#132A7F',
                tooltip: {
                    trigger: "item",
                    padding: 0,
                    borderColor: "#02A6FF",
                    backgroundColor: "rgba(18, 56, 95, 0.8)",
                    formatter: function (params) {
                        let str = `<div style="padding:5px 10px 5px 10px;">
                        <div style="color:#02A6FF;font-size:12px;display:flex;justify-content:center;align-items:center;">
                        <span style="margin-right:10px;">男</span>
                        <span style="color:#A3CCFA;">${params.value}</span>
                        </div>
                        </div>`;
                        return str;
                    },
                },
                grid: {
                    top: 0,
                    bottom: 0,
                    width:'100%',
                    height:'100%',
                },
                angleAxis: {
                    show: false,
                    max: (getmax * 360) / 220, //-45度到225度，二者偏移值是270度除360度
                    type: "value",
                    startAngle: 200, //极坐标初始角度
                    splitLine: {
                        show: false,
                    },
                },
                barMaxWidth: 15, //圆环宽度
                radiusAxis: {
                    show: false,
                    type: "category",
                },
                //圆环位置和大小
                polar: {
                    // center: ['50%', '50%'],
                    radius: "130%",
                },

                series: [
                    {
                        type: "bar",
                        data: [
                            {
                                //上层圆环，显示数据
                                value: getvalue,
                                itemStyle: {
                                    // color: '#2AD2FB',//显示上面在颜色
                                    normal: {
                                        color: new this.$echarts.graphic.LinearGradient(
                                            0,
                                            0,
                                            0,
                                            1,
                                            [
                                                {
                                                    offset: 0,
                                                    color: "#02FFDE",
                                                },
                                                {
                                                    offset: 1,
                                                    color: "#53A4FF",
                                                },
                                            ]
                                        ),
                                    },
                                },
                            },
                        ],
                        barGap: "-100%", //柱间距离,上下两层圆环重合
                        coordinateSystem: "polar",
                        roundCap: false, //顶端圆角
                        z: 3, //圆环层级，同zindex
                    },
                    {
                        //下层圆环，显示最大值
                        type: "bar",
                        data: [
                            {
                                value: getmax,
                                itemStyle: {
                                    color: "rgba(8, 33, 60, 0.8)",
                                    opacity: 1,
                                    borderWidth: 0,
                                },
                            },
                        ],
                        barGap: "-100%",
                        coordinateSystem: "polar",
                        roundCap: false,
                        z: 1,
                    },
                    //仪表盘
                    {
                        type: "gauge",
                        startAngle: 210, //起始角度，同极坐标
                        endAngle: -30, //终止角度，同极坐标
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        // axisLabel: {
                        //     show: false,
                        // },
                        axisLabel: {
                            distance: -30,
                            show: true,
                            formatter: function (value) {
                                if (value === 0 || value === 100) {
                                    return value + "%";
                                }
                                return "";
                            },
                            lineHeight: -30,
                            fontSize: 10,
                            color: "#ffffff",
                        },
                        splitLabel: {
                            show: false,
                        },
                        pointer: {
                            // 分隔线
                            // shadowColor: 'auto', //默认透明
                            shadowBlur: 5,
                            length: "50%",
                            width: "2",
                            show: false,
                        },
                        itemStyle: {
                            // color: '#1598FF',
                            borderColor: "red",
                            borderWidth: 6,
                        },
                        detail: {
                            // formatter: function (params) {
                            //     // return '完成率\n'+getvalue + '%';
                            //     return `{number|${getvalue + '%'}}`;
                            // },
                            formatter: [
                                `{number|${getvalue + "%"}}`,
                                "{a|男}",
                            ].join("\n"),
                            rich: {
                                a: {
                                    color: "#2AD9E4",
                                    fontSize: 12,
                                    padding: [55, 10, 30, 0],
                                },
                                number: {
                                    fontSize: 16,
                                    padding: [60, 10, 30, 0],
                                    // textAlign: 'center',
                                },
                                wcl: {
                                    fontSize: 16,
                                    textAlign: "center",
                                },
                            },
                            color: "#fff",
                            lineHeight: 30,
                            offsetCenter: ["5", "0"],
                        },
                        title: {
                            show: false,
                        },
                        data: [
                            {
                                value: getvalue,
                            },
                        ],
                    },
                ],
            };
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        },

        initWomenChart() {
            let chartShell = this.$refs.leftTopChart2;
            //初始化echarts实例
            let myChart = this.$echarts.init(chartShell);
            //指定图表配置项和数据
            let getmax = 100;
            //要改变的数据
            let getvalue = box1.female_rate;
            let option = {
                //  backgroundColor:'#132A7F',
                tooltip: {
                    trigger: "item",
                    padding: 0,
                    borderColor: "#02A6FF",
                    backgroundColor: "rgba(18, 56, 95, 0.8)",
                    formatter: function (params) {
                        let str = `<div style="padding:5px 10px 5px 10px;">
                        <div style="color:#02A6FF;font-size:12px;display:flex;justify-content:center;align-items:center;">
                        <span style="margin-right:10px;">女</span>
                        <span style="color:#A3CCFA;">${params.value}</span>
                        </div>
                        </div>`;
                        return str;
                    },
                },
                grid: {
                    top: 0,
                    bottom: 0,
                    width:'100%',
                    height:'100%',
                },
                angleAxis: {
                    show: false,
                    max: (getmax * 360) / 220, //-45度到225度，二者偏移值是270度除360度
                    type: "value",
                    startAngle: 200, //极坐标初始角度
                    splitLine: {
                        show: false,
                    },
                },
                barMaxWidth: 15, //圆环宽度
                radiusAxis: {
                    show: false,
                    type: "category",
                },
                //圆环位置和大小
                polar: {
                    // center: ['50%', '50%'],
                    radius: "130%",
                },

                series: [
                    {
                        type: "bar",
                        data: [
                            {
                                //上层圆环，显示数据
                                value: getvalue,
                                itemStyle: {
                                    // color: '#2AD2FB',//显示上面在颜色
                                    normal: {
                                        color: new this.$echarts.graphic.LinearGradient(
                                            0,
                                            0,
                                            0,
                                            1,
                                            [
                                                {
                                                    offset: 0,
                                                    color: "rgba(255, 215, 37, 1)",
                                                },
                                                {
                                                    offset: 1,
                                                    color: "rgba(255, 114, 0, 1)",
                                                },
                                            ]
                                        ),
                                    },
                                },
                            },
                        ],
                        barGap: "-100%", //柱间距离,上下两层圆环重合
                        coordinateSystem: "polar",
                        roundCap: false, //顶端圆角
                        z: 3, //圆环层级，同zindex
                    },
                    {
                        //下层圆环，显示最大值
                        type: "bar",
                        data: [
                            {
                                value: getmax,
                                itemStyle: {
                                    color: "rgba(8, 33, 60, 0.8)",
                                    opacity: 1,
                                    borderWidth: 0,
                                },
                            },
                        ],
                        barGap: "-100%",
                        coordinateSystem: "polar",
                        roundCap: false,
                        z: 1,
                    },
                    //仪表盘
                    {
                        type: "gauge",
                        startAngle: 210, //起始角度，同极坐标
                        endAngle: -30, //终止角度，同极坐标
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            distance: -30,
                            show: true,
                            formatter: function (value) {
                                if (value === 0 || value === 100) {
                                    return value + "%";
                                }
                                return "";
                            },
                            lineHeight: -30,
                            fontSize: 10,
                            color: "#ffffff",
                        },
                        splitLabel: {
                            show: false,
                        },
                        pointer: {
                            // 分隔线
                            // shadowColor: 'auto', //默认透明
                            shadowBlur: 5,
                            length: "50%",
                            width: "2",
                            show: false,
                        },
                        itemStyle: {
                            // color: '#1598FF',
                            borderColor: "red",
                            borderWidth: 6,
                        },
                        detail: {
                            formatter: [
                                `{number|${getvalue + "%"}}`,
                                "{a|女}",
                            ].join("\n"),
                            rich: {
                                a: {
                                    color: "#FFD725",
                                    fontSize: 12,
                                    padding: [55, 10, 30, 0],
                                },
                                number: {
                                    fontSize: 16,
                                    padding: [60, 0, 30, 0],
                                    // textAlign: 'center',
                                },
                                wcl: {
                                    fontSize: 16,
                                    textAlign: "center",
                                },
                            },
                            color: "#0EFCFF",
                            lineHeight: 30,
                            offsetCenter: ["0", "0"],
                        },
                        title: {
                            show: false,
                        },
                        data: [
                            {
                                value: getvalue,
                            },
                        ],
                    },
                ],
            };
            myChart.setOption(option);

            // 使用指定的配置项和数据显示图表。
            myChart.setOption(option);

            window.addEventListener("resize", function () {
                myChart.resize();
            });
        },
    },
};
</script>

<style scoped>
.card-body-inner {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    height: 100%;
}

.fingernail-wrap {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 1.3875rem;
    margin-top: .14rem;
}

.fingernail {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 1.3rem;
    height: 100%;
}

.fingernail.bg1 {
    background: url("~@/static/Cut-diagram/laorzonsu.png");
    background-size: 1.275rem 1.3rem;
    background-repeat: no-repeat;
}

.fingernail.bg2 {
    background: url("~@/static/Cut-diagram/hugors.png");
    background-size: 1.275rem 1.3rem;
    background-repeat: no-repeat;
}

.fingernail.bg3 {
    background: url("~@/static/Cut-diagram/cuanweisu.png");
    background-size: 1.275rem 1.3rem;
    background-repeat: no-repeat;
}

.fingernail.bg4 {
    background: url("~@/static/Cut-diagram/ruzulv.png");
    background-size: 1.275rem 1.3rem;
    background-repeat: no-repeat;
}

/*---top---*/

.fingernail-top {
    font-size: 0.3rem;
    font-family: myFirstFont;
    font-weight: 400;
    color: #2ad9e4;
    letter-spacing: 2px;
    text-shadow: 0 0 5px #2ad9e4;
}

.fingernail-bottom {
    font-size: 0.15rem;
    font-family: source Han Sans CN;
    font-weight: 400;
    color: #a3ccfa;
    text-align: center;
}

/*---bottom---*/

.chart-wrap {
    display: flex;
    justify-content: space-between;
    height:1.5125rem;
    /* flex: auto; */
}

.chart-wrap > div {
    width: 50%;
    height: 100%;
}
</style>