<script setup>
import Panier from '../components/Panier.vue'

const props = defineProps({
  cart: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Panier</p>
        <h1>Votre sélection</h1>
      </div>
    </header>

    <Panier :items="cart" />
  </div>
</template>
