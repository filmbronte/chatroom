const loginSection = document.getElementById('login');
const signupSection = document.getElementById('signup');

export function showLogin() {
    document.querySelector('main').replaceChildren(loginSection);
}
export function showSignup() {
    document.querySelector('main').replaceChildren(signupSection);

    document.getElementById('login-link').addEventListener('click', () => {

        document.querySelector('main').replaceChildren(loginSection);
    })
}

document.getElementById('login').addEventListener('submit', onLogin)
document.getElementById('signup').addEventListener('submit', onSignup)

async function onLogin(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const { email, password } = Object.fromEntries(formData.entries());

    const url = 'http://localhost:3030/users/login';
    const options = {
        'method': 'post',
        'header': {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({ email, password })
    };

    try {
        const response = await fetch(url, options);
        if (response.ok == false) {
            const error = await response.json();
            throw error;
        }

        const userData = await response.json();
        localStorage.setItem('accessToken', userData.accessToken)
        localStorage.setItem('username', userData.username)

        location = '/demo.html';

    } catch (err) {
        alert(err.message)
    }
}

async function onSignup(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const { username, email, password, repass } = Object.fromEntries(formData.entries());

    if (username == '' || email == '' || password == '') {
        return alert('All fields are required!');
    }

    if (password != repass) {
        return alert('Passwords must match!')
    }

    const url = 'http://localhost:3030/users/register';
    const options = {
        'method': 'post',
        'header': {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({ username, email, password })
    }

    try {
        const response = await fetch(url, options);
        if (response.ok == false) {
            const error = await response.json();
            throw error;
        }

        const data = await response.json();

        localStorage.setItem('accessToken', data.accessToken)

        location = './demo.html'

    } catch (err) {
        alert(err.message);
    }

}