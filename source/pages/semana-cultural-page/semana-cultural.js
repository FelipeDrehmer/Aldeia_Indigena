async function getData() {
    const url = 'https://hbc0k9b0.api.sanity.io/v2025-10-30/data/query/production?query=*%5B_type+%3D%3D+%22semanaCultural%22%5D%5B0%5D%7B%0A++++++++tituloGeral%2C%0A++++++++descricaoGeral%2C%0A++++++++blocos%5B%5D+%7B%0A++++++++++++titulo%2C%0A++++++++++++descricao%2C%0A++++++++++++imagem%0A++++++++%7D%0A++++%7D&perspective=';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data.result;

    } catch (error) {
        console.error('Falha ao buscar dados:', error);
        return null;
    }
}

async function montarPagina(resposta) {
    try {

        const tituloGeral = document.querySelector("#tituloGeral");
        if (tituloGeral && resposta.tituloGeral) {
            tituloGeral.textContent = resposta.tituloGeral;
        }

        const descricaoTopico = document.querySelector("#descricaoGeral");
        if (descricaoTopico && resposta.descricaoGeral) {

            descricaoTopico.innerHTML = "";

            resposta.descricaoGeral.forEach((texto) => {
                const itemTopico = document.createElement("li");
                itemTopico.textContent = texto;
                itemTopico.classList.add("text-3xl", "text-black", "mb-2", "leading-relaxed"); 
                descricaoTopico.appendChild(itemTopico);
            });
        }

        const params = new URLSearchParams(window.location.search);
        const alvo = params.get('scroll');

        if (alvo) {
            const destino = document.getElementById(alvo);
            if (destino) {
                setTimeout(() => {
                    destino.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 500);
            }
        }

    } catch (err) {
        console.error('Erro ao montar página:', err);
    }
}

window.addEventListener('load', async () => {
    const resposta = await getData();
    if (resposta) {
        console.log('Dados recebidos:', resposta);
        montarPagina(resposta);
    }
});
