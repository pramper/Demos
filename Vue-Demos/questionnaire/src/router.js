import App from './App'

export function configRouter(router) {
    router.map({
        '/index': {
            component: function(resolve) {
                require(['./components/Index'], resolve)
            }
        },
        '/create': {
            component: function(resolve) {
                require(['./components/Create'], resolve)
            }
        },
        '/edit/:questId': {
            component: function(resolve) {
                require(['./components/Edit'], resolve)
            }
        },
        '/preview/:questId': {
            component: function(resolve) {
                require(['./components/Preview'], resolve)
            }
        },
        '/data/:questId': {
            component: function(resolve) {
                require(['./components/Data'], resolve)
            }
        }
    })
    router.redirect({
        '*': '/index'
    })
    router.start(App, 'app')
}