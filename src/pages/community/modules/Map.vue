<template>
    <div class="map-wrap">
        <div class="audio-wrap" ref="audioWrap" id="audioWrap"></div>
        <div id="amap" ref="amap"></div>
    </div>
</template>

<script>
import { getAction, postAction } from "@/api/manage";

export default {
    data() {
        return {
            center: [105, 36],

            gateWayCount: 0,
            gateWaypoints: [],

            mapWarningMarkersArr: [],
            timerArr: [],
            flag: 0,

            cluster: "",
            markers: [],
        };
    },

    mounted() {
        this.initMap();
        this.fetchData();
    },

    methods: {
        //生成标记，绑定鼠标hover事件
        getMarkers() {
            for (var i = 0; i < points.length; i++) {
                this.markers.push(
                    new AMap.Marker({
                        position: points[i]["lnglat"],
                        gt_id: points[i]["gt_id"],
                        content:
                            ' <div id="weasdw" style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"> </div>',
                        offset: new AMap.Pixel(-15, -15),
                    })
                );
                this.markers[i].code = "";
                this.markers[i].on("mouseover", this.markerClick());
            }
        },

        async fetchData() {
            await this.getCenterPoints();
            await this.getGatewayPoint();
            this.setWebsocketLink();

            this.getMarkers();
            this.addCluster();
        },

        //生成告警语音
        creatAudio(url) {
            // let shell = document.getElementById("audioWrap");
            let shell = this.$refs.audioWrap;
            let audio = document.createElement("audio");
            audio.autoplay = true;
            setTimeout(() => {
                audio.src = url;
            }, 0);

            shell.appendChild(audio);
            audio.play();
        },

        sleep() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 5500);
            });
        },

        //语音告警
        async doTalk(url) {
            this.creatAudio(url);
            await this.sleep();
            console.log("1");
            this.creatAudio(url);
            await this.sleep();
            console.log("1");
            this.creatAudio(url);
        },

        // 初始化地图
        initMap(zoom = 4) {
            const map = new AMap.Map("amap", {
                resizeEnable: true,
                center: this.center,
                zoom: zoom,
                pitch: 50,
                viewMode: "2D",
                gridSize: 3000,
                mapStyle: "amap://styles/blue",
            });
            this.map = map;
        },

        //获取地图渲染中心点,获取机构坐标
        getCenterPoints() {
            return new Promise((resolve, reject) => {
                postAction(`/getCenterPoints`)
                    .then((res) => {
                        console.log("机构", res);
                        let result = res.data;
                        if (res.status === 200) {
                            let longitude = result[0].longitude;
                            let latitude = result[0].latitude;
                            this.center = [longitude, latitude];

                            this.initMap(15);
                            this.markInstitution(result[0]);
                            resolve();
                        }
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },

        // 获取网关坐标
        getGatewayPoint() {
            return new Promise((resolve, reject) => {
                postAction(`/getGatewayList`)
                    .then((res) => {
                        console.log("网关", res);
                        let result = res.data;
                        if (res.status === 200) {
                            this.gateWaypoints = result;
                            this.renderGateWay();
                        }
                        resolve();
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },

        //建立websocket连接
        setWebsocketLink() {
            let ws = new WebSocket(this.$websSite);
            ws.onmessage = (e) => {
                if (typeof e.data !== "string") {
                    return;
                }
                try {
                    let obj = JSON.parse(e.data);
                    if (!obj) {
                        return;
                    }
                    if (
                        obj.operation === "datav_iot_map" &&
                        obj.belong === "household" && obj.inst_id == inst_id
                    ) {
                        //语音告警
                        console.log("alarm_style", obj.data[0].alarm_style);
                        if (obj.data[0].alarm_style != "device") {
                            this.doTalk(obj.data[0].audio_url);
                        }

                        this.mapWarningMarkersArr.push(
                            `datav_iot_map${Date.now().toString()}`
                        );

                        console.log(
                            "mapWarningMarkersArr",
                            this.mapWarningMarkersArr
                        );

                        if (this.flag === 0) {
                            console.log("1--------");
                            this.map.setZoom(20);
                            this.map.setCenter([
                                obj.data[0].longitude,
                                obj.data[0].latitude,
                                20,
                            ]);
                            this.createToast(
                                `datav_iot_map${Date.now().toString()}`,
                                obj
                            );
                        } else {
                            console.log("2--------");
                            if (this.timerArr.length === 0) {
                                this.flag = 0;

                                this.createToast(
                                    `datav_iot_map${Date.now().toString()}`,
                                    obj
                                );
                            } else {
                                this.createToast(
                                    `datav_iot_map${Date.now().toString()}`,
                                    obj
                                );
                            }
                        }
                    }
                } catch (err) {
                    console.log("未实现的方法:", e.data);
                }
            };
        },

        // 标记机构中心点
        markInstitution(info) {
            let mark = new AMap.Marker({
                content: `<div class="shequ-center-pointer">
                     <div class="shequ-center-hover">
                        <div class="shequ-title"><div><span class="shequ-name-icon"></span>机构名称：</div><span>${info.name}</span></div>
                        <div class="shequ-title"><div><span class="wangguan-location-icon"></span>机构位置：</div><span title="${info.address}">${info.address}</span></div>
                        <div class="shequ-title"><div><span class="wangguan-name-icon"></span>网关数量：</div><span>${info.gateway_count}</span></div>
                        <div class="shequ-title"><div><span class="wangguan-device-icon"></span>设备数量：</div><span>${info.device_count}</span></div>
                    </div>
                  </div>`,
                position: this.center,
                offset: new AMap.Pixel(-30, -30),
            });
            this.map.add(mark);
        },

        //渲染网关
        renderGateWay() {
            new AMap.MarkerCluster(this.map, this.gateWaypoints, {
                gridSize: 60, // 聚合网格像素大小
                renderClusterMarker: this._renderClusterMarker, // 自定义聚合点样式
                renderMarker: this._renderMarker,
            });
        },

        //创建弹窗
        createToast(warningMarker, info) {
            console.log("info", info);
            let warningName = warningMarker;
            let toast = `<div id="${warningMarker}" class="map-toast-container">
                    <div class="map-toast-title">${info.data[0].msg_text}</div>
                    <span id="time-${warningMarker}"class="map-toast-time-count">10</span>
                    <div class="map-toast-time"><span>时间</span>${info.data[0].alarming_date}</div>
                    <div class="map-toast-address" title="${info.data[0].device_addr}"><span>地址</span>${info.data[0].device_addr}</div>
                 </div>`;
            let offsetX = this.flag * 5;
            let offsetY = this.flag * 5;
            warningMarker = new AMap.Marker({
                content: toast,
                position: [info.data[0].longitude, info.data[0].latitude],
                offset: new AMap.Pixel(-101.5 + offsetX, -156 + offsetY),
            });
            this.map.add(warningMarker);
            this.flag++;
            this.timeCount(warningName, warningName, function (time) {
                let timeSpan = document.getElementById(`time-${warningName}`);
                timeSpan.innerHTML = time;
            });
        },

        //倒计时
        timeCount(timer, arg, fn) {
            let time = 9;
            let newTimer = setInterval(() => {
                if (time <= 0) {
                    clearInterval(timer);
                    this.deleteToastAndTimer(arg);
                } else {
                    fn(time--);
                }
            }, 1000);
            this.timerArr.push(newTimer);
        },

        // 删除弹窗和定时器
        deleteToastAndTimer(arg) {
            let index = this.mapWarningMarkersArr.indexOf(arg);
            console.log("arg", arg, document.getElementById(arg));
            let element = document.getElementById(arg);
            if (element) {
                element.parentNode.removeChild(element);
            }
            this.mapWarningMarkersArr.splice(index, 1);
            this.timerArr.splice(index, 1);
        },

        //设置聚合
        addCluster(tag) {
            if (this.cluster) {
                this.cluster.setMap(null);
            }
            if (tag == 2) {
                //完全自定义
                this.cluster = new AMap.MarkerClusterer(
                    this.map,
                    this.markers,
                    {
                        gridSize: 80,
                        renderCluserMarker: this._renderCluserMarker,
                        zoomOnClick: false,
                    }
                );
                this.cluster.on("click", this.clickdj); ///点聚合绑定点击事件
            } else {
                //默认样式
                this.cluster = new AMap.MarkerClusterer(
                    this.map,
                    this.markers,
                    {
                        gridSize: 80,
                        zoomOnClick: false,
                    }
                ); //zoomOnclick false点击点聚合点不散开
                // this.cluster.on("mouseover", markerClick1);
            }
        },

        clickdj(e) {
            //点击事件具体操作
            _this = this;
            console.log(this, "he");
            if (e.markers.length > 0) {
                //控制点聚合能在多少个点点击9+9
                let newList = [];
                let dan = document.querySelectorAll("#weasdw");
                var eadaw = document.querySelectorAll(".amap-marker");
                var ooodwi = document.querySelectorAll(".amap-marker-content");
                var yei = [];
                for (var u = 0; u < ooodwi.length; u++) {
                    var iii = ooodwi[u].firstChild;
                    yei.push(iii);
                }
                for (let s = 0; s < yei.length; s++) {
                    if (yei[s].id == "") {
                        yei[s].ondblclick = function () {
                            _this = this;
                            var A = document.querySelector(".amap-marker");
                            var B = document.getElementById("hew");
                            var len = document.querySelectorAll("#hew");
                            if (e.markers.length > 0) {
                                if (len.length > 0) {
                                    B.parentNode.removeChild(B);
                                    addDiv();

                                    // $(".amap-marker-content")
                                    //     .nextAll()
                                    //     .remove();

                                    document.querySelector(
                                        ".amap-marker-content"
                                    ).innerHTML = "";
                                } else if (len.length < 2) {
                                    // B.parentNode.removeChild(B)
                                    addDiv();
                                }
                            }

                            function addDiv() {
                                var echartsdiv = document.createElement("div");
                                echartsdiv.id = "hew";
                                _this.appendChild(echartsdiv);
                                this.wadwa(e.markers.length);
                            }
                        };
                    } else {
                        console.log("eeeee");
                    }
                }
            }
        },

        markerClick(e) {
            var wbejsdw = document.querySelectorAll("#weasdw");
            var tianjd = document.querySelector("#dange");

            var tianjdewf = document.querySelectorAll("#dange");
            for (var p = 0; p < wbejsdw.length; p++) {
                wbejsdw[p].onclick = function () {
                    _this = this;
                    console.log(e.markers[p].De.gt_id, "77777777777777");
                    console.log(e.markers[p].De.position, "88888888888788");
                    var bwysbyw = document.querySelectorAll(".amap-marker");
                    if (bwysbyw.length > 0) {
                        for (var u = 0; u < bwysbyw.length; u++) {
                            bwysbyw[i].classList.remove("#hew");
                        }
                        if (tianjdewf.length > 0) {
                            tianjd.parentNode.removeChild(tianjd);
                            addDiwd();
                        } else {
                            addDiwd();
                        }
                    } else {
                        if (tianjdewf.length > 0) {
                            tianjd.parentNode.removeChild(tianjd);
                            addDiwd();
                        } else {
                            addDiwd();
                        }
                    }

                    function addDiwd() {
                        var echartsdiv = document.createElement("div");
                        echartsdiv.id = "dange";
                        _this.appendChild(echartsdiv);
                        this.dange();
                    }
                };
            }
        },

        //渲染聚合点
        _renderCluserMarker(context) {
            let count = this.markers.length;
            var factor = Math.pow(context.count / count, 1 / 18);
            var div = document.createElement("div");
            var Hue = 180 - factor * 180;
            var bgColor = "hsla(" + Hue + ",100%,50%,0.7)";
            var fontColor = "hsla(" + Hue + ",100%,20%,1)";
            var borderColor = "hsla(" + Hue + ",100%,40%,1)";
            var shadowColor = "hsla(" + Hue + ",100%,50%,1)";
            div.style.backgroundColor = bgColor;
            var size = Math.round(
                30 + Math.pow(context.count / count, 1 / 5) * 20
            );
            div.style.width = div.style.height = size + "px";
            div.style.border = "solid 1px " + borderColor;
            div.style.borderRadius = size / 2 + "px";
            // div.style.boxShadow = '0 0 1px ' + shadowColor;
            div.innerHTML = context.count;
            div.style.lineHeight = size + "px";
            // div.style.color = fontColor;
            div.style.fontSize = "14px";
            div.style.textAlign = "center";
            // console.log(context)
            markerClick2(div, context, size);
        },

        markerClick2(e, context, size) {
            var tt = [];
            context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
            context.marker.setContent(e);
        },

        //自定义标记点样式
        _renderMarker(context) {
            console.log("最终点", context);
            let oneGateWay = `<div class="gateway-min-container">
                            1
                            <div class="gateway-min-hover">
                                <div class="gateway-min-item">
                                    <div>
                                        <div style="width: 100%;display: flex;align-items: center;">
                                            <span class="wangguan-name-icon"></span>
                                            <span style="letter-spacing: 2.8px;">网关名称：</span>
                                        </div>
                                    </div><span style="display: block;width: 52%">${context.data[0].name}</span></div>
                                <div class="gateway-min-item">
                                    <div>
                                        <div style="width: 100%;display: flex;align-items: center;">
                                            <span class="wangguan-location-icon"></span>
                                            <span style="letter-spacing: 2.8px;">网关位置：</span>
                                        </div>
                                    </div>
                                    <span style="display: block;width: 52%">${context.data[0].address}</span></div>
                                <div class="gateway-min-item">
                                    <div>
                                        <div style="width: 100%;display: flex;align-items: center;">
                                            <span class="wangguan-device-icon"></span>
                                            <span style="letter-spacing: 2.8px;">设备数量：</span>
                                        </div>
                                    </div><span style="display: block;width: 52%">${context.data[0].device_count}</span></div>
                                <div class="gateway-min-item"><div><div style="width: 100%;display: flex;align-items: center;"><span class="wangguan-jinjilianxiren-icon"></span><span>紧急联系人：</div></div></span><span style="display: block;width: 52%">${context.data[0].new_emergency_call}</span></div>
                                <div class="gateway-min-item"><div><div style="width: 100%;display: flex;align-items: center;"><span class="wangguan-wanggeyuan-icon"></span><span>网格员电话：</div></div></span><span style="display: block;width: 52%">${context.data[0].grid_member_telephone}</span></div>
                            </div>
                          </div>`;
            let offset = new AMap.Pixel(-9, -9);
            context.marker.setContent(oneGateWay);
            context.marker.setOffset(offset);
        },

        //自定义聚合点样式
        _renderClusterMarker(context) {
            let count = this.markers.length;
            console.log("内容", context);
            // 聚合中点个数
            var clusterCount = context.count;
            var div = document.createElement("div");
            // 聚合点配色
            var defaultColor = [
                "185, 65, 39",
                "185, 65, 39",
                "185, 65, 39",
                "185, 65, 39",
                "185, 65, 39",
            ];
            let bgColor = "";
            if (clusterCount >= 0 && clusterCount < 10) {
                bgColor = defaultColor[0];
            } else if (clusterCount >= 10 && clusterCount < 100) {
                bgColor = defaultColor[1];
            } else if (clusterCount >= 100 && clusterCount < 1000) {
                bgColor = defaultColor[2];
            } else if (clusterCount >= 1000 && clusterCount < 10000) {
                bgColor = defaultColor[3];
            } else if (clusterCount >= 10000) {
                bgColor = defaultColor[4];
            }
            div.style.backgroundColor = "rgba(" + bgColor + ",.5)";
            var size = Math.round(
                25 + Math.pow(clusterCount / count, 1 / 5) * 40
            );
            div.style.width = div.style.height = size + "px";
            div.style.border = "solid 1px rgba(" + bgColor + ",1)";
            div.style.borderRadius = size / 2 + "px";
            div.innerHTML = context.count;
            div.style.lineHeight = size + "px";
            div.style.color = "#ffffff";
            div.style.fontSize = "12px";
            div.style.textAlign = "center";
            div.style.position = "relative";
            let divToast = document.createElement("div");
            divToast.classList.add("gateway-toast-container");
            divToast.style.display = "none";
            div.appendChild(divToast);
            div.onmouseleave = function () {
                divToast.style.display = "none";
            };
            div.addEventListener("mouseover", function () {
                console.log(context);
                let divToastContent = "";
                // 判断聚合点在页面上点位置
                if (
                    context.clusterData[0]._amapMarker.posContainer.y <= 240 &&
                    context.clusterData[0]._amapMarker.posContainer.x > 945
                ) {
                    divToast.style.top = 0;
                    divToast.style.left = "-3.25rem";
                }
                if (
                    context.clusterData[0]._amapMarker.posContainer.y <= 240 &&
                    context.clusterData[0]._amapMarker.posContainer.x <= 945
                ) {
                    divToast.style.top = 0;
                    divToast.style.left = "1.175rem";
                }
                if (
                    context.clusterData[0]._amapMarker.posContainer.y > 240 &&
                    context.clusterData[0]._amapMarker.posContainer.y <= 420 &&
                    context.clusterData[0]._amapMarker.posContainer.x <= 945
                ) {
                    divToast.style.top = "50%";
                    divToast.style.transform = "translateY(-50%)";
                    divToast.style.left = "1.175rem";
                }
                if (
                    context.clusterData[0]._amapMarker.posContainer.y > 240 &&
                    context.clusterData[0]._amapMarker.posContainer.y <= 420 &&
                    context.clusterData[0]._amapMarker.posContainer.x > 945
                ) {
                    divToast.style.top = "50%";
                    divToast.style.transform = "translateY(-50%)";
                    divToast.style.left = "-3.25rem";
                }
                if (
                    context.clusterData[0]._amapMarker.posContainer.y > 420 &&
                    context.clusterData[0]._amapMarker.posContainer.x > 945
                ) {
                    divToast.style.bottom = 0;
                    divToast.style.left = "-3.25rem";
                }
                if (
                    context.clusterData[0]._amapMarker.posContainer.y > 420 &&
                    context.clusterData[0]._amapMarker.posContainer.x <= 945
                ) {
                    divToast.style.bottom = 0;
                    divToast.style.left = "1.175rem";
                }

                for (
                    let j = 0;
                    j < context.clusterData[0]._amapMarker.originData[0].length;
                    j++
                ) {
                    divToastContent += `<div class="gateway-item-container">
                                         <div class="gateway-item">
                                            <div>
                                                <div style="width: 100%;display: flex;align-items: center;">
                                                    <span class="wangguan-name-icon"></span>
                                                    <span style="letter-spacing: 2.8px;">网关名称：</span>
                                                </div>
                                            </div>
                                            <span style="display: block;width: 55%">${context.clusterData[0]._amapMarker.originData[0][j].name}</span>
                                         </div>
                                         <div class="gateway-item">
                                            <div>
                                                <div style="width: 100%;display: flex;align-items: center;">
                                                    <span class="wangguan-location-icon"></span>
                                                    <span style="letter-spacing: 2.8px;">网关位置：</span>
                                                </div>
                                            </div><span style="display: block;width: 55%">${context.clusterData[0]._amapMarker.originData[0][j].address}</span></div>
                                         <div class="gateway-item">
                                            <div>
                                                <div style="width: 100%;display: flex;align-items: center;">
                                                    <span class="wangguan-device-icon"></span>
                                                    <span style="letter-spacing: 2.8px;">设备数量：</span>
                                                </div>
                                            </div><span style="display: block;width: 55%">${context.clusterData[0]._amapMarker.originData[0][j].device_count}</span></div>
                                         <div class="gateway-item"><div><div style="width: 100%;display: flex;align-items: center;"><span class="wangguan-jinjilianxiren-icon"></span><span>紧急联系人：</div></div></span><span style="display: block;width: 55%">${context.clusterData[0]._amapMarker.originData[0][j].new_emergency_call}</span></div>
                                         <div class="gateway-item"><div><div style="width: 100%;display: flex;align-items: center;"><span class="wangguan-wanggeyuan-icon"></span><span>网格员电话：</div></div></span><span style="display: block;width: 55%">${context.clusterData[0]._amapMarker.originData[0][j].grid_member_telephone}</span></div>
                                         <div class="gateway-line"></div>
                                    </div>`;
                }
                divToast.innerHTML = divToastContent;
                // gateWayToast.style.left = `${context.clusterData[0]._amapMarker.posContainer.x + 10}px`;
                // gateWayToast.style.top = `${context.clusterData[0]._amapMarker.posContainer.y + 10}px`;
                divToast.style.display = "block";
            });
            context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
            context.marker.setContent(div);

            //鼠标移入弹窗禁用地图缩放
            divToast.addEventListener("mousemove", () => {
                this.map.setStatus({ scrollWheel: false });
            });
            //点击地图弹窗隐藏，地图缩放放开
            this.map.on("click", () => {
                divToast.style.display = "none";
                this.map.setStatus({ scrollWheel: true });
            });
        },

        wadwa(a) {
            //初始化echarts实例
            var myChart = this.$echarts.init(document.querySelector("#hew"));
            //指定图表配置项和数据
            var colors = [
                "#04FDB8",
                "#04FDB8",
                "#04FDB8",
                "#04FDB8",
                "#04FDB8",
                "#04FDB8",
                "#04FDB8",
                "#04FDB8",
                "#04FDB8",
                "#04FDB8",
            ];
            var getdata = function getData() {
                let data = {
                    name: "网关综合",
                    value: 0,
                    children: [],
                    widan:
                        "机构名称：泛米" +
                        `<br/>` +
                        "机构位置：地址" +
                        `<br/>` +
                        "网关数量：" +
                        a +
                        `<br/>` +
                        "设备数量：7",
                    mawwebb: "",
                };
                for (let i = 1; i <= a; i++) {
                    let obj = {
                        name: "网关" + i,
                        value: i,
                        children: [],
                        widan:
                            "网关名称：网关" +
                            `<br/>` +
                            "网关位置：地址" +
                            `<br/>` +
                            "设备数量：7",
                        mawwebb: "",
                    };
                    for (let j = 1; j <= 10; j++) {
                        var widn = [
                            "",
                            "跌倒监测雷达",
                            "体征监测雷达",
                            "燃气传感器",
                            "烟雾传感器",
                            "水流传感器",
                            "紧急呼叫按钮",
                        ];
                        let obj2 = {
                            name: `用户-${i}-${j}-`,
                            value: 1 + "-" + i + "-" + j,
                            widan: "设备名称：" + widn[i],
                            mawwebb: "设备状态：在线",
                        };

                        obj.children.push(obj2);
                    }
                    data.children.push(obj);
                }
                let arr = [];
                arr.push(data);
                //
                arr = handle(arr, 0);
                return arr;
            };
            var handle = function handleData(data, index, color = "#00f6ff") {
                //index标识第几层
                return data.map((item, index2) => {
                    //计算出颜色
                    if (index == 1) {
                        color = colors.find((item, eq) => eq == index2 % 10);
                    }
                    if (index == 2) {
                        color = "#04FDB8";
                    }
                    // 设置节点大小
                    if (index === 0 || index === 1) {
                        item.label = {
                            position: "inside",
                            //   rotate: 0,
                            //   borderRadius: "50%",
                        };
                    }
                    // 设置label大小
                    switch (index) {
                        case 0:
                            item.symbolSize = 70;
                            break;
                        case 1:
                            item.symbolSize = 50;
                            break;
                        default:
                            item.symbolSize = 30;
                            break;
                    }
                    // 设置线条颜色
                    item.lineStyle = { color: color };
                    if (item.children) {
                        //存在子节点
                        item.itemStyle = {
                            borderColor: color,
                            color: color,
                        };
                        item.children = handle(item.children, index + 1, color);
                    }
                    return item;
                });
            };
            var option = {
                type: "tree",
                // backgroundColor: "#000",
                toolbox: {
                    //工具栏
                    show: true,
                    iconStyle: {
                        borderColor: "#03ceda",
                    },
                    feature: {
                        restore: {},
                    },
                },
                tooltip: {
                    //提示框
                    trigger: "item",
                    textStyle: {
                        fontSize: 10,
                    },
                    formatter: function (params) {
                        console.log(params.data.mawwebb);
                        var res = params.data.widan + "<br/>";
                        res += params.data.mawwebb + "<br/>";
                        return res;
                    },
                },
                series: [
                    {
                        type: "tree",
                        hoverAnimation: true, //hover样式
                        data: getdata(),
                        top: "10%",
                        bottom: "10%",
                        left: "10%",
                        right: "10%",
                        layout: "radial",
                        symbol: "circle",
                        symbolSize: 10,
                        nodePadding: 20,
                        animationDurationUpdate: 750,
                        expandAndCollapse: true, //子树折叠和展开的交互，默认打开
                        initialTreeDepth: 1,
                        roam: false, //是否开启鼠标缩放和平移漫游。scale/move/true
                        // focusNodeAdjacency: true,
                        emphasis: {
                            focus: "ancestor",
                            lineStyle: {
                                width: 10,
                            },
                        },
                        itemStyle: {
                            borderColor: "#03ceda",
                        },
                        label: {
                            //标签样式
                            color: "#fff",
                            fontSize: 10,
                            fontFamily: "SourceHanSansCN",
                            position: "inside",
                            rotate: 0,
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

        dange() {
            //初始化echarts实例
            var num = 77.8;
            var myChart = this.$echarts.init(document.querySelector("#dange"));
            //指定图表配置项和数据
            var colors = [
                "#04FDB8",
                "#04FDB8",
                "#04FDB8",
                "#04FDB8",
                "#04FDB8",
                "#04FDB8",
                "#04FDB8",
                "#04FDB8",
                "#04FDB8",
                "#04FDB8",
            ];
            var getdata = function getData() {
                let data = {
                    name: "网关",
                    value: 0,
                    children: [],
                    widan:
                        "网关名称：新网关" +
                        `<br/>` +
                        "网关位置：地址" +
                        `<br/>` +
                        "设备数量：7",
                    mawwebb: "",
                };
                for (let i = 1; i <= 6; i++) {
                    var widn = [
                        "",
                        "跌倒监测雷达",
                        "体征监测雷达",
                        "燃气传感器",
                        "烟雾传感器",
                        "水流传感器",
                        "紧急呼叫按钮",
                    ];
                    let obj = {
                        name: "设备" + i,
                        value: i,
                        children: [],
                        widan: "设备名称：" + widn[i],
                        mawwebb: "设备状态：在线",
                    };
                    data.children.push(obj);
                }
                let arr = [];
                arr.push(data);
                arr = handle(arr, 0);
                return arr;
            };
            var handle = function handleData(data, index, color = "#00f6ff") {
                //index标识第几层
                return data.map((item, index2) => {
                    //计算出颜色
                    if (index == 1) {
                        color = colors.find((item, eq) => eq == index2 % 10);
                    }
                    if (index == 2) {
                        color = "#04FDB8";
                    }
                    // 设置节点大小
                    if (index === 0 || index === 1) {
                        item.label = {
                            position: "inside",
                        };
                    }
                    // 设置label大小
                    switch (index) {
                        case 0:
                            item.symbolSize = 70;
                            break;
                        case 1:
                            item.symbolSize = 50;
                            break;
                        default:
                            item.symbolSize = 30;
                            break;
                    }
                    // 设置线条颜色
                    item.lineStyle = { color: color };
                    if (item.children) {
                        //存在子节点
                        item.itemStyle = {
                            borderColor: color,
                            color: color,
                        };
                        item.children = handle(item.children, index + 1, color);
                    }
                    return item;
                });
            };
            var option = {
                type: "tree",
                // backgroundColor: "#000",
                toolbox: {
                    //工具栏
                    show: true,
                    iconStyle: {
                        borderColor: "#03ceda",
                    },
                    feature: {
                        restore: {},
                    },
                },
                tooltip: {
                    //提示框
                    trigger: "item",
                    textStyle: {
                        fontSize: 10,
                    },
                    formatter: function (params) {
                        console.log(params.data.mawwebb);
                        var res = params.data.widan + "<br/>";
                        res += params.data.mawwebb + "<br/>";
                        return res;
                    },
                },
                series: [
                    {
                        type: "tree",
                        hoverAnimation: true, //hover样式
                        data: getdata(),
                        top: "10%",
                        bottom: "10%",
                        left: "10%",
                        right: "10%",
                        layout: "radial",
                        symbol: "circle",
                        symbolSize: 10,
                        nodePadding: 20,
                        animationDurationUpdate: 750,
                        expandAndCollapse: true, //子树折叠和展开的交互，默认打开
                        initialTreeDepth: 2,
                        roam: false, //是否开启鼠标缩放和平移漫游。scale/move/true
                        // focusNodeAdjacency: true,
                        emphasis: {
                            focus: "ancestor",
                            lineStyle: {
                                width: 10,
                            },
                        },
                        itemStyle: {
                            borderColor: "red",
                        },
                        label: {
                            //标签样式
                            color: "red",
                            fontSize: 10,
                            fontFamily: "SourceHanSansCN",
                            position: "inside",
                            rotate: 0,
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

<style>
@import url("~@/assets/css/lucencyMap.css");
</style>

<style scoped>
.map-wrap,
#amap {
    width: 100%;
    height: 100%;
}
</style>