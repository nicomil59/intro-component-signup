const button = document.querySelector('button');

function handleValues(e) {
    e.preventDefault();
    const inputs = Array.from(e.target.parentNode.elements).slice(0, -1) 

    inputs.forEach(input => {
        if (input.value === "") {
            addErrorMessage(input, "empty");
        } else if (input.name === 'email' && !emailIsValid(input.value)) {
            addErrorMessage(input, "invalidEmail");
        }
    });
}

function emailIsValid (email) {
    return /\S+@\S+\.\S+/.test(email)
}

function addErrorMessage(input, errorType) {
    const p = document.createElement('p');
    let message;
    p.className = 'error';

    if (errorType === "empty") message = `${input.placeholder} cannot be empty`;

    if (errorType === "invalidEmail") {
        message = `Looks like this is not an email`;
        input.style.color = "#ff7a7a";
    }

    p.innerText = message;
    input.parentNode.insertBefore(p, input.nextElementSibling);
    input.style.border = "2px solid #ff7a7a";

    input.style.background = "white url('./images/icon-error.svg') no-repeat";
    input.style.backgroundPosition = "95%";
}

button.addEventListener('click', handleValues);
