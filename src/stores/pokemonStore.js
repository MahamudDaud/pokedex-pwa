import { defineStore } from "pinia";
import { ref } from "vue";
import { haalAllePokemonOp } from "@/services/pokeapi.js";

export const gebruikPokemonStore = defineStore('pokemon', () => {
    const allePokemon = ref([])
    const isAanHetLaden = ref(false)

    async function laadAlleNamen() {
        if (allePokemon.value.length > 0) return

        isAanHetLaden.value = true

        const pokemonLijst = await haalAllePokemonOp()

        allePokemon.value = pokemonLijst

        isAanHetLaden.value = false
    }
    return { allePokemon, isAanHetLaden, laadAlleNamen }
})