<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const ship = ref('')
const ships = ref<string[]>([])

const router = useRouter()

function start() {
  if (!name.value || !ship.value) {
    alert('Nom du personnage et vaisseau obligatoires.')
    return
  }

  const player = {
    name: name.value,
    ship: ship.value,
    experience: 4,
    cg: 0,
    life: 100
  }

  localStorage.setItem('player', JSON.stringify(player))
  router.push('/game')
}

// Load available ships from localStorage
onMounted(() => {
  const savedShips = JSON.parse(localStorage.getItem('ships') || '[]')
  ships.value = savedShips.map((s: { name: string }) => s.name)
})
</script>

<template>
    <div>
      <h2>Création de votre personnage</h2>
      <input v-model="name" placeholder="Nom du personnage" />
      <select v-model="ship">
        <option disabled value="">-- Choisir un vaisseau --</option>
        <option v-for="ship in ships" :key="ship">{{ ship }}</option>
      </select>
      <button class="button" @click="start">Commencer</button>
    </div>
  </template>
