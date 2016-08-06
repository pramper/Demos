<template>
    <div>
        <div id="sidebar">
            <card :user="user" :search.sync="search"></card>
            <user-list :user-list="userList" :search="search" :session-user.sync="sessionUser"></user-list>
        </div>
        <div id="main">
            <message :session="session" :session-user="sessionUser" :user="user"></message>
            <text :session="session"></text>
            <!-- 疑问：我在text中修改session,为什么父组件中的session也改变，从而导致message中的session改变，我没做双向绑定啊？ -->
        </div>
    </div>
</template>
<style lang="less">
    #app{
        overflow: hidden;
        #sidebar{
            float: left;
            width: 200px;
            height: 100%;
            color: #fff;
            background-color: #2e3238;
        }
        #main{
            float: left;
            width: 800px;
            height: 100%;
        }
    }
</style>
<script>
    import store from '../store';
    import card from './card';
    import userList from './userList';
    import message from './message';
    import text from './text';

    export default {
        el: '#app',
        data() {
            let data = store.fetch();
            return {
                sessionList: data.sessionList,
                user: data.user,
                search: '',
                userList: data.userList,
                sessionUser: data.userList[0]
            }
        },
        computed: {
            session: function() {
                for(let i=0; i<this.sessionList.length; i++) {
                    if(this.sessionList[i].id === this.sessionUser.id) {
                        return this.sessionList[i];
                    }
                }
            }
        },
        components: {
            card, userList, message, text
        },
        watch: {
            sessionList: {
                deep: true,
                handler() {
                    console.log(1);
                    store.save({
                        user: this.user,
                        userList: this.userList,
                        sessionList: this.sessionList
                    });
                }
            }
        }
    };
</script>