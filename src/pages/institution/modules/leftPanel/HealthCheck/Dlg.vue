<template>
    <el-dialog
        :visible.sync="visible"
        :before-close="handleClose"
        :modal="false"
        :show-close="false"
        :destroy-on-close="true"
        :append-to-body="true"
        custom-class="lucency-dlg"
        @open="initChart"
    >
        <template slot="title">
            <div class="lucency-dlg-title">
                <div class="title-left">
                    <i class="custom-icon custom-icon-youshuangjiantou"></i>
                    <span>健康监测</span>
                </div>
                <img
                    @click="handleClose()"
                    class="card-head-inner-more"
                    src="~@/static/Cut-diagram/guanbi.png"
                />
            </div>
        </template>

        <section class="panel-wrap">
            <div class="panel-top">
                <div class="panel-top-left">
                    <div class="lucency-title">
                        <span>健康预警</span>
                    </div>
                    <div class="chart" ref="topLeftChart"></div>
                </div>

                <div class="panel-top-right">
                    <div class="lucency-title">
                        <span>类别统计</span>
                    </div>
                    <div class="chart" ref="topRightChart"></div>
                </div>
            </div>

            <div class="panel-bottom">
                <div class="panel-bottom-left">
                    <div class="lucency-title">
                        <span>健康检测统计</span>
                    </div>
                    <div class="chart" ref="bottomLeftChart"></div>
                </div>

                <div class="panel-bottom-right">
                    <div class="lucency-title">
                        <span>健康检测统计</span>
                    </div>
                    <div class="chart" ref="bottomRightChart"></div>
                </div>
            </div>
        </section>
    </el-dialog>
</template>

<script>
export default {
    props: {
        visible: {
            type: String,
            default: false,
        },
    },

    data() {
        return {};
    },

    methods: {
        initChart() {
            this.$nextTick(() => {
                this.initTopLeftChart();
                this.initTopRightChart();
                this.initBottomLeftChart();
                this.initBottomRightChart();
            });
        },

        handleClose() {
            this.$emit("update:visible", false);
        },

        initTopLeftChart() {
            let chartShell = this.$refs.topLeftChart;
            //初始化echarts实例
            let health_warning = box2.health_warning;
            let myChart = this.$echarts.init(chartShell);
            //指定图表配置项和数据
            // ------------------------------------------------------------------------------------------
            let option = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                    },
                    padding: 0,
                    borderColor: "#02A6FF",
                    backgroundColor: "rgba(18, 56, 95, 0.8)",
                    formatter: function (params) {
                        let str = `<div style="padding:5px 20px 5px 20px;">
                        <div style="color:#02A6FF;font-size:12px;text-align:center;">${params[0].axisValue}</div>
                        <div style="width:90%;height:1px;background-image: linear-gradient(to right, rgba(18, 56, 95, 0.5), #02A6FF, rgba(18, 56, 95, 0.5));"></div>
                        <div style="color:#02A6FF;font-size:12px;display:flex;justify-content:center;align-items:center;">
                        <span style="color:#A3CCFA;">${params[0].value}</span>
                        </div>
                        </div>`;
                        return str;
                    },
                },
                grid: {
                    top: "15%",
                    left: "3%",
                    right: "4%",
                    bottom: "10%",
                    containLabel: true,
                    textStyle: {
                        fontSize: 12,
                        color: "red",
                    },
                },
                xAxis: [
                    {
                        type: "category",
                        data: health_warning.xData,
                        axisTick: {
                            // alignWithLabel: false,
                            show: false,
                        },
                        // axisTick: {
                        //     show:false
                        // },
                        axisLabel: {
                            // interval:0,F
                            // rotate:45,
                            fontSize: "9",
                            color: "#A3CCFA",
                        },
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
                            show: false,
                            lineStyle: {
                                color: "#A3CCFA",
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
                            color: "#A3CCFA",
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
                                color: "#A3CCFA",
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
                series: {
                    // name: 'Direct',
                    type: "bar",
                    barWidth: "30%",
                    data: health_warning.yData, //要传过来的数据
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
                                        color: " #02FFDE",
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
            };
            // 使用指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        },

        initTopRightChart() {
            let chartShell = this.$refs.topRightChart;
            //初始化echarts实例
            let myChart = this.$echarts.init(chartShell);
            //指定图表配置项和数据
            // ------------------------------------------------------------------------------------------
            let color = ["#01FFFF", "#02A6FF", "#58C88D", "#FBB265", "#DF6F6F"];
            // var seriesData = [
            //     // 传过来的数据
            //     {"name": "心率异常", "value": 1243},
            //     {"name": "体温异常", "value": 629},
            //     {"name": "血压异常", "value": 1629},
            //     {"name": "呼吸异常", "value": 3425},
            //     {"name": "血糖异常", "value": 2824}
            // ]
            let seriesData = box2.health_error;
            let option = {
                title: [
                    {
                        text: "", // 删除体温异常显示

                        // color:'red',
                        x: "center",
                        y: "center",
                        textStyle: {
                            color: "#2ABAC9",
                            fontSize: "14",
                        },
                    },
                    //     {
                    //     text: '类别统计',
                    //     // color:'red',
                    //         top:'70',
                    //     textStyle: {
                    //         color: '#2AD9E4',
                    //         fontSize: '16',
                    //     }
                    // },
                ],
                color: color,
                grid: {
                    top: "40%",
                    left: 0,
                    right: "1%",
                    bottom: 40,
                    containLabel: true,
                },
                legend: [
                    {
                        itemHeight: 10,
                        itemWidth: 15,
                        // type: "scroll",
                        orient: "vertical",
                        left: "65%",
                        align: "auto",
                        // top: '35%',
                        top: "30%",
                        // itemWidth: 12,             // 图例图形宽度
                        // itemHeight: 12,
                        // itemGap: 20,
                        textStyle: {
                            align: "left",
                            verticalAlign: "middle",
                            rich: {
                                name: {
                                    color: "#A3CCFA",
                                    fontSize: 10,
                                    width: 120,
                                    // padding: [0, 0, 0, 10]
                                },
                                value: {
                                    // color: 'rgba(29, 145, 245, 1)',
                                    fontSize: 18,
                                    // fontFamily: 'DIN',
                                    // fontWeight: 500
                                },
                            },
                        },
                        // data: seriesData,
                        formatter: (name) => {
                            if (seriesData.length) {
                                const item = seriesData.filter(
                                    (item) => item.name === name
                                )[0];
                                return `{name|${name} }{value| ${item.value}}`;
                            }
                        },
                        x: "left",
                    },
                ],
                tooltip: {
                    trigger: "item",
                    padding: 0,
                    borderColor: "#02A6FF",
                    backgroundColor: "rgba(18, 56, 95, 0.8)",
                    formatter: function (params) {
                        let str = `<div style="padding:5px 20px 5px 20px;">
                        <div style="color:#02A6FF;font-size:12px;display:flex;justify-content:center;align-items:center;">
                        <span style="width:4px;height:4px;margin-right:5px;display:block;background:${params.color};"></span>
                        <span style="margin-right:10px;">${params.name}</span>
                        <span style="color:#A3CCFA;">${params.value}</span>
                        </div>
                        </div>`;
                        return str;
                    },
                },
                series: [
                    {
                        type: "pie",
                        radius: ["80%", "45%"],
                        center: ["30%", "50%"],
                        hoverAnimation: true,
                        z: 10,
                        // itemStyle: {
                        //     normal: {
                        //         borderWidth: 5,
                        //         borderColor: '#fff'
                        //     }
                        // },
                        label: {
                            show: false,
                        },
                        data: seriesData,
                        labelLine: {
                            show: false,
                        },
                    },
                ],
            };
            // 使用指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        },

        initBottomLeftChart() {
            let chartShell = this.$refs.bottomLeftChart;
            //初始化echarts实例
            let myChart = this.$echarts.init(chartShell);
            //指定图表配置项和数据
            // ------------------------------------------------------------------------------------------
            let option = {
                // title: {
                //     text: '健康检测报告',
                //     // fontSize:'9',\
                //     // color:'red',
                //     textStyle: {
                //         color: '#29D1DD',
                //         fontSize: '16',
                //     }
                // },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        // type: 'shadow'
                    },
                    padding: 0,
                    borderColor: "#02A6FF",
                    backgroundColor: "rgba(18, 56, 95, 0.8)",
                    formatter: function (params) {
                        console.log(params);
                        let str = `<div style="padding:5px 20px 5px 20px;">
                        <div style="color:#02A6FF;font-size:12px;text-align:center;">${params[0].name}</div>
                        <div style="width:90%;height:1px;background-image: linear-gradient(to right, rgba(18, 56, 95, 0.5), #02A6FF, rgba(18, 56, 95, 0.5));"></div>
                        <div style="color:#02A6FF;font-size:12px;display:flex;justify-content:center;align-items:center;">
                        <span style="color:#A3CCFA;">${params[0].value}</span>
                        </div>
                        </div>`;
                        return str;
                    },
                },
                legend: {},
                grid: {
                    show: false,
                    left: "3%",
                    right: "4%",
                    bottom: "15%",
                    top: "11%",
                    containLabel: true,
                },
                xAxis: [
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
                                color: "#A3CCFA",
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
                            color: "#A3CCFA",
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
                                color: "#A3CCFA",
                            },
                        },
                    },
                    {
                        type: "value",
                        gridIndex: 0,
                        min: 50,
                        max: 100,
                        splitNumber: 10,
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
                yAxis: [
                    {
                        type: "category",
                        // data: ['健康检测总数', '血压检测次数', '血糖监测次数',
                        //     '心率检测次数', '呼吸检测次数', '体温检测次数'],
                        data: box2.health_count.xData,
                        axisTick: {
                            alignWithLabel: true,
                            show: false,
                        },
                        axisLabel: {
                            fontSize: "10",
                            color: "#A3CCFA",
                        },
                    },
                ],
                series: [
                    {
                        // name: 'Direct',
                        type: "bar",
                        barWidth: "60%",
                        // center:['30%'],
                        // data: [52, 200, 334, 390, 330, 220], //数据放的位置
                        data: box2.health_count.yData, //数据放的位置
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
                                            color: " #02FFDE",
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
            };
            // 使用指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        },

        initBottomRightChart() {
            let chartShell = this.$refs.bottomRightChart;
            //初始化echarts实例
            let myChart = this.$echarts.init(chartShell);
            //指定图表配置项和数据
            // ------------------------------------------------------------------------------------------
            let color = ["#01FFFF", "#02A6FF", "#58C88D", "#FBB265", "#DF6F6F"];
            // var seriesData = [
            //     {"name": "心率异常", "value": 1243},
            //     {"name": "体温异常", "value": 629},
            //     {"name": "血压异常", "value": 1629},
            //     {"name": "呼吸异常", "value": 3425},
            //     {"name": "血糖异常", "value": 2824}
            // ]
            let seriesData = box2.detect_rate;
            let option = {
                title: [
                    {
                        text: "", // 删除体温异常显示
                        // color:'red',
                        x: "center",
                        y: "center",
                        textStyle: {
                            color: "#2ABAC9",
                            fontSize: "14",
                        },
                    },
                    //     {
                    //     text: '检测比例',
                    //     // color:'red',
                    //
                    //         top:'70',
                    //     textStyle: {
                    //         color: '#2AD9E4',
                    //         fontSize: '16',
                    //     }
                    // },
                ],
                color: color,
                grid: {
                    // top: '15%',
                    left: 0,
                    right: "1%",
                    // bottom: 5,
                    containLabel: true,
                },
                legend: [
                    {
                        itemHeight: 10,
                        itemWidth: 15,
                        // type: "scroll",
                        orient: "vertical",
                        left: "65%",
                        align: "auto",
                        // top: '35%',
                        top: "10",
                        // itemWidth: 12,             // 图例图形宽度
                        // itemHeight: 12,
                        // itemGap: 20,
                        textStyle: {
                            align: "left",
                            verticalAlign: "middle",
                            rich: {
                                name: {
                                    color: "#A3CCFA",
                                    fontSize: 10,
                                    width: 120,
                                    // padding: [0, 0, 0, 10]
                                },
                                value: {
                                    // color: 'rgba(29, 145, 245, 1)',
                                    fontSize: 18,
                                    // fontFamily: 'DIN',
                                    // fontWeight: 500
                                },
                            },
                        },
                        // data: seriesData,
                        formatter: (name) => {
                            if (seriesData.length) {
                                const item = seriesData.filter(
                                    (item) => item.name === name
                                )[0];
                                return `{name|${name} }{value| ${item.value}}`;
                            }
                        },
                        x: "left",
                    },
                ],
                tooltip: {
                    trigger: "item",
                    padding: 0,
                    borderColor: "#02A6FF",
                    backgroundColor: "rgba(18, 56, 95, 0.8)",
                    formatter: function (params) {
                        let str = `<div style="padding:5px 20px 5px 20px;">
                        <div style="color:#02A6FF;font-size:12px;display:flex;justify-content:center;align-items:center;">
                        <span style="width:4px;height:4px;margin-right:5px;display:block;background:${params.color};"></span>
                        <span style="margin-right:10px;">${params.name}</span>
                        <span style="color:#A3CCFA;">${params.value}</span>
                        </div>
                        </div>`;
                        return str;
                    },
                },
                series: [
                    {
                        type: "pie",
                        radius: ["80%", "45%"],
                        center: ["30%", "50%"],
                        hoverAnimation: true,
                        z: 10,
                        // itemStyle: {
                        //     normal: {
                        //         borderWidth: 5,
                        //         borderColor: '#fff'
                        //     }
                        // },
                        label: {
                            show: false,
                        },
                        data: seriesData,
                        labelLine: {
                            show: false,
                        },
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
/*---dlg-title---*/
.lucency-dlg-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 0 0.375rem 0 0.375rem;
}

.title-left {
    color: #2ad9e4;
    font-weight: 600;
}

.title-left > i {
    font-size: 0.28rem;
}

.title-left > span {
    font-size: 0.25rem;
}

.card-head-inner-more {
    cursor: pointer;
}
</style>

<style scoped>
.panel-wrap {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.panel-top {
    display: flex;
    flex-direction: row;
    flex: none;
    height: 2.6rem;
}

.panel-bottom {
    display: flex;
    flex-direction: row;
    flex: auto;
}

.panel-top > div,
.panel-top > div,
.panel-bottom > div,
.panel-bottom > div {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    padding: 0.2rem;
    padding-bottom: 0;
}

.panel-top > div,
.panel-top > div {
    padding-top: 0;
}

.panel-wrap .chart {
    flex: auto;
}
</style>