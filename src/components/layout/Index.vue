<template>
    <section class="root">
        <header class="head-wrap">
            <section class="head">
                <div class="head-left">
                    <div class="log">
                        <img src="@/static/Cut-diagram/slznduix.png" />
                    </div>
                    <div class="time-wrap">
                        <div>2022-08-01</div>
                        <div>11:01:01</div>
                        <div class="week">星期一</div>
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
                    <a class="head-right-goto" target="_blank">生命体征检测</a>
                    <div class="head-right-ctrl">
                        <div class="ctrl-btn" onclick="fullScreen()"></div>
                        <div class="ctrl-btn hide" onclick="exitScreen()"></div>
                    </div>
                </div>
            </section>
        </header>

        <main class="body-wrap">
            <section class="body-left">
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

            <section class="body-right">

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
    data() {},
    methods: {},

    created() {},

    mounted() {},
};
</script>

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
}

.body-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
    overflow: hidden;
    flex: auto;
}

.map-wrap{
    position: absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    z-index: -999;
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
    font-size: 0.24rem;
    font-family: myFirstFont;
    letter-spacing: 2px;
    align-items: center;
}

.time-wrap > .week {
    font-size: 0.2375rem;
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
    background-size: 1.425rem 0.5125rem;
    font-size: 0.175rem;
    color: #2ad9e4;
    line-height: 0.575rem;
    margin-top: 0.2rem;
    text-align: center;
    margin-right: 0.25rem;
    cursor: pointer;
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
    background: url("~@/static/src/img/fullScreen.png");
    background-size: 0.325rem 0.325rem;
    cursor: pointer;
}
</style>

<style scoped>
/*---页面主体---*/

.body-left {
    flex: none;
    width: 5.3125rem;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    padding-left: .18rem;
}

.body-center {
    flex: auto;
    align-self: flex-end;
}

.body-right {
    flex: none;
    width: 5.3125rem;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    padding-right: .18rem;
}

/*---left---*/

.card-wrap {
    flex: auto;
    width: 100%;
    padding-bottom: .2rem;
}

.card {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.body-left .card-head{
    flex:none;
    width: 100%;
    height: .625rem;
    background-image: url("~@/static/src/img/card-top.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.body-left .card-body{
    flex:auto;
    width: 100%;
    background-image: url("~@/static/src/img/card-bottom.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.body-right .card-head{
    flex:none;
    width: 100%;
    height: .525rem;
    background-image: url("~@/static/cut/main-right-top.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.body-right .card-body{
    flex:auto;
    width: 100%;
    background-image: url("~@/static/cut/main-right-bottom.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}



/*---center---*/

.inner-card-wrap{
    display: flex;
    align-self: flex-end;
    height: 3.5125rem;
    padding: 0 .2rem .2rem;
}

.inner-card{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.inner-card-head{
    flex:none;
    width: 100%;
    height: .625rem;
    background-image: url("~@/static/cut/main-center-top.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.inner-card-body{
    flex:auto;
    width: 100%;
    background-image: url("~@/static/cut/main-center-bottom.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}



</style>