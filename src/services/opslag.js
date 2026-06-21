export function haalUitOpslag(sleutel) {
    const opgeslagenData = localStorage.getItem(sleutel)
    return opgeslagenData ? JSON.parse(opgeslagenData) : null
}

export function slaOpInOpslag(sleutel, data) {
    localStorage.setItem(sleutel, JSON.stringify(data))
}