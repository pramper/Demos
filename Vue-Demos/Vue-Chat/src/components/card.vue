<script>
    export default {
        props: ['user', 'search']
    }
</script>
<template>
    <div class="m-card">
        <div>
            <img :src="user.avatar" :alt="user.name"><span>{{user.name}}</span>
        </div>
        <div>
            <input v-model="search" placeholder="search..." class="search" />
        </div>
    </div>
</template>
<style lang="less" scoped>
    .m-card{
        width: 100%;
        height: 130px;
        box-sizing: border-box;
        padding: 20px;
         img{
            width: 60px;
            height: 60px;
            vertical-align: middle;
        }
        span{
            margin-left: 20px;
        } 
        .search{
            border: none;
            border-radius: 3px;
            width: 150px;
            height: 20px;
            margin-top: 10px;
            padding: 3px;
        }
    }
</style>