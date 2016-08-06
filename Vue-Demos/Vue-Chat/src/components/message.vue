<script>
    export default {
        props: ['session', "sessionUser", 'user'],
        filters: {
            handleDate(date) {
                if(typeof date === 'string') {
                    date = new Date(date);
                }
                return date.getHours() + ':' + date.getMinutes();
            }
        },
        methods: {
            getAvatar(message) {
                if(message.self) {
                    return this.user.avatar;
                }
                return this.sessionUser.avatar;
            }
        },
        directives: {
            'scroll-bottom'() {
                this.el.scrollTop = this.el.scrollHeight - this.el.clientHeight;
            }
        }
    };
</script>
<template>
    <div id="message" >
        <ul v-scroll-bottom="session.messages">
            <li v-for="message in session.messages"
                >
                <div v-if="message.self" class="align-right">
                    <span class="message">{{message.text}}</span>
                    <img :src="user.avatar" :alt="sessionUser.name">
                </div>
                <div v-else class="align-left">
                    <img :src="sessionUser.avatar" :alt="sessionUser.name">
                    <span class="message">{{message.text}}</span>
                </div>
                <p class="date">{{message.date | handleDate}}</p>
            </li>
        </ul>
    </div>
</template>
<style lang="less" scoped>
    #message{
        width: 100%;
        height: 500px;
        background-color: #ccc;
        ul{
            width: 100%;
            height: 100%;
            overflow: auto;
        }
        li{
            list-style: none;
            padding: 10px;
        }
        img{
            width: 40px;
            height: 40px;
            vertical-align: middle;
        }
        .message{
            font-size: 16px;
            border-radius: 4px;
            padding: 3px 5px;
            margin-left: 10px;
            background-color: #fff;
        }
        .date{
            width: 43px;
            height: 20px;
            font-size: 14px;
            text-align: center;
            border: 1px solid #fff;
            border-radius: 4px;
            margin: 0 auto;
            color: #fff;
        }
        .align-left{
            text-align: left;
        }
        .align-right{
            text-align: right;
        }
    }
</style>