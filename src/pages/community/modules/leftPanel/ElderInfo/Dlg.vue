<template>
    <el-dialog
        :visible.sync="visible"
        :before-close="handleClose"
        :modal="false"
        :show-close="false"
        :destroy-on-close="true"
        custom-class="lucency-dlg"
        @open="initChart"
    >
        <template slot="title">
            <div class="lucency-dlg-title">
                <div class="title-left">
                    <i class="custom-icon custom-icon-youshuangjiantou"></i>
                    <span>老人基本信息</span>
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
                    <div class="fingernail-wrap">
                        <div class="fingernail bg1">
                            <div class="fingernail-top">
                                {{ fingernailData.people_count }}
                            </div>
                            <div class="fingernail-bottom">老人总数</div>
                        </div>

                        <div class="fingernail bg2">
                            <div class="fingernail-top">
                                {{ fingernailData.empty_nest_elderly }}
                            </div>
                            <div class="fingernail-bottom">空巢老人数</div>
                        </div>

                        <div class="fingernail bg3">
                            <div class="fingernail-top">
                                {{ fingernailData.alone_elderly }}
                            </div>
                            <div class="fingernail-bottom">独居老人数</div>
                        </div>

                        <div class="fingernail bg4">
                            <div class="fingernail-top">
                                {{ fingernailData.disable_elderly }}
                            </div>
                            <div class="fingernail-bottom">失能老人数</div>
                        </div>
                    </div>
                </div>

                <div class="panel-top-right">
                    <div class="chart-wrap">
                        <div ref="leftChart"></div>

                        <div ref="rightChart"></div>
                    </div>
                </div>
            </div>

            <div class="panel-bottom">
                <div class="panel-bottom-left">
                    <div class="lucency-title">
                        <span>老人年龄</span>
                    </div>
                    <div class="chart" ref="bottomLeftChart"></div>
                </div>

                <div class="panel-bottom-right">
                    <div class="lucency-title">
                        <span>老人类型</span>
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
        return {
            fingernailData : {},
        };
    },

    created(){
        let {people_count} = box1;
        this.fingernailData = Object.assign({}, {
            people_count,
            empty_nest_elderly : box1.res.空巢老人,
            alone_elderly : box1.res.独居老人,
            disable_elderly : box1.res.失能老人,
        })
    },

    mounted() {},

    methods: {
        initChart() {
            this.$nextTick(() => {
                this.initMenChart();
                this.initWomenChart();
                this.initAgeChart();
                this.initCategoryChart();
            });
        },

        handleClose() {
            this.$emit("update:visible", false);
        },

        initMenChart() {
            let chartShell = this.$refs.leftChart;
            //初始化echarts实例
            let myChart = this.$echarts.init(chartShell);
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
                    width: "100%",
                    height: "100%",
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
            let chartShell = this.$refs.rightChart;
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
                    width: "100%",
                    height: "100%",
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

        initAgeChart() {
            let chartShell = this.$refs.bottomLeftChart;
            //初始化echarts实例
            var myChart = this.$echarts.init(chartShell);
            //指定图表配置项和数据
            const yData = ["50-59", "60-69", "70-79", "80-89", "90-99", "100+"];
            let option = {
                title: {
                    // text: '对比图'
                },
                tooltip: {
                    trigger: "item",
                    padding: 0,
                    borderColor: "#02A6FF",
                    backgroundColor: "rgba(18, 56, 95, 0.8)",
                    formatter: function (params) {
                        let str = `<div style="padding:5px 20px 5px 20px;">
                        <div style="color:#02A6FF;font-size:12px;text-align:center;">${params.seriesName}</div>
                        <div style="width:90%;height:1px;background-image: linear-gradient(to right, rgba(18, 56, 95, 0.5), #02A6FF, rgba(18, 56, 95, 0.5));"></div>
                        <div style="color:#02A6FF;font-size:12px;display:flex;justify-content:center;align-items:center;">
                        <span style="width:4px;height:4px;margin-right:5px;display:block;background:${params.color};"></span>
                        <span style="margin-right:10px;">${params.name}</span>
                        <span style="color:#A3CCFA;">${params.value}</span>
                        </div>
                        </div>`;
                        return str;
                    },
                },
                grid: [
                    {
                        // 左侧对应坐标系
                        show: false,
                        left: "15%",
                        top: "10%",
                        bottom: "10%",
                        width: "40%",
                    },
                    {
                        // 右侧对应坐标系
                        show: false,
                        left: "55%",
                        top: "10%",
                        bottom: "10%",
                        width: "40%",
                    },
                    {
                        // 用来显示的坐标系
                        show: false,
                        left: "15%",
                        top: "10%",
                        bottom: "10%",
                        width: "80%",
                    },
                ],
                // x轴是度量，y轴是维度
                legend: {
                    left: "right",
                    top: 10,
                    itemWidth: 15, //图例标记的图形宽度
                    itemHeight: 10, //图例标记的图形高度
                    borderRadius: 0,
                    inactiveColor: "#FFF",
                    itemGap: 20,
                    textStyle: {
                        color: "#A3CCFA",
                        fontSize: "10",
                    },
                },
                xAxis: [
                    {
                        // 左侧轴
                        type: "value",
                        inverse: true,
                        interval: 300, // 步长
                        min: 0,
                        max: (val) => {
                            return Math.floor(val.max * 1.1);
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(255,255,255,.3)",
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#9CC4F2",
                                fontSize: 12,
                            },
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                    {
                        // 右侧轴
                        type: "value",
                        gridIndex: 1,
                        interval: 300, // 步长
                        min: 0,
                        max: (val) => {
                            return Math.floor(val.max * 1.1);
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(255,255,255,.3)",
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#9CC4F2",
                                fontSize: 12,
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(255,255,255, 0.1)",
                                width: 1,
                                type: "solid",
                            },
                        },
                    },
                    {
                        // 最左侧y轴对应x轴
                        gridIndex: 2,
                        name: "x",
                        // nameLocation: 'center',
                        nameGap: 40, // 与坐标轴距离
                        nameTextStyle: {
                            color: "#9CC4F2",
                            fontSize: 12,
                        },
                        axisLine: {
                            show: false,
                        },
                    },
                ],
                yAxis: [
                    {
                        type: "category",
                        position: "right",
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                            margin: 0,
                        },
                        data: yData,
                    },
                    {
                        gridIndex: 1,
                        type: "category",
                        position: "left",
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#9CC4F2",
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            // textStyle:{
                            //
                            // },
                            show: false,
                        },
                        data: yData,
                    },
                    {
                        // name: 'y',
                        gridIndex: 2,
                        type: "category",
                        position: "left",
                        nameLocation: "end",
                        nameGap: 25, // 与坐标轴距离
                        nameTextStyle: {
                            color: "#9CC4F2",
                            fontSize: 12,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(255,255,255,.3)",
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#9CC4F2" + "",
                                fontSize: 12,
                            },
                        },

                        data: yData,
                    },
                ],

                series: [
                    {
                        name: "男",
                        type: "bar",
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        barMaxWidth: "60%",
                        data: box1.male_list, //男的传的数据位置
                        itemStyle: {
                            normal: {
                                color: "#02A6FF",
                            },
                        },
                    },
                    {
                        name: "女",
                        type: "bar",
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        barMaxWidth: "60%",
                        data: box1.female_list, //女的传的数据位置
                        itemStyle: {
                            normal: {
                                color: "#01FFFF",
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

        initCategoryChart() {
            let chartShell = this.$refs.bottomRightChart;
            //初始化echarts实例
            let myChart = this.$echarts.init(chartShell);
            //指定图表配置项和数据

            let seriesData = box1.elderly_type_list;

            let objData = array2obj(seriesData, "name");

            function array2obj(array, key) {
                let resObj = {};
                for (let i = 0; i < array.length; i++) {
                    resObj[array[i][key]] = array[i];
                }
                // console.log(JSON.stringify(resObj));
                return resObj;
            }

            let color = [
                "#01FFFF",
                "#02A6FF",
                "#58C88D",
                "#FBB265",
                "#DF6F6F",
                "#7E6DFA",
                "#F78602",
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
                color: color,
                title: [
                    {
                        show: true,

                        top: "10%",
                        left: "110%",
                        // right:'-40%',
                        textStyle: {
                            rich: {
                                a: {
                                    align: "center",
                                    fontSize: 14,
                                    color: "black",
                                    width: 20,
                                    padding: [0, 0, 0, 20],
                                },
                                b: {
                                    align: "center",
                                    fontSize: 14,
                                    color: "black",
                                    width: 5,
                                    padding: [0, 0, 0, 50],
                                },
                                c: {
                                    align: "center",
                                    fontSize: 14,
                                    color: "black",
                                    width: 5,
                                    padding: [0, 0, 0, 45],
                                },
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: "",
                        type: "pie",
                        radius: ["40%", "60%"],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            // position: 'center',
                        },
                        emphasis: {
                            label: {
                                show: false,
                                fontSize: "40",
                                fontWeight: "bold",
                            },
                        },
                        labelLine: {
                            show: false,
                        },
                        data: seriesData,
                    },
                ],
                legend: {
                    selectedMode: false, //取消底部的按钮的点击
                    orient: "vertical",
                    top: "18%",
                    left: "74%",
                    align: "auto",
                    show: true,
                    itemGap: 15,
                    itemWidth: 15,
                    itemHeight: 10,
                    data: seriesData,
                    formatter: function (name) {
                        // console.log(name);
                        return "{a|" + name + "}";
                    },
                    textStyle: {
                        rich: {
                            a: {
                                align: "left",
                                fontSize: 10,
                                color: color,
                                width: 40,
                                //fontWeight: 600,
                                padding: [0, 0, 0, 0],
                            },
                            b: {
                                align: "center",
                                fontSize: 10,
                                color: color,
                                width: 10,
                                //fontWeight: 600,
                                padding: [0, 0, 0, 40],
                            },
                            c: {
                                align: "center",
                                fontSize: 10,
                                color: color,
                                width: 50,
                                //fontWeight: 600,
                                padding: [0, 0, 0, 50],
                            },
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
    width: 100%;
    flex: none;
}

.panel-bottom {
    display: flex;
    flex-direction: row;
    flex: auto;
}

.panel-top-left {
    flex: auto;
}

.panel-top-right {
    flex: none;
}

/*---top-left---*/
.fingernail-wrap {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 1.3875rem;
    margin-top: 0.14rem;
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
    background: url("~@/static/Cut-diagram/31(2).png");
    background-size: 1.275rem 1.3rem;
    background-repeat: no-repeat;
}

.fingernail.bg3 {
    background: url("~@/static/Cut-diagram/31(3).png");
    background-size: 1.275rem 1.3rem;
    background-repeat: no-repeat;
}

.fingernail.bg4 {
    background: url("~@/static/Cut-diagram/31(4).png");
    background-size: 1.275rem 1.3rem;
    background-repeat: no-repeat;
}

.fingernail-top {
    font-size: 0.35rem;
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

/*---top-right---*/

.chart-wrap {
    display: flex;
    justify-content: space-between;
    height: 1.3875rem;
    width: 3.9375rem;
    margin-top: 0.14rem;
}

.chart-wrap > div {
    width: 50%;
    height: 100%;
}

/*---bottom---*/

.panel-bottom > div {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    padding: 0.2rem;
}

.panel-bottom .chart {
    flex: auto;
}
</style>

