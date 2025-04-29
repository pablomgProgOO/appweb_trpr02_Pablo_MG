<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router'
import type { Player } from "../types";

const player = ref<Player>(JSON.parse(localStorage.getItem('player') || '{}'))
const router = useRouter()

function logOff() {
  if (confirm('Êtes-vous sûr de vouloir vous déconnecter?')) {
    player.value.life = 100
    player.value.cg = 0
    player.value.name = ''
    player.value.ship = ''
    localStorage.setItem('player', JSON.stringify(player.value))
    router.push('/')
  }
}
</script>

<template>
  <div class="container-home">
    <h1 class="title">TRON</h1>

    <div class="menu">
      <div v-if="player.name === ''">
        <RouterLink to="/creation">
          <button class="button">Nouveau Joueur</button>
        </RouterLink>
      </div>
      <div v-else>
        <RouterLink to="/game">
          <button class="button">Nouvelle Partie</button>
        </RouterLink>
      </div>

      <RouterLink to="/scoreboard">
        <button class="button">Tableau de Pointage</button>
      </RouterLink>

      <button @click="logOff" class="button">Se Déconnecter</button>
    </div>
  </div>
</template>
