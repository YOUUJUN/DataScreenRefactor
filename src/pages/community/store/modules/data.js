import { fetchSafetyAlarmListByPage } from "../../api/dataSource.js";

const state = {
    //安全告警列表
    safetyAlarmList: [],
};

const mutations = {

    SET_SAFETY_ALARM_DATA(state, payload){
        state.safetyAlarmList = payload;
    },

    ADD_SAFETY_ALARM_DATA(state, payload){
        // state.safetyAlarmList.splice(0,0, payload);
        state.safetyAlarmList.unshift(payload)
    },

};

const actions = {
    //获取安全告警列表第一页数据
    getSafetyAllarmListPageOne({ state, commit }) {
        return new Promise((resolve, reject) => {
            fetchSafetyAlarmListByPage(1)
                .then((res) => {
                    console.log("res-->", res);
                    if(res.status === 200){
                        let alarms = res.data.warning_list;
                        commit('SET_SAFETY_ALARM_DATA', alarms);
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
    addSafetyAlarm({ state, commit }, payload){
        return new Promise((resolve, reject) => {
            commit('ADD_SAFETY_ALARM_DATA', payload)
        })
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
