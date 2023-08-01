import { createRouter, createWebHashHistory } from 'vue-router';

let router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            component: () => import('@/page/home/Home'),
            children: [
                {
                    path: 'menu',
                    component: import('@/page/home/Menu'),
                },
                {
                    path: 'user',
                    component: import('@/page/home/User'),
                },
                {
                    path: 'role',
                    component: import('@/page/home/Role'),
                },
            ]
        },
        {
            path: '/login',
            component: () => import('@/page/Login'),
        },
    ],
})
export default router;