import { ref, computed, type App } from 'vue'
import { createPinia, defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

const store = createPinia()

export const setupStore = (app: App) => {
  app.use(store)
}

export { store }
