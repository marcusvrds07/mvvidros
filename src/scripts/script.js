document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

let progressBarInterval = null;
let isAlertVisible = false;

// Função para mostrar alerta de erro ou sucesso
function showAlert(message, type) {
    if (isAlertVisible) return;

    isAlertVisible = true;
    const alertDiv = document.getElementById(type + 'Alert');
    const alertMessage = document.getElementById(type === 'error' ? 'alertMessage' : 'successMessage');
    
    alertMessage.innerText = message;
    alertDiv.style.display = "block";

    document.querySelector("button[type='submit']").disabled = true;

    const progressBar = document.getElementById(type === 'error' ? 'progressBar' : 'successProgressBar');
    progressBar.style.width = "340px";

    const totalDuration = 10000;
    const intervalTime = 100;

    let width = 340;
    const decrementAmount = (340 / (totalDuration / intervalTime));

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

// Função para fechar o alerta do form
function closeAlert(alertId) {
    const alertDiv = document.getElementById(alertId);
    alertDiv.style.display = "none";
    
    const progressBar = document.getElementById(alertId === 'errorAlert' ? 'progressBar' : 'successProgressBar');
    progressBar.style.width = "0"; 

    if (progressBarInterval) {
        clearInterval(progressBarInterval);
        progressBarInterval = null;
    }

    isAlertVisible = false;
    document.querySelector("button[type='submit']").disabled = false; 
}


// TRABALHO DE LAURO:

// Função de validação do número de telefone
function validatePhoneNumber() {
    const phoneInput = document.getElementById("phone");
    const phoneError = document.getElementById("phoneError");
    
    const numbers = phoneInput.value;

    console.log(numbers.length);

    if (numbers.length !== 15) {
        return false;
    } else {
        return true;
    }
}

//função de validar email
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
    event.preventDefault();

    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let service = document.getElementById('select-text').textContent.trim();
    let message = document.getElementById('message').value.trim();
    let selectedRadio = document.getElementById('selectedRadio').value;

    // Validação do nome
    if (name.split(' ').length < 2) {
        showAlert("O nome deve conter ao menos duas palavras.", 'error');
        return; 
    }

    // Validação do e-mail
    if (!validarEmail(email)) {
        return;
    }

    // Validação do telefone
    if (!validatePhoneNumber()) {
        showAlert("Insira um número de telefone válido\n com DDD e 9 dígitos.", 'error');
        return; 
    }

    //validação do campo select 
    if (service === "Selecione um serviço") {
        showAlert("Selecione um serviço.", 'error');
        return;
    }

    // Validação do textarea
    if (message.length < 10 || message.length > 500) {
        showAlert("A mensagem deve ter entre 10 e 500 caracteres.", 'error');
        return; 
    }

    //verifica o radio
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

    emailjs.init("GLeXfcWf8ahHmzLfB");

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


    return false;
}

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
  
// select js
var customSelect = document.getElementById("customSelect");
var selectedOption = customSelect.querySelector(".selected-option");
var selectText = customSelect.querySelector("#select-text");
var arrow = customSelect.querySelector(".arrow");
var options = customSelect.querySelector(".options");
var optionItems = options.querySelectorAll(".option");

selectedOption.addEventListener("click", function () {
  options.classList.toggle("open");
  arrow.classList.toggle("rotate");
});

optionItems.forEach(function (item) {
  item.addEventListener("click", function (event) {
    selectText.firstChild.textContent = event.target.textContent;
  });   
});

document.addEventListener("click", function (event) {
  if (!customSelect.contains(event.target)) {
    options.classList.remove("open");
    arrow.classList.remove("rotate");
  }
});

document.querySelectorAll('.accordion-header').forEach(function(header) {
    header.addEventListener('click', function() {
        const accordionItem = header.parentElement;
        const isActive = accordionItem.classList.contains('active');

        document.querySelectorAll('.accordion-item').forEach(function(item) {
            item.classList.remove('active');
        });

        if (!isActive) {
            accordionItem.classList.add('active');
        }
    });
});
