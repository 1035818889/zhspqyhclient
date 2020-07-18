<template>
    <div id="todo">
        <van-nav-bar
                id = "headerNavBar"
                title="预算指标执行情况"
                fixed
                border
        >
            <van-icon name="search" slot="right" color="white" size="x-large" @click="onSearchShow()"/>
        </van-nav-bar>
        
        <van-list
                v-model="loading"
                :finished="finished"
                 @load="onLoad"
                finished-text="没有更多了"

        >
            <van-cell
                    v-for="item in list"
                    :key="item.key"
                    center
            >
                {{item.ysdwDm}}<br/>
                {{item.ysdwMc}}<br/>
                {{item.zxytDm}}<br/>
                {{item.zxytMc}}<br/>
                {{item.yskmMc}}<br/>
                {{item.zblyMc}}<br/>
                {{item.zbje}}<br/>
                {{item.zcje}}<br/>
                {{item.zbye}}<br/>
                {{item.zcjd}}<br/>
                {{item.jbjgMc}}<br/>
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
                        label="统计截至日期"
                        placeholder="点击选择日期"
                        @click="showCalendar = true"
                />
                <van-field
                        v-model="ysdwDm"
                        center
                        clearable
                        label="单位代码"
                        placeholder="点击输入单位代码"
                >
                </van-field>
                <van-field
                        v-model="ysdwMc"
                        center
                        clearable
                        label="单位名称"
                        placeholder="点击输入单位名称"
                >
                </van-field>
                <van-field
                        v-model="zxytDm"
                        center
                        clearable
                        label="项目代码"
                        placeholder="点击输入项目代码"
                >
                </van-field>
                <van-field
                        v-model="zxytMc"
                        center
                        clearable
                        label="项目名称"
                        placeholder="点击输入项目名称"
                >
                </van-field>
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
            title: '预算指标执行情况',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' }
            ]
        },
        name: "Yszbzxqk",
        components: {
            Task,
            File
        },
        data() {
            return {
                minDate:new Date(1990, 0, 1),
                popupShow:true,
                value: new Date().getFullYear()+'-'+(new Date().getMonth() + 1)+'-'+new Date().getDate(),
                ysdwDm:'',
                ysdwMc:'',
                zxytDm:'',
                zxytMc:'',
                list: [],
                loading: false,
                finished: false,
                apiUrl: this.GLOBAL.serverSrc+'/zhspCzsjCx/getYszbzxqk.do',
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
                    params: {rq:this.value,ysdwDm:this.ysdwDm,ysdwMc:this.ysdwMc,zxytDm:this.zxytDm,zxytMc:this.zxytMc}
                }).then(function(response) {
                    this.list=response.data;
                    this.loading = false;
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
    .van-nav-bar__title {
        color: #FFF;
    }
    .van-list {
        padding-top: 50px;
    } 
</style>