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
                    <span>设备管理</span>
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
                <div class="fingernail-wrap">
                    <div class="fingernail">
                        <img
                            class="fingernail-left"
                            src="~@/static/Cut-diagram/wgju.png"
                            alt=""
                        />
                        <div class="fingernail-right">
                            <span class="p1">{{fingernailData.gateway_device}}</span>
                            <span class="p2">网关主机</span>
                        </div>
                    </div>

                    <div class="fingernail">
                        <img
                            class="fingernail-left"
                            src="~@/static/Cut-diagram/jinjianjv.png"
                            alt=""
                        />
                        <div class="fingernail-right">
                            <span class="p1">{{fingernailData.personal_emerg_button}}</span>
                            <span class="p2">紧急按钮</span>
                        </div>
                    </div>

                    <div class="fingernail">
                        <img
                            class="fingernail-left"
                            src="~@/static/Cut-diagram/yanwucgq.png"
                            alt=""
                        />
                        <div class="fingernail-right">
                            <span class="p1">{{fingernailData.fire_sensor}}</span>
                            <span class="p2">烟雾传感器</span>
                        </div>
                    </div>

                    <div class="fingernail">
                        <img
                            class="fingernail-left"
                            src="~@/static/Cut-diagram/raqcgq.png"
                            alt=""
                        />
                        <div class="fingernail-right">
                            <span class="p1">{{fingernailData.gas_sensor}}</span>
                            <span class="p2">燃气传感器</span>
                        </div>
                    </div>

                    <div class="fingernail">
                        <img
                            class="fingernail-left"
                            src="~@/static/Cut-diagram/slcgq.png"
                            alt=""
                        />
                        <div class="fingernail-right">
                            <span class="p1">{{fingernailData.water_flow_sensor}}</span>
                            <span class="p2">水流传感器</span>
                        </div>
                    </div>

                    <div class="fingernail">
                        <img
                            class="fingernail-left"
                            src="~@/static/Cut-diagram/dadjcld.png"
                            alt=""
                        />
                        <div class="fingernail-right">
                            <span class="p1">{{fingernailData.millimeter_wave}}</span>
                            <span class="p2">跌倒检测雷达</span>
                        </div>
                    </div>

                    <div class="fingernail">
                        <img
                            class="fingernail-left"
                            src="~@/static/Cut-diagram/tzcgq.png"
                            alt=""
                        />
                        <div class="fingernail-right">
                            <span class="p1">{{fingernailData.vital_signs_millimeter_wave}}</span>
                            <span class="p2">体征检测雷达</span>
                        </div>
                    </div>

                    <div class="fingernail">
                        <img
                            class="fingernail-left"
                            src="~@/static/Cut-diagram/jclsb.png"
                            alt=""
                        />
                        <div class="fingernail-right">
                            <span class="p1">{{fingernailData.health_device}}</span>
                            <span class="p2">检测类设备</span>
                        </div>
                    </div>

                    <div class="fingernail">
                        <img
                            class="fingernail-left"
                            src="~@/static/Cut-diagram/wjsb.png"
                            alt=""
                        />
                        <div class="fingernail-right">
                            <span class="p1">{{fingernailData.external_device}}</span>
                            <span class="p2">外接设备</span>
                        </div>
                    </div>

                    <div class="fingernail">
                        <img
                            class="fingernail-left"
                            src="~@/static/Cut-diagram/qtsb.png"
                            alt=""
                        />
                        <div class="fingernail-right">
                            <span class="p1">{{fingernailData.other_device}}</span>
                            <span class="p2">其他设备</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="panel-bottom">
                <div class="panel-bottom-left">
                    <div class="lucency-title">
                        <span>安全检测</span>
                    </div>
                    <div class="chart" ref="bottomLeftChart"></div>
                </div>

                <div class="panel-bottom-right">
                    <div class="lucency-title">
                        <span>类别统计</span>
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
            gateway_device,
            personal_emerg_button,
            fire_sensor,
            gas_sensor,
            water_flow_sensor,
            millimeter_wave,
            vital_signs_millimeter_wave,
            health_device,
            external_device,
            other_device,
        } = box8.gateway_device_count;
        this.fingernailData = Object.assign(
            {},
            {
                gateway_device,
                personal_emerg_button,
                fire_sensor,
                gas_sensor,
                water_flow_sensor,
                millimeter_wave,
                vital_signs_millimeter_wave,
                health_device,
                external_device,
                other_device,
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
            let device_status_data = box8.device_status_data;
            let xAxisData = [];
            let option = {
                tooltip: {
                    trigger: "axis",
                    padding: 0,
                    borderColor: "#02A6FF",
                    backgroundColor: "rgba(18, 56, 95, 0.8)",
                    formatter: function (params) {
                        let str = `<div style="padding:5px 20px 5px 20px;">
                <div style="color:#2AD9E4;text-align:center;font-size:12px">${
                    params[1].axisValue
                }</div>
                <div style="width:100%;color:#A3CCFA;font-size:12px;display:flex;justify-content:center;align-items:center;"><span style="width:4px;height:4px;background:#A3CCFA;display:block;margin-right:5px;"></span>总数：${
                    params[0].value + params[1].value
                }</div>
                <div style="width:100%;color:#A3CCFA;font-size:12px;display:flex;justify-content:center;align-items:center;"><span style="width:4px;height:4px;background:#02FFDE;display:block;margin-right:5px;"></span>正常：${
                    params[0].value
                }</div>
                <div style="width:100%;color:#A3CCFA;font-size:12px;display:flex;justify-content:center;align-items:center;"><span style="width:4px;height:4px;background:#FFD725;display:block;margin-right:5px;"></span>离线：${
                    params[1].value
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
                    itemWidth: 10,
                    itemHeight: 10,
                    right: "10%",
                    top: 2,
                    textStyle: {
                        color: "#A3CCFA",
                        fontSize: 10,
                    },
                },
                grid: {
                    left: "10%",
                    right: "4%",
                    bottom: "36%",
                    containLabel: false,
                },
                xAxis: [
                    {
                        type: "category",
                        axisLine: {
                            lineStyle: {
                                color: "#A3CCFA",
                            },
                            formatter: function (value) {
                                return value.split("").join("\n");
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
                            formatter: function (value) {
                                return value.split("").join("\n");
                            },
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
                        name: "正常",
                        // itemStyle: {
                        //     normal: {
                        //         color: '#19E5E8'
                        //     },
                        // },
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
                        type: "bar",
                        stack: "total",
                        barWidth: "20",
                        // data: [320, 302, 301, 334, 390, 330, 320]
                        data: device_status_data.category_online_count_list,
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

        initBottomRightChart() {
            let chartShell = this.$refs.bottomRightChart;
            // _________________________________________________________________________________________________
            let pie_2 = this.$echarts.getInstanceByDom(chartShell);
            // // 如果不存在，就进行初始化
            if (pie_2 == null) {
                pie_2 = this.$echarts.init(chartShell);
            }
            // let circular = ["网关", "毫米波雷达", "生物雷达", "烟雾传感器", '幕帘', '水流传感器', '红外线传感器', '紧急按钮', '燃气传感器', '门磁'];
            // let circularData = [13, 23, 33, 43, 46, 23, 35, 46, 19];
            // //  荷叶数据
            // let dis = ["在线", "离线", '异常'];
            let circular = box8.device_total_data.category_count_name_list;
            let circularData = box8.device_total_data.category_count_list;
            //  荷叶数据
            // let dis = ["在线", "离线",'异常'];
            let dis = box8.device_status.dis;
            let dis_val = box8.device_status.dis_val;
            let color = ["#3FDDFF", "#E66D6D", "#158A9B"];
            let color1 = [
                "#01FFFF",
                "#02A6FF",
                "#58C88D",
                "#FBB265",
                "#F78602",
                "#7E6DFA",
                "#CF3ED4",
                "#01FFA8",
                "#DF6F6F",
                "#C6FF01",
            ];
            //  荷叶图数据
            // let data = [
            //   [23, 66],
            //   [234, 64],
            //   [214, 164],
            //   [214, 64],
            // ];
            let data =
                box8.device_total_data.type_uid_two_offline_online_count_list;
            // dat环形数据的组装
            let dat = [];
            for (let i = 0; i < circular.length; i++) {
                let da = {};
                da.value = circularData[i];
                da.id = i;
                da.name = circular[i];
                da.selected = false;
                da.itemStyle = {
                    color: color1[i],
                };
                da.emphasis = {
                    itemStyle: {
                        // color: "#f8cb17",
                    },
                };
                dat.push(da);
            }
            // dat[0]['selected'] = true
            //  ser荷叶数据的组装
            let ser = [];
            let sers;
            for (let i = 0; i < dis.length; i++) {
                sers = {};
                sers.value = dis_val[i];
                sers.name = dis[i];
                sers.itemStyle = {
                    color: color[i],
                };
                ser.push(sers);
            }
            let EquipmentCategoryoption_2 = {
                tooltip: {
                    trigger: "item",
                    padding: 0,
                    borderColor: "#02A6FF",
                    backgroundColor: "rgba(18, 56, 95, 0.8)",
                    formatter: function (params) {
                        let str = `<div style="padding:5px 20px 5px 20px;">
                <div style="color:#02A6FF;text-align:center;font-size:12px">${params.seriesName}</div>
                <div style="width:90%;height:1px;background-image: linear-gradient(to right, rgba(18, 56, 95, 0.5), #02A6FF, rgba(18, 56, 95, 0.5));"></div>
                <div style="color:#fff;text-align:center;font-size:12px;color:#A3CCFA;">${params.name}:${params.value}(${params.percent}%)</div>
                </div>`;
                        return str;
                    },
                },
                legend: [
                    {
                        orient: "horizontal",
                        x: "",
                        y: "bottom",
                        position: "center",
                        data: circular,
                        textStyle: {
                            color: "#A3CCFA",
                            // itemWidth: 700,
                            borderType: [5, 10],
                            fontSize: 10,
                        },
                        itemGap: 10,
                        itemWidth: 15,
                        itemHeight: 10,
                        left: 60,
                        position: "inner",
                    },
                    {
                        orient: "horizontal",
                        x: "50%",
                        y: "top",
                        position: "right",
                        data: dis,
                        textStyle: {
                            color: "#A3CCFA",
                            fontSize: 10,
                        },
                        itemGap: 5,
                        itemWidth: 10,
                        itemHeight: 10,
                        icon: "circle",
                    },
                ],
                series: [
                    {
                        top: "-10%",
                        bottom: "5%",
                        type: "pie",
                        name: "设备状态",
                        center: ["55%", "50%"],
                        radius: [0, "35%"],
                        label: {
                            // position: "inner",
                            // fontSize: 14,
                            show: false,
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    show: false,
                                },
                            },
                        },
                        data: ser,
                    },
                    {
                        top: "-10%",
                        bottom: "5%",
                        type: "pie",
                        name: "设备分类",
                        selectedMode: "single",
                        center: ["55%", "50%"],
                        radius: ["45%", "60%"],
                        data: dat,
                        label: {
                            show: false,
                        },
                    },
                ],
            };
            // 使用指定的配置项和数据显示图表。
            pie_2.setOption(EquipmentCategoryoption_2);
            //  点击荷叶事件
            pie_2.on("click", function (params) {
                console.log("荷叶事件", params);
                for (let j = 0; j < circular.length; j++) {
                    dat[j].selected = false;
                }
                params.data.selected = true;
                let id = params.data.id;
                let ser = [];
                let sers;
                /*k是循环颜色的变量*/
                // k = 0;
                for (let i = 0; i < dis.length; i++) {
                    sers = {};
                    sers.value = data[id][i];
                    sers.name = dis[i];
                    sers.itemStyle = {
                        color: color[i],
                    };
                    ser.push(sers);
                }
                EquipmentCategoryoption_2.series[0].data = ser;
                pie_2.setOption(EquipmentCategoryoption_2);
            });
            //图标内容大小自适应
            window.addEventListener("resize", function () {
                pie_2.resize();
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
.fingernail-wrap {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: space-between;
    justify-content: space-around;
    width: 100%;
    height: 1.55rem;
    margin-top: 0.14rem;
}

.fingernail {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 1.75rem;
    height: 0.6375rem;
}

.fingernail-left {
    width: 0.675rem;
    height: auto;
}

.fingernail-right {
    display: flex;
    flex-direction: column;
    margin-left: .13rem;
}

.fingernail-right .p1 {
    line-height: 0.225rem;
    font-size: 0.3rem;
    font-family: myFirstFont;
    font-weight: 400;
    color: #00e4ff;
    text-shadow: 0 0 0.125rem #6cc1ed, 0 0 0.25rem #6cc1ed, 0 0 0.375rem #6cc1ed;
}

.fingernail-right .p2 {
    margin-top: 0.125rem;
    line-height: 0.15rem;
    font-size: 0.15rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #a3ccfa;
}

/*---bottom---*/

.panel-bottom > div,
.panel-bottom > div {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    padding: 0.15rem;
    padding-bottom: 0;
}

.panel-wrap .chart {
    flex: auto;
}
</style>