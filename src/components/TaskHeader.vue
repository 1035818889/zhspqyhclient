<template>
    <div id="taskHeader">
        <van-nav-bar
                id = "taskNavBar"
                fixed
                border
                left-arrow
                left-text=""
                @click-left="onClickLeft"
        />
    </div>
</template>

<script>
    export default {
        name: "TaskHeader",
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
    #todoNavBar {
        color: #FFF;
        background: #379BE9;
    }
    .van-nav-bar__title {
        color: #FFF;
    }
</style>