import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue'
import GameView from './components/GameView.vue'
import Scoreboard from './components/Scoreboard.vue'
import CharacterSetup from './components/CharacterSetup.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/game', name: 'game', component: GameView },
  { path: '/scoreboard', name: 'scoreboard', component: Scoreboard },
  { path: '/creation', name: 'creation', component: CharacterSetup }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
