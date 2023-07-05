import { showLogin, showSignup } from './login.js';
import { showCatalog } from './catalog.js';

document.getElementById('views').remove();

showCatalog();

document.getElementById('auth-link').addEventListener('click', () => {
    showLogin();
    document.getElementById('signup-link').addEventListener('click', () => {
        showSignup();
    })
})
document.getElementById('catalog-link').addEventListener('click', () => {
    showCatalog();
})