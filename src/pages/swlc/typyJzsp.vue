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
        <van-goods-action safe-area-inset-bottom style="width: 100%;margin-bottom: 55px;">
            <van-row style="width: 100%;">
                <van-col span="12">
                    <van-goods-action-button style="border-top-left-radius: 10px;border-bottom-left-radius: 10px;margin-left:0px" type="warning" text="退回分管局长" @click="onClickBack" />
                </van-col>
                <van-col span="12">
                    <van-goods-action-button style="border-top-right-radius: 10px;border-bottom-right-radius: 10px;" type="info" text="提交办结确认" @click="onClickSendBjqr" />
                </van-col>
            </van-row>
       </van-goods-action>
        <van-action-sheet v-model="show" :actions="actions" @select="onSelect" @open="onLoadSpyj" style="margin-bottom: 55px;"/>
        <van-popup
                v-model="popupShow"
                position="bottom"
                closeable
                close-icon-position = "top-right"
                safe-area-inset-bottom
                style = "height: 300px"
        >
            <van-cell-group>
                <van-field
                        v-model="value"
                        rows="6"
                        autosize
                        label="审批意见："
                        type="textarea"
                        left-icon="edit"
                        placeholder="请输入审批意见"
                >
                    <van-button style="padding-left: 0px;" slot="button" size="small" type="primary" icon="chat-o" @click="onClickSpyj">意见选择</van-button>
                </van-field>
            </van-cell-group>
            <van-goods-action-button style="margin-right:0px;margin-left:0px" type="info" text="确认提交" @click="onClickSubmit" />
        </van-popup>
    </div>
</template>

<script>
    export default {
        name: "SwlcJz",
        data() {
            return {
                submitType:"",
                popupShow:false,
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
                finishedBzzj: false,
                apiUrlOperate: this.GLOBAL.serverSrc+'/zhspSwlc/doTask.do',
                show: false,
                value:"",
                apiUrlSpyj: this.GLOBAL.serverSrc+'/zhspSwlc/getSpyj.do',
                actions: [
                    { name: '同意。' },
                    { name: '退回。' }
                ]
            };
        },
        created(){
            this.onLoadTabs();
        },
        methods: {
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
                this.submitType = "sendFgjz";
                this.popupShow = true;
            },
            onClickSendBjqr(){
                this.submitType = "sendBgsBj";
                this.popupShow = true;
            },
            onClickSubmit(){
                this.$dialog.confirm({
                    message: '确认是否提交？'
                }).then(() => {
                    let businessId = this.$route.query.businessId;
                    let taskId = this.$route.query.taskId;
                    this.$http.get(this.apiUrlOperate,{
                        params: {businessId:businessId,taskId:taskId,
                            opinion:this.value,submitType:this.submitType,opFunction:"typyJzspSubmit"}
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