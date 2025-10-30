// document.addEventListener("DOMContentLoaded", async () => {

//     // Pega os dados do Sanity
//     const dados = await buscarSemanaCultural();

//     // Exibir título geral
//     const tituloEl = document.getElementById('tituloGeral');
//     if (tituloEl) {
//         const partes = dados.tituloGeral.split(' ');
//         const ano = partes.pop(); 
//         const tituloSemAno = partes.join(' ');
//         tituloEl.innerHTML = `${tituloSemAno} <span class="text-[#742E05]">${ano}</span>`;
//     }

//     // Exibir tópicos
//     const listaTopicos = document.getElementById('descricaoGeral');
//     if (listaTopicos && Array.isArray(dados.descricaoGeral)) {
//         dados.descricaoGeral.forEach(topico => {
//             const li = document.createElement('li');
//             li.textContent = topico;
//             listaTopicos.appendChild(li);
//         });
//     }

//     // Exibir blocos de imagem e texto
//     const blocos = dados.blocos;

//     const blocosMapeados = [
//         { id: 'blocoEventosAnterioresE', imagemId: 'imagemE', bloco: blocos[0] },
//         { id: 'blocoEventosAnterioresD', imagemId: 'imagemD', bloco: blocos[1] }
//     ];

//     blocosMapeados.forEach(({ id, imagemId, bloco }) => {
//         const section = document.getElementById(id);
//         if (section && bloco) {
//             const imagemEl = section.querySelector(`#${imagemId}`);
//             if (imagemEl) {
//                 imagemEl.src = urlFor(bloco.imagem).url();
//                 imagemEl.alt = bloco.titulo;
//             }

//             const tituloEl = section.querySelector('h2');
//             if (tituloEl) {
//                 const partes = bloco.titulo.split(' ');
//                 const ano = partes.pop();
//                 const tituloSemAno = partes.join(' ');
//                 tituloEl.innerHTML = `${tituloSemAno} <span class="text-[#742E05]">${ano}</span>`;
//             }

//             const descricaoEl = section.querySelector('p');
//             if (descricaoEl) {
//                 descricaoEl.textContent = bloco.descricao;
//             }
//         }
//     });

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

    // Scroll automático por parâmetro
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

// });
