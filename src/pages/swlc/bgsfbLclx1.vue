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
        <van-goods-action safe-area-inset-bottom style="width: 100%;">
            <van-row style="width: 100%;">
                <van-col span="8">
                    <van-goods-action-button style="border-top-left-radius: 10px;border-bottom-left-radius: 10px;margin-left:0px" type="warning" text="回退" @click="onClickBackBefore" />
                </van-col>
                <van-col span="8">
                    <van-goods-action-button style="border-right: solid #ACC0D8 1px;" type="info" text="发送办理人" @click="onClickFsPopupShow" />
                </van-col>
                <van-col span="8">
                    <van-goods-action-button style="border-top-right-radius: 10px;border-bottom-right-radius: 10px;" type="info" text="不分办直接传阅" @click="onClickShowXbrSelectPopupShow2" />
                </van-col>
            </van-row>
        </van-goods-action>
        <van-action-sheet v-model="show" :actions="actions" @select="onSelect" @open="onLoadSpyj" style="margin-bottom: 55px;"/>
        <van-popup
                v-model="operatePopupShow"
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
        <van-popup
                v-model="fsPopupShow"
                position="bottom"
                closeable
                close-icon-position = "top-right"
                safe-area-inset-bottom
                style = "height: 80%"
        >
            <van-cell-group>
                <van-field></van-field>
                <van-field
                        v-model="zbrCnameStr"
                        rows="6"
                        autosize
                        label="主办人："
                        type="textarea"
                        left-icon="contact"
                        disabled
                        placeholder="请选择主办人"
                >
                    <van-button style="padding-left: 0px;" slot="button" size="small" type="primary" icon="chat-o" @click="onClickShowZbrSelectPopupShow">选择主办人</van-button>
                </van-field>
                <van-field
                        v-model="xbrCnameStr"
                        rows="6"
                        autosize
                        label="协办人："
                        type="textarea"
                        left-icon="contact"
                        disabled
                        placeholder="请选择协办人"
                >
                    <van-button style="padding-left: 0px;" slot="button" size="small" type="primary" icon="chat-o" @click="onClickShowXbrSelectPopupShow">选择协办人</van-button>
                </van-field>
            </van-cell-group>
            <van-goods-action-button style="margin-right:0px;margin-left:0px" type="info" text="确认提交" @click="onClickPassToZbrBefore" />
        </van-popup>
        <van-popup
                v-model="zbrSelectPopupShow"
                position="bottom"
                closeable
                close-icon-position = "top-right"
                safe-area-inset-bottom
                style = "height: 80%"
        >
            <van-field></van-field>
            <template>
                <van-tree-select
                    class="swlcTreeSelect"
                    :items="selectUsers"
                    :active-id.sync="activeIdForZbr"
                    :main-active-index.sync="activeIndexSelectZbr"
                    @click-item="onZbrItemClick"
                    />
            </template>
             <van-goods-action safe-area-inset-bottom style="width: 100%;">
                <van-goods-action-button style="margin-right:0px;margin-left:0px" type="info" text="确认" @click="onClickHideZbrSelectPopupShow" />
            </van-goods-action>
        </van-popup>
        <van-popup
                v-model="xbrSelectPopupShow"
                position="bottom"
                closeable
                close-icon-position = "top-right"
                safe-area-inset-bottom
                style = "height: 80%"
        >
            <van-field></van-field>
            <template>
                <van-tree-select
                    class="swlcTreeSelect"
                    :items="selectUsers"
                    :active-id.sync="activeIdForXbr"
                    :main-active-index.sync="activeIndexSelectXbr"
                    @click-item="onXbrItemClick"
                    />
            </template>
             <van-goods-action safe-area-inset-bottom style="width: 100%;">
                <van-goods-action-button style="margin-right:0px;margin-left:0px" type="info" text="确认" @click="onClickHideXbrSelectPopupShow" />
            </van-goods-action>
        </van-popup>
        <van-popup
                v-model="xbrSelectPopupShow2"
                position="bottom"
                closeable
                close-icon-position = "top-right"
                safe-area-inset-bottom
                style = "height: 80%"
        >
            <van-field></van-field>
            <template>
                <van-tree-select
                    class="swlcTreeSelect"
                    :items="selectUsers"
                    :active-id.sync="activeIdForXbr2"
                    :main-active-index.sync="activeIndexSelectXbr2"
                    @click-item="onXbrItemClick2"
                    />
            </template>
             <van-goods-action safe-area-inset-bottom style="width: 100%;">
                <van-goods-action-button style="margin-right:0px;margin-left:0px" type="info" text="确认发送并提交" @click="onClickFinishBefore" />
            </van-goods-action>
        </van-popup>
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
                items: [{ text: '基本信息' }, { text: '正文附件' }, { text: '审批历史' }],
                jbxx: [],
                loadingJbxx: false,
                finishedJbxx: false,
                apiUrlJbxx: this.GLOBAL.serverSrc+'/zhspSwlc/getWjysByIdForFb.do',
                apiUrlLwclyjZws: this.GLOBAL.serverSrc+'/zhspSwlc/getSwfjByBusinessIdAndType.do',
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
                actions: [
                    { name: '同意。' },
                    { name: '退回。' }
                ],
                submitType:"",
                operatePopupShow:false,
                selectUsers: [],
                loadingSelectUsers: false,
                finishedSelectUsers: false,
                apiUrlSelectUser: this.GLOBAL.serverSrc+'/zhspSwlc/getSwlcTypyZbrSelect.do',
                zbrSelectPopupShow:false,
                activeIdForZbr: "",
                activeIndexSelectZbr: 0,
                xbrSelectPopupShow:false,
                activeIdForXbr: [],
                activeIndexSelectXbr: 0,
                zbrStr:"",
                zbrCnameStr:"",
                xbrStr:"",
                xbrCnameStr:"",
                fsPopupShow:false,
                xbrSelectPopupShow2:false,
                activeIdForXbr2: [],
                activeIndexSelectXbr2: 0,
                xbrStr2:""
            };
        },
        methods: {
            sidebarClick(index) {
                this.$refs.item.swipeTo(index,{"immediate":true});
                //可以优化成只有综合意见和正文附件tab回到顶部
                window.scrollTo(0, 0);
            },
            onClickSpyj(){
                this.show=true;
            },
            onClickFsPopupShow(){
                this.fsPopupShow=true;
            },
            onClickShowZbrSelectPopupShow(){
                this.zbrSelectPopupShow=true;
            },
            onClickHideZbrSelectPopupShow(){
                this.zbrSelectPopupShow=false;
            },
            onClickShowXbrSelectPopupShow(){
                this.xbrSelectPopupShow=true;
            },
            onClickHideXbrSelectPopupShow(){
                this.xbrSelectPopupShow=false;
            },
            onClickShowXbrSelectPopupShow2(){
                this.xbrSelectPopupShow2=true;
            },
            onClickSubmit(){
                let submitType = this.submitType;
                if("passToZbr" == submitType){
                    this.onClickPassToZbr();
                }else if("back" == submitType){
                    this.onClickBack();
                }else if("finish" == submitType){
                    this.onClickFinish();
                }
            },
            onClickBackBefore(){
                this.submitType = "back";
                this.operatePopupShow = true;
            },
            onClickPassToZbrBefore(){
                let zbrStr = this.zbrStr;
                if(typeof zbrStr == "undefined" || null == zbrStr || "" == zbrStr){
                    this.$toast.fail('请先设置主办人！');
                    return;
                }
                this.submitType = "passToZbr";
                this.operatePopupShow = true;
            },
            onClickFinishBefore(){
                this.submitType = "finish";
                this.operatePopupShow = true;
            },
            onClickBack(){
                this.$dialog.confirm({
                    message: '确认是否提交？'
                }).then(() => {
                    let businessId = this.$route.query.businessId;
                    let taskId = this.$route.query.taskId;
                    this.$http.get(this.apiUrlOperate,{
                        params: {businessId:businessId,taskId:taskId,
                            opinion:this.value,submitType:"back",opFunction:"bgsfbSubmit"}
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
            onClickPassToZbr(){
                this.$dialog.confirm({
                    message: '确认是否提交？'
                }).then(() => {
                    let businessId = this.$route.query.businessId;
                    let taskId = this.$route.query.taskId;
                    this.$http.get(this.apiUrlOperate,{
                        params: {businessId:businessId,taskId:taskId,
                            opinion:this.value,submitType:"pass",opFunction:"bgsfbSubmit",zbrStr:this.zbrStr,xbrStr:this.xbrStr}
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
            onClickFinish(){
                this.$dialog.confirm({
                    message: '确认是否提交？'
                }).then(() => {
                    let businessId = this.$route.query.businessId;
                    let taskId = this.$route.query.taskId;
                    this.$http.get(this.apiUrlOperate,{
                        params: {businessId:businessId,taskId:taskId,
                            opinion:this.value,submitType:"finish",opFunction:"bgsfbSubmit",xbrStr:this.xbrStr2}
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

                this.$http.get(this.apiUrlSelectUser,{params: {}}).then(function(response) {
                    this.selectUsers=response.data;
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });
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
            onZbrItemClick(item){
                    this.zbrCnameStr = item.text;
                    this.zbrStr = item.id;
            },
            onXbrItemClick(item){
                let cname = item.text;
                let username = item.id;
                if(this.xbrCnameStr.indexOf(cname) == -1){
                    this.xbrCnameStr = this.xbrCnameStr + cname +";";
                    this.xbrStr = this.xbrStr + username +";";
                }else{
                    this.xbrCnameStr = this.xbrCnameStr.replace(cname+";","");
                    this.xbrStr = this.xbrStr.replace(username+";","");
                }
            },
            onXbrItemClick2(item){
                let username = item.id;
                if(this.xbrStr2.indexOf(username) == -1){
                    this.xbrStr2 = this.xbrStr2 + username +";";
                }else{
                    this.xbrStr2 = this.xbrStr2.replace(username+";","");
                }
            },
            showFile(fileUrl,fileType) {
                this.$refs.file.showFile(this.GLOBAL.serverSrcPdfView + this.GLOBAL.serverSrc + "/zhspTouchFileOnlineOpen/preview?fileName%3D"+fileUrl+"%26fileType%3D"+fileType);
            }
            /*showFile(fileUrl,fileType) {
                window.parent.showFile(this.GLOBAL.serverSrcPdfView + this.GLOBAL.serverSrc + "/zhspTouchFileOnlineOpen/preview?fileName%3D"+fileUrl+"%26fileType%3D"+fileType);
            }*/
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
    .swlcTreeSelect .van-tree-select__nav {
        width: 50% !important;
    }
</style>