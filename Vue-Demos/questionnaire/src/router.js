import App from './App'

export function configRouter(router) {
    router.map({
        '/index': {
            component: require('./components/Index')
        },
        // 每个问卷都有一个唯一的ID，先用时间戳来表示
        /*'/questionnaire/:id': {
            component: require('./components/Questionnaire'),
            subRoutes: {
                '/edit': {
                    component: require('./components/Edit')
                },
                'preview': {
                    component: require('./components/Preview')
                }
            }
        },*/
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
    })
    router.redirect({
        '*': '/index'
    })
    router.start(App, 'app')
}