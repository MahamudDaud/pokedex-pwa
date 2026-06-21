<script setup>
import { ref, computed, onMounted } from 'vue';
import { gebruikPokemonStore } from '@/stores/pokemonStore';
import { useFavorites } from '@/composables/useFavorites';
import { haalPokemonId } from '@/services/pokeapi';
import PokemonCard from '@/components/PokemonCard.vue';
import PokemonSheet from '@/components/PokemonSheet.vue';

const store = gebruikPokemonStore()
const { favorieteIds } = useFavorites()

const favorieteLijst = computed(() =>
    store.allePokemon.filter(p => favorieteIds.value.includes(haalPokemonId(p.url)))
)

const geselecteerdId = ref(null)
const sheetIsOpen = ref(false)

function openSheet(id) {
    geselecteerdId.value = id
    sheetIsOpen.value = true
}

onMounted(() => store.laadAlleNamen())
</script>

<template>
    <p v-if="!favorieteLijst.length">Nog geen favorieten.</p>

    <ul class="mdc-image-list pokemon-grid">
        <PokemonCard v-for="pokemon in favorieteLijst" :key="pokemon.name" :id="haalPokemonId(pokemon.url)"
            :naam="pokemon.name" @geopend="openSheet" />
    </ul>

    <PokemonSheet v-model="sheetIsOpen" :pokemon-id="geselecteerdId" />
</template>