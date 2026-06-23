<script setup>
import { ref, onMounted } from 'vue';
import { RouterView, RouterLink } from 'vue-router';

const appBalkElement = ref(null)

const lichtModus = ref(false)
const mobielMenuOpen = ref(false)

function wisselModus() {
  lichtModus.value = !lichtModus.value
  document.body.classList.toggle('light-modus', lichtModus.value)
}

const installEvent = ref(null)
const toonInstallBanner = ref(false)

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault()
  installEvent.value = event
  toonInstallBanner.value = true
})

window.addEventListener('appinstalled', () => {
  toonInstallBanner.value = false
})

async function installerApp() {
  if (!installEvent.value) return
  installEvent.value.prompt()
  await installEvent.value.userChoice
  toonInstallBanner.value = false
  installEvent.value = null
}

onMounted(() => {
  window.mdc.topAppBar.MDCTopAppBar.attachTo(appBalkElement.value)
})
</script>

<template>
  <header ref="appBalkElement" class="mdc-top-app-bar mdc-top-app-bar--fixed">
    <div class="mdc-top-app-bar__row">
      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
        <span class="mdc-top-app-bar__title">Pokédex</span>
      </section>
      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end desktop-nav" role="toolbar">
        <RouterLink to="/" class="material-icons mdc-top-app-bar__action-item mdc-icon-button">home</RouterLink>
        <RouterLink to="/favorieten" class="material-icons mdc-top-app-bar__action-item mdc-icon-button">favorite
        </RouterLink>
        <button @click="wisselModus" class="material-icons mdc-top-app-bar__action-item mdc-icon-button">
          {{ lichtModus ? 'dark_mode' : 'light_mode' }}
        </button>
      </section>
      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
        <button @click="mobielMenuOpen = !mobielMenuOpen"
          class="material-icons mdc-top-app-bar__action-item mdc-icon-button hamburger-knop">menu</button>
      </section>
    </div>
  </header>
  <nav v-if="mobielMenuOpen" class="mobiel-menu">
    <RouterLink to="/" @click="mobielMenuOpen = false">Home</RouterLink>
    <RouterLink to="/favorieten" @click="mobielMenuOpen = false">Favorieten</RouterLink>
    <button @click="wisselModus">{{ lichtModus ? 'Donkere modus' : 'Lichte modus' }}</button>
  </nav>
  <main class="mdc-top-app-bar--fixed-adjust">
    <RouterView />
  </main>
  <div v-if="toonInstallBanner" class="install-banner">
    <span>Installeer deze app voor sneller toegang!</span>
    <button @click="installerApp">Installeren</button>
    <button @click="toonInstallBanner = false">Niet nu</button>
  </div>
</template>