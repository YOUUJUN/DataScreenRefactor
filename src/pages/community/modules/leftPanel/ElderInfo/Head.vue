<template>
    <div class="card-head-inner">
        <div class="card-head-inner-title">
            <i class="custom-icon custom-icon-youshuangjiantou"></i>
            <span>老人基本信息</span>
        </div>
        <img class="card-head-inner-more" src="~@/static/Cut-diagram/cakansuju.png" />
    </div>
</template>

<script>
export default {};
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
</style>