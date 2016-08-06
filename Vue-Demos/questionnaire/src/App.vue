<template>
  <div id="app">
    <v-header></v-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/Header'
  import store from './vuex/store'

  export default{
    components: {
      'v-header': Header,
    },
    store
  }
</script>

<style lang="less">

  html, body{
    width: 100%;
    height: 100%;
    font-family:  Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
    user-select: none;
  }
  html, body, div, h1, h2, h3, p, button{
    padding: 0;
    margin: 0;
    line-height: 1;
    font-size: 100%;
  }
  button, input, textarea{
    outline: none;
  }
  body{
    background-color: #eee;
  }
  li{
    list-style: none;
  }
  #app{
    width: 100%;
  }
  a{
    text-decoration: none;
  }
  button{
    cursor: pointer;
  }
</style>
