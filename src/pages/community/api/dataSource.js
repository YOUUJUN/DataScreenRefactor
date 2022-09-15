import request from "@/utils/web";
import { getAction, postAction } from "@/api/manage";
import qs from 'qs';

//获取机构坐标
export function fetchCenterPoints(){
    return postAction(`/getCenterPoints`)
}

// 获取网关坐标点
export function fetchGatewayPoints(){
    return postAction(`/getGatewayList`)
}

//根据分页数获取未处理安全告警数据
export function fetchSafetyAlarmListByPage(page) {
    return request({
        url: `/datav/fm.warning/11/${page}`,
        method: "post",
        data: qs.stringify({
            alarm_type: "sec_alarm",
        }),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
    });
}

//根据分页数获取未处理设备告警数据
export function fetchDeviceAlarmListByPage(page) {
    return request({
        url: `/datav/fm.warning/11/${page}`,
        method: "post",
        data: qs.stringify({
            alarm_type: "equ_alarm",
        }),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
    });
}

//根据分页数获取未处理健康告警数据
export function fetchHealthAlarmListByPage(page) {
    return request({
        url: `/datav/fm.warning/11/${page}`,
        method: "post",
        data: qs.stringify({
            alarm_type: "hea_alarm",
        }),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
    });
}

//根据告警id处理告警
export function resolveAlarmById(id){
    return postAction(`/updateDetail/fm.warning/${id}`);
}
