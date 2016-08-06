<template>
    <div id="header">
        <h1 class="header-manage"><a v-link="'home'"><i class="fa fa-question-circle-o"></i>&nbsp;问卷管理</a></h1>
        <h2 class="header-mine">我的问卷</h2>
    </div>
</template>
<script>
</script>
<style lang="less">
    @import "../style.less";

    #header{
        display: flex;
        width: 100%;
        height: 40px;
        background-color: @base;
        color: #fff;
        line-height: 40px;
        justify-content: flex-start;
        align-item: center;
        .header-manage a{
            display: inline-block;
            color: #fff;
            font-size: 20px;
        }
        .header-mine, .header-manage{
            line-height: 40px;
        }
        .header-manage{
            font-weight: bold;
            margin-left: 30px;
        }
        .header-mine{
            font-size: 16px;
            font-weight: normal;
            margin-left: 40px;
        }
    }
</style>