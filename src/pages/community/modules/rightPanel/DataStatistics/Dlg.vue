<template>
    <el-dialog
        :visible.sync="visible"
        :before-close="handleClose"
        :modal="false"
        custom-class="lucency-dlg"
    >
        <span>这是一段信息</span>

    </el-dialog>
</template>

<script>
export default {
    props : {
        visible : {
            type : String,
            default : false,
        }
    },

    data() {
        return {


        };
    },
    methods: {

        handleClose(){
            this.$emit('update:visible', false)
        }

    },
};
</script>

<style scoped>



</style>