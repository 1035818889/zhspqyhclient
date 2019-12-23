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
                                          :label = "yj.label"
                                          :is-link="yj.isLink"
                                          center
                                          @click="onLoadSwyjFjs(yj.key,yj.isLink)"
                                />
                            </van-collapse-item>
                        </van-list>
                    </van-collapse>
                </div>
                <div v-if="activeIndex === 3">
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
        <van-goods-action safe-area-inset-bottom style="width: 100%;/*margin-bottom: 45px;*/">
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
        <van-action-sheet v-model="show" :actions="actions" @select="onSelect" @open="onLoadSpyj" style="margin-bottom: 55px;"/>
        <van-popup
                v-model="swyjFjPopupShow"
                position="bottom"
                closeable
                close-icon-position = "top-right"
                safe-area-inset-bottom
                style = "height: 60%;padding-bottom:100px"
        >
            <van-cell-group title="办理意见附件">
                <van-list
                        v-model="loadingSwyjFjs"
                        :finished="finishedSwyjFjs"
                >
                    <van-cell
                            v-for="swyjFj in swyjFjs"
                            :key="swyjFj.url"
                            :title = "swyjFj.title"
                            is-link
                            center
                            @click="showFile(swyjFj.url,'swyjFj')"
                    />
                </van-list>
            </van-cell-group>
        </van-popup>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: 0,
                items: [{ text: '基本信息' }, { text: '正文附件' }, { text: '科室意见' }, { text: '综合意见' }, { text: '审批历史' }],
                jbxx: [],
                loadingJbxx: false,
                finishedJbxx: false,
                apiUrlJbxx: this.GLOBAL.serverSrc+'/zhspSwlc/getWjysById.do',
                swyjs: [],
                loadingSwyj: false,
                finishedSwyj: false,
                apiUrlSwyj: this.GLOBAL.serverSrc+'/zhspSwlc/getSwyjByBusinessId.do',
                activeKey: 0,
                activeNames: ['1'],
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
                apiUrlOperate: this.GLOBAL.serverSrc+'/zhspSwlc/doTask.do',
                show: false,
                value:"",
                apiUrlSpyj: this.GLOBAL.serverSrc+'/zhspSwlc/getSpyj.do',
                actions: [{ name: '同意。' }, { name: '退回。' }],
                swyjFjPopupShow:false,
                swyjFjs: [],
                loadingSwyjFjs: false,
                finishedSwyjFjs: false
            };
        },
        methods: {
            sidebarClick(index) {
                this.$refs.item.swipeTo(index,{"immediate":true});
                //可以优化成只有综合意见和正文附件tab回到顶部
                window.scrollTo(0, 0);
            },
            onLoadSpyj() {
                this.$http.get(this.apiUrlSpyj,{params: {}}).then(function(response) {
                    this.actions=response.data;
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });

            },
            onClickSpyj(){
                this.show=true;
            },
            onClickBack(){
                this.$dialog.confirm({
                    message: '确认是否提交？'
                }).then(() => {
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
                }).catch(() => {
                    // on cancel
                });
            },
            onClickPass(){
                let yj = this.value;
                if(typeof yj == "undefined" || null == yj || "" == yj){
                    this.$toast.fail('审批意见不能为空！');
                    return;
                }
                this.$dialog.confirm({
                    message: '确认是否提交？'
                }).then(() => {
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
                }).catch(() => {
                    // on cancel
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
            onLoadSwyjFjs(swyjId,isLink) {
                if(isLink){
                    this.swyjFjPopupShow = true;
                    this.$http.get(this.apiUrlLwclyjZws,{params: {businessId:swyjId,type:'swyjFj'}}).then(function(response) {
                        this.swyjFjs=response.data;
                        this.loadingSwyjFjs = false;
                        this.finishedSwyjFjs = true;
                    },function() {
                        // eslint-disable-next-line no-console
                        console.log("出错了");
                    }).catch(function(response) {
                        // eslint-disable-next-line no-console
                        console.log(response);
                    });
                }
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