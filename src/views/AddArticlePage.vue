<script setup>
import { useRouter } from 'vue-router'
import FormulaireArticle from '../components/FormulaireArticle.vue'

const emit = defineEmits(['add-article'])
const router = useRouter()

const handleSubmit = (article) => {
  emit('add-article', article)
  router.push('/articles')
}
</script>

<template>
  <div class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Administration</p>
        <h1>Ajouter un article</h1>
      </div>
    </header>

    <FormulaireArticle @submit-form="handleSubmit" />
  </div>
</template>
