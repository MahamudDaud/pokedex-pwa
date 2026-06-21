import { haalUitOpslag, slaOpInOpslag } from "./opslag";

const POKEAPI_BASIS_URL = 'https://pokeapi.co/api/v2';

export function haalPokemonId(url) {
    const delen = url.split("/");
    return Number(delen[delen.length - 2]);
}

export function maakNaamHoofdletter(naam) {
    if (!naam) return "";
    return naam.charAt(0).toUpperCase() + naam.slice(1);
}

export async function haalAllePokemonOp() {
    const opgeslagenLijst = haalUitOpslag('alle_pokemon_namen')
    if (opgeslagenLijst) return opgeslagenLijst

    const antwoord = await fetch(`${POKEAPI_BASIS_URL}/pokemon?limit=100000&offset=0`)
    const data = await antwoord.json()

    slaOpInOpslag('alle_pokemon_namen', data.results)
    return data.results
}

export async function haalPokemonDetail(id) {
    const sleutel = `pokemon_detail_${id}`
    const opgeslagenData = haalUitOpslag(sleutel)
    if (opgeslagenData) return opgeslagenData
    const antwoord = await fetch(`${POKEAPI_BASIS_URL}/pokemon/${id}`)
    const data = await antwoord.json()

    const compactePokemon =
    {
        id: data.id,
        name: data.name,
        types: data.types,
        stats: data.stats,
        abilities: data.abilities,
    }

    slaOpInOpslag(sleutel, compactePokemon)
    return compactePokemon
}

export async function haalEvolutieKeten(id) {
    const sleutel = `evolutie_${id}`
    const opgeslagenData = haalUitOpslag(sleutel)
    if (opgeslagenData) return opgeslagenData

    const antwoord = await fetch(`${POKEAPI_BASIS_URL}/pokemon-species/${id}`)
    const soortData = await antwoord.json()
    const ketenUrl = soortData.evolution_chain.url

    const ketenAntwoord = await fetch(ketenUrl)
    const ketenData = await ketenAntwoord.json()

    const fases = verwerkEvolutieKnoop(ketenData.chain)

    slaOpInOpslag(sleutel, fases)
    return fases
}

function verwerkEvolutieKnoop(knoop, faseNummer = 0, alleFases = []) {
    if (!alleFases[faseNummer]) alleFases[faseNummer] = []

    const id = haalPokemonId(knoop.species.url)
    alleFases[faseNummer].push({ id, name: knoop.species.name })

    knoop.evolves_to.forEach(volgendeKnoop => {
        verwerkEvolutieKnoop(volgendeKnoop, faseNummer + 1, alleFases)
    })

    return alleFases
}