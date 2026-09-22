<script setup>
import { ref } from 'vue'

const emit = defineEmits(['search'])
const query = ref('')

const onInput = () => {
  emit('search', query.value)
}
</script>

<template>
  <div class="search-box">
    <input
      v-model="query"
      type="text"
      placeholder="Rechercher un article..."
      @input="onInput"
    />
  </div>
</template>
