<script>
    export default {
        props: ['userList', 'search', 'sessionUser'], //sessionUser表示和你聊天的那位用户
        filters: {
            search(list) {
                return list.filter(item => item.name.indexOf(this.search)>-1);
            }
        }
    };
</script>
<template>
    <div id="user-list">
        <ul>
            <li v-for="user in userList | search" @click="sessionUser=user"
                :class="{active: sessionUser.id === user.id}">
                <img :src="user.avatar" :alt="user.name"><span>{{user.name}}</span>
            </li>
        </ul>
    </div>
</template>
<style lang="less" scoped>
    #user-list{
        padding: 15px;
        border-top: 1px #ccc solid;
        li{
            list-style: none;
            margin-bottom: 15px;
            cursor: pointer;
        }
        img{
            width: 40px;
            height: 40px;
            vertical-align: middle;
        }
        span{
            margin-left: 10px;
        }
        .active{
            background-color: #aaa;
        }
    }
</style>