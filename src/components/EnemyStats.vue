<script setup lang="ts">
  import type { Enemy } from '../types'
  defineProps<{ enemy: Enemy }>()
  </script>
<template>
    <div class="card">
      <h3>Ennemi : {{ enemy.name }}</h3>
      <p>Vaisseau : {{ enemy.ship }}</p>
      <p>Expérience : {{ enemy.experience }}</p>
      <p>Vie : {{ enemy.life }}%</p>
      <p>Crédits : {{ enemy.cg }}</p>
    </div>
  </template>
  
  