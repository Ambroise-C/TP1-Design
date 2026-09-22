<script setup>
const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['add-to-cart', 'delete-article'])
</script>

<template>
  <article class="article-card">
    <div class="article-icon">📦</div>
    <div class="article-content">
      <p class="eyebrow">{{ article.category }}</p>
      <h3>{{ article.title }}</h3>
      <p>{{ article.description }}</p>
      <div class="article-meta">
        <span>{{ article.price }} €</span>
        <button class="btn primary small" @click="emit('add-to-cart', article)">Ajouter</button>
      </div>
      <div class="article-footer">
        <router-link :to="`/article/${article.id}`" class="link-btn">Détails</router-link>
        <button v-if="article.isAdmin" class="btn danger small" @click="emit('delete-article', article.id)">
          Supprimer
        </button>
      </div>
    </div>
  </article>
</template>
