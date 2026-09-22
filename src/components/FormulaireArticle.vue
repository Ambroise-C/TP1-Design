<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit-form'])

const article = ref({
  title: '',
  category: '',
  description: '',
  price: 0,
})

const submit = () => {
  if (!article.value.title || !article.value.category || !article.value.description) {
    return
  }

  emit('submit-form', {
    ...article.value,
    price: Number(article.value.price),
  })

  article.value = {
    title: '',
    category: '',
    description: '',
    price: 0,
  }
}
</script>

<template>
  <form class="article-form" @submit.prevent="submit">
    <label>
      Titre
      <input v-model="article.title" type="text" placeholder="Nom de l’article" />
    </label>

    <label>
      Catégorie
      <input v-model="article.category" type="text" placeholder="Ex: Électronique" />
    </label>

    <label>
      Description
      <textarea v-model="article.description" rows="4" placeholder="Description de l’article" />
    </label>

    <label>
      Prix (€)
      <input v-model="article.price" type="number" min="0" step="0.01" />
    </label>

    <button class="btn primary full" type="submit">Enregistrer</button>
  </form>
</template>
