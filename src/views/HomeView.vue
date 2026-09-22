<script setup>
defineProps({
  articles: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="page home-page">
    <section class="hero-box">
      <p class="eyebrow">Boutique Vue</p>
      <h1>Découvrez les meilleurs articles</h1>
      <p class="subtitle">
        Consultez les nouveautés, ajoutez des produits, gérez votre panier et lancez une
        administration rapide.
      </p>
      <div class="hero-actions">
        <router-link to="/articles" class="btn primary">Voir le catalogue</router-link>
        <router-link to="/ajouter" class="btn secondary">Ajouter un article</router-link>
      </div>
    </section>

    <section class="stats-grid">
      <article class="stat-card">
        <span>{{ articles.length }}</span>
        <p>Articles en ligne</p>
      </article>
      <article class="stat-card">
        <span>7</span>
        <p>Catégories</p>
      </article>
      <article class="stat-card">
        <span>24h</span>
        <p>Livraison rapide</p>
      </article>
    </section>
  </div>
</template>
