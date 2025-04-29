<template>
    <div>
      <button class="button" @click="fight">Combattre</button>
      <p>{{ message }}</p>
    </div>
  </template>
  <script setup lang="ts">
  import { ref } from 'vue'
  import type { Player, Enemy } from '../types'
  const props = defineProps<{ player: Player, enemy: Enemy }>()
  const emit = defineEmits(['update'])
  const message = ref('')
  
  function getHitChance(exp: number) {
    return [0.2, 0.35, 0.5, 0.7][exp - 1]
  }
  function getDamage() {
    return 3 + Math.floor(Math.random() * 4)
  }
  function fight() {
    const pHit = Math.random() < getHitChance(props.player.experience)
    const eHit = Math.random() < getHitChance(props.enemy.experience)
    if (pHit) props.enemy.life -= getDamage()
    if (eHit) props.player.life -= getDamage()
    emit('update', props.player)
    if (props.enemy.life <= 0) message.value = `Victoire! Vous avez gagné ${props.enemy.cg} CG.`
    else if (props.player.life <= 0) message.value = `Défaite! Votre vaisseau est détruit.`
    else message.value = `Tour terminé.`
  }
  </script>