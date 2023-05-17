import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import App from '../../App.vue'

describe('App', () => {
  const vuetify = createVuetify({ components, directives })
  it('renders properly', () => {

    // Mount the App component
    const wrapper = shallowMount(App, {
      global: {
        plugins: [vuetify],
      },
      props: {
        $route: {
          name: 'home',
          query: {
            category: 'business',
            sources: '',
            country: 'us',
            q: '',
          },
        },
      },
    })

    // Assert that the component is rendered properly
    expect(wrapper.exists()).toBe(true)
  })

  it('updates URL query and emits "updateQuery" event on search', () => {

    const wrapper = shallowMount(App, {
      global: {
        plugins: [vuetify],
      },
      props: {
        $route: {
          name: 'home',
          query: {
            category: 'business',
            sources: '',
            country: 'us',
            q: '',
          },
        },
      },
    })

    // Simulate the onSearch method call
    wrapper.vm.onSearch('example search')

    // Assert that the URL query is updated
    expect(wrapper.vm.$route.query.q).toBe('example search')

    // Assert that the "update-query" event is emitted with the updated search query
    expect(wrapper.emitted('updateQuery')).toEqual([[wrapper.vm.searchQuery]])
  })
})
