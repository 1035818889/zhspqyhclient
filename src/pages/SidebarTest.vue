<template>
    <div>
        <van-tree-select
                height="55vw"
                :items="items"
                :main-active-index.sync="activeIndex"
        >
            <template slot="content">
                <!--<van-image v-if="activeIndex === 0" src="https://img.yzcdn.cn/vant/apple-1.jpg" />
                <van-image v-if="activeIndex === 1" src="https://img.yzcdn.cn/vant/apple-2.jpg" />-->
                <div v-if="activeIndex === 0">

                </div>
            </template>
        </van-tree-select>
    </div>
</template>

<script>
    export default {
        name: "SidebarTest",
        data() {
            return {
                activeIndex: 0,
                items: [{ text: '分组 1' }, { text: '分组 2' }]
            }
        }
    }
</script>

<style scoped>

</style>