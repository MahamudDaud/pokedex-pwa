import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import FavoritesView from "@/views/FavoritesView.vue";

const routes = 
[
    {path: '/', name: 'home', component: HomeView},
    {path: '/favorieten', name: 'favorieten', component: FavoritesView},
]

export default createRouter(
    {
        history: createWebHistory(import.meta.env.BASE_URL),
        routes,
    }
)