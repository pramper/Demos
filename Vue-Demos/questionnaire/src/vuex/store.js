/**
 * 问卷的存储格式：
 * var questionnaire = {
 *     title: String,
 *     deadline: Number,
 *     state: String [未发布、已发布、已结束],
 *     id: Date.now(), 每一个问卷都有一个唯一的ID
 *     questItemList: Array [questItem] 
 * }
 * var questItem = {
 *     type: radio, checkbox, textarea,
 *     title: '',
 *     name: Date.now()
 *     selections: []
 * }
 *使用localStorage来存储：KEY: questionnaireList, type: Array
 */

import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const KEY = 'questionnaireList'
let questionnaire01 = {
    "title": "问卷调查一",
    "deadline": 1471622400000,
    "state": "未发布",
    "questItemList": [
        {
            "type": "radio",
            "title": "性别",
            "selections": [
                "男",
                "女"
            ],
            "name": 1471528977004
        },
        {
            "type": "checkbox",
            "title": "爱好",
            "selections": [
                "篮球",
                "足球",
                "网球"
            ],
            "name": 1471528987079
        },
        {
            "type": "textarea",
            "title": "自我评价"
        }
    ],
    "id": 1471528999124
}
let questionnaire02 = {
    "title": "问卷调查二",
    "deadline": 1471622400000,
    "state": "已发布",
    "questItemList": [
        {
            "type": "radio",
            "title": "性别",
            "selections": [
                "男",
                "女"
            ],
            "name": 1471528977004
        },
        {
            "type": "checkbox",
            "title": "爱好",
            "selections": [
                "篮球",
                "足球",
                "网球"
            ],
            "name": 1471528987079
        },
        {
            "type": "textarea",
            "title": "自我评价"
        }
    ],
    "id": 1471528999124
}
let questionnaire03 = {
    "title": "问卷调查三",
    "deadline": 1471622400000,
    "state": "已发布",
    "questItemList": [
        {
            "type": "radio",
            "title": "性别",
            "selections": [
                "男",
                "女"
            ],
            "name": 1471528977004
        },
        {
            "type": "checkbox",
            "title": "爱好",
            "selections": [
                "篮球",
                "足球",
                "网球"
            ],
            "name": 1471528987079
        },
        {
            "type": "textarea",
            "title": "自我评价"
        }
    ],
    "id": 1471528999124
}
if(!localStorage.getItem(KEY)) {
    localStorage.setItem(KEY, JSON.stringify([questionnaire01, questionnaire02, questionnaire03]))
}

const state = {
    questionnaireList: JSON.parse(localStorage.getItem(KEY)),   // 所有的调查问卷,type: Array
    currentQuestionnaire: null  // 当前正在操作的调查问卷, type: {}
}

const mutations = {
    // 增加一个新的问卷，item即为新的问卷
    ADD_QUEST(state, item) {
        state.questionnaireList.push(item)
        state.currentQuestionnaire = item
        updateStorage(state)
    },
    // 删除一个问卷，item即为将要被删除的问卷
    RM_QUEST(state, item) {
        let index = state.questionnaireList.indexOf(item)
        if(item !== -1) {
            state.questionnaireList.splice(index, 1)
            updateStorage(state)
        } else {
            throw new Error("该问卷不存在！")
        }
    },
    // 保存一个问卷，用于对还未发布的问卷的更新
    UPDATE_QUEST(state, item) {
        let index = state.questionnaireList.indexOf(item)
        if(index !== -1) {
            state.questionnaireList.splice(index, 1, item)
            state.currentQuestionnaire = item
            updateStorage(state)
        } else {
            throw new Error("该问卷不存在！")
        }
    },
    // 设置当前需要操作的问卷
    SET_QUEST(state, item) {
        if(state.currentQuestionnaire === item) {return}
        state.currentQuestionnaire = item
    }
}

// 每当questionnaire有更新时，就更新localStorage
function updateStorage(state) {
    localStorage.setItem(KEY, JSON.stringify(state.questionnaireList))
}

export default new Vuex.Store({
    state, 
    mutations
})