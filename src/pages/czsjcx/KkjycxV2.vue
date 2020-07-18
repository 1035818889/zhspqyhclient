<template>
    <div id="todo">
        <van-nav-bar
                id = "headerNavBar"
                title="国库每日收支结余统计"
                fixed
                border
        >
            <van-icon name="search" slot="right" color="white" size="x-large" @click="onSearchShow()"/>
        </van-nav-bar>
        
        <van-tabs style="padding-bottom: 100px;padding-top: 46px;"
                height="100%"
                type="line" sticky
                offset-top="46px"
                color="#379BE9"
                :ellipsis="ellipsis">
            <van-tab title="库款结余查询">
                    <van-panel>
                        <div>
                            <van-list
                                    v-model="loading1"
                                    :finished="finished"
                                    finished-text="没有更多了"
                            >
                                <van-cell
                                        v-for="item in list"
                                        :key="item.title"
                                        :title = "item.title"
                                />
                            </van-list>
                        </div>
                    </van-panel>
            </van-tab>
            <van-tab title="当日收入">
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
                                    {{item.kjmc}}<br/>
                                    {{item.je}}<br/>
                                </van-cell>
                            </van-list>
                        </div>
                    </van-panel>
                </van-tab>
                 <van-tab title="当日支出">
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
                                    {{item.ysdw}}<br/>
                                    {{item.ysdwMc}}<br/>
                                    {{item.je}}<br/>
                                </van-cell>
                            </van-list>
                        </div>
                    </van-panel>
                </van-tab>
                <van-tab title="本年累计收入">
                    <van-panel>
                        <div>
                            <van-list
                                    v-model="loadingBnljsr"
                                    :finished="finishedBnljsr"
                                    finished-text="没有更多了"
                            >
                                <van-cell
                                        v-for="item in listBnljsr"
                                        :key="item.title"
                                        :title = "item.title"
                                />
                            </van-list>
                        </div>
                    </van-panel>
                </van-tab>
                <van-tab title="每月收支">
                    <van-panel>
                        <div>
                            <van-list
                                    v-model="loadingMysz"
                                    :finished="finishedMysz"
                                    finished-text="没有更多了"

                            >
                                <van-cell
                                        v-for="item in listMysz"
                                        :key="item.key"
                                        center
                                >
                                    {{item.month}}<br/>
                                    {{item.zcje}}<br/>
                                    {{item.srje}}<br/>
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
            title: '国库每日收支结余统计',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' }
            ]
        },
        name: "Kkjycx",
        components: {
            Task,
            File
        },
        data() {
            return {
                ellipsis:false,
                minDate:new Date(1990, 0, 1),
                popupShow:true,
                value: new Date(new Date().setDate(new Date().getDate()-1)).toLocaleDateString(),
                showCalendar: false,
                list: [],
                loading1: false,
                finished: true,
                apiUrl: this.GLOBAL.serverSrc+'/zhspCzsjCx/getKkjycx.do',
                listDrsr: [],
                loadingDrsr: false,
                finishedDrsr: true,
                apiUrlDrsr: this.GLOBAL.serverSrc+'/zhspCzsjCx/getKkjycxDrsr.do',
                listDrzc: [],
                loadingDrzc: false,
                finishedDrzc: true,
                apiUrlDrzc: this.GLOBAL.serverSrc+'/zhspCzsjCx/getKkjycxDrzc.do',
                listBnljsr: [],
                loadingBnljsr: false,
                finishedBnljsr: true,
                apiUrlBnljsr: this.GLOBAL.serverSrc+'/zhspCzsjCx/getKkjycxBnljsr.do',
                listMysz: [],
                loadingMysz: false,
                finishedMysz: true,
                apiUrlMysz: this.GLOBAL.serverSrc+'/zhspCzsjCx/getKkjycxMysz.do'
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
                this.list=[];
                this.onLoad();
                this.listDrsr=[];
                this.onLoadDrsr();
                this.listDrzc=[];
                this.onLoadDrzc();
                this.listBnljsr=[];
                this.onLoadBnljsr();
                this.listMysz=[];
                this.onLoadMysz();
                this.popupShow = false;
            },
            onLoad() {
                this.finished = false;
                 this.$http.get(this.apiUrl,{
                    params: {rq:this.value}
                }).then(function(response) {
                    this.list=response.data;
                    this.loading1 = false;
                    this.finished = true;
                    //this.$set('list', response.data);
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });

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
            onLoadBnljsr() {
                this.finishedBnljsr = false;
                 this.$http.get(this.apiUrlBnljsr,{
                    params: {rq:this.value}
                }).then(function(response) {
                    this.listBnljsr=response.data;
                    this.loadingBnljsr = false;
                    this.finishedBnljsr = true;
                    //this.$set('list', response.data);
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });

            },
            onLoadMysz() {
                this.finishedMysz = false;
                 this.$http.get(this.apiUrlMysz,{
                    params: {rq:this.value}
                }).then(function(response) {
                    this.listMysz=response.data;
                    this.loadingMysz = false;
                    this.finishedMysz = true;
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
                this.value = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
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