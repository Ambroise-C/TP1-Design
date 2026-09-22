<script setup>
const props = defineProps({
  articles: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['delete-article'])
</script>

<template>
  <div class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Admin</p>
        <h1>Gestion des articles</h1>
      </div>
    </header>

    <div v-if="articles.length" class="admin-list">
      <article v-for="article in articles" :key="article.id" class="admin-item">
        <div>
          <h3>{{ article.title }}</h3>
          <p>{{ article.category }} · {{ article.price }} €</p>
        </div>
        <button class="btn danger" @click="emit('delete-article', article.id)">Supprimer</button>
      </article>
    </div>

    <p v-else class="empty-state">Aucun article pour le moment.</p>
  </div>
</template>
