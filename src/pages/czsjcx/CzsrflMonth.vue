<template>
    <div>
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
                {{item.mon}}<br/>
                {{item.bnlj}}<br/>
                {{item.qntq}}<br/>
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
                apiUrl: this.GLOBAL.serverSrc+'/zhspCzsjCx/getCzsrflMonthByBm.do',
            };
        },
        methods: {
            onLoad() {
                let bm = this.$route.query.bm;
                let type = this.$route.query.type;
                let rq = this.$route.query.rq;
                let jc = this.$route.query.jc;
                this.$http.get(this.apiUrl,{params: {bm:bm,type:type,rq:rq,jc:jc}}).then(function(response) {
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