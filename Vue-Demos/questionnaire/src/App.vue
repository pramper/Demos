<template>
    <div id="app">
        <v-header></v-header>
        <router-view keep-alive></router-view>
    </div>
</template>

<script>
    import Header from './components/Header'
    import Index from './components/Index'
    import store from './vuex/store'

    export default {
        data () {
            return {
              // note: changing this line won't causes changes
              // with hot-reload because the reloaded component
              // preserves its current state and we are modifying
              // its initial state.
              msg: 'Hello Vue!'
            }
        },
        components: {
            'v-header': Header,
            Index
        },
        store
    }
</script>
  
<style>
    html, body{
    width: 100%;
    height: 100%;
    font-family:  Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif,  fontawesome;
    }
    html, body, div, h1, h2, h3, p, button{
    padding: 0;
    margin: 0;
    line-height: 1;
    }
    html{
        font-size: 100px;
        min-width: 980px;
    }
    button{
        cursor: pointer;
        outline: none;
        border: none;
        font-size: .16rem;
    }
    input, textarea{
        outline: none;
    }
    a{
        text-decoration: none;
    }
    li{
        list-style: none;
    }
    .checkbox, .radio{
        display: none;
    }
    .checkbox + label, .radio + label{
        position: relative;
        font-size: 16px;
        padding-left: 23px;  /* label和选框之间的间隔 */
        cursor: pointer;
        -webkit-user-select: none; /* 禁止label中的文字双击时被选中 */
        -moz-user-select: none;
        -ms-user-select: none;
    }
    .checkbox + label::before, .radio + label::before{
        position: absolute;
        content: "";
        top: 48%;
        margin-top: -8px;
        left: 0;
        width: 16px;
        height: 16px;
        border: 1px solid #c0c0c0;
        background-color: #fff;
    }
    .checkbox + label::before{
        border-radius: 3px;
    }
    .radio + label::before{
        border-radius: 50%;
    }
    .checkbox:checked + label::after{
        position: absolute;
        content: "";
        width: 5px;
        height: 10px;
        top: 48%;
        margin-top: -7px;
        left: 6px;
        transform: rotate(45deg);   /*对号由长方形的两个边框旋转90°构成*/
        border-bottom: 2px solid #fff;
        border-right: 2px solid #fff;
    }
    .checkbox:checked + label::before{
        background-color: #3e97eb;
        border: 1px solid #3e97eb;
    }
    .radio:checked + label::before{
        border: 1px solid #3e97eb;
    }
    .radio:checked + label::after{
        position: absolute;
        content: "";
        width: 6px;   /* radio中心原点的大小 */
        height: 6px;
        top: 50%;
        margin-top: -3px;
        left: 6px;
        border-radius: 50%;
        background-color: #3e97eb;
    }
</style>
