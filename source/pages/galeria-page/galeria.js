async function getData() {
    const url = 'https://hbc0k9b0.api.sanity.io/v2025-11-07/data/query/production?query=*%5B_type+%3D%3D+%22galeria%22%5D%5B0%5D%7B%0A++tituloGeral%2C%0A++textoGeral%2C%0A++%22fotoGeral%22%3A+fotoGeral.asset-%3Eurl%2C%0A++cards%5B%5D%7B%0A++++descricao%2C%0A++++%22foto%22%3A+foto.asset-%3Eurl%0A++%7D%2C%0A++gruposDeFotos%5B%5D%7B%0A++++descricao%2C%0A++++fotos%5B%5D%7B%0A++++++%22imagem%22%3A+asset-%3Eurl%0A++++%7D%0A++%7D%0A%7D%0A&perspective=drafts';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Falha ao buscar dados:', error);
        return null;
    }
}

async function montarPagina(resposta) {
    try {

        const tituloGeral = document.querySelector('#tituloGeral');
        if (tituloGeral && resposta.tituloGeral) {
            tituloGeral.textContent = resposta.tituloGeral;
        }
        
        const descricaoGeral = document.querySelector('#textoGeral');
        if (descricaoGeral && resposta.textoGeral) {
            descricaoGeral.textContent = resposta.textoGeral;
        }

    } catch(err) {
        console.error('Erro ao montar página:', err);
    }
}


window.addEventListener('load', async () => {
    const resposta = await getData();
    if (resposta) montarPagina(resposta);
});