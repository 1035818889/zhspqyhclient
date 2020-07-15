<template>
    <div id="todo">
        <van-nav-bar
                id = "headerNavBar"
                title="财政收入分类统计"
                fixed
                border
        >
            <van-icon name="search" slot="right" color="white" size="x-large" @click="onSearchShow()"/>
        </van-nav-bar>
        
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
                                    v-model="loading1"
                                    :finished="finished"
                                    finished-text="没有更多了"

                            >
                                <van-cell
                                        v-for="item in list"
                                        :key="item.key"
                                        is-link
                                        center
                                        @click="showTask(item)"
                                >
                                    {{item.ljmc}}<br/>
                                    {{item.kjmc}}<br/>
                                    {{item.bnlj}}<br/>
                                    {{item.qntq}}<br/>
                                    {{item.tb}}<br/>
                                </van-cell>
                            </van-list>
                        </div>
                    </van-panel>
                </div>
                <div v-if="activeIndex === 1">
                    <van-panel>
                        <div>
                            <van-list
                                    v-model="loadingZfxjjys"
                                    :finished="finishedZfxjjys"
                                    finished-text="没有更多了"

                            >
                                <van-cell
                                        v-for="item in listZfxjjys"
                                        :key="item.key"
                                        is-link
                                        center
                                        @click="showTask(item)"
                                >
                                    {{item.ljmc}}<br/>
                                    {{item.xjmc}}<br/>
                                    {{item.bnlj}}<br/>
                                    {{item.qntq}}<br/>
                                    {{item.tb}}<br/>
                                </van-cell>
                            </van-list>
                        </div>
                    </van-panel>
                </div>
                <div v-if="activeIndex === 2">
                    <van-panel>
                        <div>
                            <van-list
                                    v-model="loadingGzsy"
                                    :finished="finishedGzsy"
                                    finished-text="没有更多了"

                            >
                                <van-cell
                                        v-for="item in listGzsy"
                                        :key="item.key"
                                        is-link
                                        center
                                        @click="showTask(item)"
                                >
                                    {{item.srly}}<br/>
                                    {{item.bnlj}}<br/>
                                    {{item.qntq}}<br/>
                                    {{item.tb}}<br/>
                                </van-cell>
                            </van-list>
                        </div>
                    </van-panel>
                </div>

            </template>
        </van-tree-select>
        
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
                <van-field
                        v-model="jc"
                        center
                        clearable
                        readonly
                        label="统计库级"
                        placeholder="请选择统计库级"
                >
                    <van-button slot="button" size="small" type="primary" @click="onClickJc">选择</van-button>
                </van-field>
            </van-cell-group>
            <van-goods-action-button style="margin-right:0px;margin-left:0px" type="info" text="查询" @click="onSearch" />
            </div>
        </van-popup>
        <van-calendar v-model="showCalendar" :show-confirm="false" :min-date="minDate" @confirm="onConfirm" />
        <van-action-sheet v-model="showJc" :actions="jcs" @select="onSelectJc" style="margin-bottom: 55px;"/>
        <Task ref="task"/>
        <File ref="file"/>
    </div>
</template>

<script>
    import Task from '../../components/Task'
    import File from '../../components/File'
    export default {
        metaInfo: {
            title: '财政收入分类统计',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' }
            ]
        },
        name: "CzsrflCx",
        components: {
            Task,
            File
        },
        data() {
            return {
                activeIndex: 0,
                items: [{ text: '一般公共预算' }, { text: '政府性基金' }, { text: '国资收益' }],
                minDate:new Date(1990, 0, 1),
                popupShow:true,
                value: new Date().getFullYear()+'-'+(new Date().getMonth() + 1)+'-'+new Date().getDate(),
                jc:"",
                list: [],
                loading1: false,
                finished: true,
                apiUrl: this.GLOBAL.serverSrc+'/zhspCzsjCx/getCzsrflYbggys.do',
                listZfxjjys: [],
                loadingZfxjjys: false,
                finishedZfxjjys: true,
                apiUrlZfxjjys: this.GLOBAL.serverSrc+'/zhspCzsjCx/getCzsrflZfxjjys.do',
                listGzsy: [],
                loadingGzsy: false,
                finishedGzsy: true,
                apiUrlGzsy: this.GLOBAL.serverSrc+'/zhspCzsjCx/getCzsrflGzsy.do',
                showCalendar: false,
                showJc: false,
                jcs: [{ name: '中央' }, { name: '省' }, { name: '市' }, { name: '县' }, { name: '(空)' }]
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
                this.listZfxjjys=[];
                this.onLoadZfxjjys();
                this.listGzsy=[];
                this.onLoadGzsy();
                this.popupShow = false;
            },
            onLoad() {
                this.finished = false;
                 this.$http.get(this.apiUrl,{
                    params: {rq:this.value,jc:this.jc}
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
            onLoadZfxjjys() {
                this.finishedZfxjjys = false;
                 this.$http.get(this.apiUrlZfxjjys,{
                    params: {rq:this.value,jc:this.jc}
                }).then(function(response) {
                    this.listZfxjjys=response.data;
                    this.loadingZfxjjys = false;
                    this.finishedZfxjjys = true;
                    //this.$set('list', response.data);
                },function() {
                    // eslint-disable-next-line no-console
                    console.log("出错了");
                }).catch(function(response) {
                    // eslint-disable-next-line no-console
                    console.log(response);
                });

            },
            onLoadGzsy() {
                this.finishedGzsy = false;
                 this.$http.get(this.apiUrlGzsy,{
                    params: {rq:this.value,jc:this.jc}
                }).then(function(response) {
                    this.listGzsy=response.data;
                    this.loadingGzsy = false;
                    this.finishedGzsy = true;
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
            },
            onClickJc(){
                this.showJc=true;
            },
            onSelectJc(item) {
                // 默认情况下，点击选项时不会自动关闭菜单
                // 可以通过 close-on-click-action 属性开启自动关闭
                this.showJc = false;
                this.jc = item.name;
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