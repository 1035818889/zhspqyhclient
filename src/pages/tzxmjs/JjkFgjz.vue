<template>
    <div>
        <TaskHeader />
        <File ref="file"/>
        <van-tree-select
                style="padding-bottom: 100px;padding-top: 50px;"
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
    </div>
</template>

<script>
    import TaskHeader from '../../components/TaskHeader'
    import File from '../../components/File'
    export default {
        components: {
            TaskHeader,
            File
        },
        data() {
            return {
                activeIndex: 0,
                items: [{ text: '项目基本信息' }, { text: '科室意见' }, { text: '实施情况说明' }, { text: '建设单位上传的附件' }],
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
                apiUrlOperate: this.GLOBAL.serverSrc+'/zhspTzxmjsCz/doTask.do',
                show: false,
                value:"",
                apiUrlSpyj: this.GLOBAL.serverSrc+'/zhspSwlc/getSpyj.do',
                actions: [{ name: '同意。' }, { name: '退回。' }],
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
                            opinion:this.value,submitType:"back",opFunction:"jjkFgjzOperateV2"}
                    }).then(function(response) {
                        if("SUCCESS"==response.bodyText){
                            this.$toast.success('提交成功！');
                            //this.$router.replace("/");
                            window.top.location.href="/#/todo";
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
                            opinion:this.value,submitType:"pass",opFunction:"jjkFgjzOperateV2"}
                    }).then(function(response) {
                        if("SUCCESS"==response.bodyText){
                            this.$toast.success('提交成功！');
                            window.top.location.href="/#/todo";
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
                this.$http.get(this.apiUrlHiss,{params: {businessId:businessId,type:'jjkFgjz'}}).then(function(response) {
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
                this.$refs.file.showFile(this.GLOBAL.serverSrcPdfView + this.GLOBAL.serverSrc + "/zhspTouchFileOnlineOpen/preview?fileName%3D"+fileUrl+"%26fileType%3D"+fileType);
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