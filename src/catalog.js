const catalogSection = document.getElementById('catalog');

export function showCatalog() {
    document.querySelector('main').replaceChildren(catalogSection);

}
const chatArea = document.getElementById('chatbox');

const url = 'http://localhost:3030/jsonstore/messenger';

chatArea.innerHTML = '';
fetch(url)
    .then(res => res.json())
    .then((data) => {
        Object.values(data).forEach(e => {
            chatArea.textContent += `${e.author}: ${e.content}\n`;
        })
    })
    .catch(err => console.log(err));


const welcomeMsg = document.getElementById('welcome');
const authLink = document.getElementById('auth-link');
const logOut = document.getElementById('logout-link');

if (localStorage.getItem('username') != null) {
    welcomeMsg.textContent = `Welcome, ${localStorage.getItem('username')}!`;

    authLink.style.display = 'none';
    logOut.style.display = 'inline';
}

logOut.addEventListener('click', () => {
    const choice = confirm('Are you sure you want to log out?');
    if (choice == false) {
        return;
    }

    localStorage.clear();

    logOut.style.display = 'none';
    authLink.style.display = 'block';

    location = './demo.html'
    alert('Successfully logged out!');
})
