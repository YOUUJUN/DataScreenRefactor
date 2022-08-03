<template>
    <main id="app">
        <layout>
            <template v-slot:map>
                <map-panel></map-panel>
            </template>

            <template v-slot:ElderInfoHead>
                <elder-info-head></elder-info-head>
            </template>
            <template v-slot:ElderInfoBody>
                <elder-info-body></elder-info-body>
            </template>

            <template v-slot:HealthCheckHead>
                <health-check-head></health-check-head>
            </template>
            <template v-slot:HealthCheckBody>
                <health-check-body></health-check-body>
            </template>

            <template v-slot:SafetyCheckHead>
                <safety-check-head></safety-check-head>
            </template>
            <template v-slot:SafetyCheckBody>
                <safety-check-body></safety-check-body>
            </template>

            <template v-slot:DeviceManageHead>
                <device-manage-head></device-manage-head>
            </template>
            <template v-slot:DeviceManageBody>
                <device-manage-body></device-manage-body>
            </template>

            <template v-slot:DataStatisticsHead>
                <data-statistics-head></data-statistics-head>
            </template>
            <template v-slot:DataStatisticsBody>
                <data-statistics-body></data-statistics-body>
            </template>

            <template v-slot:DeviceAlertHead>
                <device-alert-head></device-alert-head>
            </template>
            <template v-slot:DeviceAlertBody>
                <device-alert-body></device-alert-body>
            </template>

            <template v-slot:SafetyAlarmHead>
                <safety-alarm-head></safety-alarm-head>
            </template>
            <template v-slot:SafetyAlarmBody>
                <safety-alarm-body></safety-alarm-body>
            </template>
        </layout>
    </main>
</template>
<script>
const layout = () => import("@/components/layout/Index.vue");
const MapPanel = () => import("./modules/Map.vue");
const ElderInfoHead = () => import("./modules/leftPanel/ElderInfo/Head.vue");
const ElderInfoBody = () => import("./modules/leftPanel/ElderInfo/Body.vue");

const HealthCheckHead = () =>
    import("./modules/leftPanel/HealthCheck/Head.vue");
const HealthCheckBody = () =>
    import("./modules/leftPanel/HealthCheck/Body.vue");

const SafetyCheckHead = () =>
    import("./modules/leftPanel/SafetyCheck/Head.vue");
const SafetyCheckBody = () =>
    import("./modules/leftPanel/SafetyCheck/Body.vue");

const DeviceManageHead = () =>
    import("./modules/centerPanel/DeviceManage/Head.vue");
const DeviceManageBody = () =>
    import("./modules/centerPanel/DeviceManage/Body.vue");

const DataStatisticsHead = () =>
    import("./modules/rightPanel/DataStatistics/Head.vue");
const DataStatisticsBody = () =>
    import("./modules/rightPanel/DataStatistics/Body.vue");

const DeviceAlertHead = () =>
    import("./modules/rightPanel/DeviceAlert/Head.vue");
const DeviceAlertBody = () =>
    import("./modules/rightPanel/DeviceAlert/Body.vue");

const SafetyAlarmHead = () =>
    import("./modules/rightPanel/SafetyAlarm/Head.vue");
const SafetyAlarmBody = () =>
    import("./modules/rightPanel/SafetyAlarm/Body.vue");

export default {
    components: {
        layout,
        MapPanel,
        ElderInfoHead,
        ElderInfoBody,

        HealthCheckHead,
        HealthCheckBody,

        SafetyCheckHead,
        SafetyCheckBody,

        DeviceManageHead,
        DeviceManageBody,

        DataStatisticsHead,
        DataStatisticsBody,

        DeviceAlertHead,
        DeviceAlertBody,

        SafetyAlarmHead,
        SafetyAlarmBody,
    },
    data() {},

    created() {},

    mounted() {
        this.flexible();
    },

    methods: {
        //控制rem
        flexible() {
            var docEl = document.documentElement;
            var dpr = window.devicePixelRatio || 1;

            // adjust body font size
            function setBodyFontSize() {
                if (document.body) {
                    document.body.style.fontSize = 12 * dpr + "px";
                } else {
                    document.addEventListener(
                        "DOMContentLoaded",
                        setBodyFontSize
                    );
                }
            }
            setBodyFontSize();

            // set 1rem = viewWidth / 10
            function setRemUnit() {
                // 这里默认是10等份，手动改为24，此时1rem=1920/24px即80px。（设计稿是1920px的）
                var rem = docEl.clientWidth / 24;
                docEl.style.fontSize = rem + "px";
            }

            setRemUnit();

            // reset rem unit on page resize
            window.addEventListener("resize", setRemUnit);
            window.addEventListener("pageshow", function (e) {
                if (e.persisted) {
                    setRemUnit();
                }
            });

            // detect 0.5px supports
            if (dpr >= 2) {
                var fakeBody = document.createElement("body");
                var testElement = document.createElement("div");
                testElement.style.border = ".5px solid transparent";
                fakeBody.appendChild(testElement);
                docEl.appendChild(fakeBody);
                if (testElement.offsetHeight === 1) {
                    docEl.classList.add("hairlines");
                }
                docEl.removeChild(fakeBody);
            }
        },
    },
};
</script>

<style>
@import url("~@/static/iconfont/iconfont.css");

@font-face {
    font-family: myFirstFont;
    src: url("~@/static/css/UnidreamLED.ttf");
}

* {
    box-sizing: border-box;
}

body,
html {
    position: fixed;
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
    font-size: 80px;
    box-sizing: border-box;
}

p,
ul,
li {
    padding: 0;
    margin: 0;
}

.hide {
    display: none;
}

.fadeIn {
    animation: fadeIn 2s linear forwards;
}
@keyframes fadeIn {
    0% {
        opacity: 0;
        height: 0;
        transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        height: 0.475rem;
        transform: translateY(0);
    }
}
</style>

<style>
/*---lucency-dlg---*/
.el-dialog.lucency-dlg {
    display: flex;
    flex-direction: column;
    width: 10.425rem;
    height: 6.25rem;
    background: none;
    margin-top: 11vh !important;
    box-shadow: none;
}

.el-dialog.lucency-dlg .el-dialog__header {
    flex: none;
    height: 0.625rem;
    background: url("~@/static/cut/dlg-top.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 0;
}

.el-dialog.lucency-dlg .el-dialog__body {
    flex: auto;
    background: url("~@/static/cut/dlg-bottom.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

/*---lucency-table---*/

.lucency-table.el-table tr {
    background: none;
}

.lucency-table.el-table th.el-table__cell {
    background: none;
}

.el-table td.el-table__cell,
.el-table th.el-table__cell.is-leaf {
    border: none !important;
}

.lucency-table.el-table,
.el-table__expanded-cell {
    background: none;
}

.lucency-table.el-table--striped
    .el-table__body
    tr.el-table__row--striped
    td.el-table__cell {
    background: none;
}

.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
    background: none !important;
}

.lucency-table .el-table__row {
    background-color: rgba(5, 27, 50, 0.5) !important;
}

.lucency-table .el-table__row.el-table__row--striped {
    background: none !important;
}

.lucency-table.el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
}

.lucency-table.el-table .el-table__row {
    color: #faaf63;
    text-align: center;
}

.lucency-table.el-table thead {
    color: #2ad9e4;
    font-size: 16px;
}

.lucency-table.el-table .el-table__cell {
    text-align: center;
}

/*---lucency-page---*/
.lucency-page.el-pagination button:disabled {
    background: none;
}

.lucency-page.el-pagination .btn-next,
.lucency-page.el-pagination .btn-prev {
    background: none;
}

.el-pagination .btn-prev > i {
    font-size: 0;
    width: 0.225rem;
    height: 0.225rem;
    padding: 0.0375rem;
    border-radius: 50%;
    background-image: url(~@/static/Cut-diagram/pager_button_left_enable.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.lucency-page.el-pagination .btn-next > i {
    font-size: 0;
    width: 0.225rem;
    height: 0.225rem;
    padding: 0.0375rem;
    border-radius: 50%;
    background-image: url(~@/static/Cut-diagram/pager_button_right_enable.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.lucency-page.el-pagination .el-pager li {
    background: none;
}

.lucency-page.el-pagination {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #a3ccfa;
    margin-top: 0.2rem;
}

.lucency-page.el-pagination .btn-prev:disabled > i {
    font-size: 0;
    background-image: url("~@/static/Cut-diagram/pager_button_left_disable.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.lucency-page.el-pagination .btn-next:disabled > i {
    font-size: 0;
    background-image: url("~@/static/Cut-diagram/pager_button_right_disable.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

/*---lucency-btn---*/
.lucency-btn.el-button {
    width: 1rem;
    border-radius: 0.15rem;
    border-color: transparent;
    background-image: linear-gradient(to right, #2ad7e4, #42affe);
    color: #fff;
    font-size: 0.15rem;
    cursor: pointer;
    background-color: unset;
    padding: 0.08rem;
}
</style>



<style scoped>
#app {
    height: 100vh;
    width: 100vw;
}
</style>
