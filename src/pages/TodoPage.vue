<template>
    <div id="todo">
        <TodoHeader v-on:refreshTodos="refreshTodos"/>
        <TodoItem ref="todoItem"/>
        <!--<TodoItem v-on:showTask="showTask"/>
        <Task ref="task"/>
        <File ref="file"/>-->
    </div>
</template>

<script>
    import TodoHeader from '../components/TodoHeader'
    import TodoItem from '../components/TodoItem'
    /*import Task from '../components/Task'
    import File from '../components/File'*/
    export default {
        metaInfo: {
            title: '待办任务',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' }
            ]
        },
        name: "TodoPage",
        components: {
            TodoItem,
            TodoHeader/*,
            Task,
            File*/
        },
        /*mounted() {
            //这里可放到全局，提供给子 iframe 调用
            window['showFile'] = (param) => {
                this.showFileChlid(param);
            }
        },
        methods: {
            showTask(param) {
                this.$refs.task.showTask(param);
            },
            showFileChlid(param) {
                this.$refs.file.showFile(param);
            }
        },*/
        methods: {
            refreshTodos() {
                this.$refs.todoItem.onLoad();
            }
        }

    }
</script>

<style scoped>
    
</style>