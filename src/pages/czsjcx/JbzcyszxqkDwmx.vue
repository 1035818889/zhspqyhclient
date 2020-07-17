<template>
    <div>
        <van-notice-bar
            :scrollable="false"
            text="单位明细"
            style="font-size: 18px;"
        />
        <van-list
                v-model="loading"
                :finished="finished"
                 @load="onLoad"
                finished-text="没有更多了"

        >
            <van-cell
                    v-for="item in list"
                    :key="item.key"
                    center
            >
                {{item.ysdwMc}}<br/>
                {{item.zbje}}<br/>
                {{item.zcje}}<br/>
                {{item.zbye}}<br/>
                {{item.zcjd}}<br/>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                apiUrl: this.GLOBAL.serverSrc+'/zhspCzsjCx/getJbzcyszxqkDwmx.do',
            };
        },
        methods: {
            onLoad() {
                let zxytDm = this.$route.query.zxytDm;
                let rq = this.$route.query.rq;
                this.$http.get(this.apiUrl,{params: {zxytDm:zxytDm,rq:rq}}).then(function(response) {
                    this.list=response.data;
                    this.loading = false;
                    this.finished = true;
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });

            }
        }
    }
</script>

<style scoped>
    .van-sidebar {
        width: 85px;
    }
    
</style>