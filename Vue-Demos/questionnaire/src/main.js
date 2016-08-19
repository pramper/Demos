import Vue from 'vue'
import VueRouter from 'vue-router'
import {configRouter} from './router'

Vue.use(VueRouter)

let router = new VueRouter()
configRouter(router)

