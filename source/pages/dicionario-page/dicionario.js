async function getData() {
    const url = 'https://hbc0k9b0.api.sanity.io/v2025-11-14/data/query/production?query=*%5B_type+%3D%3D+%22dicionario%22%5D%5B0%5D%7B%0A++entradas%5B%5D%7B%0A++++palavra%2C%0A++++traducao%2C%0A++++significado%0A++%7D%0A%7D&perspective=raw';

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
        const divDicionario = document.querySelector('#mainDiv');
        if (!divDicionario || !resposta) return;

        const entradas = resposta.entradas || [];

        const container = document.createElement('div');
        container.classList.add(
            'w-full', 'bg-[#6b2c0c]', 'text-white',
            'rounded-xl', 'p-6'
        );

        const header = document.createElement('div');
        header.classList.add(
            'grid', 'grid-cols-3',
            'font-semibold', 'tracking-[0.25em]',
            'text-lg', 'pb-4'
        );

        const h1 = document.createElement('span');
        h1.textContent = 'PALAVRA';

        const h2 = document.createElement('span');
        h2.textContent = 'TRADUÇÃO';

        const h3 = document.createElement('span');
        h3.textContent = 'SIGNIFICADO';

        header.append(h1, h2, h3);

        const hrTop = document.createElement('hr');
        hrTop.classList.add('border-white/50', 'mb-4');

        container.append(header, hrTop);

        entradas.forEach((item, index) => {

            const row = document.createElement('div');
            row.classList.add(
                'grid', 'grid-cols-3',
                'text-white/90', 'pb-4'
            );

            const col1 = document.createElement('span');
            col1.textContent = item.palavra;

            const col2 = document.createElement('span');
            col2.textContent = item.traducao;

            const col3 = document.createElement('span');
            col3.textContent = item.significado;

            row.append(col1, col2, col3);
            container.appendChild(row);

            if (index < entradas.length - 1) {
                const hr = document.createElement('hr');
                hr.classList.add('border-white/50', 'mb-4');
                container.appendChild(hr);
            }
        });

        divDicionario.innerHTML = '';
        divDicionario.appendChild(container);

    } catch (err) {
        console.error('Erro ao montar página:', err);
    }
}

window.addEventListener('load', async () => {
    const resposta = await getData();
    console.log(resposta);
    if (resposta) montarPagina(resposta);
});
