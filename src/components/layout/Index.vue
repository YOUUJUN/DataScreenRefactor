<template>
    <section class="root">
        <header class="head-wrap">
            <section class="head">
                <div class="head-left">
                    <div class="log">
                        <img src="@/static/Cut-diagram/slznduix.png" />
                    </div>
                    <div class="time-wrap">
                        <div>{{ time.calendar }}</div>
                        <div class="clock">{{ time.clock }}</div>
                        <div class="week">{{ time.week }}</div>
                    </div>
                </div>

                <div class="head-center">
                    <img
                        class="head-center-huiguang"
                        src="@/static/src/img/huiguang.png"
                        alt=""
                    />
                    <img
                        class="head-center-title"
                        src="@/static/Cut-diagram/title.png"
                    />
                    <!--            智慧养老服务数据平台-->
                </div>

                <div class="head-right">
                    <a
                        href="/web#menu_id=527&action=612"
                        class="head-right-goto"
                        target="_blank"
                        >生命体征检测</a
                    >
                    <div class="head-right-ctrl">
                        <div
                            v-if="!ifFullScreen"
                            class="ctrl-btn full-btn"
                            @click="fullScreen()"
                        ></div>
                        <div
                            v-else
                            class="ctrl-btn exit-btn"
                            @click="exitScreen()"
                        ></div>
                    </div>
                </div>
            </section>
        </header>

        <main class="body-wrap">
            <section class="body-left-wrap">
                <el-scrollbar style="height: 100%;width:100%;">
                    <div class="body-left">
                        <div class="card-wrap">
                            <div class="card">
                                <div class="card-head">
                                    <slot name="ElderInfoHead"></slot>
                                </div>

                                <div class="card-body">
                                    <slot name="ElderInfoBody"></slot>
                                </div>
                            </div>
                        </div>

                        <div class="card-wrap">
                            <div class="card">
                                <div class="card-head">
                                    <slot name="HealthCheckHead"></slot>
                                </div>

                                <div class="card-body">
                                    <slot name="HealthCheckBody"></slot>
                                </div>
                            </div>
                        </div>

                        <div class="card-wrap">
                            <div class="card">
                                <div class="card-head">
                                    <slot name="SafetyCheckHead"></slot>
                                </div>

                                <div class="card-body">
                                    <slot name="SafetyCheckBody"></slot>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-scrollbar>
            </section>

            <section class="body-center">
                <div class="inner-card-wrap">
                    <div class="inner-card">
                        <div class="inner-card-head">
                            <slot name="DeviceManageHead"></slot>
                        </div>

                        <div class="inner-card-body">
                            <slot name="DeviceManageBody"></slot>
                        </div>
                    </div>
                </div>
            </section>

            <section class="body-right-wrap">
                <el-scrollbar style="height: 100%;width:100%;">
                    <div class="body-right">
                        <div class="card-wrap">
                            <div class="card">
                                <div class="card-head">
                                    <slot name="DataStatisticsHead"></slot>
                                </div>

                                <div class="card-body">
                                    <slot name="DataStatisticsBody"></slot>
                                </div>
                            </div>
                        </div>

                        <div class="card-wrap">
                            <div class="card">
                                <div class="card-head">
                                    <slot name="HealthAlertHead"></slot>
                                </div>

                                <div class="card-body">
                                    <slot name="HealthAlertBody"></slot>
                                </div>
                            </div>
                        </div>

                        <div class="card-wrap">
                            <div class="card">
                                <div class="card-head">
                                    <slot name="DeviceAlertHead"></slot>
                                </div>

                                <div class="card-body">
                                    <slot name="DeviceAlertBody"></slot>
                                </div>
                            </div>
                        </div>

                        <div class="card-wrap">
                            <div class="card">
                                <div class="card-head">
                                    <slot name="SafetyAlarmHead"></slot>
                                </div>

                                <div class="card-body">
                                    <slot name="SafetyAlarmBody"></slot>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-scrollbar>
            </section>
        </main>

        <div class="map-wrap">
            <slot name="map"></slot>
        </div>
    </section>
</template>
<script>
export default {
    components: {},
    data() {
        return {
            time: {
                calendar: "",
                clock: "",
                week: "",
            },

            ifFullScreen: false,

            herf_url : '', //生命体征检测跳转
        };
    },
    created() {
        this.displayDate();

        this.herf_url = window.herf_url;
    },

    mounted() {},
    methods: {
        displayDate() {
            let date = new Date();
            let year = date.getFullYear();
            let mouths = date.getMonth() + 1;
            let day = date.getDate();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            let weekDay = new Array(7);
            weekDay[0] = "星期日";
            weekDay[1] = "星期一";
            weekDay[2] = "星期二";
            weekDay[3] = "星期三";
            weekDay[4] = "星期四";
            weekDay[5] = "星期五";
            weekDay[6] = "星期六";
            let wb = year + "-";
            if (mouths < 10) wb += "0";
            wb += mouths + "-";
            if (day < 10) wb += "0";
            wb += day;

            this.time.calendar = wb;
            let bc = hours + ":";
            if (minutes < 10) bc += "0";
            bc += minutes + ":";
            if (seconds < 10) bc += "0";
            bc += seconds;
            this.time.clock = bc;
            this.time.week = weekDay[date.getDay()];
            //获得当前时间,刻度为一千分一秒

            setTimeout(this.displayDate, 1000);
        },

        //全屏
        fullScreen() {
            this.ifFullScreen = true;

            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            }
            //FireFox
            else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            }
            //Chrome等
            else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen();
            }
            //IE11
            else if (document.documentElement.msRequestFullscreen) {
                document.body.msRequestFullscreen();
            }
        },

        //退出全屏
        exitScreen() {
            this.ifFullScreen = false;

            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else {
                window.parent.showTopBottom();
            }
        },
    },
};
</script>

<style>
/*---重写element-ui滚动条样式---*/
.body-left-wrap .el-scrollbar__view, .body-right-wrap .el-scrollbar__view{
    height: 100%;
}
.body-left-wrap .el-scrollbar__bar.is-horizontal, .body-right-wrap .el-scrollbar__bar.is-horizontal {
    display: none;
}

.body-left-wrap .el-scrollbar__wrap, .body-right-wrap .el-scrollbar__wrap{
    overflow-x: hidden;
}
</style>

<style scoped>
.root {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
}

.head-wrap {
    flex: none;
    z-index: 2;
}

.body-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
    overflow: hidden;
    flex: auto;
}

.map-wrap {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
}

/*---页头---*/
.head {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100vw;
    height: 1.0875rem;
    background: url("~@/static/src/img/top.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

/*---left---*/

.head-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 5.568rem;
    /* height: 1.2rem; */
    /* border: 2px solid #0080c0; */
    height: 0.425rem;
    color: #0080c0;
    font-weight: 600;
    margin-left: 0.5rem;
    margin-top: 0.25rem;
}

.log {
    height: 100%;
}

.log img {
    width: 1.525rem;
    height: 0.425rem;
}

.time-wrap {
    display: flex;
    flex: auto;
    height: 100%;
    margin-left: 0.275rem;
    color: #2ad9e4;
    font-size: 0.26rem;
    font-family: myFirstFont;
    letter-spacing: 2px;
    align-items: center;
}

.time-wrap > .clock {
    margin-left: 0.175rem;
}

.time-wrap > .week {
    font-size: 0.22rem;
    margin-left: 0.175rem;
}

/*---center---*/
.head-center > .head-center-title {
    width: 5.975rem;
    height: 0.5125rem;
    margin-top: 0.2875rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

.head-center > .head-center-huiguang {
    width: 10rem;
    height: 1.75rem;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
}

/*---right---*/

.head-right {
    display: flex;
    justify-content: flex-end;
    width: 5rem;
    height: 1.2rem;
}

.head-right-goto {
    width: 1.425rem;
    height: 0.5125rem;
    background: url("~@/static/Cut-diagram/biaok.png");
    background-size: 1.425rem 0.5425rem;
    font-size: 0.175rem;
    color: #2ad9e4;
    line-height: 0.575rem;
    margin-top: 0.2rem;
    text-align: center;
    margin-right: 0.25rem;
    cursor: pointer;
    text-decoration: none;
}

.head-right-ctrl {
    width: 0.325rem;
    height: 0.325rem;
    margin-top: 0.3rem;
    margin-right: 0.625rem;
}

.ctrl-btn {
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.full-btn {
    background: url("~@/static/src/img/fullScreen.png");
    background-size: 0.325rem 0.325rem;
}

.exit-btn {
    background: url("~@/static/src/img/ExitScreen.png");
    background-size: 0.325rem 0.325rem;
}
</style>

<style scoped>
/*---页面主体---*/

.body-left-wrap {
    display: flex;
    flex: none;
    width: 5.3125rem;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding-left: 0.18rem;
    z-index: 2;
}

.body-left {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.body-center {
    flex: auto;
    align-self: flex-end;
    z-index: 2;
}

.body-right-wrap {
    display: flex;
    flex: none;
    width: 5.3125rem;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 0.18rem;
    z-index: 2;
}

.body-right {
    height: 100%;
    display: flex;
    flex-direction: column;
}

/*---left---*/

.card-wrap {
    flex: auto;
    width: 100%;
    padding-bottom: 0.2rem;
}

.card {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.body-left .card-head {
    flex: none;
    width: 100%;
    height: 0.625rem;
    background-image: url("~@/static/cut/card-top.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.body-left .card-body {
    flex: auto;
    width: 100%;
    background-image: url("~@/static/cut/card-bottom.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.body-right .card-head {
    flex: none;
    width: 100%;
    height: 0.525rem;
    background-image: url("~@/static/cut/main-right-top.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.body-right .card-body {
    flex: auto;
    width: 100%;
    background-image: url("~@/static/cut/main-right-bottom.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

/*---center---*/

.inner-card-wrap {
    display: flex;
    align-self: flex-end;
    height: 3.5125rem;
    padding: 0 0.2rem 0.2rem;
}

.inner-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.inner-card-head {
    flex: none;
    width: 100%;
    height: 0.625rem;
    background-image: url("~@/static/cut/main-center-top.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.inner-card-body {
    flex: auto;
    width: 100%;
    background-image: url("~@/static/cut/main-center-bottom.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>