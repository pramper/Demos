import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

// localStorage操作
const KEY = "questionnaire"
var demo01 = [{
    "title": "问卷一",
    "deadline": "2016/8/30",
    "questItems": [
        {
            "type": "radio",
            "desc": "性别",
            "selections": [
                "男",
                "女"
            ],
            "name": 1470485669566
        },
        {
            "type": "checkbox",
            "desc": "爱好",
            "selections": [
                "篮球",
                "足球",
                "排球"
            ],
            "name": 1470485683971
        },
        {
            "type": "radio",
            "desc": "年收入",
            "selections": [
                "1万以下",
                "1-2万",
                "2-3万",
                "3万以上"
            ],
            "name": 1470485776238
        },
        {
            "type": "textarea",
            "desc": "自我评价"
        }
    ],
    "state": "已发布"
},
{
    "title": "问卷二",
    "deadline": "2016/9/30",
    "questItems": [
        {
            "type": "radio",
            "desc": "性别",
            "selections": [
                "男",
                "女"
            ],
            "name": 1470485669566
        },
        {
            "type": "checkbox",
            "desc": "爱好",
            "selections": [
                "篮球",
                "足球",
                "排球"
            ],
            "name": 1470485683971
        },
        {
            "type": "radio",
            "desc": "年收入",
            "selections": [
                "1万以下",
                "1-2万",
                "2-3万",
                "3万以上"
            ],
            "name": 1470485776238
        },
        {
            "type": "textarea",
            "desc": "自我评价"
        }
    ],
    "state": "未发布"
}
]

// localStorage.setItem("questionnaire", JSON.stringify(demo01))
if(!localStorage.getItem(KEY)) {
    // 存入一个数组
    localStorage.setItem(KEY, JSON.stringify(demo01))
}
var fetchStore = function() {
    return JSON.parse(localStorage.getItem(KEY)) //返回一个数组对象
}
var save = function(data) {
    let questionnaire = fetchStore()
    questionnaire.push(data)
    localStorage.setItem(KEY, JSON.stringify(questionnaire))
}

// vuex相关
const state = {
    questionnaireList: fetchStore(), // 取得所有的调查问卷
    questionnaire: {}  // 其中一个调查问卷
}

const mutations = {
    //更新一个调查问卷，以下的item参数均表示为一个调查问卷
    UPDATE_QUEST(state, item) {
        let index = state.questionnaireList.indexOf(item)
        state.questionnaireList.splice(index, 1, item)
        localStorage.setItem(KEY, JSON.stringify(state.questionnaireList))
    },
    // 获取一个调查问卷
    GET_QUEST(state, item) {
        state.questionnaire = item
    },
    // 保存一个调查问卷
    SAVE(state, item) {
        state.questionnaireList.push(item)
        localStorage.setItem(KEY, JSON.stringify(state.questionnaireList))
    },
    // 发表一个调查问卷
    PUBLISH(state, item) {
        let index = state.questionnaireList.indexOf(item)
        if(index === -1) {
            state.questionnaireList.push(item)
        } else {
            state.questionnaireList.splice(index, 1, item)
        }
        localStorage.setItem(KEY, JSON.stringify(state.questionnaireList))
    },
    //删除一个调查问卷
    DELETE_ONE(state, item) {
        let index = state.questionnaireList.indexOf(item)
        state.questionnaireList.splice(index, 1)
        localStorage.setItem(KEY, JSON.stringify(state.questionnaireList))
    }
}

export default new Vuex.Store({
    state,
    mutations
})

