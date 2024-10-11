document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');
    const menuItems = document.querySelectorAll('.nav-links a');
    const dropdownItems = document.querySelectorAll('.dropdown-content a');

    // Abrir e fechar o menu hamburguer
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        // Fechar o dropdown ao abrir o menu hamburguer
        if (window.innerWidth <= 650) {
            dropdownContent.classList.remove('active');
        }
    });

    // Fechar o menu ao clicar em um item
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active') && !item.closest('.dropdown')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                if (window.innerWidth <= 650) {
                    dropdownContent.classList.remove('active');
                }
            }
        });
    });

    // Fechar o menu ao clicar em um item do dropdown
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                if (window.innerWidth <= 650) {
                    dropdownContent.classList.remove('active');
                }
            }
        });
    });

    // Exibir dropdown em telas menores que 650px ao passar o mouse sobre o dropdown
    dropdown.addEventListener('mouseenter', () => {
        if (window.innerWidth <= 650) {
            dropdownContent.classList.add('active');
        }
    });

    // Esconder dropdown ao remover o mouse do dropdown
    dropdown.addEventListener('mouseleave', () => {
        if (window.innerWidth <= 650) {
            dropdownContent.classList.remove('active');
        }
    });

    // Fechar o dropdown ao clicar fora do menu ou do hamburger
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.nav-links') && !event.target.closest('.hamburger')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            if (window.innerWidth <= 650) {
                dropdownContent.classList.remove('active');
            }
        }
    });

    // Atualizar o estado do dropdown ao redimensionar a janela
    window.addEventListener('resize', () => {
        if (window.innerWidth > 650) {
            dropdownContent.classList.remove('active');
        }
    });

    // Carrossel de imagens
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    let index = 0;

    function showItem(index) {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextItem() {
        index = (index < items.length - 1) ? index + 1 : 0;
        showItem(index);
    }

    function prevItem() {
        index = (index > 0) ? index - 1 : items.length - 1;
        showItem(index);
    }

    prevButton.addEventListener('click', prevItem);
    nextButton.addEventListener('click', nextItem);

    // Inicializa o carrossel
    showItem(index);

    // Roda automaticamente a cada 10 segundos
    setInterval(nextItem, 1000000); // 10000 milissegundos = 10 segundos
});