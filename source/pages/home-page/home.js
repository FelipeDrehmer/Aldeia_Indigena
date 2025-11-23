// --- ESTAS SÃO AS INFORMAÇÕES BÁSICAS DO SEU ÁLBUM DE FOTOS ONLINE (SANITY) ---
// O número de identificação do seu álbum de fotos
const PROJECT_ID = 'hbc0k9b0';
// O nome da pasta principal dentro do seu álbum (geralmente é 'production')
const DATASET = 'production';
// O endereço completo para pedir a lista de fotos do Sanity.
// Ele usa os IDs acima para montar o endereço certo.
const API_URL = `https://${PROJECT_ID}.api.sanity.io/v2025-11-22/data/query/${DATASET}?query=*%5B_type+%3D%3D+%22home%22%5D&perspective=drafts`;

// --- COMO PEGAR O ENDEREÇO REAL DA FOTO (o Sanity dá uma "referência", não o endereço direto) ---
// Essa função pega a "referência" do Sanity (ex: "image-abc-123x456-png")
// e transforma no endereço de internet que o navegador consegue abrir.
function montarEnderecoDaFoto(referenciaDaFotoDoSanity) {
    // Se a referência estiver estranha ou vazia, não faz nada (retorna um ponto transparente)
    if (!referenciaDaFotoDoSanity || !referenciaDaFotoDoSanity.asset || !referenciaDaFotoDoSanity.asset._ref) {
        return 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
    }

    // A referência do Sanity é tipo: "image-CODIGO_DA_FOTO-LARGURAxALTURA-FORMATO"
    const ref = referenciaDaFotoDoSanity.asset._ref;
    const partes = ref.split('-'); // Divide em pedaços usando o traço "-"
    const codigoDaFoto = partes[1]; // Pedaço do meio é o código real da foto
    const dimensoes = partes[2];   // Pedaço com largura e altura
    const formato = partes[3];     // Pedaço com "png" ou "jpg"

    // Monta o endereço de internet final da foto, usando as informações do seu Sanity
    return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${codigoDaFoto}-${dimensoes}.${formato}`;
}

// --- ESTA É A RECEITA PRINCIPAL: PEGAR AS FOTOS E COLOCAR NO SEU SITE ---
async function carregarAsFotosDosBanners() {
    try {
        // 1. VAI ATÉ O ENDEREÇO DA API DO SANITY E PEGA OS DADOS
        const resposta = await fetch(API_URL);
        const dadosCompletos = await resposta.json(); // Transforma a resposta em algo que podemos usar (JSON)

        // 2. PEGA O PEDACINHO DOS DADOS QUE INTERESSA (o seu "home" document)
        // No seu Sanity, o array 'result' tem um item, que é o documento 'home'.
        const documentoHome = dadosCompletos.result[0];

        // Se por algum motivo não achou o documento 'home', para por aqui
        if (!documentoHome) {
            console.error("Não achei o 'home' documento no Sanity. Tem certeza que ele existe e está publicado?");
            return;
        }

        // --- PREPARAÇÃO PARA O BANNER DE 2 IMAGENS (CAMPO 'bannerVerde' NO SEU SANITY) ---
        // Pega as imagens do campo 'bannerVerde'. Se não tiver, usa uma lista vazia.
        const fotosDoBannerVerde = documentoHome.bannerVerde || [];
        // Encontra o lugar no seu HTML onde as 2 imagens vão entrar (a div com id="container-banner-2")
        const lugarPara2Fotos = document.getElementById('container-banner-2');

        // Se achou o lugar no HTML...
        if (lugarPara2Fotos) {
            lugarPara2Fotos.innerHTML = ''; // Limpa tudo o que estava lá antes
            // Pega as duas primeiras fotos da lista (se tiver)
            fotosDoBannerVerde.slice(0, 2).forEach(itemDaFoto => {
                const enderecoDaFotoReal = montarEnderecoDaFoto(itemDaFoto); // Monta o endereço da foto real
                const elementoImg = document.createElement('img'); // Cria uma tag <img>
                elementoImg.src = enderecoDaFotoReal; // Coloca o endereço na tag <img>
                elementoImg.alt = "Banner de 2 Fotos"; // Texto para descrever a imagem
                lugarPara2Fotos.appendChild(elementoImg); // Coloca a tag <img> dentro da div no HTML
            });
        }

        // --- PREPARAÇÃO PARA O BANNER DE 3 IMAGENS (CAMPO 'bannerMarrom' NO SEU SANITY) ---
        // Pega as imagens do campo 'bannerMarrom'. Se não tiver, usa uma lista vazia.
        const fotosDoBannerMarrom = documentoHome.bannerMarrom || [];
        // Encontra o lugar no seu HTML onde as 3 imagens vão entrar (a div com id="container-banner-3")
        const lugarPara3Fotos = document.getElementById('container-banner-3');

        // Se achou o lugar no HTML...
        if (lugarPara3Fotos) {
            lugarPara3Fotos.innerHTML = ''; // Limpa tudo o que estava lá antes
            // Pega as três primeiras fotos da lista (se tiver)
            fotosDoBannerMarrom.slice(0, 3).forEach(itemDaFoto => {
                const enderecoDaFotoReal = montarEnderecoDaFoto(itemDaFoto); // Monta o endereço da foto real
                const elementoImg = document.createElement('img'); // Cria uma tag <img>
                elementoImg.src = enderecoDaFotoReal; // Coloca o endereço na tag <img>
                elementoImg.alt = "Banner de 3 Fotos"; // Texto para descrever a imagem
                lugarPara3Fotos.appendChild(elementoImg); // Coloca a tag <img> dentro da div no HTML
            });
        }

    } catch (erro) {
        // Se algo deu errado em qualquer um dos passos acima, ele vem para cá
        console.error("Ops! Deu um erro ao tentar carregar suas fotos do Sanity:", erro);
    }
}

// --- QUANDO TUDO NO SEU SITE ESTIVER PRONTO, EXECUTA A RECEITA ---
// Isso garante que o JavaScript só tente mexer nas divs do HTML depois que elas já existirem.
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