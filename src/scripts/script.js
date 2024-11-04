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
    
    // Chama a função ao carregar a página
    updateTitle();
    
    window.addEventListener('resize', updateTitle);
});

let progressBarInterval = null;

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

window.onload = function () {
    createServiceSelect();
}
let isAlertVisible = false;

// Função para mostrar alerta de erro ou sucesso
function showAlert(message, type) {
    if (isAlertVisible) return;

    isAlertVisible = true;
    const alertDiv = document.getElementById(type + 'Alert');
    const alertMessage = document.getElementById(type === 'error' ? 'alertMessage' : 'successMessage');
    
    alertMessage.innerText = message;
    alertDiv.style.display = "block";

    // Desabilitar o botão de enviar
    document.querySelector("button[type='submit']").disabled = true;

    // Iniciar a barra de progresso correta
    const progressBar = document.getElementById(type === 'error' ? 'progressBar' : 'successProgressBar');
    progressBar.style.width = "340px";

    // Configurações da barra de progresso
    const totalDuration = 10000;
    const intervalTime = 100;

    let width = 340;
    const decrementAmount = (340 / (totalDuration / intervalTime));

    // Limpar qualquer intervalo existente antes de iniciar um novo
    if (progressBarInterval) {
        clearInterval(progressBarInterval);
    }

    progressBarInterval = setInterval(() => {
        width -= decrementAmount; 
        if (width < 0) width = 0; 
        progressBar.style.width = width + "px";

        if (width <= 0) {
            clearInterval(progressBarInterval);
            closeAlert(type + 'Alert');
        }
    }, intervalTime);
}

// Função para fechar o alerta
function closeAlert(alertId) {
    const alertDiv = document.getElementById(alertId);
    alertDiv.style.display = "none";
    
    // Limpa e reseta a barra de progresso correta (erro ou sucesso)
    const progressBar = document.getElementById(alertId === 'errorAlert' ? 'progressBar' : 'successProgressBar');
    progressBar.style.width = "0"; 

    // Limpar o intervalo da barra de progresso ao fechar o alerta
    if (progressBarInterval) {
        clearInterval(progressBarInterval);
        progressBarInterval = null;
    }

    isAlertVisible = false;
    document.querySelector("button[type='submit']").disabled = false; 
}

// Função para formatar o número de telefone enquanto o usuário digita
function formatPhoneNumber(input) {
    const numbers = input.value.replace(/\D/g, '');
    
    const ddd = numbers.slice(0, 2);
    const firstPart = numbers.slice(2, 7);
    const secondPart = numbers.slice(7, 11);

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

    // Verifica se o número tem 11 dígitos
    if (numbers.length !== 11) {
        return false;
    } else {
        return true;
    }
}

function validarEmail(email) {
    const arrobaIndex = email.indexOf("@");
    const pontoIndex = email.lastIndexOf(".");

    if (arrobaIndex > 0 && pontoIndex > arrobaIndex + 1 && pontoIndex < email.length - 1) {
        return true;
    } 
    else {
        showAlert("Insira um e-mail válido.", 'error');
        return false;
    }
}

// Função de validação do formulário
function validateForm(event) {
    // Prevenir o envio do formulário padrão
    event.preventDefault();

    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let service = document.getElementById('service').value;
    let message = document.getElementById('message').value.trim();
    let selectedRadio = document.getElementById('selectedRadio').value;

    // Validação do nome (ao menos duas palavras)
    if (name.split(' ').length < 2) {
        showAlert("O nome deve conter ao menos duas palavras.", 'error');
        return; 
    }

    // Validação do e-mail (deve conter "@" e ".")
    if (!validarEmail(email)) {
        return;
    }

    // Validação do telefone
    if (!validatePhoneNumber()) {
        showAlert("Insira um número de telefone válido com DDD e 9 dígitos.", 'error');
        return; 
    }

    // Validação da seleção do serviço
    if (service === "") { 
        showAlert("Selecione um serviço.", 'error');
        return; 
    }

    // Validação da mensagem (10 a 500 caracteres)
    if (message.length < 10 || message.length > 500) {
        showAlert("A mensagem deve ter entre 10 e 500 caracteres.", 'error');
        return; 
    }

    //verifica se o radio está marcado
    if (selectedRadio === "") {
        showAlert("Selecione uma opção para receber promoções por email.", 'error');
        return; 
    }

    const submitButton = document.querySelector(".btn-submit");
    submitButton.disabled = true;
    submitButton.innerText = "Enviando...";

    const params = {
        name: name,
        email: email,
        service: service,
        message: message,
        promotions: selectedRadio.value
    };

    emailjs.init("GLeXfcWf8ahHmzLfB"); // Inicialize com sua chave pública

    emailjs.send("service_bxk3pvi", "template_h7inehb", params)
    .then((response) => {
        showAlert("Cotação enviada com sucesso!", 'success');
        document.getElementById("quotationForm").reset();
        const options = document.querySelectorAll('.radio-option');
        options.forEach(function(option) {
        option.classList.remove('selected');  
    });
    })
    .catch((error) => {
        showAlert("Erro ao enviar a cotação. Tente novamente.", 'error');
        console.error("Erro:", error);
    })
    .finally(() => {
        submitButton.disabled = false;
        submitButton.innerText = "Enviar Cotação";
    });


    return false; // Prevenir o envio do formulário
}

// Adiciona o evento de input ao campo de telefone
document.getElementById("phone").addEventListener("input", function() {
    formatPhoneNumber(this);
});

// Adiciona o evento de clique no botão de enviar
document.querySelector(".form button[type='submit']").addEventListener("click", validateForm);


//radio 
function selectOption(element) {

    const options = document.querySelectorAll('.radio-option');
    options.forEach(function(option) {
        option.classList.remove('selected');  
    });
  
    element.classList.add('selected');
  
    document.getElementById('selectedRadio').value = element.getAttribute('data-value');
  }
  
