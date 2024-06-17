<template>
    <div id="header">
        <van-nav-bar
                id = "todoNavBar"
                title="待办任务"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
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
            },
            onClickLeft() {
                window.top.location.href="/#/ssczzhxt";
            }
        }
    }
</script>

<style scoped>
    #todoNavBar {
        background: whitesmoke;
    }

</style>