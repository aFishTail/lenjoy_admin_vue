import { createApp } from 'vue'
import 'normalize.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/main.css'
import App from './App.vue'
import router from './router'
import { setupStore } from '@/store'

const app = createApp(App)

setupStore(app);
app.use(ElementPlus)
app.use(router)

app.mount('#app')
