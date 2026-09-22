<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})

const total = computed(() => {
  return props.items.reduce((sum, item) => sum + Number(item.price || 0), 0)
})
</script>

<template>
  <div class="cart-panel">
    <div v-if="items.length" class="cart-list">
      <div v-for="item in items" :key="item.id" class="cart-item">
        <span>{{ item.title }}</span>
        <span>{{ item.price }} €</span>
      </div>
    </div>

    <p v-else class="empty-state">Votre panier est vide.</p>

    <div v-if="items.length" class="cart-summary">
      <strong>Total :</strong>
      <span>{{ total }} €</span>
    </div>
  </div>
</template>
