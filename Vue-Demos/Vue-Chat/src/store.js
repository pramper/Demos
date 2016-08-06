const KEY = "chat-data";
var path = require('path');

if(!localStorage.getItem(KEY)) {
    let now = new Date();
    let data = {
        user: {
            id: 1,
            name: '林',
            avatar: './dist/images/1.jpg'
        },
        //用户列表
        userList: [
            {
                id: 2,
                name: '小妮',
                avatar: './dist/images/2.png'
            },
            {
                id: 3,
                name: 'webpack',
                avatar: './dist/images/3.jpg'
            }
        ],
        sessionList: [
            {
                id: 2,
                messages: [
                    {
                        text: '今天晚上吃啥啊？',
                        date: now,
                        self: false //用来表示这个消息是否是user发送的
                    },
                    {
                        text: '哈哈哈！',
                        date: now,
                        self: false
                    }
                ]
            },
            {
                id: 3,
                messages: [
                    {
                        text: '我是不是很好用啊！',
                        date: now,
                        self: false
                    }
                ]
            }
        ]
    };

    localStorage.setItem(KEY, JSON.stringify(data));
}

export default {
    fetch() {
        return JSON.parse(localStorage.getItem(KEY));//返回一个js对象
    },
    //将传入的data对象存下
    save(data) {
        localStorage.setItem(KEY, JSON.stringify(data));
    }
};