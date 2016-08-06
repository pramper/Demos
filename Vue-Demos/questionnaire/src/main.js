import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Home from './components/Home'
import Data from './components/Data'
import Create from './components/Create'
import Edit from './components/Edit'
import Preview from './components/Preview'


Vue.use(VueRouter)
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
}]

localStorage.setItem("questionnaire", JSON.stringify(demo01))

var router = new VueRouter()

router.map({
    '/home': {
        component: Home
    },
    '/data': {
        component: Data
    },
    '/create': {
        component: Create
    },
    '/edit': {
        component: Edit
    },
    '/preview': {
        component: Preview
    }
})
router.redirect({
    '*': '/home'
})

router.start(App, 'App')

export default router
