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
        </layout>
    </main>
</template>
<script>
const layout = () => import("@/components/layout/Index.vue");
const MapPanel = () => import("./modules/Map.vue");
const ElderInfoHead = () => import("./modules/leftPanel/ElderInfo/Head.vue");
const ElderInfoBody = () => import("./modules/leftPanel/ElderInfo/Body.vue");

export default {
    components: {
        layout,
        MapPanel,
        ElderInfoHead,
        ElderInfoBody,
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
    position: relative;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    font-size: 80px;
    box-sizing: border-box;
}

.hide {
    display: none;
}
</style>

<style scoped>
#app {
    height: 100vh;
    width: 100vw;
}
</style>
