<template>
    <div>
        <h1>Home</h1>
        <p>{{msg}}</p>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data: function() {
            return {
                msg: 'Hello, vue router!'
            }
        }
    }
</script>

<style scoped>

</style>