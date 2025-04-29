export type Experience = 1 | 2 | 3 | 4 // 1 = Débutant, 4 = Maître

export interface Player {
  name: string
  ship: string
  experience: Experience
  cg: number 
  life: number 
}

export interface Enemy {
  name: string
  ship: string
  experience: Experience
  cg: number
  life: number
}

export interface Mission {
  number: number // de 1 à 5
  enemy: Enemy
}

export interface ScoreEntry {
  name: string
  cg: number
}
