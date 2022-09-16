<template>
    <div class="card-body-inner">
        <div class="alert-wrap">
            <transition-group
                name="list-complete"
                tag="ul"
                class="alert-list"
                ref="list"
            >
                <li
                    v-for="(item, index) of deviceAlarmList"
                    class="list-complete-item"
                    :key="item"
                >
                    <div class="alert-left">
                        <img :src="warnPic(item)" />
                        <span>{{ item.device_name }}</span>
                    </div>
                    <span class="alert-center">{{ item.alarming_date }}</span>
                    <span class="alert-right">离线</span>
                </li>
            </transition-group>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getWarnImgUrl } from "@/api/dict.js";

export default {
    data() {
        return {

        };
    },

    created() {
        this.setWebSocketLink();
        this.getDeviceAllarmListPageOne();
    },

    computed: {
        ...mapGetters(["deviceAlarmList"]),

        warnPic() {
            return (info) => {
                return getWarnImgUrl(info.alarm_style);
            };
        },
    },

    mounted() {},

    methods: {
        ...mapActions("data", ["getDeviceAllarmListPageOne", "addDeviceAlarm"]),

        updateData(info) {
            console.log("updateData--->device", info);
            let data = info.data[0]
            let tempObj = {
                id : data.id,
                warning_type_name : data.warning_type_name,
                img: '',
                device_name: data.device_name,
                alarm_style: data.alarm_style,
                alarming_date: data.alarming_date,
                ifNew: true,
            };

            this.addDeviceAlarm(tempObj)
            return;
        },

        setWebSocketLink() {
            this.$socket.registerCallBack("handleDeviceAlarm", (e) => {
                try {
                    let obj = JSON.parse(e.data);
                    console.log("obj-->2", obj);
                    if (!obj) {
                        return;
                    }

                    if (
                        obj.operation === "datav_iot_warning" &&
                        obj.belong === "household" && obj.inst_id=== inst_id && obj.data[0].alarm_type === 'equ_alarm'
                    ) {
                        console.log("obj-->2 ok");
                        this.updateData(obj);
                    }
                } catch (err) {
                    console.log("未实现的方法:", e.data);
                }
            })
        },
    },
};
</script>

<style scoped>
.card-body-inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
}

/*---bottom---*/

.alert-wrap {
    display: flex;
    justify-content: space-between;
    padding: 0 0.35rem;
}

.alert-list {
    display: flex;
    width: 100%;
    height: 1.175rem;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    font-size: 0.16rem;
}

.alert-list li {
    width: 100%;
    height: 0.475rem;
    background-image: url("~@/static/Cut-diagram/dikianua.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 0.125rem 0 0.125rem;
    color: #efa963;
    margin: 0.055rem 0;
}

.alert-left {
    display: flex;
    align-items: center;
    height: 100%;
}

.alert-left img {
    width: 0.3125rem;
    height: 0.3125rem;
    margin-right: 0.0625rem;
}

.alert-left span {
    display: block;
    width: 0.75rem;
    height: 0.475rem;
    line-height: 0.475rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>