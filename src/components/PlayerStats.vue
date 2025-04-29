<script setup lang="ts">
  import type { Player } from '../types'
   defineProps<{ player: Player }>()
  </script>
<template>
    <div class="card">
      <h3>Joueur : {{ player.name }}</h3>
      <p>Vaisseau : {{ player.ship }}</p>
      <p>Expérience : {{ player.experience }}</p>
      <p>Vie : {{ player.life }}%</p>
      <p>Crédits Galactiques : {{ player.cg }}</p>
    </div>
  </template>
  
  