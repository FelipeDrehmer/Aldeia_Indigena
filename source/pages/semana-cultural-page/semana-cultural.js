// === Função para montar URL da imagem manualmente ===
function montarUrlImagem(ref) {
    const [type, id, size, format] = ref.split('-');
    return `https://cdn.sanity.io/images/hbc0k9b0/production/${id}-${size}.${format}`;
}

// === Função para buscar dados da Semana Cultural via API ===
async function buscarSemanaCultural() {
    const url = 'https://hbc0k9b0.api.sanity.io/v2025-10-30/data/query/production?query=*%5B_type+%3D%3D+%22semanaCultural%22%5D%5B0%5D%7B%0A++++++++tituloGeral%2C%0A++++++++descricaoGeral%2C%0A++++++++blocos%5B%5D+%7B%0A++++++++++++titulo%2C%0A++++++++++++descricao%2C%0A++++++++++++imagem%0A++++++++%7D%0A++++%7D&perspective=published';

    try {
        const response = await fetch(url);
        const json = await response.json();
        return json.result;
    } catch (error) {
        console.error('Erro ao buscar dados da API do Sanity:', error);
        return null;
    }
}

// === Renderização dos dados ===
async function inicializarSemanaCultural() {
    try {
        const dados = await buscarSemanaCultural();

        // Exibir título geral
        const tituloEl = document.getElementById('tituloGeral');
        if (tituloEl && dados.tituloGeral) {
            const partes = dados.tituloGeral.split(' ');
            const ano = partes.pop();
            const tituloSemAno = partes.join(' ');
            tituloEl.innerHTML = `${tituloSemAno} <span class="text-[#742E05]">${ano}</span>`;
        }

        // Exibir tópicos
        const listaTopicos = document.getElementById('descricaoGeral');
        if (listaTopicos && Array.isArray(dados.descricaoGeral)) {
            listaTopicos.innerHTML = '';
            dados.descricaoGeral.forEach(topico => {
                const li = document.createElement('li');
                li.textContent = topico;
                listaTopicos.appendChild(li);
            });
        }

        // Exibir blocos (imagens + textos)
        const blocos = dados.blocos || [];
        const blocosMapeados = [
            { id: 'blocoEventosAnterioresE', imagemId: 'imagemE', bloco: blocos[0] },
            { id: 'blocoEventosAnterioresD', imagemId: 'imagemD', bloco: blocos[1] }
        ];

        blocosMapeados.forEach(({ id, imagemId, bloco }) => {
            const section = document.getElementById(id);
            if (section && bloco) {
                const imagemEl = section.querySelector(`#${imagemId}`);
                if (imagemEl && bloco.imagem) {
                    imagemEl.src = montarUrlImagem(bloco.imagem.asset._ref);
                    imagemEl.alt = bloco.titulo || '';
                }

                const tituloEl = section.querySelector('h2');
                if (tituloEl && bloco.titulo) {
                    const partes = bloco.titulo.split(' ');
                    const ano = partes.pop();
                    const tituloSemAno = partes.join(' ');
                    tituloEl.innerHTML = `${tituloSemAno} <span class="text-[#742E05]">${ano}</span>`;
                }

                const descricaoEl = section.querySelector('p');
                if (descricaoEl && bloco.descricao) {
                    descricaoEl.textContent = bloco.descricao;
                }
            }
        });

        // Animação de interseção
        ['imagemE', 'imagemD'].forEach(id => {
            const img = document.getElementById(id);
            if (img) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            img.classList.remove('opacity-0', id === 'imagemE' ? '-translate-x-20' : 'translate-x-20');
                            img.classList.add('opacity-100', 'translate-x-0');
                            observer.unobserve(img);
                        }
                    });
                }, { threshold: 0.5 });
                observer.observe(img);
            }
        });

        // === Scroll automático por parâmetro (versão robusta) ===
        function tryScrollTo(id, attempt = 0) {
            const destino = document.getElementById(id);
            if (destino) {
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        const header = document.querySelector('nav');
                        const headerHeight = header ? header.getBoundingClientRect().height : 0;
                        const offset = 20; // margem opcional
                        const top = destino.getBoundingClientRect().top + window.scrollY - headerHeight - offset;
                        window.scrollTo({ top, behavior: 'smooth' });
                    }, 60);
                });
                return true;
            }
            if (attempt < 6) {
                setTimeout(() => tryScrollTo(id, attempt + 1), 250);
            } else {
                console.warn('Elemento para scroll não encontrado:', id);
            }
        }

        const params = new URLSearchParams(window.location.search);
        let alvo = params.get('scroll');
        if (alvo) {
            alvo = decodeURIComponent(alvo).replace(/^#/, '');
            tryScrollTo(alvo);
        }

    } catch (err) {
        console.error('Erro ao carregar dados do Sanity:', err);
    }
}

// === Inicialização ===
// Usa 'load' para evitar conflito com o menu do main.js
window.addEventListener('load', inicializarSemanaCultural);
