<script setup>
import { ref, watch } from 'vue';
import { haalEvolutieKeten } from '@/services/pokeapi';

const props = defineProps({ pokemonId: Number })
const emit = defineEmits(['genavigeerd'])

const fases = ref(null)

watch(() => props.pokemonId, () => {
    fases.value = null
})

async function toonEvolutieKeten() {
    fases.value = await haalEvolutieKeten(props.pokemonId)
}
</script>

<template>
    <div>
        <button v-if="!fases" @click="toonEvolutieKeten">
            Toon evolutieketen
        </button>

        <div v-else class="evolutie-lijst">
            <div v-for="(fase, faseIndex) in fases" :key="faseIndex">
                <div v-for="pokemon in fase" :key="pokemon.id" class="evolutie-item"
                    @click="emit('genavigeerd', pokemon.id)">
                    <img :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(pokemon.id).padStart(3, '0')}.png`"
                        :alt="pokemon.name" />
                    <div>{{ pokemon.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>