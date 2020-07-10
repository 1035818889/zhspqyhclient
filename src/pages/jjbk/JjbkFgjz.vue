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
                finishedHiss: false,
                apiUrlOperate: this.GLOBAL.serverSrc+'/zhspJjbk/doTask.do',
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
                            opinion:this.value,submitType:"back",opFunction:"jjgcFybkfgjzSpOperate"}
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
                            opinion:this.value,submitType:"pass",opFunction:"jjgcFybkfgjzSpOperate"}
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