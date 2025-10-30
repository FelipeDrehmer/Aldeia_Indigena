// Menu hamburguer
document.addEventListener('DOMContentLoaded', () => {
    const btnMenuHamburguer = document.getElementById('menuToggle');
    const menu = document.getElementById('mobileMenu');
    const lines = btnMenuHamburguer.querySelectorAll('span');
    const body = document.body;

    const toggleMenu = () => {
        menu.classList.toggle('translate-x-full');
        const isOpen = !menu.classList.contains('translate-x-full');

        btnMenuHamburguer.setAttribute('aria-expanded', String(isOpen));
        body.classList.toggle('overflow-hidden', isOpen);

        if (lines.length === 3) {
            lines[0].classList.toggle('rotate-45');
            lines[0].classList.toggle('translate-y-[6px]');
            
            lines[1].classList.toggle('opacity-0');
            
            lines[2].classList.toggle('-rotate-45');
            lines[2].classList.toggle('-translate-y-[6px]');
        }
    };

    btnMenuHamburguer.addEventListener('click', toggleMenu);

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
