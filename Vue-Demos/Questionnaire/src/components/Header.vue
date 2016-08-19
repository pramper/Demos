<template>
    <div id="header">
        <h1><a v-link="'#/index'"><i class="fa fa-question-circle-o"></i>&nbsp;问卷管理</a></h1>
        <h2>我的问卷</h2>
    </div>
</template>
<script>
    
</script>
<style lang="less">
    @import '../color.less';

    #header{
        width: 100%;
        height: 0.4rem;
        background-color: @base;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #fff;
        h1{
            font-size: 0.22rem;
            font-weight: bold;
            margin-left: 0.22rem;
            a{
                color: #fff;
            }
        }
        
        
        h2{
            font-size: 0.18rem;
            font-weight: normal;
            margin-left: 0.25rem;
        }
    }
</style>