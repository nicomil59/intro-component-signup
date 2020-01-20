const button = document.querySelector('button');
let isError = false;
let errors = document.querySelectorAll('.error');


function handleValues(e) {
    e.preventDefault();

    if (isError) {
        errors.forEach(error => {
            error.previousElementSibling.classList.remove("inputError");
            if (error.previousElementSibling.name === "email") {
                error.previousElementSibling.style.color = "#000";
            }
            error.parentNode.removeChild(error);
        });
        isError = false;
    }
    
    const inputs = Array.from(e.target.parentNode.elements).slice(0, -1) 
    
    inputs.forEach(input => {
        if (input.value === "") {
            addErrorMessage(input, "empty");
            isError = true;
        } else if (input.name === 'email' && !emailIsValid(input.value)) {
            addErrorMessage(input, "invalidEmail");
            isError = true;
        }
    });

    errors = document.querySelectorAll('.error');
}

function emailIsValid (email) {
    return /\S+@\S+\.\S+/.test(email)
}

function addErrorMessage(input, errorType) {
    const p = document.createElement('p');
    let message;
    p.className = 'error';

    if (errorType === "empty")  {
        message = `${input.placeholder} cannot be empty`;
    }

    if (errorType === "invalidEmail") {
        message = `Looks like this is not an email`;
        input.style.color = "#ff7a7a";
        input.classList.add("inputError");
    }

    p.innerText = message;
    input.parentNode.insertBefore(p, input.nextElementSibling);
    input.classList.add("inputError");

}

button.addEventListener('click', handleValues);
