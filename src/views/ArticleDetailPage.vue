<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  articles: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['add-to-cart'])

const article = computed(() => {
  return props.articles.find((item) => Number(item.id) === Number(props.id))
})

const addCurrentToCart = () => {
  if (article.value) {
    emit('add-to-cart', article.value)
  }
}
</script>

<template>
  <div class="page article-detail-page">
    <template v-if="article">
      <div class="detail-card">
        <div class="detail-illustration">🛍️</div>
        <div class="detail-content">
          <p class="eyebrow">{{ article.category }}</p>
          <h1>{{ article.title }}</h1>
          <p class="detail-price">{{ article.price }} €</p>
          <p>{{ article.description }}</p>
          <div class="detail-actions">
            <button class="btn primary" @click="addCurrentToCart">Ajouter au panier</button>
            <router-link to="/articles" class="btn secondary">Retour</router-link>
          </div>
        </div>
      </div>
    </template>

    <p v-else class="empty-state">Cet article n’existe pas.</p>
  </div>
</template>
