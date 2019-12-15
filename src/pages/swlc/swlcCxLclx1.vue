<template>
    <div>
        <van-tree-select
                style="padding-bottom: 100px;"
                height="100%"
                :items="items"
                :main-active-index.sync="activeIndex"
        >
            <template slot="content">
                <div v-if="activeIndex === 0">
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
                </div>
                <div v-if="activeIndex === 1">
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
                </div>
                <div v-if="activeIndex === 2">
                    <van-cell-group title="主办人意见">
                        <!-- <van-cell
                                 v-model="zbryj"
                                 center
                         />-->
                        <van-field
                                v-model="zbryj"
                                rows="6"
                                autosize
                                type="textarea"
                                readonly
                        />
                    </van-cell-group>
                    <van-cell-group title="处理意见附件">
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
                                    @click="showFile(lwclyjFj.url,'typyZbryjFj')"
                            />
                        </van-list>
                    </van-cell-group>
                </div>
                <div v-if="activeIndex === 3">
                    <van-steps direction="vertical" inactive-icon="label-o" :active="-1">
                        <van-list
                                v-model="loadingBzzj"
                                :finished="finishedBzzj"
                                @load="onLoadBzzj"
                        >
                            <van-step v-for="bzzj in bzzjs" :key="bzzj.key">
                                <p>{{bzzj.skdwCname}}</p>
                                <p>{{bzzj.bzwh}}</p>
                                <p>{{bzzj.bzxm}}</p>
                                <p>{{bzzj.yskmMc}}</p>
                                <p>{{bzzj.jjkmMc}}</p>
                                <p>{{bzzj.jflxMc}}</p>
                                <p>{{bzzj.bzje}}</p>
                                <p>{{bzzj.bzjc}}</p>
                                <p>{{bzzj.bzbz}}</p>
                            </van-step>
                        </van-list>
                    </van-steps>
                </div>
                <div v-if="activeIndex === 4">
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
                </div>
            </template>
        </van-tree-select>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: 0,
                apiUrlTabs: this.GLOBAL.serverSrc+'/zhspSwlc/getTypyTabs.do',
                items: [],
                jbxx: [],
                zbryj:"",
                apiUrlZbryj: this.GLOBAL.serverSrc+'/zhspSwlc/getTypyZbryj.do',
                loadingJbxx: false,
                finishedJbxx: false,
                apiUrlJbxx: this.GLOBAL.serverSrc+'/zhspSwlc/getWjysByIdForTypy.do',
                activeKey: 0,
                activeNames: ['1'],
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
                apiUrlBzzj: this.GLOBAL.serverSrc+'/zhspSwlc/getTypySjxdbzzj.do',
                bzzjs: [],
                loadingBzzj: false,
                finishedBzzj: false
            };
        },
        created(){
            this.onLoadTabs();
        },
        methods: {
            onLoadTabs() {
                let businessId = this.$route.query.businessId;
                this.$http.get(this.apiUrlTabs,{params: {businessId:businessId}}).then(function(response) {
                    this.items=response.data;
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });

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

                this.$http.get(this.apiUrlZbryj,{params: {businessId:businessId}}).then(function(response) {
                    this.zbryj=response.bodyText;
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
                this.$http.get(this.apiUrlLwclyjZws,{params: {businessId:businessId,type:'typyZbryjFj'}}).then(function(response) {
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
            onLoadBzzj() {
                let businessId = this.$route.query.businessId;
                this.$http.get(this.apiUrlBzzj,{params: {businessId:businessId}}).then(function(response) {
                    this.bzzjs=response.data;
                    this.loadingBzzj = false;
                    this.finishedBzzj = true;
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
    .van-tree-select__nav {
        flex: none;
    }
    .van-sidebar {
        width: 85px;
    }
</style>