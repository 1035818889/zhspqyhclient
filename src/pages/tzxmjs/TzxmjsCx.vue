<template>
    <div id="todo">
        <van-nav-bar
                id = "tzxmjsCxHeaderNavBar"
                title="投资项目查询"
                fixed
                border
        >
            <van-icon name="search" slot="right" color="white" size="x-large" @click="onSearchShow()"/>
        </van-nav-bar>
        <van-list
                v-model="loading1"
                :finished="finished"
                finished-text="没有更多了"

        >
            <van-cell
                    v-for="item in list"
                    :key="item.title"
                    :title = "item.title"
                    is-link
                    center
                    @click="showTask(item)"
            />
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
                        v-model="jsdw"
                        label="建设单位"
                        clearable
                />
                <van-field
                        v-model="gcmc"
                        label="工程名称"
                        clearable
                />
                <van-field
                        v-model="xmbm"
                        label="项目编码"
                        clearable
                />
                <van-field
                        v-model="xmlx"
                        center
                        clearable
                        readonly
                        label="项目类型"
                        placeholder="请选择项目类型"
                >
                    <van-button slot="button" size="small" type="primary" @click="onClickXmlx">选择</van-button>
                </van-field>
            </van-cell-group>
            <van-goods-action-button style="margin-right:0px;margin-left:0px" type="info" text="查询" @click="onSearch" />
            </div>
        </van-popup>
        <van-action-sheet v-model="show" :actions="actions" @select="onSelect" style="margin-bottom: 55px;"/>
        <Task ref="task"/>
        <File ref="file"/>
    </div>
</template>

<script>
    import Task from '../../components/Task'
    import File from '../../components/File'
    export default {
        metaInfo: {
            title: '投资项目查询',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' }
            ]
        },
        name: "TzxmjsCx",
        components: {
            Task,
            File
        },
        data() {
            return {
                popupShow:true,
                jsdw:"",
                gcmc:"",
                xmlx:"",
                xmbm:"",
                list: [],
                loading1: false,
                finished: true,
                apiUrl: this.GLOBAL.serverSrc+'/zhspTzxmjsCz/getTzxmjsCx.do',
                show: false,
                xmlxKey:"",
                actions: [{ name: '交通、公路项目' }, { name: '水利项目' }, { name: '市政、绿化项目' }, { name: '教育项目' }, { name: '其他项目' }, { name: '(空)' }]
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
                this.onLoad();
                this.popupShow = false;
            },
            onClickXmlx(){
                this.show=true;
            },
            onSelect(item) {
                // 默认情况下，点击选项时不会自动关闭菜单
                // 可以通过 close-on-click-action 属性开启自动关闭
                this.show = false;
                this.xmlx = item.name;
                if('交通、公路项目' == item.name){
                    this.xmlxKey = '01';
                }else if('水利项目' == item.name){
                    this.xmlxKey = '02';
                }else if('市政、绿化项目' == item.name){
                    this.xmlxKey = '03';
                }else if('教育项目' == item.name){
                    this.xmlxKey = '04';
                }else if('其他项目' == item.name){
                    this.xmlxKey = '05';
                }else if('(空)' == item.name){
                    this.xmlxKey = '';
                    this.xmlx = '';
                }
            },
            onLoad() {
                this.finished = false;
                this.$http.get(this.apiUrl,{
                    params: {jsdw:this.jsdw,gcmc:this.gcmc,
                        xmlx:this.xmlxKey,xmbm:this.xmbm}
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
            }
        },

    }
</script>

<style scoped>
    #tzxmjsCxHeaderNavBar {
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