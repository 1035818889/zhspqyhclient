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
                is-link
                center
                @click="showTask(item)"
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
                // 异步更新数据
                /*setTimeout(() => {
                    for (let i = 0; i < 10; i++) {
                        let titleS = this.list.length+1+"【区委农村工作领导小组】 《区委农村工作领导小组关于进一步完善社会主义新农村建设长效管理考核验收工作的意见》 【各级单位文件】";
                        let urlS = "about";
                        this.list.push({title:titleS,url:urlS});
                        //this.list.push(i);
                    }
                    // 加载状态结束
                    this.loading = false;

                    // 数据全部加载完成
                    if (this.list.length >= 40) {
                        this.finished = true;
                    }
                }, 500);*/
                this.$http.get(this.apiUrl).then(function(response) {
                    this.list=response.data;
                    this.loading1 = false;
                    this.finished = true;
                    //this.$set('list', response.data);
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });

            },
            showTask(param) {
                this.$emit('showTask',param.touchUrl);
            }
        }
    }
</script>

<style scoped>
    .van-list {
        padding-top: 50px;
    }
</style>