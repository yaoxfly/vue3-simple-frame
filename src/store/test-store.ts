import { defineStore } from 'pinia'
export const useTestStore = defineStore('test-store', {
  state: () => ({ count: 0 }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment () {
      this.count++
    }
  }
})
