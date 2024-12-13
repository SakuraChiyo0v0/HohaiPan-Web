export const routes = [
    {
        path: '/',
        redirect:'/file'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/file',
        name: 'file',
        component: () => import('@/views/Layout.vue')
    }
]