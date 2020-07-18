<template>
    <div id="todo">
        <van-nav-bar
                id = "headerNavBar"
                title="专项预算支出预测"
                fixed
                border
        >
            <van-icon name="search" slot="right" color="white" size="x-large" @click="onSearchShow()"/>
        </van-nav-bar>

        <van-tabs style="padding-bottom: 100px;padding-top: 46px;"
                height="100%"
                type="line" sticky
                offset-top="46px"
                color="#379BE9">
            <van-tab title="按单位查询">
                <van-panel>
                        <div>
                            <van-list
                                    v-model="loadingDrzc"
                                    :finished="finishedDrzc"
                                    finished-text="没有更多了"

                            >
                                <van-cell
                                        v-for="item in listDrzc"
                                        :key="item.key"
                                        center
                                >
                                    {{item.ysdwDm}}<br/>
                                    {{item.ysdwMc}}<br/>
                                    {{item.zbje}}<br/>
                                    {{item.zbye}}<br/>
                                    {{item.zcjd}}<br/>
                                    {{item.zcjeMon}}<br/>
                                    {{item.zcjh}}<br/>
                                    {{item.yejh}}<br/>
                                </van-cell>
                            </van-list>
                        </div>
                    </van-panel>
            </van-tab>
            <van-tab title="按专项查询">
                <van-panel>
                        <div>
                            <van-list
                                    v-model="loadingDrsr"
                                    :finished="finishedDrsr"
                                    finished-text="没有更多了"

                            >
                                <van-cell
                                        v-for="item in listDrsr"
                                        :key="item.key"
                                        center
                                >
                                    {{item.ysdwDm}}<br/>
                                    {{item.ysdwMc}}<br/>
                                     {{item.yskmMc}}<br/>
                                    {{item.zxytMc}}<br/>
                                     {{item.zbje}}<br/>
                                    {{item.zbye}}<br/>
                                     {{item.zcjd}}<br/>
                                    {{item.zcjeMon}}<br/>
                                     {{item.zcjh}}<br/>
                                    {{item.yejh}}<br/>
                                    {{item.zth}}<br/>
                                </van-cell>
                            </van-list>
                        </div>
                    </van-panel>
            </van-tab>
        </van-tabs>
        <van-popup
                v-model="popupShow"
                position="bottom"
                closeable
                close-icon-position = "top-right"
                safe-area-inset-bottom
                :style="{ height: '70%' }"
        >
            <div style="padding-top: 50px">
            <van-cell-group style="padding-bottom: 20px">
                <van-field
                        readonly
                        clickable
                        name="calendar"
                        :value="value"
                        label="统计日期"
                        placeholder="点击选择日期"
                        @click="showCalendar = true"
                />
            </van-cell-group>
            <van-goods-action-button style="margin-right:0px;margin-left:0px" type="info" text="查询" @click="onSearch" />
            </div>
        </van-popup>
        <van-calendar v-model="showCalendar" :show-confirm="false" :min-date="minDate" @confirm="onConfirm" />
        <Task ref="task"/>
        <File ref="file"/>
    </div>
</template>

<script>
    import Task from '../../components/Task'
    import File from '../../components/File'
    export default {
        metaInfo: {
            title: '专项预算支出预测',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' }
            ]
        },
        name: "Zxyszcyc",
        components: {
            Task,
            File
        },
        data() {
            return {
                minDate:new Date(1990, 0, 1),
                popupShow:true,
                value: new Date().getFullYear()+'-'+(new Date().getMonth() + 1)+'-'+new Date().getDate(),
                showCalendar: false,
                listDrsr: [],
                loadingDrsr: false,
                finishedDrsr: true,
                apiUrlDrsr: this.GLOBAL.serverSrc+'/zhspCzsjCx/getZxyszcycZx.do',
                listDrzc: [],
                loadingDrzc: false,
                finishedDrzc: true,
                apiUrlDrzc: this.GLOBAL.serverSrc+'/zhspCzsjCx/getZxyszcycDw.do',
            };
        },
        mounted() {
            //这里可放到全局，提供给子 iframe 调用
            window['showFile'] = (param) => {
                this.showFileChlid(param);
            }
        },
        methods: {
            showFileChlid(param) {
                this.$refs.file.showFile(param);
            },
            onSearchShow(){
                this.popupShow = true;
            },
            onSearch(){
                this.listDrsr=[];
                this.onLoadDrsr();
                this.listDrzc=[];
                this.onLoadDrzc();
                this.popupShow = false;
            },
            onLoadDrsr() {
                this.finishedDrsr = false;
                 this.$http.get(this.apiUrlDrsr,{
                    params: {rq:this.value}
                }).then(function(response) {
                    this.listDrsr=response.data;
                    this.loadingDrsr = false;
                    this.finishedDrsr = true;
                    //this.$set('list', response.data);
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });

            },
            onLoadDrzc() {
                this.finishedDrzc = false;
                 this.$http.get(this.apiUrlDrzc,{
                    params: {rq:this.value}
                }).then(function(response) {
                    this.listDrzc=response.data;
                    this.loadingDrzc = false;
                    this.finishedDrzc = true;
                    //this.$set('list', response.data);
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });

            },
            showTask(param) {
                this.$refs.task.showTask(param.touchUrl);
            },
            onConfirm(date) {
                 this.value = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                this.showCalendar = false;
            }
        },

    }
</script>

<style scoped>
    #headerNavBar {
        color: #FFF;
        background: #379BE9;
    }
    .van-nav-bar__title {
        color: #FFF;
    }
    /* .van-list {
        padding-top: 50px;
    } */
</style>