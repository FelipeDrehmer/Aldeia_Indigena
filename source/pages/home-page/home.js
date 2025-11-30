const PROJECT_ID = 'hbc0k9b0';
const DATASET = 'production';

const API_URL = `https://${PROJECT_ID}.api.sanity.io/v2025-11-22/data/query/${DATASET}?query=*%5B_type+%3D%3D+%22home%22%5D&perspective=drafts`;

function montarEnderecoDaFoto(referenciaDaFotoDoSanity) {
    if (!referenciaDaFotoDoSanity || !referenciaDaFotoDoSanity.asset || !referenciaDaFotoDoSanity.asset._ref) {
        return 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
    }

    const ref = referenciaDaFotoDoSanity.asset._ref;
    const partes = ref.split('-'); 
    const codigoDaFoto = partes[1]; 
    const dimensoes = partes[2]; 
    const formato = partes[3];  

    return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${codigoDaFoto}-${dimensoes}.${formato}`;
}

async function carregarAsFotosDosBanners() {
    try {
        const resposta = await fetch(API_URL);
        const dadosCompletos = await resposta.json();

        const documentoHome = dadosCompletos.result[0];

        if (!documentoHome) {
            console.error("Não achei o 'home' documento no Sanity. Tem certeza que ele existe e está publicado?");
            return;
        }

        const fotosDoBannerVerde = documentoHome.bannerVerde || [];
        const lugarPara2Fotos = document.getElementById('container-banner-2');

        if (lugarPara2Fotos) {
            lugarPara2Fotos.innerHTML = '';
            fotosDoBannerVerde.slice(0, 2).forEach(itemDaFoto => {
                const enderecoDaFotoReal = montarEnderecoDaFoto(itemDaFoto);
                const elementoImg = document.createElement('img');
                elementoImg.src = enderecoDaFotoReal; 
                elementoImg.alt = "Banner de 2 Fotos";
                lugarPara2Fotos.appendChild(elementoImg);
            });
        }


        const fotosDoBannerMarrom = documentoHome.bannerMarrom || [];

        const lugarPara3Fotos = document.getElementById('container-banner-3');

        if (lugarPara3Fotos) {
            lugarPara3Fotos.innerHTML = '';
            fotosDoBannerMarrom.slice(0, 3).forEach(itemDaFoto => {
                const enderecoDaFotoReal = montarEnderecoDaFoto(itemDaFoto);
                const elementoImg = document.createElement('img'); 
                elementoImg.src = enderecoDaFotoReal; 
                elementoImg.alt = "Banner de 3 Fotos";
                lugarPara3Fotos.appendChild(elementoImg);
            });
        }

    } catch (erro) {
        console.error("Ops! Deu um erro ao tentar carregar suas fotos do Sanity:", erro);
    }
}

document.addEventListener('DOMContentLoaded', carregarAsFotosDosBanners);

const imgs = document.getElementById("imgs");
const img = document.querySelectorAll("#imgs img");

 let idx = 0;

 function carrossel(){
    idx++;

    if (idx > img.length - 1){
        idx =0;
    }
    imgs.style.transform = `translateX(${-idx * 87}%)`;
 }
 setInterval(carrossel, 1800);