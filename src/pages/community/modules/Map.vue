<template>
    <div id="amap" ref="amap"></div>
</template>

<script>
export default {
    data() {
        return {};
    },

    mounted() {
        this.initMap();
    },

    methods: {
        // 初始化地图
        initMap(longitude = 105, latitude = 36, zoom = 4) {
            const map = new AMap.Map("amap", {
                resizeEnable: true,
                center: [longitude, latitude],
                zoom: zoom,
                pitch: 50,
                viewMode: "2D",
                gridSize: 3000,
                mapStyle: "amap://styles/blue",
            });
        },
    },
};
</script>

<style scoped>
    #amap{
        width:100%;
        height:100%;
    }


</style>