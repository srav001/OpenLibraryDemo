import { createRouter, createWebHistory } from 'vue-router';
import Index from '../pages/IndexPage.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'index',
			component: Index
		},
		{
			path: '/list',
			name: 'list',
			component: () => import('../pages/ListPage.vue')
		}
	]
});

export default router;
