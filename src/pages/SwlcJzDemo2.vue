<template>
    <div>
        <van-row style="padding-bottom: 65px;">
            <van-col span="6">
                <van-sticky>
                    <van-sidebar v-model="activeKey" @change="sidebarClick">
                        <van-sidebar-item title="基本信息"/>
                        <van-sidebar-item title="科室意见"/>
                        <van-sidebar-item title="综合意见"/>
                        <van-sidebar-item title="正文附件"/>
                    </van-sidebar>
                </van-sticky>
            </van-col>
            <van-col span="18">
                <van-swipe ref="item" :loop="false" :show-indicators="false" :touchable="false">
                    <van-swipe-item>
                        <van-panel>
                            <div>
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
                        </van-panel>
                    </van-swipe-item>
                    <van-swipe-item>
                        <van-collapse v-model="activeNames">
                            <van-collapse-item title="预算科" name="1">
                                <van-cell title="张珊珊 2019-11-10" label="来文收悉，经研究，现提出如下情况说明及具体意见：
    一、情况说明
    来文摘要：区卫生健康局与珠江医院共同代拟了合作办医的协议书，现向区政府申请审定。
    调查情况:
    协议书中涉及财政职能的内容如下：
    1、总投入预算经费不低于17亿元人民币。
    2、医院为三水区人民政府举办的非营利性公立医院，属于国家公益二类事业单位。
    3、三水区人民政府落实政府办医义务，保障医院基础设施设备、学科人才建设和初期运营管理投入。其中，至少保障开业前三年的人力资源储备经费和开业后五年的运营补贴，或按员工实际员额划拨乙方人员财政专项补助（具体细则在后续合同中补充说明）。
    4、按照佛山市三水区属公立医院的投入政策和标准，以及双方约定的运营模式、发展规划、年度计划和考核结果，履行对医院的政府投入和财政补助责任，确保提供与同级公立非营利医疗机构一致的政策保障和经费投入。
    5、执行政府指令性计划，积极承担卫生健康行政主管部门交办的卫生应急、对口支援、公共卫生服务及医疗保障任务，甲方予以专项经费补助。
    6、双方合作期限为50年。
    二、具体意见
    1、建议将第五条“政策保障和财务管理”中“执行《政府会计制度》和《医院财务制度》”修改为“执行《政府会计制度》以及公立医院的相关预算和财务管理制度”。理由：2019年实施新政府会计制度后，《医院财务制度》的部分条文（如：会计科目）已经不适用。
    2、建议结合本协议约定的双方权利和义务，在今后进一步完善相关的违约责任条款。
    3、对征求意见稿其他内容无修改意见。" />
                                <van-cell title="万思思 2019-11-10" label="行政事业性资产物业管理相关费用的请示。" />
                                <van-cell title="万芳芳 2019-11-10" label="同意。" />
                            </van-collapse-item>
                            <van-collapse-item title="基建科" name="2">
                                <van-cell title="李思思" label="关于安排行政事业性资产物业管理相关费用的请示" />
                            </van-collapse-item>
                        </van-collapse>
                    </van-swipe-item>
                    <van-swipe-item>
                        <van-cell-group title="回复正文">
                            <van-cell is-link center title="关于安排行政事业性资产物业管理相关费用的请示.doc" />
                            <van-cell is-link center title="关于安排行政事业性资产物业管理相关费用的请示.doc" />
                        </van-cell-group>
                        <van-cell-group title="回复附件">
                            <van-cell is-link center title="关于安排行政事业性资产物业管理相关费用的请示.doc" />
                            <van-cell is-link center title="关于安排行政事业性资产物业管理相关费用的请示.doc" />
                        </van-cell-group>
                    </van-swipe-item>
                    <van-swipe-item>
                        <van-cell is-link center title="关于安排行政事业性资产物业管理相关费用的请示.doc" />
                        <van-cell is-link center title="关于安排行政事业性资产物业管理相关费用的请示.doc" />
                    </van-swipe-item>
                </van-swipe>
            </van-col>
        </van-row>
        <van-goods-action safe-area-inset-bottom style="width: 100%;">
            <van-row style="width: 100%;">
                <van-col span="5">
                    <van-goods-action-button style="border-top-left-radius: 10px;border-bottom-left-radius: 10px;margin-left:0px" type="warning" text="退回" @click="onClickBack" />
                </van-col>
                <van-col span="10">
                    <van-field v-model="value" placeholder="请输入审批意见" />
                </van-col>
                <van-col span="4">
                    <van-goods-action-icon icon="chat-o" text="" @click="onClickSpyj" />
                </van-col>
                <van-col span="5">
                    <van-goods-action-button style="border-top-right-radius: 10px;border-bottom-right-radius: 10px;" type="info" text="同意" @click="onClickPass" />
                </van-col>
            </van-row>
       </van-goods-action>
        <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
    </div>
</template>

<script>
    export default {
        name: "SwlcJz",
        data() {
            return {
                jbxx: [],
                loadingJbxx: false,
                finishedJbxx: false,
                apiUrlJbxx: 'http://19.131.100.156:8089/zhsp/zhsp.qyh.wjysById.action',
                activeKey: 0,
                activeNames: ['1'],
                show: false,
                value:"",
                actions: [
                    { name: '同意。' },
                    { name: '退回。' }
                ]
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
            onClickBack(){

            },
            onClickPass(){

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

            }
        }
    }
</script>

<style scoped>

</style>