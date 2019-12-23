<template>

    <van-popup
            v-model="show"
            position="top"
            closeable
            close-icon-position = "top-left"
            safe-area-inset-bottom
            :style="{ height: '100%' }"
            style="overflow-y: hidden;"
    >
        <div class="scroll-wrapper">
        <iframe :key="touchUrl" :src="touchUrl" frameborder="0" style="height:100%;width: 100%;/*margin-top: 55px;*/"></iframe>
        </div>
    </van-popup>

</template>

<script>
    export default {
        name: "Task",
        data() {
            return {
                touchUrl:"",
                show: false
            }
        },
        methods: {
            showTask(param) {
                this.touchUrl = param;
                // eslint-disable-next-line no-console
                console.info(param);
                this.show = true;
            }
        }
    }
</script>

<style>
    .scroll-wrapper {
        margin-top: 55px;
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        top: 0;
        -webkit-overflow-scrolling: touch;
        overflow-y: auto;
    }
    .van-popup__close-icon--top-left {
        top: 10px !important;
        left: 8px !important;
    }
    .van-popup__close-icon {
        position: absolute;
        z-index: 1;
        color: #969799;
        font-size: 20px !important;
        width: 50px !important;
        height: 42px !important;
    }
</style>