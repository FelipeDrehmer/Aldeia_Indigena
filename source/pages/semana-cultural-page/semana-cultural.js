async function getData() {
    const url = 'https://hbc0k9b0.api.sanity.io/v2025-11-03/data/query/production?query=*%5B_type+%3D%3D+%22semanaCultural%22%5D%5B0%5D%7B%0A++++++++tituloGeral%2C%0A++++++++descricaoGeral%2C%0A++++++++blocos%5B%5D+%7B%0A++++++++++++titulo%2C%0A++++++++++++descricao%2C%0A++++++++++++%22url%22%3A+imagem.asset-%3Eurl%2C%0A++++++++%7D%0A++++%7D&perspective=raw';

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
                itemTopico.classList.add("text-xl", "text-black", "mb-2", "leading-relaxed", "lg:text-3xl");
                descricaoTopico.appendChild(itemTopico);
            });
        }

        const blocosDOM = document.querySelectorAll(".blocos");
        blocosDOM.forEach((secao, index) => {
            const blocoDados = resposta.blocos[index];
            if (!blocoDados) return;

            const titulo = secao.querySelector(".tituloBloco");
            if (titulo) titulo.textContent = blocoDados.titulo;

            const descricao = secao.querySelector(".descricaoBloco");
            if (descricao) descricao.textContent = blocoDados.descricao;

            const img = secao.querySelector(".imgBloco");
            if (img && blocoDados.url) {
                img.src = blocoDados.url;
            }
        });

        const imagens = document.querySelectorAll(".imgBloco");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.remove("opacity-0", "-translate-x-20");

                    img.classList.add("opacity-100", "translate-x-0");
                    observer.unobserve(img); 
                }
            });
        }, { threshold: 0.3 }); 

        imagens.forEach(img => observer.observe(img));

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
