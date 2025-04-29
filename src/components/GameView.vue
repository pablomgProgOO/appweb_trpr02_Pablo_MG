<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import {useRouter} from 'vue-router'
  import PlayerStats from './PlayerStats.vue'
  import MissionStatus from './MissionStatus.vue'
  import EnemyStats from './EnemyStats.vue'
  import Battle from './Battle.vue'
  import Repair from '../components/Repair.vue'
  import type { Player, Enemy, Experience } from '../types'
  const router = useRouter()
  const player = ref<Player>(JSON.parse(localStorage.getItem('player') || '{}'))
  const enemy = ref<Enemy>({ name: '', ship: '', experience: 1, cg: 0, life: 100 })
  const missionNumber = ref(1)
  const missionStatusText = ref("Mission en cours...")

  function generateEnemy(): Enemy {
  const savedCharacters = JSON.parse(localStorage.getItem('characters') || '[]')
  if (savedCharacters.length === 0) {
    //Pour les tests
        return {
      name: 'Default Enemy',
      ship: 'Default Ship',
      experience: 1,
      cg: 0,
      life: 100
    }
  }
  const randomCharacter = savedCharacters[Math.floor(Math.random() * savedCharacters.length)]

  return {
    name: randomCharacter.name,
    ship: randomCharacter.ship,
    experience: randomCharacter.experience as Experience,
    cg: randomCharacter.credit,
    life: randomCharacter.ship.vitality
  }
}

  function saveScore(player: Player) {
  const ranking = JSON.parse(localStorage.getItem('ranking') || '[]')
  ranking.push({ id: Date.now(), name: player.name, score: player.cg })
  localStorage.setItem('ranking', JSON.stringify(ranking))
}
  function leaveGame() {
      player.value.life=0
      onUpdate(player.value)
    }
  

  function onUpdate(updatedPlayer: Player) {
    player.value = updatedPlayer
    localStorage.setItem('player', JSON.stringify(player.value))
    if (player.value.life <= 0){
      player.value.life=100
      localStorage.setItem('player', JSON.stringify(player.value))
      router.push('/')
    } 
    if (enemy.value.life <= 0) {
      player.value.cg += enemy.value.cg
      missionNumber.value++
    if (missionNumber.value > 4) {
      missionStatusText.value="MISSION ACCOMPLIE"
      if(player.value.experience<5){
        player.value.experience+=1
      }
      saveScore(player.value)
      player.value.life=100
      player.value.cg=0 //j'assume que les cg reset pour chaque partie
      localStorage.setItem('player', JSON.stringify(player.value))
      router.push('/scoreboard')
    }
    else {
        enemy.value = generateEnemy()
      }
    }
  }
  
  onMounted(() => {
    enemy.value = generateEnemy()
  })
  </script>
  
  <template>
    <div class="container">
      <button @click="leaveGame" class="button">Quitter la Partie</button>
      <PlayerStats :player="player" />
      <MissionStatus :number="missionNumber" :text="missionStatusText"/>
      <EnemyStats :enemy="enemy" />
      <Battle :player="player" :enemy="enemy" @update="onUpdate" />
      <Repair :player="player" @repaired="onUpdate" />
    </div>
  </template>
  
  