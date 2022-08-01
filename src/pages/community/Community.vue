<template>
    <main id="app">

        <layout></layout>

    </main>
</template>
<script>
    const layout = () => import('@/components/layout/Index.vue');

    export default {
        components : {
            layout,
        },
        data() {

        },
        methods : {


        },

        created () {

        },

        mounted() {
            
        }
    };
</script>
<style>

body,html{
    position: relative;
    margin:0;
    padding:0;
    height:100%;
    width:100%;
}



</style>

<style scoped>
#app{
    height: 100vh;
    width: 100vw;
}

</style>
