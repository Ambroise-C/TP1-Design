<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const email = ref('admin@shop.fr')
const password = ref('admin123')
const loginError = ref('')

const login = () => {
  const normalizedEmail = email.value.trim().toLowerCase()
  const normalizedPassword = password.value.trim()

  const isAdminAccount =
    normalizedEmail === 'admin@shop.fr' && normalizedPassword === 'admin123'

  const isRegularUser =
    normalizedEmail === 'test@test' && normalizedPassword === 'test'

  if (!isAdminAccount && !isRegularUser) {
    loginError.value = 'Accès refusé : veuillez utiliser un compte valide.'
    sessionStorage.removeItem('isLoggedIn')
    sessionStorage.removeItem('userRole')
    return
  }

  sessionStorage.setItem('isLoggedIn', 'true')
  sessionStorage.setItem('userRole', isAdminAccount ? 'admin' : 'user')
  loginError.value = ''

  const redirect = route.query.redirect || (isAdminAccount ? '/admin' : '/articles')
  router.push(redirect)
}
</script>

<template>
  <div class="page auth-page">
    <div class="auth-card">
      <p class="eyebrow">Connexion</p>
      <h1>Se connecter</h1>
      <form class="auth-form" @submit.prevent="login">
        <label>
          Email
          <input v-model="email" type="email" placeholder="admin@shop.fr" />
        </label>
        <label>
          Mot de passe
          <input v-model="password" type="password" placeholder="admin123" />
        </label>

        <p v-if="loginError" class="error-message">{{ loginError }}</p>

        <button type="submit" class="btn primary full">Connexion</button>
      </form>
    </div>
  </div>
</template>
