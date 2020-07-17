<template>
    <div id="todo">
        <van-nav-bar
                id = "headerNavBar"
                title="基本支出预算执行情况"
                fixed
                border
        >
            <van-icon name="search" slot="right" color="white" size="x-large" @click="onSearchShow()"/>
        </van-nav-bar>
        <van-notice-bar
            :scrollable="false"
            text="全区概况"
            style="padding-top: 50px;font-size: 18px;"
        />
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
                {{item.zxytMc}}<br/>
                {{item.hjje}}<br/>
                {{item.zcje}}<br/>
                {{item.monzcje}}<br/>
                {{item.zcjd}}<br/>
                {{item.ncje}}<br/>
                {{item.tjje}}<br/>
                {{item.tzje}}<br/>
                {{item.zjje}}<br/>
            </van-cell>
        </van-list>
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
            title: '基本支出预算执行情况',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' }
            ]
        },
        name: "Jbzcyszxqk",
        components: {
            Task,
            File
        },
        data() {
            return {
                minDate:new Date(1990, 0, 1),
                popupShow:true,
                value: new Date().getFullYear()+'-'+(new Date().getMonth() + 1)+'-'+new Date().getDate(),
                list: [],
                loading1: false,
                finished: true,
                apiUrl: this.GLOBAL.serverSrc+'/zhspCzsjCx/getJbzcyszxqk.do',
                showCalendar: false
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
     #headerNavBar2 {
        color: #FFF;
        background: #379BE9;
    }
    .van-nav-bar__title {
        color: #FFF;
    }
    .van-list {
        /* padding-top: 50px; */
    }
</style>