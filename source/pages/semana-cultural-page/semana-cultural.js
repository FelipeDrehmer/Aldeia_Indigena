const imagemE = document.getElementById('imagemE');
const imagemD = document.getElementById('imagemD');

const observerE = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        imagemE.classList.remove('opacity-0', '-translate-x-20');
        imagemE.classList.add('opacity-100', 'translate-x-0');
        observerE.unobserve(imagemE);
        }
    });
}, {
    threshold: 0.5
});

const observerD = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        imagemD.classList.remove('opacity-0', 'translate-x-20');
        imagemD.classList.add('opacity-100', 'translate-x-0');
        observerD.unobserve(imagemD);
        }
    });
}, {
    threshold: 0.5
});

observerE.observe(imagemE);
observerD.observe(imagemD);
