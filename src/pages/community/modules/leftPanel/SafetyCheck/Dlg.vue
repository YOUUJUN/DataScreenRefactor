<template>
    <el-dialog
        :visible.sync="visible"
        :before-close="handleClose"
        :modal="false"
        :show-close="false"
        :destroy-on-close="true"
        custom-class="lucency-dlg short"
        @open="initChart"
    >
        <template slot="title">
            <div class="lucency-dlg-title">
                <div class="title-left">
                    <i class="custom-icon custom-icon-youshuangjiantou"></i>
                    <span>安全监测</span>
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
                        <span>安全检测</span>
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
            });
        },

        handleClose() {
            this.$emit("update:visible", false);
        },

        initTopLeftChart() {
            let chartShell = this.$refs.topLeftChart;
            //初始化echarts实例
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
                    left: "5%",
                    right: "4%",
                    bottom: "10%",
                    containLabel: true,
                },
                xAxis: [
                    {
                        type: "category",
                        // data: ['跌倒告警', '燃气报告',
                        //     '烟雾报告', '水流告警', '用水告警', '离家告警', '紧急呼叫'],
                        data: box3.list,
                        axisTick: {
                            // alignWithLabel: true,
                            show: false,
                        },
                        axisLabel: {
                            // interval:0,
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
                            show: true,
                            lineStyle: {
                                color: "#c0c3cd",
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
                            color: "#c0c3cd",
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
                        name: "Direct",
                        type: "bar",
                        barWidth: "60%",
                        barGap: "20%",
                        barCategoryGap: "20%",
                        data: box3.list_x,
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
                ],
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
            //做环形图的本质是 radius: ['内半径', '外半径'] 内半径!=0
            // 类别统计数据
            // var data1 = [
            //     {value: 9998, name: "跌倒告警"},
            //     {value: 10220, name: "燃气报告"},
            //     {value: 9897, name: "烟雾报告"},
            //     {value: 12054, name: "水流告警"},
            //     {value: 1230, name: "用水告警"},
            //     {value: 12054, name: "离家告警"},
            //     {value: 12054, name: "紧急呼叫"},
            // ];
            let data1 = box3.ring_chart;
            let colorList = [
                "#01ffff",
                "#02a6ff",
                "#58c88d",
                "#fbb265",
                "#df6f6f",
                "#7e6dfa",
                "#f78602",
            ];
            let option = {
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
                legend: {
                    itemHeight: 10,
                    itemWidth: 15,
                    orient: "vertical",
                    bottom: "25%",
                    left: "74%",
                    textStyle: {
                        fontSize: 10,
                        color: "#A3CCFA",
                    },
                    formatter: function (name) {
                        const item = data1.filter(
                            (item) => item.name === name
                        )[0];
                        return `${name}`;
                    },
                },
                series: [
                    {
                        type: "pie",
                        center: ["40%", "50%"],
                        radius: ["50%", "70%"],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: "center",
                        },
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    return colorList[params.dataIndex];
                                },
                            },
                        },
                        emphasis: {
                            label: {
                                show: false,
                                position: "outside",
                                fontSize: "12",
                                formatter: function (params) {
                                    var percent = 0;
                                    var total = 0;
                                    for (var i = 0; i < data1.length; i++) {
                                        total += data1[i].value;
                                    }
                                    percent = (
                                        (params.value / total) *
                                        100
                                    ).toFixed(0);
                                },
                            },
                        },
                        labelLine: {
                            show: false,
                        },
                        data: data1,
                    },
                ],
            };

            ////////////////////////////////////////////////////////////
            // 使用指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        },
    },
};
</script>

<style>
.lucency-dlg.short {
    height:4.2875rem;
}
</style>

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
    height: 100%;
}

.panel-bottom {
    display: flex;
    flex-direction: row;
    flex: auto;
}

.panel-top > div,
.panel-top > div {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    padding: 0 0.2rem;
}

.panel-wrap .chart {
    flex: auto;
}
</style>