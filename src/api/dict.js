export function getAudioUrl(name) {
    const audioUrl = {
        fall: require("@/static/media/fall.mp3"), // 跌倒告警
        out: require("@/static/media/level_bed.mp3"), // 离床未归
        smoke: require("@/static/media/smoke.mp3"), // 烟雾告警
        gas: require("@/static/media/gas.mp3"), // 燃气告警
        abnormal: require("@/static/media/use_water.mp3"), // 用水异常
        device: "", // 设备离线
        flow: require("@/static/media/water_flow.mp3"), // 水流异常
        emergency: require("@/static/media/urgent.mp3"), // 紧急呼叫
        intelligent_call: require("@/static/media/urgent.mp3"), // 智能呼叫
        heart: require("@/static/media/heart.mp3"), // 心率异常
        breath: require("@/static/media/breath.mp3"), // 呼吸异常
        retention: require("@/static/media/retention.mp3"), //滞留告警
        turn: "",
    };

    if (audioUrl[name]) {
        return `${audioUrl[name]}`;
    } else {
        return "";
    }
}

export function getWarnImgUrl(name) {
    const warnPic = {
        跌倒告警: require("@/static/warning/fall.png"),
        离床未归: require("@/static/warning/out.png"),
        烟雾告警: require("@/static/warning/smoke.png"),
        燃气告警: require("@/static/warning/gas.png"),
        用水异常: require("@/static/warning/abnormal.png"),
        设备离线: require("@/static/warning/device.png"),
        水流异常: require("@/static/warning/flow.png"),
        紧急呼叫: require("@/static/warning/emergency.png"),
        智能呼叫: require("@/static/warning/emergency.png"),
        心率异常: require("@/static/warning/heart.png"),
        呼吸异常: require("@/static/warning/breath.png"),
        翻身护理: require("@/static/warning/turn.png"),
        滞留告警: require("@/static/warning/lingeringAlarm.png"),
    };

    if (warnPic[name]) {
        return `${warnPic[name]}`;
    } else {
        return "";
    }
}
