<template>
    <div class="card">
      <h3>Mission {{ number }}/5</h3>
      <h3>{{ text }}</h3>
    </div>
  </template>
  <script setup lang="ts">
  defineProps<{ number: number, text:string }>()
  </script>