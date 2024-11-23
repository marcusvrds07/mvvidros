document.addEventListener('DOMContentLoaded', () => {
    const dropdownBtn = document.getElementById('dropdownBtn');
    const dropdownContent = document.getElementById('dropdownContent');
    const arrow = dropdownBtn.querySelector('.arrow');

    dropdownBtn.addEventListener('click', (event) => {
        event.stopPropagation(); 

        arrow.classList.toggle('rotate'); 
        
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });

    document.addEventListener('click', () => {
        dropdownContent.style.display = "none";
        arrow.classList.remove('rotate');
    });

    window.addEventListener('scroll', () => {
        dropdownContent.style.display = "none";
        arrow.classList.remove('rotate');
    });
});
