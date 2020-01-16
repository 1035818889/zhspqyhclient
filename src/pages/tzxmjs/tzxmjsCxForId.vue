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
                                v-model="loadingHiss"
                                :finished="finishedHiss"
                                @load="onLoadHiss"
                        >
                            <van-step v-for="his in hiss" :key="his.key">
                                <h3>{{his.nodeName}}</h3>
                                <h3>{{his.cname}}</h3>
                                <p>{{his.endDate}}</p>
                                <p style="white-space: pre-line;">{{his.yj}}</p>
                            </van-step>
                        </van-list>
                    </van-steps>
                </div>
                <div v-if="activeIndex === 2">
                    <van-list
                            v-model="loadingSsqks"
                            :finished="finishedSsqks"
                            @load="onLoadSsqks"
                    >
                        <van-cell
                                v-for="ssqk in ssqks"
                                :key="ssqk.url"
                                :title = "ssqk.title"
                                is-link
                                center
                                @click="showFile(ssqk.url,'tzxmjs')"
                        />
                    </van-list>
                </div>
                <div v-if="activeIndex === 3">
                    <van-list
                            v-model="loadingGdfjs"
                            :finished="finishedGdfjs"
                            @load="onLoadGdfjs"
                    >
                        <van-cell
                                v-for="gdfj in gdfjs"
                                :key="gdfj.url"
                                :title = "gdfj.title"
                                is-link
                                center
                                @click="showFile(gdfj.url,'tzxmjs')"
                        />
                    </van-list>
                </div>
                <div v-if="activeIndex === 4">
                    <van-cell-group title="附件(建设单位)">
                        <van-list
                                v-model="loadingJsdwFjs"
                                :finished="finishedJsdwFjs"
                                @load="onLoadJsdwFjs"
                        >
                            <van-cell
                                    v-for="jsdwFj in jsdwFjs"
                                    :key="jsdwFj.url"
                                    :title = "jsdwFj.title"
                                    is-link
                                    center
                                    @click="showFile(jsdwFj.url,'tzxmjs')"
                            />
                        </van-list>
                    </van-cell-group>
                    <van-cell-group title="实施情况说明(建设单位)">
                        <van-list
                                v-model="loadingJsdwSsqks"
                                :finished="finishedJsdwSsqks"
                                @load="onLoadJsdwSsqks"
                        >
                            <van-cell
                                    v-for="jsdwSsqk in jsdwSsqks"
                                    :key="jsdwSsqk.url"
                                    :title = "jsdwSsqk.title"
                                    is-link
                                    center
                                    @click="showFile(jsdwSsqk.url,'tzxmjs')"
                            />
                        </van-list>
                    </van-cell-group>
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
                items: [{ text: '项目基本信息' }, { text: '审批历史' }, { text: '实施情况说明' }, { text: '终审文件' }, { text: '建设单位上传的附件' }],
                jbxx: [],
                loadingJbxx: false,
                finishedJbxx: false,
                apiUrlJbxx: this.GLOBAL.serverSrc+'/zhspTzxmjsCz/getXmmxById.do',
                apiUrlHiss: this.GLOBAL.serverSrc+'/zhspTzxmjsCz/getHisTaskByBusinessId.do',
                hiss: [],
                loadingHiss: false,
                finishedHiss: false,
                apiUrlFjs: this.GLOBAL.serverSrc+'/zhspTzxmjsCz/getFjByBusinessIdAndType.do',
                ssqks: [],
                loadingSsqks: false,
                finishedSsqks: false,
                jsdwFjs: [],
                loadingJsdwFjs: false,
                finishedJsdwFjs: false,
                jsdwSsqks: [],
                loadingJsdwSsqks: false,
                finishedJsdwSsqks: false,
                gdfjs: [],
                loadingGdfjs: false,
                finishedGdfjs: false
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
            onLoadJsdwFjs() {
                let businessId = this.$route.query.businessId;
                this.$http.get(this.apiUrlFjs,{params: {businessId:businessId,type:'xmfj'}}).then(function(response) {
                    this.jsdwFjs=response.data;
                    this.loadingJsdwFjs = false;
                    this.finishedJsdwFjs = true;
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });
            },
            onLoadJsdwSsqks() {
                let businessId = this.$route.query.businessId;
                this.$http.get(this.apiUrlFjs,{params: {businessId:businessId,type:'jsdwssqk'}}).then(function(response) {
                    this.jsdwSsqks=response.data;
                    this.loadingJsdwSsqks = false;
                    this.finishedJsdwSsqks = true;
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });
            },
            onLoadSsqks() {
                let businessId = this.$route.query.businessId;
                this.$http.get(this.apiUrlFjs,{params: {businessId:businessId,type:'czjzgyssqk'}}).then(function(response) {
                    this.ssqks=response.data;
                    this.loadingSsqks = false;
                    this.finishedSsqks = true;
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
                this.$http.get(this.apiUrlHiss,{params: {businessId:businessId,type:'onlyCz'}}).then(function(response) {
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
            onLoadGdfjs() {
                let businessId = this.$route.query.businessId;
                this.$http.get(this.apiUrlFjs,{params: {businessId:businessId,type:'gdfj'}}).then(function(response) {
                    this.gdfjs=response.data;
                    this.loadingGdfjs = false;
                    this.finishedGdfjs = true;
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