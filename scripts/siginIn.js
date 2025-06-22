// ===== Grab DOM elements =====
console.log('Sign-in script loaded'); // Debugging log
const signInForm = document.querySelector('.sign-in-form'); // form
const errorEl     = document.querySelector('.password-show-error'); // small tag for errors

// ===== Form submit handler =====
signInForm.addEventListener('submit', (e) => {
  e.preventDefault();                    // always stop default form post
  const email    = document.getElementById('email').value.trim();
  const password = document.getElementById('signIn-password').value.trim();

  // ---- Simple client-side validation ----
  if (password.length < 8) {
    errorEl.textContent = 'Password must be at least 8 characters long.';
    return;                               // don’t continue
  }
  errorEl.textContent = '';               // clear any previous error

  // ---- Hit backend /login route ----
  fetch('http://localhost:3000/signin', {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      // Backend-provided error (invalid creds, etc.)
      errorEl.textContent = data.error;
    } else {
      // ---- Success: store token + user, redirect ----
      localStorage.setItem('quizcampus_token', data.token);
      localStorage.setItem('quizcampus_user',  JSON.stringify(data.user));
      window.location.href = '/index.html';
    }
  })
  .catch(err => {
    console.error('Login fetch error:', err);
    errorEl.textContent = 'Something went wrong. Please try again.';
  });
});







// icon to see password js
document.querySelector('.js-display-password-btn').addEventListener('click', (e) => {
  const passwordInput = document.getElementById('signIn-password'); // grab the password input from the dom

  // check if the password is type password or text and change it to the opposite type
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text'; // change the type to text
    e.target.setAttribute('aria-label', 'hide password');
  } else {
    passwordInput.type = 'password'; // change the type to password
    e.target.setAttribute('aria-label', 'Show password');
  }
  
})
