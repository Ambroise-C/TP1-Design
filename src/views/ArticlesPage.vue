<script setup>
import { computed, ref } from 'vue'
import BarreRecherche from '../components/BarreRecherche.vue'
import ListeArticles from '../components/ListeArticles.vue'

const props = defineProps({
  articles: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['add-to-cart', 'delete-article'])

const searchTerm = ref('')
const currentPage = ref(1)
const itemsPerPage = 4

const filteredArticles = computed(() => {
  const value = searchTerm.value.trim().toLowerCase()

  if (!value) {
    return props.articles
  }

  return props.articles.filter((article) => {
    return (
      article.title.toLowerCase().includes(value) ||
      article.category.toLowerCase().includes(value) ||
      article.description.toLowerCase().includes(value)
    )
  })
})

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredArticles.value.length / itemsPerPage))
})

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredArticles.value.slice(start, start + itemsPerPage)
})

const handleSearch = (value) => {
  searchTerm.value = value
  currentPage.value = 1
}

const switchPage = (page) => {
  currentPage.value = page
}

const handleAddToCart = (article) => {
  emit('add-to-cart', article)
}

const handleDeleteArticle = (id) => {
  emit('delete-article', id)
}
</script>

<template>
  <div class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Catalogue</p>
        <h1>Nos articles</h1>
      </div>
    </header>

    <BarreRecherche @search="handleSearch" />

    <p v-if="filteredArticles.length === 0" class="empty-state">
      Aucun article ne correspond à votre recherche.
    </p>

    <ListeArticles
      v-else
      :articles="paginatedArticles"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="switchPage"
      @add-to-cart="handleAddToCart"
      @delete-article="handleDeleteArticle"
    />
  </div>
</template>
