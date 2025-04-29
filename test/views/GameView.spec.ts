import { vi } from 'vitest'

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}))

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GameView from '../../src/components/GameView.vue'
import { nextTick } from 'vue'

describe('GameView.vue', () => {
  it('devrait commencer avec joueur de localStorage', async () => {
    localStorage.setItem('player', JSON.stringify({
      name: "HeroTest",
      ship: "X-Wing",
      experience: 4,
      cg: 0,
      life: 100
    }))

    localStorage.setItem('characters', JSON.stringify([
      {
        name: "FakeEnemy",
        ship: { name: "FakeShip", vitality: 100 },
        experience: 2,
        credit: 50
      }
    ]))

    const wrapper = mount(GameView)

    expect(wrapper.text()).toContain('100')
  })

  it('devrait mettre defaite si la vie arrive a zero', async () => {
    localStorage.setItem('player', JSON.stringify({
      name: "HeroTest",
      ship: "X-Wing",
      experience: 4,
      cg: 0,
      life: 5
    }))

    localStorage.setItem('characters', JSON.stringify([
      {
        name: "FakeEnemy",
        ship: { name: "FakeShip", vitality: 100 },
        experience: 2,
        credit: 50
      }
    ]))

    const wrapper = mount(GameView)

    ;(wrapper.vm as any).player.life = 0
    await nextTick()
    ;(wrapper.vm as any).onUpdate((wrapper.vm as any).player)
    await nextTick()

    expect((wrapper.vm as any).player.life).toBe(100)
  })
})
