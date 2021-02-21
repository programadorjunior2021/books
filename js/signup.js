const form = document.querySelector('#form');
const email = document.querySelector('#email');

const clearInputWarning = inputWarning => {
    inputWarning.textContent = '';
}

email.addEventListener('focus', e => {
    const emailWarning = document.querySelector('#email-warning');
    clearInputWarning(emailWarning);
});

const inputWarning = (inputWarning, message) => {
    const inputWarningGetted = document.querySelector(inputWarning);
    inputWarningGetted.textContent = message;
}

const sendUserObject = user => {
    const url = 'http://localhost:8080/api/v1/users/create';

    fetch (url, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(user => {
        if (user.message === 'email_already_exists') {
            inputWarning('#email-warning', 'E-mail já cadastrado');
        } else {
            alert('Cadastrado com sucesso\nClique em "OK" e acesse sua conta');
            location.href = 'index.html';
        }
    });
}

const createUserObject = (name, email, password) => {
    const user = Object.create(null);
    user.name = name;
    user.email = email;
    user.password = password;

    sendUserObject(user);
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUserObject(name, email, password);
});