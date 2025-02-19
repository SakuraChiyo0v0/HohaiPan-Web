export const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/file',
        name: 'file',
        component: () => import('@/views/Layout.vue'),
        children: [
            {
                path: '/file/:categoryCode',
                component: () => import('@/views/file/FileView.vue')
            },
            {
                path: '/share',
                component: () => import('@/views/share/Share.vue'),
                children: [{
                    path: '/share/file',
                    component: () => import('@/views/share/ShareFile.vue')
                }, {
                    path: '/share/record',
                    component: () => import('@/views/share/ShareRecord.vue')
                },{
                    path: '/share/get',
                    component: () => import('@/views/share/ShareGet.vue')
                }]
            },
            {
                path: '/recycle',
                component: () => import('@/views/recycle/Recycle.vue')
            },
            {
                path: '/setting',
                children: [{
                    path: '/setting/info',
                    component: () => import('@/views/setting/InfoSetting.vue')
                }, {
                    path: '/setting/resetPwd',
                    component: () => import('@/views/setting/ReSetPassword.vue')
                }, {
                    path: '/setting/avatar',
                    component: () => import('@/views/setting/AvatarSetting.vue')
                }]
            }
        ]
    }, {
        path: '/test',
        name: 'test',
        component: () => import('@/views/test.vue')
    }
]