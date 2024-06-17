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
                items: [{ text: '工程信息' }, { text: '中介公司' }, { text: '资料上传' }, { text: '项目实施批准文件' }, { text: '消息管理' }, { text: '纸质正稿' }, { text: '审批历史' }],
                jbxx: [],
                loadingJbxx: false,
                finishedJbxx: false,
                apiUrlJbxx: this.GLOBAL.serverSrc+'/zhspJjss/getJjssJjysJbxxById.do',
                zlscs: [],
                loadingZlscs: false,
                finishedZlscs: false,
                apiUrlZlscs: this.GLOBAL.serverSrc+'/zhspJjss/getJjssJjysFjById.do',
                zjgss: [],
                loadingZjgss: false,
                finishedZjgss: false,
                apiUrlZjgss: this.GLOBAL.serverSrc+'/zhspJjss/getZjgsByJjysId.do',
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
                finishedHiss: false,
                apiUrlOperate: this.GLOBAL.serverSrc+'/zhspJjss/doTaskJjys.do',
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
                            opinion:this.value,submitType:"back",opFunction:"jjssJjysfgjzSpOperate"}
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
                            opinion:this.value,submitType:"pass",opFunction:"jjssJjysfgjzSpOperate"}
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
            onLoadZlscs() {
                let businessId = this.$route.query.businessId;
                this.$http.get(this.apiUrlZlscs,{params: {businessId:businessId,type:'zlsc',sslx:'jjys'}}).then(function(response) {
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
                this.$http.get(this.apiUrlTzxmjss,{params: {businessId:businessId,type:'jjssTzxmjs',sslx:'jjys'}}).then(function(response) {
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