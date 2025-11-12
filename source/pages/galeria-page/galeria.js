async function getData() {
    const url = 'https://hbc0k9b0.api.sanity.io/v2025-11-03/data/query/production?query=*%5B_type+%3D%3D+%22galeria%22%5D%5B0%5D%7B%0A++tituloGeral%2C%0A++textoGeral%2C%0A++%22fotoGeral%22%3A+fotoGeral.asset-%3Eurl%2C%0A++cards%5B%5D%7B%0A++++descricao%2C%0A++++%22foto%22%3A+foto.asset-%3Eurl%0A++%7D%2C%0A++gruposDeFotos%5B%5D%7B%0A++++descricao%2C%0A++++midias%5B%5D+%7B%0A++++++_type%2C%0A++++++%22imageUrl%22%3A+asset-%3Eurl%2C%0A++++++%22videoUrl%22%3A+asset-%3Eurl%2C%0A++++++%22externalUrl%22%3A+url%2C%0A++++++plataforma%0A++++%7D%0A++%7D%0A%7D%0A&perspective=drafts';

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

function getYouTubeEmbed(url) {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
    }
    return null;
}

async function montarPagina(resposta) {
    try {
        const tituloGeral = document.querySelector('#tituloGeral');
        if (tituloGeral && resposta.tituloGeral) tituloGeral.textContent = resposta.tituloGeral;

        const descricaoGeral = document.querySelector('#textoGeral');
        if (descricaoGeral && resposta.textoGeral) descricaoGeral.textContent = resposta.textoGeral;

        const imagemGeral = document.querySelector('#imagemGeral');
        if (imagemGeral && resposta.fotoGeral) {
            imagemGeral.src = resposta.fotoGeral;
            imagemGeral.loading = "lazy";
        }

        const cardsSecao = document.querySelector('#balaoCards');
        if (cardsSecao && Array.isArray(resposta.cards)) {

            resposta.cards.forEach((card, index) => {
                const cor = index % 2 === 0 ? '#8B572A' : '#1c3d16';
                const divCard = document.createElement('div');
                divCard.className = 'w-[330px] rounded-2xl overflow-hidden shadow-lg';
                divCard.style.backgroundColor = cor;

                divCard.innerHTML = `
                    <img src="${card.foto}" alt="Imagem do card" loading="lazy" class="w-full h-[150px] object-cover" />
                    <div class="p-4">
                        <p class="text-white text-lg leading-relaxed">${card.descricao || ''}</p>
                    </div>
                `;
                cardsSecao.appendChild(divCard);
            });
        }

        const container = document.querySelector("#container-blocos");
        if (container && Array.isArray(resposta.gruposDeFotos)) {

            resposta.gruposDeFotos.forEach((grupo) => {
                const section = document.createElement("section");
                section.className = "py-4 px-4 mb-8 sm:px-6 sm:py-6 lg:px-10 lg:py-10 flex flex-col";
                section.innerHTML = `
                `;

                const grid = document.createElement("div");
                grid.className = "flex flex-col items-center";
                const gridInner = document.createElement("div");
                gridInner.className = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-20 mb-12";

                grupo.midias?.forEach((midia) => {
                    const blocoMidia = document.createElement("div");
                    blocoMidia.className = "bg-[#D6BFA3] aspect-square w-full max-w-[25rem] rounded-lg flex items-center justify-center overflow-hidden";

                    if (midia._type === "image" && midia.imageUrl) {
                        const img = document.createElement("img");
                        img.src = midia.imageUrl;
                        img.alt = "Imagem do grupo";
                        img.loading = "lazy";
                        img.className = "object-cover w-full h-full";
                        blocoMidia.appendChild(img);

                    } else if (midia._type === "file" && midia.videoUrl) {
                        const video = document.createElement("video");
                        video.src = midia.videoUrl;
                        video.controls = true;
                        video.className = "object-cover w-full h-full";
                        blocoMidia.appendChild(video);

                    } else if (midia.externalUrl) {
                        const embedUrl = getYouTubeEmbed(midia.externalUrl) || midia.externalUrl;
                        const iframe = document.createElement("iframe");
                        iframe.src = embedUrl;
                        iframe.allowFullscreen = true;
                        iframe.className = "object-cover w-full h-full";
                        blocoMidia.appendChild(iframe);
                    }

                    gridInner.appendChild(blocoMidia);
                });

                grid.appendChild(gridInner);

                const descricao = document.createElement("div");
                descricao.className = "max-w-6xl text-xl text-center text-black leading-relaxed mx-auto";
                descricao.innerHTML = `<p>${grupo.descricao || ""}</p>`;

                const separadorSection = document.createElement('hr');
                separadorSection.className = 'my-4 h-1 bg-[#8B572A] border-0 rounded mx-auto w-3/5';

                section.appendChild(grid);
                section.appendChild(descricao);
                section.appendChild(separadorSection);
                container.appendChild(section);
            });
        }

    } catch(err) {
        console.error('Erro ao montar página:', err);
    }
}

window.addEventListener('load', async () => {
    const resposta = await getData();
    console.log(resposta);
    if (resposta) montarPagina(resposta);
});
