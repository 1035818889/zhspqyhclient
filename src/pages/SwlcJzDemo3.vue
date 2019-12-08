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
                            <van-cell is-link center title="关于安排行政事业性资产物业管理相关费用的请示.doc" />
                            <van-cell is-link center title="关于安排行政事业性资产物业管理相关费用的请示.doc" />
                        </van-cell-group>
                        <van-cell-group title="回复附件">
                            <van-cell is-link center title="关于安排行政事业性资产物业管理相关费用的请示.doc" />
                            <van-cell is-link center title="关于安排行政事业性资产物业管理相关费用的请示.doc" />
                        </van-cell-group>
                    </van-swipe-item>
                    <van-swipe-item>
                        <van-cell is-link center title="关于安排行政事业性资产物业管理相关费用的请示.doc" />
                        <van-cell is-link center title="关于安排行政事业性资产物业管理相关费用的请示.doc" />
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

            },
            onClickPass(){

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
                // eslint-disable-next-line no-console
                console.info("测试实施所所所所");
                let businessId = this.$route.query.businessId;
                this.$http.get(this.apiUrlSwyj,{params: {businessId:businessId}}).then(function(response) {
                    this.swyjs=response.data;
                    // eslint-disable-next-line no-console
                    console.info(response.data);
                    this.loadingSwyj = false;
                    this.finishedSwyj = true;
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