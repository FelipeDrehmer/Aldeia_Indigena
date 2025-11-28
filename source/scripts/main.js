// Menu hamburguer
document.addEventListener('DOMContentLoaded', () => {
    const btnMenuHamburguer = document.getElementById('menuToggle');
    const menu = document.getElementById('mobileMenu');
    
    console.log('menuToggle encontrado:', !!btnMenuHamburguer);
    console.log('mobileMenu encontrado:', !!menu);
    
    // Validar se elementos existem
    if (!btnMenuHamburguer || !menu) {
        console.error('Elementos do menu não encontrados');
        return;
    }
    
    const lines = btnMenuHamburguer.querySelectorAll('span');
    console.log('Linhas encontradas:', lines.length);
    
    const body = document.body;

    const toggleMenu = () => {
        console.log('Menu clicado!');
        menu.classList.toggle('translate-x-full');
        const isOpen = !menu.classList.contains('translate-x-full');
        console.log('Menu aberto?', isOpen);

        btnMenuHamburguer.setAttribute('aria-expanded', String(isOpen));
        body.classList.toggle('overflow-hidden', isOpen);

        if (lines.length === 3) {
            lines[0].classList.toggle('rotate-45');
            lines[0].classList.toggle('translate-y-2');
            
            lines[1].classList.toggle('opacity-0');
            
            lines[2].classList.toggle('-rotate-45');
            lines[2].classList.toggle('-translate-y-2');
        }
    };

    btnMenuHamburguer.addEventListener('click', toggleMenu);
    console.log('Event listener adicionado');

    // Fecha ao clicar em links
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (!menu.classList.contains('translate-x-full')) toggleMenu();
        });
    });

    // Fecha com ESC
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !menu.classList.contains('translate-x-full')) {
            toggleMenu();
        }
    });

    // Fecha clicando no overlay
    menu.addEventListener('click', e => {
        if (e.target === menu && !menu.classList.contains('translate-x-full')) {
            toggleMenu();
        }
    });

});