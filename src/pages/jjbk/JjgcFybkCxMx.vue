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
                                        style="white-space: pre-line;"
                                />
                            </van-list>
                        </div>
                    </van-panel>
                </div>
                <div v-if="activeIndex === 1">
                    <van-panel>
                        <div>
                            <van-list
                                    v-model="loadingGcjbxx"
                                    :finished="finishedGcjbxx"
                                    @load="onLoadGcjbxx"
                            >
                                <van-cell
                                        v-for="item in gcjbxx"
                                        :key="item.title"
                                        :title = "item.title"
                                        :value = "item.value"
                                        :label = "item.label"
                                        style="white-space: pre-line;"
                                />
                            </van-list>
                        </div>
                    </van-panel>
                </div>
                <div v-if="activeIndex === 2">
                    <van-steps direction="vertical" inactive-icon="passed" :active="-1">
                        <van-list
                                v-model="loadingZjlys"
                                :finished="finishedZjlys"
                                @load="onLoadZjlys"
                        >
                            <van-step v-for="zjly in zjlys" :key="zjly.key">
                                <p>{{zjly.dwmc}}</p>
                                <p>{{zjly.zxyt}}</p>
                                <p>{{zjly.zffs}}</p>
                                <p>{{zjly.sqje}}</p>
                                <p>{{zjly.zbje}}</p>
                                <p>{{zjly.zbye}}</p>
                                <p>{{zjly.zblymc}}</p>
                                <p>{{zjly.yskmmc}}</p>
                                <p>{{zjly.yslxmc}}</p>
                                <p>{{zjly.jflxmc}}</p>
                                <p style="white-space: pre-line;">{{zjly.bz}}</p>
                            </van-step>
                        </van-list>
                    </van-steps>
                </div>
                <div v-if="activeIndex === 3">
                    <van-steps direction="vertical" inactive-icon="passed" :active="-1">
                        <van-list
                                v-model="loadingBkxxs"
                                :finished="finishedBkxxs"
                                @load="onLoadBkxxs"
                        >
                            <van-step v-for="bkxx in bkxxs" :key="bkxx.key">
                                <p>{{bkxx.fymc}}</p>
                                <p>{{bkxx.lxje}}</p>
                                <p>{{bkxx.htje}}</p>
                                <p>{{bkxx.jsje}}</p>
                                <p>{{bkxx.bkje}}</p>
                                <p>{{bkxx.bksj}}</p>
                                <p>{{bkxx.zjly}}</p>
                                <p>{{bkxx.bkbh}}</p>
                                <p>{{bkxx.pz}}</p>
                                <p style="white-space: pre-line;">{{bkxx.bz}}</p>
                            </van-step>
                        </van-list>
                    </van-steps>
                </div>
                <div v-if="activeIndex === 4">
                    <van-cell-group title="发票信息">
                        <van-list
                                v-model="loadingFps"
                                :finished="finishedFps"
                                @load="onLoadFps"
                        >
                            <van-cell
                                    v-for="fp in fps"
                                    :key="fp.url"
                                    is-link
                                    center
                                    @click="showFile(fp.url,'jjbk')"
                            >
                                {{fp.fileName}}<br/>
                                {{fp.fpje}}<br/>
                                {{fp.fpbh}}<br/>
                                {{fp.fphm}}<br/>
                                {{fp.kprq}}<br/>
                                {{fp.bz}}<br/>
                                {{fp.wjdx}}<br/>
                            </van-cell>
                        </van-list>
                    </van-cell-group>
                    <van-cell-group title="附件信息">
                        <van-list
                                v-model="loadingFjs"
                                :finished="finishedFjs"
                                @load="onLoadFjs"
                        >
                            <van-cell
                                    v-for="fj in fjs"
                                    :key="fj.url"
                                    is-link
                                    center
                                    @click="showFile(fj.url,'jjbk')"
                            >
                                {{fj.fileName}}<br/>
                                {{fj.bz}}<br/>
                                {{fj.wjdx}}<br/>
                            </van-cell>
                        </van-list>
                    </van-cell-group>
                </div>
                <div v-if="activeIndex === 5">
                    <van-steps direction="vertical" inactive-icon="passed" :active="-1">
                        <van-list
                                v-model="loadingZjeds"
                                :finished="finishedZjeds"
                                @load="onLoadZjeds"
                        >
                            <van-step v-for="zjed in zjeds" :key="zjed.key">
                                <p>{{zjed.zxyt}}</p>
                                <p>{{zjed.yskm}}</p>
                                <p>{{zjed.yslx}}</p>
                                <p>{{zjed.zbly}}</p>
                                <p>{{zjed.sqje}}</p>
                            </van-step>
                        </van-list>
                    </van-steps>
                </div>
                <div v-if="activeIndex === 6">
                    <van-steps direction="vertical" inactive-icon="passed" :active="-1">
                        <van-list
                                v-model="loadingHiss"
                                :finished="finishedHiss"
                                @load="onLoadHiss"
                        >
                            <van-step v-for="his in hiss" :key="his.key">
                                <p>{{his.nodeName}}</p>
                                <p>{{his.cname}}</p>
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
                items: [{ text: '拨款信息' }, { text: '工程信息' }, { text: '资金来源' }, { text: '实付信息' }, { text: '发票信息' }, { text: '资金额度' }, { text: '审批历史' }],
                jbxx: [],
                loadingJbxx: false,
                finishedJbxx: false,
                apiUrlJbxx: this.GLOBAL.serverSrc+'/zhspJjbk/getJjbkById.do',
                gcjbxx: [],
                loadingGcjbxx: false,
                finishedGcjbxx: false,
                apiUrlGcjbxx: this.GLOBAL.serverSrc+'/zhspJjbk/getXmGcxmByFybkId.do',
                zjlys: [],
                loadingZjlys: false,
                finishedZjlys: false,
                apiUrlZjlys: this.GLOBAL.serverSrc+'/zhspJjbk/getFyzbBySqbId.do',
                bkxxs: [],
                loadingBkxxs: false,
                finishedBkxxs: false,
                apiUrlBkxxs: this.GLOBAL.serverSrc+'/zhspJjbk/getFyBkxxBySqbId.do',
                apiUrlFjs: this.GLOBAL.serverSrc+'/zhspJjbk/getFybkFjBySqbId.do',
                fps: [],
                loadingFps: false,
                finishedFps: false,
                fjs: [],
                loadingFjs: false,
                finishedFjs: false,
                zjeds: [],
                loadingZjeds: false,
                finishedZjeds: false,
                apiUrlZjeds: this.GLOBAL.serverSrc+'/zhspJjbk/getJjbkykjhByFybkId.do',
                apiUrlHiss: this.GLOBAL.serverSrc+'/zhspJjbk/getHisTaskByBusinessId.do',
                hiss: [],
                loadingHiss: false,
                finishedHiss: false
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
            onLoadGcjbxx() {
                let businessId = this.$route.query.businessId;
                this.$http.get(this.apiUrlGcjbxx,{params: {businessId:businessId}}).then(function(response) {
                    this.gcjbxx=response.data;
                    this.loadingGcjbxx = false;
                    this.finishedGcjbxx = true;
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });

            },
            onLoadZjlys() {
                let businessId = this.$route.query.businessId;
                this.$http.get(this.apiUrlZjlys,{params: {businessId:businessId}}).then(function(response) {
                    this.zjlys=response.data;
                    this.loadingZjlys = false;
                    this.finishedZjlys = true;
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });

            },
            onLoadBkxxs() {
                let businessId = this.$route.query.businessId;
                this.$http.get(this.apiUrlBkxxs,{params: {businessId:businessId}}).then(function(response) {
                    this.bkxxs=response.data;
                    this.loadingBkxxs = false;
                    this.finishedBkxxs = true;
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });

            },
            onLoadFps() {
                let businessId = this.$route.query.businessId;
                this.$http.get(this.apiUrlFjs,{params: {businessId:businessId,type:'fp'}}).then(function(response) {
                    this.fps=response.data;
                    this.loadingFps = false;
                    this.finishedFps = true;
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });
            },
            onLoadFjs() {
                let businessId = this.$route.query.businessId;
                this.$http.get(this.apiUrlFjs,{params: {businessId:businessId,type:'fj'}}).then(function(response) {
                    this.fjs=response.data;
                    this.loadingFjs = false;
                    this.finishedFjs = true;
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });
            },
            onLoadZjeds() {
                let businessId = this.$route.query.businessId;
                this.$http.get(this.apiUrlZjeds,{params: {businessId:businessId}}).then(function(response) {
                    this.zjeds=response.data;
                    this.loadingZjeds = false;
                    this.finishedZjeds = true;
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
    .van-tree-select__nav {
        flex: none;
    }
    .van-sidebar {
        width: 85px;
    }
</style>