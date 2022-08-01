<template>
    <div class="card-body-inner">
        <div class="fingernail-wrap">
            <div class="fingernail">
                <div class="fingernail-top">13</div>

                <div class="fingernail-bottom">老人总数</div>
            </div>
        </div>

        <div class="chart-wrap">
            <div id="chart-left"></div>

            <div id="chart-right"></div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.card-body-inner {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.fingernail-wrap {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 1.3875rem;
}

.fingernail {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 1.3rem;
    height: 100%;
    background: url("~@/static/Cut-diagram/laorzonsu.png");
    background-repeat: repeat;
    background-size: auto;
    background-size: 1.275rem 1.3rem;
    background-repeat: no-repeat;
}

/*---top---*/

.fingernail-top {
    font-size: .35rem;
    font-family: myFirstFont;
    font-weight: 400;
    color: #2ad9e4;
    letter-spacing: 2px;
    text-shadow: 0 0 5px #2ad9e4;
}

.fingernail-bottom {
	font-size: .15rem;
	font-family: source Han Sans CN;
	font-weight: 400;
	color: #A3CCFA;
	text-align: center;
}
</style>