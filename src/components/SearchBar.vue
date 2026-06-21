<script setup>
import { ref, onMounted } from 'vue'

const model = defineModel()
const veldElement = ref(null)

onMounted(() => {
    if (window.mdc) window.mdc.textField.MDCTextField.attachTo(veldElement.value)
})

</script>

<template>
    <label ref="veldElement" 
    class="mdc-text-field mdc-text-field--filled mdc-text-field--no-label">
        <span class="mdc-text-field__ripple"></span>
        <input v-model="model" type="text" class="mdc-text-field__input" placeholder="Zoek Pokémon..."
            aria-label="Zoek Pokémon" />
        <span class="mdc-line-ripple"></span>
    </label>
</template>