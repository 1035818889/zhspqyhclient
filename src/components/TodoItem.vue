<template>
    <van-list
            v-model="loading1"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
    >
        <van-cell
                v-for="item in list"
                :key="item.title"
                :title = "item.title"
                :url = "item.touchUrl"
                is-link
                center
        />
    </van-list>
</template>

<script>
    export default {
        data() {
            return {
                list: [],
                loading1: false,
                finished: false,
                apiUrl: this.GLOBAL.serverSrc+'/zhspTodo/getTodos.do'
            };
        },

        methods: {
            onLoad() {
                this.$http.get(this.apiUrl).then(function(response) {
                    this.list=response.data;
                    this.loading1 = false;
                    this.finished = true;
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });

            }/*,
            onRefresh() {
                this.onLoad();
            },
            showTask(param) {
                this.$emit('showTask',param.touchUrl);
            }*/
        }
    }
</script>

<style scoped>
    .van-list {
        padding-top: 50px;
    }
</style>