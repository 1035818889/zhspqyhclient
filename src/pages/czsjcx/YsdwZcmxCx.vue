<template>
    <div id="todo">
        <van-nav-bar
                id = "headerNavBar"
                title="专项支出进度通知"
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
                {{item.zbJe}}<br/>
                {{item.zcJe}}<br/>
                {{item.zbYe}}<br/>
                {{item.zcJd}}<br/>
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
                        v-model="jc"
                        center
                        clearable
                        readonly
                        label="经办机构"
                        placeholder="请选择经办机构"
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
            title: '专项支出进度通知',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' }
            ]
        },
        name: "YsdwZcmxCx",
        components: {
            Task,
            File
        },
        data() {
            return {
                minDate:new Date(1990, 0, 1),
                popupShow:true,
                value: new Date().getFullYear()+'-'+(new Date().getMonth() + 1)+'-'+new Date().getDate(),
                jc:"全部",
                list: [],
                loading: false,
                finished: false,
                apiUrl: this.GLOBAL.serverSrc+'/zhspCzsjCx/getAllYsdwZcmx.do',
                showCalendar: false,
                showJc: false,
                jcs: [{ name: '全部' }, { name: '行政社保农业股' }, { name: '社会保障股' }, { name: '基建股' }, { name: '企业外经股' }]
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
                    params: {rq:this.value,jbjg:this.jc}
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
    .van-list {
        padding-top: 50px;
    } 
</style>