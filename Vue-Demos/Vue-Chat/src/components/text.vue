<script>
    export default {
        props: ['session'],
        data() {
            return {
                text: ''
            };
        },
        methods: {
            inputing(event) {
                if(event.ctrlKey && event.keyCode === 13 && this.text.length) {
                    this.session.messages.push({
                        text: this.text,
                        date: new Date(),
                        self: true
                    });
                    this.text = '';
                }
            }
        }
    };
</script>
<template>
    <div id="msg-input">
        <textarea placeholder="请按Ctrl+Enter发送信息..."
            @keyup="inputing"
            v-model="text">
        </textarea>
    </div>
</template>
<style lang="less" scoped>
    #msg-input{
        width: 100%;
        height: 200px;
        background-color: #fff;
        textarea{
            width: 100%;
            height: 100%;
            resize: none;
            padding: 5px;
        }
    }
</style>