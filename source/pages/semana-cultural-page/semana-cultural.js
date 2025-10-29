import { buscarSemanaCultural, urlFor } from 'source/scripts/main.js';

document.addEventListener("DOMContentLoaded", async () => {

const dados = await buscarSemanaCultural();

// Exibir título geral
const tituloEl = document.getElementById('tituloGeral');
if (tituloEl) {
    const partes = dados.tituloGeral.split(' ');
    const ano = partes.pop(); // pega o último termo (ex: "2026")
    const tituloSemAno = partes.join(' ');
    tituloEl.innerHTML = `${tituloSemAno} <span class="text-[#742E05]">${ano}</span>`;
}


// Exibir tópicos
const listaTopicos = document.getElementById('descricaoGeral');
if (listaTopicos && Array.isArray(dados.descricaoGeral)) {
    dados.descricaoGeral.forEach(topico => {
        const li = document.createElement('li');
        li.textContent = topico;
        listaTopicos.appendChild(li);
    });
}

// Exibir blocos de imagem e texto
const blocos = dados.blocos;

const blocosMapeados = [
    { id: 'blocoEventosAnterioresE', imagemId: 'imagemE', bloco: blocos[0] },
    { id: 'blocoEventosAnterioresD', imagemId: 'imagemD', bloco: blocos[1] }
];

blocosMapeados.forEach(({ id, imagemId, bloco }) => {
    const section = document.getElementById(id);
    if (section && bloco) {
        const imagemEl = section.querySelector(`#${imagemId}`);
        if (imagemEl) {
            imagemEl.src = urlFor(bloco.imagem).url();
            imagemEl.alt = bloco.titulo;
        }

    const tituloEl = section.querySelector('h2');
    if (tituloEl) {
        const partes = bloco.titulo.split(' ');
        const ano = partes.pop();
        const tituloSemAno = partes.join(' ');
        tituloEl.innerHTML = `${tituloSemAno} <span class="text-[#742E05]">${ano}</span>`;
    }

    const descricaoEl = section.querySelector('p');
    if (descricaoEl) {
        descricaoEl.textContent = bloco.descricao;
        }
    }
});


    //===============================//==============================//

    const imagemE = document.getElementById('imagemE');
    if (imagemE) {
        const observerE = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                imagemE.classList.remove('opacity-0', '-translate-x-20');
                imagemE.classList.add('opacity-100', 'translate-x-0');
                observerE.unobserve(imagemE);
            }
        });
    }, { threshold: 0.5 });

    observerE.observe(imagemE);
    }

    const imagemD = document.getElementById('imagemD');
    if (imagemD) {
        const observerD = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    imagemD.classList.remove('opacity-0', 'translate-x-20');
                    imagemD.classList.add('opacity-100', 'translate-x-0');
                    observerD.unobserve(imagemD);
                }
            });
        }, { threshold: 0.5 });
    observerD.observe(imagemD);
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
});
