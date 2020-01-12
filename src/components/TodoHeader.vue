<template>
    <div id="header">
        <van-nav-bar
                id = "todoNavBar"
                title="待办任务"
                right-text="刷新"
                @click-right="onClickRight"
                fixed
                border
        />
    </div>
</template>

<script>
    export default {
        name: "TodoHeader",
        methods: {
            onClickRight() {
                this.$emit('refreshTodos');
                window.scrollTo(0, 0);
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
    .van-nav-bar__text {
        color: #FFF;
    }
</style>