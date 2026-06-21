<script setup>
import { ref, watch } from 'vue';
import { haalPokemonDetail } from '@/services/pokeapi.js'
import { useFavorites } from '@/composables/useFavorites';
import EvolutionChain from './EvolutionChain.vue';

const { isFavoriet, toggleFavoriet } = useFavorites()

const props = defineProps({ pokemonId: Number })
const open = defineModel()

const pokemon = ref(null)
const huidigeId = ref(null)

watch(() => props.pokemonId, (id) => {
    if (id) huidigeId.value = id
})

watch(huidigeId, async (id) => {
    if (!id) return
    pokemon.value = null
    pokemon.value = await haalPokemonDetail(id)
})

watch(open, (isOpen) => {
    document.body.classList.toggle('sheet-open', isOpen)
})

function sluit() {
    open.value = false
}
</script>

<template>
    <section class="sheet" :class="{ 'sheet-uit-beeld': !open }">
        <p v-if="!pokemon">Laden...</p>
        <div v-else class="sheet-inhoud">
            <button @click="sluit">Sluiten</button>
            <img class="sprite" :src="`https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon.name}.gif`"
                :alt="pokemon.name" />
            <button v-if="pokemon" @click="toggleFavoriet(pokemon.id)">
                {{ isFavoriet(pokemon.id) ? '⭐ Favoriet' : '⭐ Voeg toe' }}
            </button>
            <div>
                <span v-for="typeInfo in pokemon.types" :key="typeInfo.type.name" class="type-chip">
                    {{ typeInfo.type.name }}
                </span>
            </div>

            <p>Abilities: {{pokemon.abilities.map(a => a.ability.name).join(', ')}}</p>

            <div v-for="statInfo in pokemon.stats" :key="statInfo.stat.name" class="stat-rij">
                <span class="stat-naam">{{ statInfo.stat.name }}</span>
                <div class="stat-balk-achtergrond">
                    <div class="stat-balk-vulling"
                        :style="{ width: Math.min((statInfo.base_stat / 255) * 100, 100) + '%' }"></div>
                </div>
                <span>{{ statInfo.base_stat }}</span>
            </div>
            <EvolutionChain :pokemon-id="huidigeId" @genavigeerd="huidigeId = $event" />
        </div>
    </section>
</template>