<template>
    <div class="card-body-inner">
        <div class="alert-wrap">
            <!-- <ul class="alert-list" ref="list">
                <li v-for="item of renderData">
                    <div class="alert-left">
                        <img :src="item.img" />
                        <span>{{ item.alarm_style }}</span>
                    </div>
                    <span class="alert-center">{{ item.alarming_date }}</span>
                    <span class="alert-right">{{item.breath_hr}}</span>
                </li>
            </ul> -->
            <transition-group
                name="list-complete"
                tag="ul"
                class="alert-list"
                ref="list"
            >
                <li
                    v-for="(item, index) of healthAlarmList"
                    class="list-complete-item"
                    :key="item"
                >
                    <div class="alert-left">
                        <img :src="warnPic(item)" />
                        <span>{{ item.alarm_style }}</span>
                    </div>
                    <span class="alert-center">{{ item.alarming_date }}</span>
                    <span class="alert-right">{{item.breath_hr}}</span>
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
        this.getHealthAllarmListPageOne();
    },

    computed: {
        ...mapGetters(["healthAlarmList"]),

        warnPic() {
            return (info) => {
                return getWarnImgUrl(info.alarm_style);
            };
        },
    },

    mounted() {},

    methods: {
        ...mapActions("data", ["getHealthAllarmListPageOne", "addHealthAlarm"]),

        updateData(info) {
            console.log("updateData--->health", info);
            let data = info.data[0]
            let tempObj = {
                id : data.id,
                warning_type_name : data.warning_type_name,
                img: '',
                alarm_style: data.alarm_style,
                alarming_date: data.alarming_date,
                breath_hr: data.breath_hr,
                ifNew: true,
            };

            this.addHealthAlarm(tempObj)
            return;
        },

        setWebSocketLink() {
            this.$socket.registerCallBack("handleHealthAlarm", (e) => {
                console.log("e--->", e);
                try {
                    let obj = JSON.parse(e.data);
                    console.log("obj-->1", obj);
                    if (!obj) {
                        return;
                    }

                    if (
                        obj.operation === "datav_iot_warning" &&
                        obj.belong === "household" && obj.inst_id=== inst_id && obj.data[0].alarm_type === 'hea_alarm'
                    ) {
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
    width: 1.2rem;
    height: 0.475rem;
    line-height: 0.475rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>