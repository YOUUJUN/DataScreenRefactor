<template>
    <div class="card-body-inner">
        <div class="box-wrap">
            <div class="box">
                <p class="box-top">今日告警</p>
                <div class="box-split">
                    <img src="~@/static/Cut-diagram/jxin8.png" />
                </div>
                <p class="box-bottom">3</p>
            </div>

            <div class="box">
                <p class="box-top">设备总数</p>
                <div class="box-split">
                    <img src="~@/static/Cut-diagram/jxin8.png" />
                </div>
                <p class="box-bottom">3</p>
            </div>

            <div class="box">
                <p class="box-top">已处理</p>
                <div class="box-split">
                    <img src="~@/static/Cut-diagram/jxin8.png" />
                </div>
                <p class="box-bottom">3</p>
            </div>

            <div class="box">
                <p class="box-top">设备在线</p>
                <div class="box-split">
                    <img src="~@/static/Cut-diagram/jxin8.png" />
                </div>
                <p class="box-bottom">3</p>
            </div>

            <div class="box">
                <p class="box-top">未处理</p>
                <div class="box-split">
                    <img src="~@/static/Cut-diagram/jxin8.png" />
                </div>
                <p class="box-bottom">3</p>
            </div>

            <div class="box">
                <p class="box-top">设备离线</p>
                <div class="box-split">
                    <img src="~@/static/Cut-diagram/jxin8.png" />
                </div>
                <p class="box-bottom">3</p>
            </div>
        </div>

        <div class="chart-wrap">
            <div id="chart" ref="chart"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },

    mounted() {
        this.initChart();
    },

    methods: {
        initChart() {
            let chartShell = this.$refs.chart;
            //初始化echarts实例
            let myChart = this.$echarts.init(chartShell);
            //指定图表配置项和数据
            let xdata = ["设备在线率"];
            let ydata = [box4.state_online_count];
            let max = box4.device_count;
            let ydatamax = [];
            for (var i = 0; i < ydata.length; i++) {
                ydatamax.push(max);
            }
            let option = {
                title: {
                    show: false,
                },
                tooltip: {
                    show: false,
                    // backgroundColor: '#053A8D', //通过设置rgba调节背景颜色与透明度
                    // formatter: '{b}',
                    // position: 'top',
                },
                grid: {
                    borderWidth: 0,
                    left: "1%",
                    top: "130%",
                    width: "108%", // 条
                },
                yAxis: [
                    {
                        inverse: true,
                        type: "category",
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                            inside: false,
                        },
                        data: xdata,
                    },
                ],
                xAxis: {
                    type: "value",

                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                    splitLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                },
                series: [
                    {
                        name: "",
                        type: "bar",
                        zlevel: 2,
                        barWidth: 8,
                        itemStyle: {
                            normal: {
                                barBorderRadius: [50, 50, 50, 50],
                                color: "#2AD9E4",
                            },
                        },
                        data: ydata,
                        label: {
                            normal: {
                                show: true,
                                position: [0, -20],
                                // offset: [30, 40],
                                width: "100%",
                                rich: {
                                    name: {
                                        color: "#A3CCFA",
                                        fontSize: 14,
                                        // fontFamily:' myFirstFont',
                                    },
                                    value: {
                                        display: "block",
                                        color: "rgba(255, 255, 255,0.6)",
                                        fontSize: 14,
                                        position: "right",
                                        top: 20,
                                    },
                                },
                                formatter: function (params) {
                                    let { value, name } = params;
                                    let paramsStr = name;
                                    if (name.length > 6) {
                                        paramsStr =
                                            name.substring(0, 6) + "...";
                                    }
                                    return `{name|${paramsStr}}`;
                                },
                            },
                        },
                    },
                    {
                        // 背景
                        type: "bar",
                        barGap: "-100%",
                        barWidth: 8,
                        // top: 8,
                        itemStyle: {
                            normal: {
                                // color: '#A3FFF5',
                                color: "rgba(163,255,245,0.15)",
                                barBorderRadius: [50, 50, 50, 50],
                            },
                        },

                        // 后面百分比在样式
                        label: {
                            top: "20%",
                            normal: {
                                color: "#555",
                                show: true,
                                position: [270, -30], // 百分号位置
                                fontFamily: " myFirstFont",
                                // position:'top',
                                top: "10",
                                textStyle: {
                                    fontSize: 25,
                                    // fontWeight: 'bold',
                                    color: "#2AD9E4",
                                    // position:[0,0,90,0,]
                                    width: 90,
                                    // fontFamily: UniDreamLED,
                                    fontWeight: 400,
                                },
                                formatter: function (params) {
                                    // return Math.ceil((ydata[params.dataIndex] * 100) / ydatamax[0]) + '%';
                                    return box4.device_rate + "%";
                                },
                            },
                        },
                        data: ydatamax,
                    },
                    {
                        // 背景
                        type: "bar",
                        // barGap: '-100%',
                        barWidth: 8,
                        top: " 80",
                        itemStyle: {
                            normal: {
                                color: "red",
                                barBorderRadius: [50, 50, 50, 50],
                            },
                        },
                        // data: ydatamax,
                    },
                ],
                // animationEasing: 'cubicOut'
            };

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
    width: 100%;
    height: 100%;
}

/*---top---*/

.card-body-inner .box-wrap {
    display: flex;
    align-content: space-around;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;
    height: 1.7875rem;
    margin-top: 0.15rem;
}

.box-wrap .box {
    width: 1.525rem;
    height: 0.775rem;
    background: url("~@/static/Cut-diagram/kemshwa.png");
    text-align: center;
    background-size: 1.525rem 0.775rem;
    background-repeat: no-repeat;
}

.box-wrap .box .box-top {
    width: 100%;
    font-size: 0.15rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #a3ccfa;
    line-height: 0.1875rem;
    margin-top: 0.075rem;
}

.box-wrap .box-split {
    width: 100%;
    margin-top: -0.085rem;
}

.box-wrap .box-split > img {
    width: 100%;
    height: 100%;
}

.box-wrap .box .box-bottom {
    width: 100%;
    font-size: 0.3375rem;
    font-family: myFirstFont;
    font-weight: 400;
    color: #2ad9e4;
    line-height: 0.1875rem;
    margin-top: 0.0925rem;
    letter-spacing: 2px;
    text-shadow: 0 0 5px #2ad9e4;
}

/*---bottom---*/

.chart-wrap {
    display: flex;
    justify-content: space-between;
    height: .975rem
}

.chart-wrap > div {
    width: 100%;
    height:100%;
    margin-left: 0.175rem;
}
</style>