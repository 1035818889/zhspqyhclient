<template>
    <div id="header">
        <van-nav-bar
                id = "todoNavBar"
                title="待办任务"
                fixed
                border
        />
    </div>
</template>

<script>
    export default {
        name: "TodoHeader"
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