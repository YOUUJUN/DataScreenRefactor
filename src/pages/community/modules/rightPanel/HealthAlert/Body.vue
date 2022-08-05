<template>
    <div class="card-body-inner">
        <div class="alert-wrap">
            <ul class="alert-list">
                <li v-for="item of renderData" :class="{ fadeIn: item.ifNew }">
                    <div class="alert-left">
                        <img :src="item.img" />
                        <span>{{ item.alarm_style }}</span>
                    </div>
                    <span class="alert-center">{{ item.alarming_date }}</span>
                    <span class="alert-right">{{item.breath_hr}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            renderData: [],
        };
    },

    created() {
        this.initRenderData();
        this.setWebSocketLink();
    },

    mounted() {},

    methods: {
        //初始化渲染数据
        initRenderData() {
            let dataSource = box5;

            this.renderData = dataSource.warning_two;
        },

        updateData(info) {
            let tempObj = {
                img: info.data[0].img,
                alarm_style: info.data[0].alarm_style,
                alarming_date: info.data[0].alarming_date,
                breath_hr: info.data[0].breath_hr,
                ifNew: true,
            };

            this.renderData.unshift(tempObj);
        },

        setWebSocketLink() {
            let ws = new WebSocket(this.$websSite);
            ws.onmessage = function (e) {
                try {
                    let obj = JSON.parse(e.data);
                    if (!obj) {
                        return;
                    }

                    if (
                        obj.operation === "datav_iot_warning" &&
                        obj.belong === "nursing"
                    ) {
                        this.updateData(obj);
                    }
                } catch (err) {
                    console.log("未实现的方法:", e.data);
                }
            };
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