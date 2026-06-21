<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { gebruikPokemonStore } from '@/stores/pokemonStore';
import { haalPokemonId } from '@/services/pokeapi';
import PokemonCard from '@/components/PokemonCard.vue';
import PokemonSheet from '@/components/PokemonSheet.vue';
import SearchBar from '@/components/SearchBar.vue';

const store = gebruikPokemonStore()

const BATCH_GROOTTE = 20
const aantalZichtbaar = ref(BATCH_GROOTTE)
const schildwacht = ref(null)

const zichtbarePokemon = computed(() =>
    gefilterdePokemon.value.slice(0, aantalZichtbaar.value)
)

const zoekterm = ref('')

const gefilterdePokemon = computed(() => {
    const term = zoekterm.value.toLowerCase().trim()
    return term
        ? store.allePokemon.filter(p => p.name.includes(term))
        : store.allePokemon
})

function laadMeer() {
    if (aantalZichtbaar.value < gefilterdePokemon.value.length) {
        aantalZichtbaar.value += BATCH_GROOTTE
    }
}

const geselecteerdId = ref(null)
const sheetIsOpen = ref(false)

function openSheet(id) {
    geselecteerdId.value = id
    sheetIsOpen.value = true
}

onMounted(async () => {
    await store.laadAlleNamen()

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) laadMeer()
    })
    observer.observe(schildwacht.value)
})

watch(zoekterm, () => {
    aantalZichtbaar.value = BATCH_GROOTTE
})
</script>
<template>
    <p v-if="store.isAanHetLaden">Laden...</p>

    <SearchBar v-model="zoekterm" />
    <ul class="mdc-image-list pokemon-grid">
        <PokemonCard v-for="pokemon in zichtbarePokemon" :key="pokemon.name" :id="haalPokemonId(pokemon.url)"
            :naam="pokemon.name" @geopend="openSheet" />
    </ul>

    <div ref="schildwacht"></div>
    <PokemonSheet v-model="sheetIsOpen" :pokemon-id="geselecteerdId" />
</template>