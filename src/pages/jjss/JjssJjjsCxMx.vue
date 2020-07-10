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
                    <van-steps direction="vertical" inactive-icon="passed" :active="-1">
                        <van-list
                                v-model="loadingZjgss"
                                :finished="finishedZjgss"
                                @load="onLoadZjgss"
                        >
                            <van-step v-for="zjgs in zjgss" :key="zjgs.key">
                                <p>{{zjgs.zjgsName}}</p>
                                <p>{{zjgs.bsf}}</p>
                                <p>{{zjgs.shjecg}}</p>
                                <p>{{zjgs.cgsj}}</p>
                                <p>{{zjgs.zgsj}}</p>
                                <p>{{zjgs.khpf}}</p>
                                <p>{{zjgs.shy}}</p>
                                <p>{{zjgs.zgzyxq}}</p>
                                <p>{{zjgs.cyzgz}}</p>
                            </van-step>
                        </van-list>
                    </van-steps>
                </div>
                <div v-if="activeIndex === 2">
                    <van-list
                            v-model="loadingZlscs"
                            :finished="finishedZlscs"
                            @load="onLoadZlscs"
                    >
                        <van-cell
                                v-for="zlsc in zlscs"
                                :key="zlsc.url"
                                :title = "zlsc.title"
                                is-link
                                center
                                @click="showFile(zlsc.url,'jjssZlsc')"
                        />
                    </van-list>
                </div>
                <div v-if="activeIndex === 3">
                    <van-list
                            v-model="loadingTzxmjss"
                            :finished="finishedTzxmjss"
                            @load="onLoadTzxmjss"
                    >
                        <van-cell
                                v-for="tzxmjs in tzxmjss"
                                :key="tzxmjs.url"
                                :title = "tzxmjs.title"
                                is-link
                                center
                                @click="showFile(tzxmjs.url,'jjssTzxmjs')"
                        />
                    </van-list>
                </div>
                <div v-if="activeIndex === 4">
                    <van-steps direction="vertical" inactive-icon="passed" :active="-1">
                        <van-list
                                v-model="loadingXxgls"
                                :finished="finishedXxgls"
                                @load="onLoadXxgls"
                        >
                            <van-step v-for="xxgl in xxgls" :key="xxgl.key">
                                <p>{{xxgl.type}}</p>
                                <p style="white-space: pre-line;">{{xxgl.title}}</p>
                                <p style="white-space: pre-line;">{{xxgl.wtfk}}</p>
                                <p>{{xxgl.twsj}}</p>
                                <p>{{xxgl.zfsj}}</p>
                                <p>{{xxgl.hdsj}}</p>
                            </van-step>
                        </van-list>
                    </van-steps>
                </div>
                <div v-if="activeIndex === 5">
                    <van-panel>
                        <div>
                            <van-list
                                    v-model="loadingZzzg"
                                    :finished="finishedZzzg"
                                    @load="onLoadZzzg"
                            >
                                <van-cell
                                        v-for="itemzzzg in zzzg"
                                        :key="itemzzzg.title"
                                        :title = "itemzzzg.title"
                                        style="white-space: pre-line;"
                                />
                            </van-list>
                        </div>
                    </van-panel>
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
                items: [{ text: '工程信息' }, { text: '中介公司' }, { text: '资料上传' }, { text: '项目实施批准文件' }, { text: '消息管理' }, { text: '纸质正稿' }, { text: '审批历史' }],
                jbxx: [],
                loadingJbxx: false,
                finishedJbxx: false,
                apiUrlJbxx: this.GLOBAL.serverSrc+'/zhspJjss/getJjssJjjsJbxxById.do',
                zlscs: [],
                loadingZlscs: false,
                finishedZlscs: false,
                apiUrlZlscs: this.GLOBAL.serverSrc+'/zhspJjss/getJjssJjysFjById.do',
                zjgss: [],
                loadingZjgss: false,
                finishedZjgss: false,
                apiUrlZjgss: this.GLOBAL.serverSrc+'/zhspJjss/getZjgsByJjjsId.do',
                tzxmjss: [],
                loadingTzxmjss: false,
                finishedTzxmjss: false,
                apiUrlTzxmjss: this.GLOBAL.serverSrc+'/zhspJjss/getJjssJjysFjById.do',
                xxgls: [],
                loadingXxgls: false,
                finishedXxgls: false,
                apiUrlXxgls: this.GLOBAL.serverSrc+'/zhspJjss/getXxglByBusinessId.do',
                zzzg: [],
                loadingZzzg: false,
                finishedZzzg: false,
                apiUrlZzzg: this.GLOBAL.serverSrc+'/zhspJjss/getJjssZzzgByBusinessId.do',
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
            onLoadZlscs() {
                let businessId = this.$route.query.businessId;
                this.$http.get(this.apiUrlZlscs,{params: {businessId:businessId,type:'zlsc',sslx:'jjjs'}}).then(function(response) {
                    this.zlscs=response.data;
                    this.loadingZlscs = false;
                    this.finishedZlscs = true;
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });

            },
            onLoadTzxmjss() {
                let businessId = this.$route.query.businessId;
                this.$http.get(this.apiUrlTzxmjss,{params: {businessId:businessId,type:'jjssTzxmjs',sslx:'jjjs'}}).then(function(response) {
                    this.tzxmjss=response.data;
                    this.loadingTzxmjss = false;
                    this.finishedTzxmjss = true;
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });

            },
            onLoadZjgss() {
                let businessId = this.$route.query.businessId;
                this.$http.get(this.apiUrlZjgss,{params: {businessId:businessId}}).then(function(response) {
                    this.zjgss=response.data;
                    this.loadingZjgss = false;
                    this.finishedZjgss = true;
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });

            },
            onLoadXxgls() {
                let businessId = this.$route.query.businessId;
                this.$http.get(this.apiUrlXxgls,{params: {businessId:businessId}}).then(function(response) {
                    this.xxgls=response.data;
                    this.loadingXxgls = false;
                    this.finishedXxgls = true;
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });

            },
            onLoadZzzg() {
                let businessId = this.$route.query.businessId;
                this.$http.get(this.apiUrlZzzg,{params: {businessId:businessId}}).then(function(response) {
                    this.zzzg=response.data;
                    this.loadingZzzg = false;
                    this.finishedZzzg = true;
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