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
    /*router.map({
            '/index': {
                component: require('./components/Index')
            },
            '/create': {
                component: require('./components/Create')
            },
            '/edit/:questId': {
                component: require('./components/Edit')
            },
            '/preview/:questId': {
                component: require('./components/Preview')
            },
            '/data/:questId': {
                component: require('./components/Data')
            }
        })*/
    router.redirect({
        '*': '/index'
    })
    router.start(App, 'app')
}