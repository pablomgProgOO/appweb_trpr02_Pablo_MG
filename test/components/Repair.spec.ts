import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Repair from '../../src/components/Repair.vue'
import { Experience } from '../../src/types'

describe('Repair.vue', () => {
  it('devrait montrer prix correct pour reparation', async () => {
    const mockPlayer = { name: "TestPlayer", ship: "Falcon", experience: 4 as Experience, cg: 500, life: 80 }
    const wrapper = mount(Repair, {
      props: { player: mockPlayer }
    })

    const slider = wrapper.get('input[type="range"]')
    await slider.setValue(10) // Repair 10%

    expect(wrapper.html()).toContain('Coût : 20 CG') // 10 * 2 = 20
  })

  it('devrait annuler reparation invalide', async () => {
    const mockPlayer = { name: "PoorPlayer", ship: "X-Wing", experience: 4 as Experience, cg: 10, life: 80 }
    const wrapper = mount(Repair, {
      props: { player: mockPlayer }
    })

    const slider = wrapper.get('input[type="range"]')
    await slider.setValue(6) 

    await wrapper.get('button').trigger('click')

    expect(mockPlayer.life).toBe(80)
    expect(mockPlayer.cg).toBe(10)
  })

  it('devrait augmenter vie dans reparation', async () => {
    const mockPlayer = { name: "RichPlayer", ship: "Y-Wing", experience: 4 as Experience, cg: 500, life: 50 }
    const wrapper = mount(Repair, {
      props: { player: mockPlayer }
    })

    const slider = wrapper.get('input[type="range"]')
    await slider.setValue(20) 

    await wrapper.get('button').trigger('click')

    expect(mockPlayer.life).toBe(70)   
    expect(mockPlayer.cg).toBe(460)    
  })
})
