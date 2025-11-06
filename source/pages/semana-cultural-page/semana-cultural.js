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

        const descricaoContainer = document.querySelector("#descricaoGeral");
        if (descricaoContainer && resposta.descricaoGeral) {
            descricaoContainer.innerHTML = "";

            resposta.descricaoGeral.forEach((texto, index) => {
                const card = document.createElement("div");
                card.textContent = texto;
                card.classList.add(
                    "bg-[#1C3824]",
                    "text-white",
                    "rounded-lg",
                    "shadow-md",
                    "p-6",
                    "text-center",
                    "text-lg",
                    "transition",
                    "hover:shadow-xl",
                    "flex",
                    "items-center",
                    "justify-center"
                );

                descricaoContainer.appendChild(card);
            });
        }

        const container = document.querySelector("#container-blocos");

        resposta.blocos.forEach((bloco, index) => {
            const isDireita = index % 2 !== 0;
            const bgColor = isDireita ? "#1C3824" : "#996c3b";

            const html = `
                <section id="blocos" class="pt-4 pb-4 ${isDireita ? "blocoDireita" : "blocoEsquerda"}">
                    <div class="max-w-[75%] mx-auto flex flex-col lg:flex-row ${isDireita ? "lg:flex-row-reverse" : ""} items-center">      

                        <div class="flex-1 bg-[${bgColor}] p-6 rounded-lg overflow-hidden">
                            <div class="w-full h-full overflow-hidden rounded-md">
                                <img src="${bloco.url || ""}" alt="Imagem ${bloco.titulo || ""}" 
                                    class="w-full h-full object-cover rounded-md opacity-0 ${isDireita ? "translate-x-20" : "-translate-x-20"} transition-all duration-700 ease-out imgBloco">
                            </div>
                        </div>

                        <div class="flex-1 bg-[${bgColor}] p-8 rounded-lg lg:ml-[-6rem] lg:mr-[-6rem] z-10">
                            <h2 class="font-extrabold tracking-widest text-orange-400 text-3xl lg:text-5xl mb-4 tituloBloco">${bloco.titulo || ""}</h2>
                            <p class="text-white leading-relaxed descricaoBloco">${bloco.descricao || ""}</p>
                        </div>
                    </div>
                </section>
            `;

            container.insertAdjacentHTML("beforeend", html);
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
        }, { threshold: 0.1 }); 

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
