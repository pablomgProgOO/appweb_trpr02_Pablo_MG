<script setup lang="ts">
import { ref } from 'vue'
import type { Player } from '../types'

const props = defineProps<{ player: Player }>()
const emit = defineEmits(['repaired'])

const repairAmount = ref(0)

function cost() {
  return repairAmount.value * 2
}

function confirmRepair() {
  if (cost() > props.player.cg) {
    alert("Pas assez de CG.")
    return
  }
  if(props.player.life+repairAmount.value>100){
    alert("Vous surpassez le nombre de reparations necessaires")
    
  }
  props.player.life = props.player.life + repairAmount.value
  props.player.cg -= cost()
  emit('repaired', props.player)
}
</script>

<template>
  <div>
    <label>Réparer combien de {{repairAmount}}% de {{ props.player.life }} de vie ?</label>
    <input type="range" v-model.number="repairAmount" min="0" max="100 - player.life" />
    <p>Coût : {{ cost() }} CG</p>
    <button class="button" @click="confirmRepair">Réparer</button>
  </div>
</template>
