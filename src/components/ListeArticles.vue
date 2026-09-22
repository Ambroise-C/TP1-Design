<script setup>
import ArticleItem from './ArticleItem.vue'

const props = defineProps({
  articles: {
    type: Array,
    default: () => [],
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  totalPages: {
    type: Number,
    default: 1,
  },
})

const emit = defineEmits(['page-change', 'add-to-cart', 'delete-article'])

const pageNumbers = () => {
  const pages = []
  for (let page = 1; page <= props.totalPages; page += 1) {
    pages.push(page)
  }
  return pages
}
</script>

<template>
  <div class="articles-layout">
    <div class="article-grid">
      <ArticleItem
        v-for="article in articles"
        :key="article.id"
        :article="article"
        @add-to-cart="emit('add-to-cart', $event)"
        @delete-article="emit('delete-article', $event)"
      />
    </div>

    <div v-if="totalPages > 1" class="pagination">
      <button
        v-for="page in pageNumbers()"
        :key="page"
        class="page-btn"
        :class="{ active: currentPage === page }"
        @click="emit('page-change', page)"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>
