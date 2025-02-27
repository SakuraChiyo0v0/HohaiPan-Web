//app
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

//element库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
//icon
import '@/assets/icon/iconfont.css'
import '@/assets/index.scss'

//router
import router from './router'
app.use(router)

//pinia
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' //引入持久化插件
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

console.log(import.meta.env)

app.mount('#app')
