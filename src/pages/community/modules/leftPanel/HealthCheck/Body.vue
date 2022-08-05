<template>
    <div class="card-body-inner">
        <div class="chart-wrap">
            <div id="chart" ref="leftCenterChart"></div>
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
            let chartShell = this.$refs.leftCenterChart;
            //初始化echarts实例
            let myChart = this.$echarts.init(chartShell);
            //指定图表配置项和数据

            let passengerOccupancy = box2.health_monitoring;
            let option = {
                tooltip: {
                    trigger: "item",
                    padding: 0,
                    borderColor: "#02A6FF",
                    backgroundColor: "rgba(18, 56, 95, 0.8)",
                    formatter: function (params) {
                        let str = `<div style="padding:5px 10px 5px 10px;">
                        <div style="color:#02A6FF;font-size:12px;display:flex;justify-content:center;align-items:center;">
                        <span style="margin-right:10px;">${params.name}</span>
                        <span style="color:#A3CCFA;">${params.value}</span>
                        </div>
                        </div>`;
                        return str;
                    },
                },
                // backgroundColor:'www',
                grid: {
                    // left: '5%',
                    // // right: '0',
                    // bottom: '1',
                    // top: '1',
                    // containLabel: true,
                    top: 0,
                    // height: '100%',
                    bottom:0,
                    left: 80,
                    right: 50,
                },

                xAxis: {
                    show: false,
                    type: "value",
                },
                yAxis: [
                    {
                        type: "category",
                        inverse: true,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#A3CCFA",
                                fontSize: 12,
                            },
                        },
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                        data: passengerOccupancy.xData,
                    },
                    {
                        type: "category",
                        inverse: true,
                        axisTick: "none",
                        axisLine: "none",
                        show: true,
                        axisLabel: {
                            // margin: 5,
                            textStyle: {
                                //   color: '#60ACF7',
                                //   fontSize: '18',
                            },
                            formatter: function (value) {
                                return "{a|" + value.toLocaleString() + "}";
                            },
                            rich: {
                                a: {
                                    fontSize: 12,
                                    color: "#27C8D5",
                                },
                                b: {
                                    fontSize: 12,
                                    color: "#60ACF7",
                                },
                            },
                        },
                        data: passengerOccupancy.yData,
                    },
                ],
                series: [
                    {
                        showBackground: true,
                        type: "bar",
                        zlevel: 1,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 5,
                                color: new this.$echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0.9,
                                    0,
                                    [
                                        {
                                            offset: 0,
                                            color: "rgba(104, 251, 255, 0)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(104, 251, 255, 1)",
                                        },
                                    ]
                                ),
                            },
                        },
                        barWidth: 4,
                        data: passengerOccupancy.yData,
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
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
}

.chart-wrap > div {
    width: 100%;
    height: 1.575rem;
}
</style>