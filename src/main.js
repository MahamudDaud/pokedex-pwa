import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import './style.css';

createApp(App).use(createPinia()).use(router).mount('#app')

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/pokedex-pwa/service-worker.js')
}