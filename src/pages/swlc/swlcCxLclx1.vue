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
                        <van-sidebar-item title="审批历史"/>
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
                                        @click="showFile(lwclyjZw.url,'lwclyjZw')"
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
                                        @click="showFile(lwclyjFj.url,'lwclyjFj')"
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
                                    @click="showFile(wjysZw.url,'swzw')"
                            />
                        </van-list>
                    </van-swipe-item>
                    <van-swipe-item>
                        <van-steps direction="vertical" inactive-icon="passed" :active="-1">
                            <van-list
                                    v-model="loadingHiss"
                                    :finished="finishedHiss"
                                    @load="onLoadHiss"
                            >
                                <van-step v-for="his in hiss" :key="his.key">
                                    <h3>{{his.nodeName}}</h3>
                                    <h3>{{his.cname}}</h3>
                                    <p>{{his.createDate}}</p>
                                    <p>{{his.endDate}}</p>
                                    <p>{{his.yj}}</p>
                                </van-step>
                            </van-list>
                        </van-steps>
                    </van-swipe-item>
                </van-swipe>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    export default {
        name: "SwlcJz",
        data() {
            return {
                activeNames:[],
                jbxx: [],
                loadingJbxx: false,
                finishedJbxx: false,
                apiUrlJbxx: this.GLOBAL.serverSrc+'/zhspSwlc/getWjysById.do',
                swyjs: [],
                loadingSwyj: false,
                finishedSwyj: false,
                apiUrlSwyj: this.GLOBAL.serverSrc+'/zhspSwlc/getSwyjByBusinessId.do',
                activeKey: 0,
                lwclyjZws: [],
                loadingLwclyjZws: false,
                finishedLwclyjZws: false,
                apiUrlLwclyjZws: this.GLOBAL.serverSrc+'/zhspSwlc/getSwfjByBusinessIdAndType.do',
                lwclyjFjs: [],
                loadingLwclyjFjs: false,
                finishedLwclyjFjs: false,
                wjysZws: [],
                loadingWjysZws: false,
                finishedWjysZws: false,
                apiUrlHiss: this.GLOBAL.serverSrc+'/zhspSwlc/getHisTaskByBusinessId.do',
                hiss: [],
                loadingHiss: false,
                finishedHiss: false,
            };
        },
        methods: {
            sidebarClick(index) {
                this.$refs.item.swipeTo(index,{"immediate":true});
                //可以优化成只有综合意见和正文附件tab回到顶部
                window.scrollTo(0, 0);
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
            },
            onLoadHiss() {
                let businessId = this.$route.query.businessId;
                this.$http.get(this.apiUrlHiss,{params: {businessId:businessId}}).then(function(response) {
                    this.hiss=response.data;
                    this.loadingHiss = false;
                    this.finishedHiss = true;
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });
            },
            showFile(fileUrl,fileType) {
                window.parent.showFile(this.GLOBAL.serverSrcPdfView + this.GLOBAL.serverSrc + "/zhspTouchFileOnlineOpen/preview?fileName%3D"+fileUrl+"%26fileType%3D"+fileType);
            }
        }
    }
</script>

<style scoped>

</style>