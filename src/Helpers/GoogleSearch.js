export function buscarModelo(modelo) {
    const url = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(modelo)}`;
    window.open(url, '_blank'); // abre en nueva pestaña
}