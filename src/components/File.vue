<template>
    <van-popup
            v-model="fileShow"
            position="top"
            closeable
            close-icon-position = "top-left"
            safe-area-inset-bottom
            :style="{ height: '100%' }"
    >
        <iframe :key="fileUrl" :src="fileUrl" frameborder="0" style="height:90%;width: 100%;margin-top: 15%;"></iframe>
    </van-popup>
</template>

<script>
    export default {
        name: "File",
        data() {
            return {
                fileUrl:"",
                fileShow: false
            }
        },
        methods: {
            showFile(param) {
                this.fileUrl = param;
                // eslint-disable-next-line no-console
                console.info(param);
                this.fileShow = true;
            }
        }
    }
</script>



<style>
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