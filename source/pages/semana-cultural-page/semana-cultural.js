async function getData() {
    const url = 'https://hbc0k9b0.api.sanity.io/v2025-10-30/data/query/production?query=*[_type=="semanaCultural"][1]{tituloGeral,descricaoGeral,blocos[]{titulo,descricao,imagem}}&perspective=drafts';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Dados recebidos:', data.result);
        return data.result;
        
    } catch (error) {
        console.error('Falha ao buscar dados:', error);
        return null;
    }
}

let respostaApi;

getData().then(resposta => {
    respostaApi = resposta;
    console.log(resposta);
    console.log("objeto da api:", respostaApi["blocos"]);
});

window.addEventListener('load', getData);
