import { shallowMount } from '@vue/test-utils'
import HallCard from '@/components/Hall/HallCard.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

describe('HallCard.vue', () => {
  it('Проверка создания', () => {
    const source = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    const halls = [
      {
        id: 0,
        name: 'test',
        target_source: source,
        origin_source: source
      }
    ]
    const wrapper = shallowMount(HallCard, {
      localVue: Vue,
      propsData: { halls }
    })
    const clappr = wrapper.find('clappr-stub')
    expect(clappr.attributes().src).toEqual(source)
  })
})
