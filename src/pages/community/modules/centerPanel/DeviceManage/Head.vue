<template>
    <div class="card-head-inner">
        <div class="card-head-inner-title">
            <i class="custom-icon custom-icon-youshuangjiantou"></i>
            <span>设备管理</span>
        </div>
        <img @click="openDlg()" class="card-head-inner-more" src="~@/static/Cut-diagram/cakansuju.png" />


        <dlg :visible.sync="visible"></dlg>
    </div>
</template>

<script>
const dlg = () => import('./Dlg.vue')

export default {

    components : {
        dlg,
    },

    data(){
        return {
            visible : false,
        }
    },

    methods : {

        openDlg(){
            this.visible = true;
        }

    }

};
</script>

<style scoped>
.card-head-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height:100%;
    padding: 0 0.375rem 0 0.375rem;
}

.card-head-inner-title {
    color: #2ad9e4;
}

.card-head-inner-title > i {
    font-size: 0.23rem;
}

.card-head-inner-title > span {
    font-size: 0.23rem;
}

.card-head-inner-more{
    height: .23rem;
    width: auto;
    cursor:pointer;
}
</style>