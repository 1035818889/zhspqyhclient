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
                   <!-- <van-panel>
                        <div>-->
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
                        <!--</div>
                    </van-panel>-->
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
                                                  :is-link="yj.isLink"
                                                  center
                                                  :key="yj.key"
                                                  :title = "yj.cname"
                                                  :label = "yj.label"
                                                  @click="onLoadSwyjFjs(yj.key,yj.isLink)"
                                        />
                                    </van-collapse-item>
                                </van-list>
                            </van-collapse>
                </div>
                <div v-if="activeIndex === 3">
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
                <van-col span="12">
                    <van-goods-action-button style="border-top-left-radius: 10px;border-bottom-left-radius: 10px;margin-left:0px" type="warning" text="回退" @click="onClickBackV2" />
                </van-col>
                <van-col span="12">
                    <van-goods-action-button style="border-top-right-radius: 10px;border-bottom-right-radius: 10px;" type="info" text="分发" @click="onClickFenfa" />
                </van-col>
            </van-row>
        </van-goods-action>
        <van-action-sheet v-model="show" :actions="actions" @select="onSelect" @open="onLoadSpyj" style="margin-bottom: 55px;"/>
        <van-action-sheet v-model="showXbbm" :actions="xbbmReForZbksSelect" @select="onSelectXbbm" style="margin-bottom: 55px;"/>
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
                v-model="xbbmPopupShow"
                position="bottom"
                closeable
                close-icon-position = "top-right"
                safe-area-inset-bottom
                style = "height: 80%"
        >
            <van-cell-group>
                <van-field></van-field>
                <van-field
                        v-model="xbbmsStr"
                        rows="6"
                        autosize
                        label="办理部门："
                        type="textarea"
                        left-icon="contact"
                        disabled
                        placeholder="请选择办理部门"
                >
                    <van-button style="padding-left: 0px;" slot="button" size="small" type="primary" icon="chat-o" @click="onClickShowAllKs">选择股室</van-button>
                </van-field>
                <van-field
                        v-model="zbbmStr"
                        rows="6"
                        autosize
                        label="主办部门："
                        type="textarea"
                        left-icon="contact"
                        disabled
                        placeholder="请选择主办部门"
                >
                    <van-button style="padding-left: 0px;" slot="button" size="small" type="primary" icon="chat-o" @click="onClickShowXbbm">选择主办</van-button>
                </van-field>
            </van-cell-group>
            <van-goods-action-button style="margin-right:0px;margin-left:0px" type="info" text="确认提交" @click="onClickPassV2" />
        </van-popup>
        <van-popup
                v-model="xbbmSelectPopupShow"
                position="bottom"
                closeable
                close-icon-position = "top-right"
                safe-area-inset-bottom
                style = "height: 80%"
        >
            <van-field></van-field>
            <template>
                <van-checkbox-group v-model="xbbmRe" style="margin-bottom: 75px;">
                    <van-cell-group>
                        <van-cell
                        v-for="(ks, index) in kss"
                        clickable
                        :key="ks.deptId"
                        :title="ks.name"
                        @click="toggleKs(index)"
                        >
                        <van-checkbox
                            :name="ks"
                            ref="checkboxesKss"
                            slot="right-icon"
                        />
                        </van-cell>
                    </van-cell-group>
                </van-checkbox-group>
            </template>
             <van-goods-action safe-area-inset-bottom style="width: 100%;">
                <van-goods-action-button style="margin-right:0px;margin-left:0px" type="info" text="确认" @click="onClickHideXbbmSelectPopupShow" />
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
                items: [{ text: '基本信息' }, { text: '正文附件' }, { text: '科室意见' }, { text: '审批历史' }],
                jbxx: [],
                loadingJbxx: false,
                finishedJbxx: false,
                apiUrlJbxx: this.GLOBAL.serverSrc+'/zhspSwlc/getWjysByIdForFb.do',
                swyjs: [],
                loadingSwyj: false,
                finishedSwyj: false,
                apiUrlSwyj: this.GLOBAL.serverSrc+'/zhspSwlc/getSwyjByBusinessId.do',
                activeNames: [],
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
                swyjFjPopupShow:false,
                swyjFjs: [],
                loadingSwyjFjs: false,
                finishedSwyjFjs: false,
                submitType:"",
                operatePopupShow:false,
                xbbmPopupShow:false,
                xbbmIdsStr:"",
                xbbmsStr:"",
                zbbmIdStr:"",
                zbbmStr:"",
                xbbmSelectPopupShow:false,
                xbbmRe: [],
                xbbmReForZbksSelect: [],
                kss: [],
                loadingKss: false,
                finishedKss: false,
                apiUrlKss: this.GLOBAL.serverSrc+'/zhspSwlc/getSwlcTypyAllKs.do',
                showXbbm: false
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
            onClickShowXbbm(){
                this.showXbbm=true;
            },
            onClickBackV2(){
                this.submitType = "back";
                this.operatePopupShow = true;
            },
            onClickFenfa(){
                this.xbbmPopupShow = true;
            },
            onClickShowAllKs(){
                this.xbbmSelectPopupShow=true;
            },
            onClickHideXbbmSelectPopupShow(){
                this.xbbmSelectPopupShow=false;
                let r1 = "";
                let r2 = "";
                for (var i=0;i<this.xbbmRe.length;i++)
                { 
                   let deptId = this.xbbmRe[i].deptId;
                   r1 = r1+deptId+";";
                   let deptName = this.xbbmRe[i].name;
                   r2 = r2+deptName+";"
                }
                this.xbbmIdsStr = r1;
                this.xbbmsStr = r2;
                this.xbbmReForZbksSelect = this.xbbmRe;
            },
            onClickPassV2(){
                let xbbmsStr = this.xbbmsStr;
                if(typeof xbbmsStr == "undefined" || null == xbbmsStr || "" == xbbmsStr){
                    this.$toast.fail('请先选择协办部门！');
                    return;
                }
                let zbbmStr = this.zbbmStr;
                if(typeof zbbmStr == "undefined" || null == zbbmStr || "" == zbbmStr){
                    this.$toast.fail('请先选择主办部门！');
                    return;
                }
                this.submitType = "pass";
                this.onClickPass();
            },
            onClickSubmit(){
                /* let submitType = this.submitType;
                if("pass" == submitType){
                    this.onClickPass();
                }else if("back" == submitType){
                    this.onClickBack();
                } */
                this.onClickBack();
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
                this.$dialog.confirm({
                    message: '确认是否提交？'
                }).then(() => {
                    let businessId = this.$route.query.businessId;
                    let taskId = this.$route.query.taskId;
                    this.$http.get(this.apiUrlOperate,{
                        params: {businessId:businessId,taskId:taskId,
                            opinion:this.value,submitType:"pass",opFunction:"bgsfbSubmit",xbbmIdsStr:this.xbbmIdsStr,zbbmIdStr:this.zbbmIdStr}
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
            onSelectXbbm(item) {
                // 默认情况下，点击选项时不会自动关闭菜单
                // 可以通过 close-on-click-action 属性开启自动关闭
                this.showXbbm = false;
                this.zbbmIdStr = item.deptId;
                this.zbbmStr = item.name;
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

                this.$http.get(this.apiUrlKss,{params: {}}).then(function(response) {
                    this.kss=response.data;
                    this.loadingKss = false;
                    this.finishedKss = true;
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

                let taskId = this.$route.query.taskId;
                this.$http.get(this.apiUrlCurrentKs,{params: {taskId:taskId}}).then(function(response) {
                    this.activeNames=response.data;
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
            toggleKs(index) {
                this.$refs.checkboxesKss[index].toggle();
                /*let ks = this.$refs.checkboxesKss[index];
                let ksId = ks.name.deptId;
                let ksName = ks.name.name;
                let checkedR = ks.checked;
                // eslint-disable-next-line no-console
                console.log(checkedR);
                if(this.xbbmIdsStr.indexOf(ksId) == -1 && !checkedR){
                    this.xbbmIdsStr = this.xbbmIdsStr + ";" + ksId;
                    // eslint-disable-next-line no-console
                    console.log("1");
                }else if(this.xbbmIdsStr.indexOf(ksId) == -1 && checkedR){
                    this.xbbmIdsStr = this.xbbmIdsStr.replace(/ksId;/g,"");
                }
                // eslint-disable-next-line no-console
                console.log(this.xbbmIdsStr);
                if(this.xbbmsStr.indexOf(ksName) == -1 && !checkedR){
                    this.xbbmsStr = this.xbbmsStr + ";" + ksName;
                }else if(this.xbbmsStr.indexOf(ksName) == -1 && checkedR){
                    this.xbbmsStr = this.xbbmsStr.replace(/ksName;/g,"");
                }
                // eslint-disable-next-line no-console
                console.log(this.xbbmsStr);
                // eslint-disable-next-line no-console
                console.log(ks.name.name);
                // eslint-disable-next-line no-console
                console.log(ks.name.deptId);
                // eslint-disable-next-line no-console
                console.log(ks.checked);*/
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