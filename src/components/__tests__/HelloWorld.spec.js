import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TransactionsList from '../TransactionsList.vue'

describe('TransactionsList', () => {
  it('renders properly', () => {
    const wrapper = mount(TransactionsList, { props: { item: Object } })

  })
})
