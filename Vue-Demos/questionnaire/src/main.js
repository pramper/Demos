import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Home from './components/Home'
import Data from './components/Data'
import Create from './components/Create'
import Edit from './components/Edit'
import Preview from './components/Preview'


Vue.use(VueRouter)


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
