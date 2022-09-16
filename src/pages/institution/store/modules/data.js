import { fetchSafetyAlarmListByPage, fetchDeviceAlarmListByPage, fetchHealthAlarmListByPage } from "../../api/dataSource.js";

const state = {
    //安全告警列表
    safetyAlarmList: [],

    //设备告警列表
    deviceAlarmList: [],

    //健康告警列表
    healthAlarmList: [],
};

const mutations = {
    /*----安全告警----*/

    SET_SAFETY_ALARM_DATA(state, payload) {
        state.safetyAlarmList = payload;
    },

    ADD_SAFETY_ALARM_DATA(state, payload) {
        state.safetyAlarmList.unshift(payload);
    },

    DELETE_SAFETY_ALARM_DATA(state, payload) {
        let {id} = payload;
        let index = state.safetyAlarmList.findIndex(item => item.id === id)
        state.safetyAlarmList.splice(index,1);
    },

    /*----设备告警----*/
    SET_DEVICE_ALARM_DATA(state, payload) {
        state.deviceAlarmList = payload;
    },

    ADD_DEVICE_ALARM_DATA(state, payload) {
        state.deviceAlarmList.unshift(payload);
    },

    DELETE_DEVICE_ALARM_DATA(state, payload) {
        let {id} = payload;
        let index = state.deviceAlarmList.findIndex(item => item.id === id)
        state.deviceAlarmList.splice(index,1);
    },

    /*----健康告警----*/
    SET_HEALTH_ALARM_DATA(state, payload) {
        state.healthAlarmList = payload;
    },

    ADD_HEALTH_ALARM_DATA(state, payload) {
        state.healthAlarmList.unshift(payload);
    },

    DELETE_HEALTH_ALARM_DATA(state, payload) {
        let {id} = payload;
        let index = state.healthAlarmList.findIndex(item => item.id === id)
        state.healthAlarmList.splice(index,1);
    },
};

const actions = {
    /*----安全告警----*/

    //获取安全告警列表第一页数据
    getSafetyAllarmListPageOne({ state, commit }) {
        return new Promise((resolve, reject) => {
            fetchSafetyAlarmListByPage(1)
                .then((res) => {
                    console.log("res-->", res);
                    if (res.status === 200) {
                        let alarms = res.data.warning_list;
                        if(alarms.length > 0){
                            commit("SET_SAFETY_ALARM_DATA", alarms);
                        }
                    }
                    resolve();
                })
                .catch((err) => {
                    console.log("err", err);
                    reject();
                });
        });
    },

    //添加新安全告警
    addSafetyAlarm({ state, commit }, payload) {
        return new Promise((resolve, reject) => {
            commit("ADD_SAFETY_ALARM_DATA", payload);
        });
    },

    //删除安全告警
    deleteSafetyAlarm({ state, commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            commit("DELETE_SAFETY_ALARM_DATA", payload);
            if(state.safetyAlarmList.length === 2){
                dispatch('getSafetyAllarmListPageOne')
            }
        });
    },

    /*----设备告警----*/

    //获取设备告警列表第一页数据
    getDeviceAllarmListPageOne({ state, commit }) {
        return new Promise((resolve, reject) => {
            fetchDeviceAlarmListByPage(1)
                .then((res) => {
                    console.log("res-->", res);
                    if (res.status === 200) {
                        let alarms = res.data.warning_list;
                        if(alarms.length > 0){
                            commit("SET_DEVICE_ALARM_DATA", alarms);
                        }
                    }
                    resolve();
                })
                .catch((err) => {
                    console.log("err", err);
                    reject();
                });
        });
    },

    //添加新设备告警
    addDeviceAlarm({ state, commit }, payload) {
        return new Promise((resolve, reject) => {
            commit("ADD_DEVICE_ALARM_DATA", payload);
        });
    },

    //删除设备告警
    deleteDeviceAlarm({ state, commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            commit("DELETE_DEVICE_ALARM_DATA", payload);
            if(state.deviceAlarmList.length === 2){
                dispatch('getDeviceAllarmListPageOne')
            }
        });
    },

    /*----健康告警----*/

    //获取健康告警列表第一页数据
    getHealthAllarmListPageOne({ state, commit }) {
        return new Promise((resolve, reject) => {
            fetchHealthAlarmListByPage(1)
                .then((res) => {
                    console.log("res-->", res);
                    if (res.status === 200) {
                        let alarms = res.data.warning_list;
                        if(alarms.length > 0){
                            commit("SET_HEALTH_ALARM_DATA", alarms);
                        }
                    }
                    resolve();
                })
                .catch((err) => {
                    console.log("err", err);
                    reject();
                });
        });
    },

    //添加新健康告警
    addHealthAlarm({ state, commit }, payload) {
        return new Promise((resolve, reject) => {
            commit("ADD_HEALTH_ALARM_DATA", payload);
        });
    },

    //删除健康告警
    deleteHealthAlarm({ state, commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            commit("DELETE_HEALTH_ALARM_DATA", payload);
            if(state.healthAlarmList.length === 2){
                dispatch('getHealthAllarmListPageOne')
            }
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
