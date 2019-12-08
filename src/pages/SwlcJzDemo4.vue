<template>
    <div>
        <van-row style="padding-bottom: 65px;">
            <van-col span="6">
                <van-sticky>
                    <van-sidebar v-model="activeKey" @change="sidebarClick">
                        <van-sidebar-item title="基本信息"/>
                        <van-sidebar-item title="科室意见"/>
                        <van-sidebar-item title="综合意见"/>
                        <van-sidebar-item title="正文附件"/>
                    </van-sidebar>
                </van-sticky>
            </van-col>
            <van-col span="18">
                <van-swipe ref="item" :loop="false" :show-indicators="false" :touchable="false">
                    <van-swipe-item>
                        <van-panel>
                            <div>
                                <van-list
                                        v-model="loadingJbxx"
                                        :finished="finishedJbxx"
                                        @load="onLoadJbxx"
                                >
                                    <van-cell
                                            v-for="item in jbxx"
                                            :key="item.title"
                                            :title = "item.title"
                                            :value = "item.value"
                                            :label = "item.label"
                                    />
                                </van-list>
                            </div>
                        </van-panel>
                    </van-swipe-item>
                    <van-swipe-item>
                        <van-collapse v-model="activeNames">
                            <van-list
                                    v-model="loadingSwyj"
                                    :finished="finishedSwyj"
                                    @load="onLoadSwyj"
                            >
                            <van-collapse-item
                                    v-for="swyj in swyjs"
                                    :key="swyj.key"
                                    :title = "swyj.title"
                                    :name = "swyj.key"
                            >
                                <van-cell v-for="yj in swyj.yjs"
                                          :key="yj.key"
                                          :title = "yj.cname"
                                          :label = "yj.label"/>
                            </van-collapse-item>
                            </van-list>
                        </van-collapse>
                    </van-swipe-item>
                    <van-swipe-item>
                        <van-cell-group title="回复正文">
                            <van-list
                                    v-model="loadingLwclyjZws"
                                    :finished="finishedLwclyjZws"
                                    @load="onLoadLwclyjZws"
                            >
                                <van-cell
                                        v-for="lwclyjZw in lwclyjZws"
                                        :key="lwclyjZw.url"
                                        :title = "lwclyjZw.title"
                                        is-link
                                        center
                                />
                            </van-list>
                        </van-cell-group>
                        <van-cell-group title="回复附件">
                            <van-list
                                    v-model="loadingLwclyjFjs"
                                    :finished="finishedLwclyjFjs"
                                    @load="onLoadLwclyjFjs"
                            >
                                <van-cell
                                        v-for="lwclyjFj in lwclyjFjs"
                                        :key="lwclyjFj.url"
                                        :title = "lwclyjFj.title"
                                        is-link
                                        center
                                />
                            </van-list>
                        </van-cell-group>
                    </van-swipe-item>
                    <van-swipe-item>
                        <van-list
                                v-model="loadingWjysZws"
                                :finished="finishedWjysZws"
                                @load="onLoadWjysZws"
                        >
                            <van-cell
                                    v-for="wjysZw in wjysZws"
                                    :key="wjysZw.url"
                                    :title = "wjysZw.title"
                                    is-link
                                    center
                            />
                        </van-list>
                    </van-swipe-item>
                </van-swipe>
            </van-col>
        </van-row>
        <van-goods-action safe-area-inset-bottom style="width: 100%;">
            <van-row style="width: 100%;">
                <van-col span="5">
                    <van-goods-action-button style="border-top-left-radius: 10px;border-bottom-left-radius: 10px;margin-left:0px" type="warning" text="退回" @click="onClickBack" />
                </van-col>
                <van-col span="10">
                    <van-field v-model="value" placeholder="请输入审批意见" />
                </van-col>
                <van-col span="4">
                    <van-goods-action-icon icon="chat-o" text="" @click="onClickSpyj" />
                </van-col>
                <van-col span="5">
                    <van-goods-action-button style="border-top-right-radius: 10px;border-bottom-right-radius: 10px;" type="info" text="同意" @click="onClickPass" />
                </van-col>
            </van-row>
       </van-goods-action>
        <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
    </div>
</template>

<script>
    export default {
        name: "SwlcJz",
        data() {
            return {
                jbxx: [],
                loadingJbxx: false,
                finishedJbxx: false,
                apiUrlJbxx: 'http://19.131.100.156:8089/zhsp/zhsp.qyh.wjysById.action',
                swyjs: [],
                loadingSwyj: false,
                finishedSwyj: false,
                apiUrlSwyj: 'http://19.131.100.156:8089/zhsp/zhsp.qyh.swyj.action',
                activeKey: 0,
                activeNames: ['1'],
                lwclyjZws: [],
                loadingLwclyjZws: false,
                finishedLwclyjZws: false,
                apiUrlLwclyjZws: 'http://19.131.100.156:8089/zhsp/zhsp.qyh.zhspQyhSwlcSwfjController.action',
                lwclyjFjs: [],
                loadingLwclyjFjs: false,
                finishedLwclyjFjs: false,
                wjysZws: [],
                loadingWjysZws: false,
                finishedWjysZws: false,
                apiUrlOperate: 'http://19.131.100.156:8089/zhsp/zhsp.qyh.zhspQyhSwlcLcController.action',
                show: false,
                value:"",
                actions: [
                    { name: '同意。' },
                    { name: '退回。' }
                ]
            };
        },
        methods: {
            sidebarClick(index) {
                this.$refs.item.swipeTo(index,{"immediate":true});
                //可以优化成只有综合意见和正文附件tab回到顶部
                window.scrollTo(0, 0);
            },
            onClickSpyj(){
                this.show=true;
            },
            onClickBack(){
                let businessId = this.$route.query.businessId;
                let taskId = this.$route.query.taskId;
                this.$http.get(this.apiUrlOperate,{
                    params: {businessId:businessId,taskId:taskId,
                        opinion:this.value,submitType:"sendBack",opFunction:"swlcJzOperate"}
                }).then(function(response) {
                    if("SUCCESS"==response.bodyText){
                        this.$toast.success('提交成功！');
                        //this.$router.replace("/");
                        window.top.location.href="/";
                    }else{
                        this.$toast.fail('提交失败，请关闭窗口刷新待办任务！');
                    }
                },function() {
                    this.$toast.fail('提交失败，请关闭窗口刷新待办任务！');
                });
            },
            onClickPass(){
                let businessId = this.$route.query.businessId;
                let taskId = this.$route.query.taskId;
                this.$http.get(this.apiUrlOperate,{
                    params: {businessId:businessId,taskId:taskId,
                        opinion:this.value,submitType:"sendGz",opFunction:"swlcJzOperate"}
                }).then(function(response) {
                    if("SUCCESS"==response.bodyText){
                        this.$toast.success('提交成功！');
                        window.top.location.href="/";
                    }else{
                        this.$toast.fail('提交失败，请关闭窗口刷新待办任务！');
                    }
                },function() {
                    this.$toast.fail('提交失败，请关闭窗口刷新待办任务！');
                });
            },
            onSelect(item) {
                // 默认情况下，点击选项时不会自动关闭菜单
                // 可以通过 close-on-click-action 属性开启自动关闭
                this.show = false;
                this.value = item.name;
            },
            onLoadJbxx() {
                let businessId = this.$route.query.businessId;
                //let taskId = this.$route.query.taskId;
                this.$http.get(this.apiUrlJbxx,{params: {businessId:businessId}}).then(function(response) {
                    this.jbxx=response.data;
                    this.loadingJbxx = false;
                    this.finishedJbxx = true;
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });

            },
            onLoadSwyj() {
                let businessId = this.$route.query.businessId;
                this.$http.get(this.apiUrlSwyj,{params: {businessId:businessId}}).then(function(response) {
                    this.swyjs=response.data;
                    this.loadingSwyj = false;
                    this.finishedSwyj = true;
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });
            },
            onLoadLwclyjZws() {
                let businessId = this.$route.query.businessId;
                this.$http.get(this.apiUrlLwclyjZws,{params: {businessId:businessId,type:'lwclyjZw'}}).then(function(response) {
                    this.lwclyjZws=response.data;
                    this.loadingLwclyjZws = false;
                    this.finishedLwclyjZws = true;
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });
            },
            onLoadLwclyjFjs() {
                let businessId = this.$route.query.businessId;
                this.$http.get(this.apiUrlLwclyjZws,{params: {businessId:businessId,type:'lwclyjFj'}}).then(function(response) {
                    this.lwclyjFjs=response.data;
                    this.loadingLwclyjFjs = false;
                    this.finishedLwclyjFjs = true;
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });
            },
            onLoadWjysZws() {
                let businessId = this.$route.query.businessId;
                this.$http.get(this.apiUrlLwclyjZws,{params: {businessId:businessId,type:'wjysZw'}}).then(function(response) {
                    this.wjysZws=response.data;
                    this.loadingWjysZws = false;
                    this.finishedWjysZws = true;
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

</style>