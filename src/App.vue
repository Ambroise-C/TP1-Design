<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const initialArticles = [
  { id: 1, title: 'Casque Bluetooth', category: 'Audio', description: 'Casque léger avec audio de qualité et autonomie longue durée.', price: 79 },
  { id: 2, title: 'Montre Connectée', category: 'Tech', description: 'Suivi de santé, notifications et GPS intégré.', price: 129 },
  { id: 3, title: 'Lampe LED', category: 'Maison', description: 'Lampe intelligente compatible Alexa et Google Assistant.', price: 39 },
  { id: 4, title: 'Sac de voyage', category: 'Accessoires', description: 'Sac spacieux et résistant pour les déplacements quotidiens.', price: 64 },
  { id: 5, title: 'Clavier mécanique', category: 'Bureau', description: 'Clavier compacte avec switches tactiles pour les longues sessions.', price: 89 },
  { id: 6, title: 'Smartphone 128 Go', category: 'Tech', description: 'Téléphone moderne, écran vibrant et appareil photo avancé.', price: 449 },
]

const articles = ref(initialArticles)
const cart = ref([])
const isLoggedIn = ref(sessionStorage.getItem('isLoggedIn') === 'true')

watch(
  () => route.fullPath,
  () => {
    isLoggedIn.value = sessionStorage.getItem('isLoggedIn') === 'true'
  },
)

const cartCount = computed(() => cart.value.length)

const addToCart = (article) => {
  cart.value = [...cart.value, { ...article }]
}

const addArticle = (article) => {
  const newArticle = {
    ...article,
    id: Date.now(),
  }

  articles.value = [newArticle, ...articles.value]
}

const deleteArticle = (id) => {
  articles.value = articles.value.filter((article) => Number(article.id) !== Number(id))
  cart.value = cart.value.filter((article) => Number(article.id) !== Number(id))
}

const logout = () => {
  sessionStorage.removeItem('isLoggedIn')
  sessionStorage.removeItem('userRole')
  isLoggedIn.value = false
  router.push('/')
}
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <div class="brand-wrap">
        <router-link to="/" class="brand">ShopVue</router-link>
      </div>

      <nav class="main-nav">
        <router-link to="/">Accueil</router-link>
        <router-link to="/articles">Articles</router-link>
        <router-link to="/ajouter">Ajouter</router-link>
        <router-link to="/panier">Panier <span class="badge">{{ cartCount }}</span></router-link>
        <router-link to="/admin">Admin</router-link>
      </nav>

      <div class="nav-actions">
        <template v-if="isLoggedIn">
          <button class="btn secondary small" @click="logout">Déconnexion</button>
        </template>
        <template v-else>
          <router-link to="/login" class="btn secondary small">Connexion</router-link>
        </template>
      </div>
    </header>

    <main class="main-content">
      <router-view v-slot="{ Component }">
        <component
          :is="Component"
          :articles="articles"
          :cart="cart"
          @add-to-cart="addToCart"
          @add-article="addArticle"
          @delete-article="deleteArticle"
        />
      </router-view>
    </main>
  </div>
</template>
