<script setup lang="ts">
import { ref, onMounted } from 'vue'

const scores = ref<{ name: string, score: number }[]>([])

onMounted(() => {
  const savedRanking = JSON.parse(localStorage.getItem('ranking') || '[]')
  scores.value = savedRanking
  scores.value.sort((a, b) => b.score - a.score)
})
</script>

<template>
  <div>
    <h1 class="title">Tableau de pointage</h1>
    <ul v-if="scores.length > 0">
      <li
        v-for="(score, index) in scores"
        :key="index"
        :style="{ fontWeight: index === 0 ? 'bold' : 'normal', color: index === 0 ? '#FFD700' : '#00ffff' }">
        {{ index + 1 }}. {{ score.name }} - {{ score.score }} CG
      </li> 
    </ul>
    <p v-else>
      Aucun score pour l'instant.
    </p>

    <RouterLink to="/">
      <button class="button">Retour à l'accueil</button>
    </RouterLink>
  </div>
</template>
