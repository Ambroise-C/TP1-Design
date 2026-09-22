import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticlesPage from '../views/ArticlesPage.vue'
import ArticleDetailPage from '../views/ArticleDetailPage.vue'
import AddArticlePage from '../views/AddArticlePage.vue'
import PanierPage from '../views/PanierPage.vue'
import LoginPage from '../views/LoginPage.vue'
import AdminPage from '../views/AdminPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/articles', name: 'articles', component: ArticlesPage },
    { path: '/article/:id', name: 'article-detail', component: ArticleDetailPage, props: true },
    { path: '/ajouter', name: 'add-article', component: AddArticlePage },
    { path: '/panier', name: 'panier', component: PanierPage },
    { path: '/login', name: 'login', component: LoginPage },
    { path: '/admin', name: 'admin', component: AdminPage, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.beforeEach((to, from) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true'
  const userRole = sessionStorage.getItem('userRole') || 'user'

  if (requiresAuth && !isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (requiresAuth && userRole !== 'admin') {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  return true
})

export default router
