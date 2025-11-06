async function getData() {
    const url = 'https://hbc0k9b0.api.sanity.io/v2025-11-03/data/query/production?query=*%5B_type+%3D%3D+%22semanaCultural%22%5D%5B0%5D%7B%0A++++++++tituloGeral%2C%0A++++++++descricaoGeral%2C%0A++++++++localEvento%2C%0A++++++++dataInicio%2C%0A++++++++dataFinal%2C%0A++++++++horarioInicio%2C%0A++++++++blocos%5B%5D+%7B%0A++++++++++++titulo%2C%0A++++++++++++descricao%2C%0A++++++++++++%22url%22%3A+imagem.asset-%3Eurl%2C%0A++++++++%7D%0A++++%7D&perspective=drafts';

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
        const tituloGeral = document.querySelector("#tituloGeral");
        if (tituloGeral && resposta.tituloGeral) {
            tituloGeral.textContent = resposta.tituloGeral;
        }

        const descricaoContainer = document.querySelector("#descricaoGeral");
        if (!descricaoContainer) return;

        const gridContainer = document.createElement("div");
        gridContainer.classList.add(
            "grid",
            "grid-cols-1", 
            "lg:grid-cols-2",
            "gap-8", 
            "items-start"
        );

        const textoDescricao = document.createElement("div");
        textoDescricao.classList.add("text-white", "text-base", "leading-relaxed", "text-lg");
        textoDescricao.textContent = resposta.descricaoGeral || "Sem descrição disponível.";

        const cardsInfo = document.createElement("div");
        cardsInfo.classList.add("flex", "flex-col", "gap-4");

        const criarCard = (icone, label, valor) => {
            const card = document.createElement("div");
            card.classList.add("flex", "items-center", "gap-3", "bg-[#45532D]", "rounded-xl", "p-4", "text-white");

            const iconEl = document.createElement("i");
            iconEl.className = `bx ${icone} text-3xl`;

            const conteudoCard = document.createElement("div");
            const tipoDeInfoCard = document.createElement("p");
            tipoDeInfoCard.classList.add("text-sm", "opacity-80");
            tipoDeInfoCard.textContent = label;

            const valorEl = document.createElement("p");
            valorEl.classList.add("font-semibold");
            valorEl.textContent = valor || "-";

            conteudoCard.appendChild(tipoDeInfoCard);
            conteudoCard.appendChild(valorEl);

            card.appendChild(iconEl);
            card.appendChild(conteudoCard);

            return card;
        };

        const formatarData = (dataISO) => {
            if (!dataISO) return "-";
            const data = new Date(dataISO);
            return data.toLocaleDateString("pt-BR", { timeZone: "UTC" });
        };

        let dataInicioFormatada = formatarData(resposta.dataInicio);
        let dataFinalFormatada = formatarData(resposta.dataFinal);

        const peridoEvento = dataInicioFormatada + " - " + dataFinalFormatada;

        cardsInfo.appendChild(criarCard("bx-calendar", "Início", peridoEvento));
        cardsInfo.appendChild(criarCard("bx-map", "Local", resposta.localEvento));
        cardsInfo.appendChild(criarCard("bx-time", "Horário", resposta.horarioInicio));

        gridContainer.appendChild(textoDescricao);
        gridContainer.appendChild(cardsInfo);
        descricaoContainer.appendChild(gridContainer);

        const container = document.querySelector("#container-blocos");
        if (container && resposta.blocos?.length) {

            resposta.blocos.forEach((bloco, index) => {
                const isDireita = index % 2 !== 0;
                const bgColor = isDireita ? "#1C3824" : "#996c3b";

                const html = `
                    <section id="blocos" class="pt-4 pb-4 ${isDireita ? "blocoDireita" : "blocoEsquerda"}">
                        <div class="max-w-[75%] mx-auto flex flex-col lg:flex-row ${isDireita ? "lg:flex-row-reverse" : ""} items-center">      
                            <div class="flex-1 bg-[${bgColor}] p-6 rounded-lg overflow-hidden">
                                <img src="${bloco.url || ""}" alt="Imagem ${bloco.titulo || ""}"
                                    class="w-full h-full object-cover rounded-md opacity-0 ${isDireita ? "translate-x-20" : "-translate-x-20"} transition-all duration-700 ease-out imgBloco">
                            </div>

                            <div class="flex-1 bg-[${bgColor}] p-8 rounded-lg lg:ml-[-6rem] lg:mr-[-6rem] z-10">
                                <h2 class="font-extrabold tracking-widest text-orange-400 text-3xl lg:text-5xl mb-4">${bloco.titulo || ""}</h2>
                                <p class="text-white leading-relaxed">${bloco.descricao || ""}</p>
                            </div>
                        </div>
                    </section>`;
                container.insertAdjacentHTML("beforeend", html);
            });

            // Animação ao entrar na tela
            const imagens = document.querySelectorAll(".imgBloco");
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove("opacity-0", "-translate-x-20");
                        entry.target.classList.add("opacity-100", "translate-x-0");
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            imagens.forEach(img => observer.observe(img));
        }

        // === Scroll automático via query param ===
        const params = new URLSearchParams(window.location.search);
        const alvo = params.get('scroll');
        if (alvo) {
            const destino = document.getElementById(alvo);
            if (destino) {
                setTimeout(() => {
                    destino.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 500);
            }
        }

    } catch (err) {
        console.error('Erro ao montar página:', err);
    }
}

window.addEventListener('load', async () => {
    const resposta = await getData();
    if (resposta) montarPagina(resposta);
});
