import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

// Hash história funguje na GitHub Pages bez 404 pri obnovení stránky
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/knihy', name: 'books', component: () => import('@/views/BooksView.vue') },
    { path: '/knihy/:id', name: 'book', props: true, component: () => import('@/views/BookDetailView.vue') },
    { path: '/pridat', name: 'add', component: () => import('@/views/AddBookView.vue') },
    { path: '/statistiky', name: 'stats', component: () => import('@/views/StatsView.vue') },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFoundView.vue') }
  ]
})

export default router