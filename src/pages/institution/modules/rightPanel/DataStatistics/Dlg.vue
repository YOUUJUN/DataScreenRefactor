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
                    <span>数据统计</span>
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
                <div class="box-wrap">
                    <div class="box">
                        <p class="box-top">告警总数</p>
                        <div class="box-split">
                            <img src="~@/static/Cut-diagram/jxin8.png" />
                        </div>
                        <p class="box-bottom">{{fingernailData.total_warning_count}}</p>
                    </div>

                    <div class="box">
                        <p class="box-top">处理总数</p>
                        <div class="box-split">
                            <img src="~@/static/Cut-diagram/jxin8.png" />
                        </div>
                        <p class="box-bottom">{{fingernailData.total_state_treated_count}}</p>
                    </div>

                    <div class="box">
                        <p class="box-top">未处理总数</p>
                        <div class="box-split">
                            <img src="~@/static/Cut-diagram/jxin8.png" />
                        </div>
                        <p class="box-bottom">{{fingernailData.total_state_untreated_count}}</p>
                    </div>

                    <div class="box">
                        <p class="box-top">网关总数</p>
                        <div class="box-split">
                            <img src="~@/static/Cut-diagram/jxin8.png" />
                        </div>
                        <p class="box-bottom">{{fingernailData.gateway_count}}</p>
                    </div>

                    <div class="box">
                        <p class="box-top">设备总数</p>
                        <div class="box-split">
                            <img src="~@/static/Cut-diagram/jxin8.png" />
                        </div>
                        <p class="box-bottom">{{fingernailData.device_count}}</p>
                    </div>

                    <div class="box">
                        <p class="box-top">今日告警</p>
                        <div class="box-split">
                            <img src="~@/static/Cut-diagram/jxin8.png" />
                        </div>
                        <p class="box-bottom">{{fingernailData.today_warning_count}}</p>
                    </div>

                    <div class="box">
                        <p class="box-top">今日已处理</p>
                        <div class="box-split">
                            <img src="~@/static/Cut-diagram/jxin8.png" />
                        </div>
                        <p class="box-bottom">{{fingernailData.state_treated_count}}</p>
                    </div>

                    <div class="box">
                        <p class="box-top">今日未处理</p>
                        <div class="box-split">
                            <img src="~@/static/Cut-diagram/jxin8.png" />
                        </div>
                        <p class="box-bottom">{{fingernailData.state_untreated_count}}</p>
                    </div>

                    <div class="box">
                        <p class="box-top">设备在线</p>
                        <div class="box-split">
                            <img src="~@/static/Cut-diagram/jxin8.png" />
                        </div>
                        <p class="box-bottom">{{fingernailData.state_online_count}}</p>
                    </div>

                    <div class="box">
                        <p class="box-top">设备离线</p>
                        <div class="box-split">
                            <img src="~@/static/Cut-diagram/jxin8.png" />
                        </div>
                        <p class="box-bottom">{{fingernailData.state_offline_count}}</p>
                    </div>
                </div>
            </div>

            <div class="panel-bottom">
                <div class="panel-bottom-left">
                    <div class="lucency-title">
                        <span>状态统计</span>
                    </div>
                    <div class="chart" ref="bottomLeftChart"></div>
                </div>

                <div class="panel-bottom-right">
                    <div class="lucency-title">
                        <span>级别统计</span>
                    </div>
                    <div
                        class="chart"
                        id="righttu"
                        ref="bottomRightChart"
                    ></div>
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
            fingernailData: {},
        };
    },

    created() {
        let {
            total_warning_count,
            total_state_treated_count,
            total_state_untreated_count,
            gateway_count,
            device_count,
            today_warning_count,
            state_treated_count,
            state_untreated_count,
            state_online_count,
            state_offline_count,
        } = box4;
        this.fingernailData = Object.assign(
            {},
            {
                total_warning_count,
                total_state_treated_count,
                total_state_untreated_count,
                gateway_count,
                device_count,
                today_warning_count,
                state_treated_count,
                state_untreated_count,
                state_online_count,
                state_offline_count,
            }
        );
    },

    methods: {
        initChart() {
            this.$nextTick(() => {
                this.initBottomLeftChart();
                this.initBottomRightChart();
            });
        },

        handleClose() {
            this.$emit("update:visible", false);
        },

        initBottomLeftChart() {
            let chartShell = this.$refs.bottomLeftChart;
            //初始化echarts实例
            let myChart = this.$echarts.init(chartShell);
            //指定图表配置项和数据
            // ------------------------------------------------------------------------------------------
            //做环形图的本质是 radius: ['内半径', '外半径'] 内半径!=0

            let datas = [
                {
                    name: "已处理",
                    value: box4.total_state_treated_count,
                },
                {
                    name: "未处理",
                    value: box4.total_state_untreated_count,
                },
            ];
            let option = {
                title: [
                    {
                        text: "已处理",
                        x: "43%",
                        y: "56%",
                        // fontSize:'9',\
                        // color:'red',
                        textStyle: {
                            color: "#2AD9E4",
                            fontSize: "14",
                        },
                    },
                ],
                // backgroundColor: "#050F2A",
                legend: {
                    itemWidth: 15,
                    itemHeight: 10,
                    right: "left",
                    top: 32,
                    textStyle: {
                        color: "#fff",
                        fontSize: 10,
                    },
                },
                tooltip: {
                    trigger: "item",
                    padding: 0,
                    borderColor: "#02A6FF",
                    backgroundColor: "rgba(18, 56, 95, 0.8)",
                    formatter: function (params) {
                        let str = `<div style="padding:5px 20px 5px 20px;">
                        <div style="color:#02A6FF;text-align:center;font-size:12px">告警总数</div>
                        <div style="width:90%;height:1px;background-image: linear-gradient(to right, rgba(18, 56, 95, 0.5), #02A6FF, rgba(18, 56, 95, 0.5));"></div>
                        <div style="color:#fff;text-align:center;font-size:12px;color:#A3CCFA;">${params.name}:${params.value}(${params.percent}%)</div>
                        </div>`;
                        return str;
                    },
                },
                series: [
                    {
                        top: "20%",
                        // name: '店铺分类占比',
                        type: "pie",
                        radius: ["50%", "90%"],
                        center: ["50%", "50%"],
                        roseType: "radius",
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false,
                            length: 1,
                            length2: 20,
                            smooth: true,
                        },
                        data: [
                            {
                                value: datas[0]["value"],
                                name: datas[0]["name"],
                                itemStyle: {
                                    // color: "rgba(244,201,7,0.7)",
                                    borderColor: "rgba(244,201,7,1)",
                                    borderWidth: 3,

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
                                                    color: "#FFAA15",
                                                },
                                            ]
                                        ),
                                    },
                                },
                            },
                            {
                                value: datas[1]["value"],
                                name: datas[1]["name"],
                                itemStyle: {
                                    // color: "rgba(23,216,161,0.7)",
                                    borderColor: "rgba(23,216,161,1)",
                                    borderWidth: 3,
                                    normal: {
                                        color: new this.$echarts.graphic.LinearGradient(
                                            0,
                                            0,
                                            0,
                                            1,
                                            [
                                                {
                                                    offset: 0,
                                                    color: "#0ECDD7",
                                                },
                                                {
                                                    offset: 1,
                                                    color: "#1F75B3",
                                                },
                                            ]
                                        ),
                                    },
                                },
                            },
                        ],
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

        initBottomRightChart() {
            let chartShell = this.$refs.bottomRightChart;
            //初始化echarts实例
            let myChart = this.$echarts.init(chartShell);
            //指定图表配置项和数据
            // ------------------------------------------------------------------------------------------
            //做环形图的本质是 radius: ['内半径', '外半径'] 内半径!=0

            let datas = [
                {
                    name: "二级告警",
                    value: box4.msg_level_two_alarm_count,
                },
                {
                    name: "一级警告",
                    value: box4.msg_level_one_alarm_count,
                },
            ];
            let option = {
                title: [
                    {
                        text: "一级警告",
                        x: "43%",
                        y: "56%",
                        // fontSize:'9',\
                        // color:'red',
                        textStyle: {
                            color: "#2AD9E4",
                            fontSize: "14",
                        },
                    },
                ],
                // backgroundColor: "#050F2A",
                legend: {
                    itemWidth: 15,
                    itemHeight: 10,
                    right: "left",
                    top: 32,
                    textStyle: {
                        color: "#fff",
                        fontSize: 10,
                    },
                },
                tooltip: {
                    trigger: "item",
                    padding: 0,
                    borderColor: "#02A6FF",
                    backgroundColor: "rgba(18, 56, 95, 0.8)",
                    formatter: function (params) {
                        let str = `<div style="padding:5px 20px 5px 20px;">
                        <div style="color:#02A6FF;text-align:center;font-size:12px">告警类别</div>
                        <div style="width:90%;height:1px;background-image: linear-gradient(to right, rgba(18, 56, 95, 0.5), #02A6FF, rgba(18, 56, 95, 0.5));"></div>
                        <div style="color:#fff;text-align:center;font-size:12px;color:#A3CCFA;">${params.name}:${params.value}(${params.percent}%)</div>
                        </div>`;
                        return str;
                    },
                },
                series: [
                    {
                        top: "20%",
                        // name: '店铺分类占比',
                        type: "pie",
                        radius: ["50%", "90%"],
                        center: ["50%", "50%"],
                        roseType: "radius",
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false,
                            length: 1,
                            length2: 20,
                            smooth: true,
                        },
                        data: [
                            {
                                value: datas[0]["value"],
                                name: datas[0]["name"],
                                itemStyle: {
                                    // color: "rgba(244,201,7,0.7)",
                                    borderColor: "rgba(244,201,7,1)",
                                    borderWidth: 3,

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
                                                    color: "#FFAA15",
                                                },
                                            ]
                                        ),
                                    },
                                },
                            },
                            {
                                value: datas[1]["value"],
                                name: datas[1]["name"],
                                itemStyle: {
                                    // color: "rgba(23,216,161,0.7)",
                                    borderColor: "rgba(23,216,161,1)",
                                    borderWidth: 3,
                                    normal: {
                                        color: new this.$echarts.graphic.LinearGradient(
                                            0,
                                            0,
                                            0,
                                            1,
                                            [
                                                {
                                                    offset: 0,
                                                    color: "#0ECDD7",
                                                },
                                                {
                                                    offset: 1,
                                                    color: "#1F75B3",
                                                },
                                            ]
                                        ),
                                    },
                                },
                            },
                        ],
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

<style scoped>
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
}

.panel-bottom {
    display: flex;
    flex-direction: row;
    flex: auto;
}

/*---top---*/

.panel-top .box-wrap {
    display: flex;
    align-content: space-around;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;
    height: 1.65rem;
    margin-top: 0.13rem;
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

.panel-bottom > div,
.panel-bottom > div {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    padding: 0.2rem;
    padding-bottom: 0;
}

.panel-wrap .chart {
    flex: auto;
}
</style>