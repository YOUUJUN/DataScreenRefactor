<template>
    <div class="card-body-inner">
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
            let xAxisData = [];
            let device_status_data = box8.device_status_data;
            let option = {
                tooltip: {
                    trigger: "axis",
                    padding: 0,
                    borderColor: "#02A6FF",
                    backgroundColor: "rgba(18, 56, 95, 0.8)",
                    formatter: function (params) {
                        let deviceName = (params[0]?.axisValue) ?? '';
                        let total = (params[0]?.value ?? 0) + (params[1]?.value ?? 0);
                        let normal = (params[0]?.value) ?? '';
                        let offline = (params[1]?.value) ?? '';
                        let str = `<div style="padding:5px 20px 5px 20px;">
                <div style="color:#2AD9E4;text-align:center;font-size:12px">${
                    deviceName
                }</div>
                <div style="width:100%;color:#A3CCFA;font-size:12px;display:flex;justify-content:center;align-items:center;"><span style="width:4px;height:4px;background:#A3CCFA;display:block;margin-right:5px;"></span>总数：${
                    total
                }</div>
                <div style="width:100%;color:#A3CCFA;font-size:12px;display:flex;justify-content:center;align-items:center;"><span style="width:4px;height:4px;background:#02FFDE;display:block;margin-right:5px;"></span>正常：${
                    normal
                }</div>
                <div style="width:100%;color:#A3CCFA;font-size:12px;display:flex;justify-content:center;align-items:center;"><span style="width:4px;height:4px;background:#FFD725;display:block;margin-right:5px;"></span>离线：${
                    offline
                }</div>
                </div>`;
                        return str;
                    },
                    axisPointer: {
                        type: "shadow",
                        textStyle: {
                            color: "#fff",
                        },
                    },
                },
                legend: {
                    itemWidth: 15,
                    itemHeight: 10,
                    right: "10%",
                    top: "15",
                    textStyle: {
                        color: "#A3CCFA",
                        fontSize: 10,
                    },
                },
                grid: {
                    top: "25%",
                    left: "6%",
                    right: "4%",
                    bottom: "10%",
                    containLabel: false,
                },
                xAxis: [
                    {
                        type: "category",
                        axisLine: {
                            lineStyle: {
                                color: "#4AB2FF",
                            },
                        },

                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        splitArea: {
                            show: false,
                        },
                        axisLabel: {
                            interval: 0,
                        },
                        // data: ['烟雾传感器', '燃气传感器', '流水传感器', '毫米波雷达', '网关', '门磁传感器', '红外线传感器'],
                        data: device_status_data.category_count_state_name_list,
                    },
                ],

                yAxis: [
                    {
                        type: "value",
                        nameTextStyle: {
                            // color: "#ebf8ac"
                        },
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#4AB2FF",
                            },
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                // color: "#ebf8ac"
                            },
                        },
                    },
                    {
                        type: "value",

                        nameTextStyle: {
                            color: "#90979c",
                        },
                        position: "right",
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                            formatter: "{value}%", //右侧Y轴文字显示
                            textStyle: {
                                color: "#c0c3cd",
                            },
                        },
                    },
                    {
                        type: "value",
                        gridIndex: 0,
                        min: 50,
                        max: 100,
                        splitNumber: 8,
                        splitLine: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                        splitArea: {
                            show: true,
                            areaStyle: {
                                color: [
                                    "rgba(250,250,250,0.0)",
                                    "rgba(250,250,250,0.05)",
                                ],
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: "正常",
                        // itemStyle: {
                        //     normal: {
                        //         color: '#19E5E8'
                        //     },
                        // },
                        type: "bar",
                        stack: "total",
                        barWidth: "20",
                        // label: {
                        //     show: true
                        // },
                        // emphasis: {
                        //     focus: 'series'
                        // },
                        // data: [320, 302, 301, 334, 390, 330, 320],
                        data: device_status_data.category_online_count_list,
                        itemStyle: {
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
                    {
                        name: "离线",
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "#FFD725",
                                        },
                                        {
                                            offset: 1,
                                            color: "#FF7200",
                                        },
                                    ]
                                ),
                            },
                        },
                        type: "bar",
                        stack: "total",
                        // label: {
                        //     show: true,
                        // },
                        // emphasis: {
                        //     focus: 'series'
                        // },
                        // data: [120, 132, 101, 134, 90, 230, 210]
                        data: device_status_data.category_offline_count_list,
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