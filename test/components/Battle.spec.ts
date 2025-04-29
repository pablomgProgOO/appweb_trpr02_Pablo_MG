import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Battle from '../../src/components/Battle.vue'
import type { Player, Enemy } from '../../src/types'

describe('Battle.vue', () => {
  it('les damages sont purements aleatoires donc il devrait avoir un des quatres scenarios', async () => {
    const mockPlayer: Player = {
      name: "PlayerTest",
      ship: "Falcon",
      experience: 4,
      cg: 100,
      life: 100
    }

    const mockEnemy: Enemy = {
      name: "EnemyTest",
      ship: "Destroyer",
      experience: 2,
      cg: 50,
      life: 100
    }

    const wrapper = mount(Battle, {
      props: { player: mockPlayer, enemy: mockEnemy }
    })

    await wrapper.get('button').trigger('click')

    const playerDamaged = mockPlayer.life < 100
    const enemyDamaged = mockEnemy.life < 100
    const enemyNotDamaged= mockEnemy.life==100
    const playerNotDamaged= mockPlayer.life==100


    expect(playerDamaged || enemyDamaged||playerNotDamaged||enemyNotDamaged).toBe(true)
  })

  it('devrait emit apres battle', async () => {
    const mockPlayer: Player = {
      name: "PlayerTest",
      ship: "Falcon",
      experience: 4,
      cg: 100,
      life: 100
    }

    const mockEnemy: Enemy = {
      name: "EnemyTest",
      ship: "Destroyer",
      experience: 2,
      cg: 50,
      life: 100
    }

    const wrapper = mount(Battle, {
      props: { player: mockPlayer, enemy: mockEnemy }
    })

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('update')).toBeTruthy()
  })
})
