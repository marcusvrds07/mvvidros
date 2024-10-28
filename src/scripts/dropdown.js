document.addEventListener('DOMContentLoaded', () => {
    const dropdownBtn = document.getElementById('dropdownBtn');
    const dropdownContent = document.getElementById('dropdownContent');
    const arrow = dropdownBtn.querySelector('.arrow'); // Seleciona a seta

    dropdownBtn.addEventListener('click', (event) => {
        event.stopPropagation(); 

        // Alterna a classe de rotação
        arrow.classList.toggle('rotate'); 
        
        // Alterna a exibição do dropdown
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });

    // Fecha o dropdown se clicar fora dele
    document.addEventListener('click', () => {
        dropdownContent.style.display = "none";
        arrow.classList.remove('rotate'); // Remove a rotação se clicar fora
    });

    // Fecha o dropdown ao rolar a página
    window.addEventListener('scroll', () => {
        dropdownContent.style.display = "none";
        arrow.classList.remove('rotate'); // Remove a rotação ao rolar
    });
});
