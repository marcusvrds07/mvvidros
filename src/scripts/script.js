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

    // Atualizar o título ao redimensionar a janela
    function updateTitle() {
        if (window.innerWidth <= 650) {
            document.querySelector(".info-products h2").innerHTML = "Deslize para explorar nossa lista de produtos exclusiva";
        } else {
            document.querySelector(".info-products h2").innerHTML = "Explore abaixo nossa lista exclusiva de produtos";
        }
    }
    
    // Chama a função ao carregar a página
    updateTitle();
    
    // Adiciona um listener para o evento de redimensionamento
    window.addEventListener('resize', updateTitle);
});

// Variável para armazenar a referência do intervalo da barra de progresso
let progressBarInterval = null;

// Função para criar o select de serviços dinamicamente
function createServiceSelect() {
    const services = [
        { value: "", text: "Selecione um serviço" },
        { value: "instalacao-vidros", text: "Instalação de Vidros" },
        { value: "manutencao-vidros", text: "Manutenção de Vidros" },
        { value: "outro", text: "Outro" }
    ];

    const select = document.createElement("select");
    select.id = "service";
    select.name = "service";

    services.forEach(service => {
        const option = document.createElement("option");
        option.value = service.value;
        option.text = service.text;
        select.appendChild(option);
    });

    document.getElementById("service-container").appendChild(select);
}

// Chamar a função para criar o select quando a página carregar
window.onload = function () {
    createServiceSelect();
}

// Variável para rastrear se um alerta está visível
let isAlertVisible = false;

// Função para mostrar alerta de erro ou sucesso
function showAlert(message, type) {
    // Se já existe um alerta visível, não faça nada
    if (isAlertVisible) return;

    isAlertVisible = true; // Marca que um alerta está visível
    const alertDiv = document.getElementById(type + 'Alert');
    const alertMessage = document.getElementById(type === 'error' ? 'alertMessage' : 'successMessage');
    
    alertMessage.innerText = message;
    alertDiv.style.display = "block";

    // Desabilitar o botão de enviar
    document.querySelector("button[type='submit']").disabled = true;

    // Iniciar a barra de progresso correta
    const progressBar = document.getElementById(type === 'error' ? 'progressBar' : 'successProgressBar');
    progressBar.style.width = "340px"; // Largura inicial da barra

    // Configurações da barra de progresso
    const totalDuration = 10000; // 10 segundos
    const intervalTime = 100; // Intervalo de tempo em milissegundos

    let width = 340; // Começa em 350px
    const decrementAmount = (340 / (totalDuration / intervalTime)); // Decremento proporcional à largura da barra

    // Limpar qualquer intervalo existente antes de iniciar um novo
    if (progressBarInterval) {
        clearInterval(progressBarInterval);
    }

    progressBarInterval = setInterval(() => {
        width -= decrementAmount; // Decrementa a largura da barra
        if (width < 0) width = 0; // Garantir que não fique menor que 0
        progressBar.style.width = width + "px"; // Atualiza a largura da barra

        if (width <= 0) {
            clearInterval(progressBarInterval); // Para o intervalo quando a barra chega a 0
            closeAlert(type + 'Alert'); // Fecha o alerta
        }
    }, intervalTime); // A cada 100ms
}

// Função para fechar o alerta
function closeAlert(alertId) {
    const alertDiv = document.getElementById(alertId);
    alertDiv.style.display = "none";
    
    // Limpa e reseta a barra de progresso correta (erro ou sucesso)
    const progressBar = document.getElementById(alertId === 'errorAlert' ? 'progressBar' : 'successProgressBar');
    progressBar.style.width = "0"; // Resetar a largura da barra

    // Limpar o intervalo da barra de progresso ao fechar o alerta
    if (progressBarInterval) {
        clearInterval(progressBarInterval);
        progressBarInterval = null;
    }

    isAlertVisible = false; // Reseta a variável que controla se um alerta está visível
    document.querySelector("button[type='submit']").disabled = false; // Reabilitar o botão de enviar
}

// Função para formatar o número de telefone enquanto o usuário digita
function formatPhoneNumber(input) {
    // Remove caracteres não numéricos
    const numbers = input.value.replace(/\D/g, '');
    
    // Formatação: (XX) XXXXX-XXXX
    const ddd = numbers.slice(0, 2);
    const firstPart = numbers.slice(2, 7);
    const secondPart = numbers.slice(7, 11);

    // Monta a string formatada
    let formattedNumber = '';
    if (ddd) {
        formattedNumber += `(${ddd}) `;
    }
    if (firstPart) {
        formattedNumber += `${firstPart}`;
    }
    if (secondPart) {
        formattedNumber += `-${secondPart}`;
    }

    input.value = formattedNumber.trim();
}

// Função de validação do número de telefone
function validatePhoneNumber() {
    const phoneInput = document.getElementById("phone");
    const phoneError = document.getElementById("phoneError");
    
    // Remove caracteres não numéricos para validação
    const numbers = phoneInput.value.replace(/\D/g, '');

    // Verifica se o número tem 11 dígitos (incluindo o DDD)
    if (numbers.length !== 11) {
        return false; // Número inválido
    } else {
        return true; // Número válido
    }
}

// Função de validação do formulário
function validateForm(event) {
    // Prevenir o envio do formulário padrão
    event.preventDefault();

    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let service = document.getElementById('service').value;  // Supondo que você tenha botões de rádio
    let message = document.getElementById('message').value.trim();

    // Validação do nome (ao menos duas palavras)
    if (name.split(' ').length < 2) {
        showAlert("O nome deve conter ao menos duas palavras.", 'error');
        return; // Prevenir o envio do formulário
    }

    // Validação do e-mail (deve conter "@" e ".")
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(email)) {
        showAlert("Insira um e-mail válido.", 'error');
        return; // Prevenir o envio do formulário
    }

    // Validação do telefone
    if (!validatePhoneNumber()) {
        showAlert("Insira um número de telefone válido com DDD e 9 dígitos.", 'error');
        return; 
    }

    // Validação da seleção do serviço (se houver um input radio)
    if (service === "") { // Verifica se o valor do select é vazio
        showAlert("Selecione um serviço.", 'error');
        return; // Prevenir o envio do formulário
    }

    // Validação da mensagem (10 a 500 caracteres)
    if (message.length < 10 || message.length > 500) {
        showAlert("A mensagem deve ter entre 10 e 500 caracteres.", 'error');
        return; // Prevenir o envio do formulário
    }

    // Se tudo estiver correto, mostrar alerta de sucesso
    showAlert("Cotação enviada com sucesso!", 'success');

    // Aqui você pode adicionar a lógica para enviar os dados do formulário
    // Por exemplo, fazer uma requisição AJAX para enviar os dados

    return false; // Prevenir o envio do formulário
}

// Adiciona o evento de input ao campo de telefone
document.getElementById("phone").addEventListener("input", function() {
    formatPhoneNumber(this);
});

// Adiciona o evento de clique no botão de enviar
document.querySelector("button[type='submit']").addEventListener("click", validateForm);


