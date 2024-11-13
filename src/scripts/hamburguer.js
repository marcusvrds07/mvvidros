document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const menuItems = document.querySelectorAll('.nav-links a');

    // Abrir e fechar o menu hamburguer
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Fechar o menu ao clicar em um item
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active') && !item.closest('.dropdown')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Fechar o menu ao clicar fora do menu ou do hamburger
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.nav-links') && !event.target.closest('.hamburger')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Atualizar o texto do produtos ao redimensionar a janela
    function updateTitle() {
        if (window.innerWidth <= 650) {
            document.querySelector(".info-products h2").innerHTML = "Deslize para explorar nossa lista de produtos exclusiva";
        } else {
            document.querySelector(".info-products h2").innerHTML = "Explore abaixo nossa lista exclusiva de produtos";
        }
    }
    
    updateTitle();
    
    window.addEventListener('resize', updateTitle);
});