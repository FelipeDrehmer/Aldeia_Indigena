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

        const cardsSecao = document.querySelector('#balaoCards');
        if (cardsSecao && Array.isArray(resposta.cards)) {
            cardsSecao.innerHTML = ''; // limpa o container

            resposta.cards.forEach((card, index) => {
                const cor = index % 2 === 0 ? '#8B572A' : '#1c3d16'; // alterna as cores
                
                const divCardUnico = document.createElement('div');
                divCardUnico.className = 'w-[270px] rounded-2xl overflow-hidden shadow-lg';
                divCardUnico.style.backgroundColor = cor;

                divCardUnico.innerHTML = `
                    <img src="${card.foto}" alt="Imagem do card" class="w-full h-[150px] object-cover" />
                    <div class="p-4">
                        <p class="text-white text-sm leading-relaxed">
                            ${card.descricao || ''}
                        </p>
                    </div>
                `;

                cardsSecao.appendChild(divCardUnico);
            });
        }

    } catch(err) {
        console.error('Erro ao montar página:', err);
    }
}


window.addEventListener('load', async () => {
    const resposta = await getData();
    console.log(resposta)
    if (resposta) montarPagina(resposta);
});