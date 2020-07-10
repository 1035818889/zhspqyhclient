<template>
    <div id="todo">
        <van-nav-bar
                id = "jjbkCxHeaderNavBar"
                title="拨款明细查询"
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
                    :key="item.businessId"
                    is-link
                    center
                    @click="showTask(item)"
            >
                {{item.lsh}}<br/>
                {{item.bksqdjh}}<br/>
                {{item.dwmccname}}<br/>
                {{item.xmmc}}<br/>
                {{item.skdw}}<br/>
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
                        v-model="lsh"
                        label="流水号"
                        clearable
                />
                <van-field
                        v-model="bksqdjh"
                        label="拨款编号"
                        clearable
                />
                <van-field
                        v-model="dwmccname"
                        label="单位名称"
                        clearable
                />
                <van-field
                        v-model="xmmc"
                        label="项目名称"
                        clearable
                />
                <van-field
                        v-model="skdw"
                        label="收款单位"
                        clearable
                />
            </van-cell-group>
            <van-goods-action-button style="margin-right:0px;margin-left:0px" type="info" text="查询" @click="onSearch" />
            </div>
        </van-popup>
        <Task ref="task"/>
        <File ref="file"/>
    </div>
</template>

<script>
    import Task from '../../components/Task'
    import File from '../../components/File'
    export default {
        metaInfo: {
            title: '拨款明细查询',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' }
            ]
        },
        name: "JjgcFybkCx",
        components: {
            Task,
            File
        },
        data() {
            return {
                popupShow:true,
                lsh:"",
                bksqdjh:"",
                dwmccname:"",
                xmmc:"",
                skdw:"",
                list: [],
                loading1: false,
                finished: true,
                apiUrl: this.GLOBAL.serverSrc+'/zhspJjbk/getJjgcFybkCx.do'
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
            onLoad() {
                this.finished = false;
                this.$http.get(this.apiUrl,{
                    params: {lsh:this.lsh,bksqdjh:this.bksqdjh,
                        dwmccname:this.dwmccname,xmmc:this.xmmc,skdw:this.skdw}
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
    #jjbkCxHeaderNavBar {
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