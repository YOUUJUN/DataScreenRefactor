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

            <template v-slot:HealthAlertHead>
                <health-alert-head></health-alert-head>
            </template>
            <template v-slot:HealthAlertBody>
                <health-alert-body></health-alert-body>
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

const HealthAlertHead = () =>
    import("./modules/rightPanel/HealthAlert/Head.vue");
const HealthAlertBody = () =>
    import("./modules/rightPanel/HealthAlert/Body.vue");

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

        HealthAlertHead,
        HealthAlertBody,
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

@import url("~@/assets/css/common.css");
@import url("~@/assets/css/lucencyComponents.css");


</style>




<style scoped>
#app {
    height: 100vh;
    width: 100vw;
}
</style>
