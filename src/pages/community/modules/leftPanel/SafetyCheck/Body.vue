<template>
    <div class="card-body-inner">
        <div class="chart-wrap">
            <div id="chart" ref="leftbottomChart"></div>
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
            let chartShell = this.$refs.leftbottomChart;
            //初始化echarts实例
            let myChart = this.$echarts.init(chartShell);
            //指定图表配置项和数据
            // let list = [
            //     {
            //         name: '跌倒警告',
            //         value: 36
            //     },
            //     {
            //         name: '燃气警告',
            //         value: 25
            //     },
            //     {
            //         name: '烟雾警告',
            //         value: 30
            //     },
            //     {
            //         name: '水流异常',
            //         value: 30
            //     },
            //     {
            //         name: '用水异常',
            //         value: 30
            //     },
            //     {
            //         name: '离家异常',
            //         value: 30
            //     },
            //     {
            //         name: '呼叫异常',
            //         value: 30
            //     },
            // ];
            let list = box3.ring_chart;
            let yName = list.map((item) => item.name);
            let xData = list.map((item) => item.value);
            let barWidth = 10;
            let option = {
                backgroundColor: "transparent",
                xAxis: {
                    splitLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                },
                grid: {
                    containLabel: true,
                    left: 30,
                    top: 10,
                    right: 60,
                    bottom: 0,
                },
                yAxis: [
                    {
                        inverse: true,
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            margin: 10,
                            textStyle: {
                                fontSize: 12,
                                color: "#A3CCFA",
                            },
                        },
                        data: yName,
                    },
                ],
                series: [
                    {
                        //真实数值条形图
                        type: "bar",
                        barWidth,
                        legendHoverLink: false,
                        symbolRepeat: true,
                        silent: true,
                        itemStyle: {
                            color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 1,
                                y2: 0,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: "#00abee", // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: "#62E6F6", // 100% 处的颜色
                                    },
                                ],
                            },
                        },
                        data: list,
                        z: 1,
                        animationEasing: "elasticOut",
                    },
                    {
                        // 背景
                        type: "pictorialBar",
                        animationDuration: 0,
                        symbolRepeat: "fixed",
                        symbolMargin: "30%",
                        symbol: "rect",
                        symbolSize: [5, barWidth],
                        itemStyle: {
                            normal: {
                                color: "#335a73",
                            },
                        },
                        label: {
                            normal: {
                                show: true,
                                position: "right",
                                offset: [0, 2],
                                distance: 10,
                                textStyle: {
                                    color: "#27ccd8",
                                    fontSize: 12,
                                },
                                formatter: function (params) {
                                    return params.value;
                                },
                            },
                        },
                        data: xData,
                        z: 0,
                        animationEasing: "elasticOut",
                    },
                    {
                        // 分隔
                        type: "pictorialBar",
                        itemStyle: {
                            color: "#134363",
                        },
                        symbolRepeat: "fixed",
                        symbolMargin: "60%",
                        symbol: "rect",
                        symbolClip: true,
                        symbolSize: [5, barWidth],
                        symbolPosition: "start",
                        symbolOffset: [6, 0],
                        data: list,
                        z: 2,
                        animationEasing: "elasticOut",
                    },
                ],
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

/*---bottom---*/

.chart-wrap {
    display: flex;
    justify-content: space-between;
    height: 100%;
}

.chart-wrap > div {
    width: 100%;
    height: 2.575rem;
    margin-left: 0.175rem;
}
</style>