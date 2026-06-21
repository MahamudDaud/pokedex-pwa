import { ref } from "vue";

const OPSLAG_SLEUTEL = 'favorieten'

const favorieteIds = ref(JSON.parse(localStorage.getItem(OPSLAG_SLEUTEL) ?? '[]'))

function bewaarInOpslag() {
    localStorage.setItem(OPSLAG_SLEUTEL, JSON.stringify(favorieteIds.value))
}

function isFavoriet(id) {
    return favorieteIds.value.includes(id)
}

function toggleFavoriet(id) {
    if (isFavoriet(id)) {
        favorieteIds.value = favorieteIds.value.filter(f => f !== id)
    }
    else {
        favorieteIds.value = [...favorieteIds.value, id]
    }
    bewaarInOpslag()
}

export function useFavorites() {
    return { favorieteIds, isFavoriet, toggleFavoriet }
}