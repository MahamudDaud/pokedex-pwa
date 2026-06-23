<script setup>
import { maakNaamHoofdletter } from '@/services/pokeapi';

const props = defineProps(
    {
        id: Number,
        naam: String,
    }
)

const emit = defineEmits(['geopend'])

function toonFallbackSprite(event) {
    event.target.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(props.id).padStart(3, '0')}.png`
}
</script>

<template>
    <li class="mdc-image-list__item" @click="emit('geopend', id)">
        <img :src="`https://img.pokemondb.net/sprites/black-white/anim/normal/${naam}.gif`" :alt="naam" loading="lazy"
            @error="toonFallbackSprite" />
        <div class="pokemon-naam">#{{ id }} {{ maakNaamHoofdletter(naam) }}</div>
    </li>
</template>