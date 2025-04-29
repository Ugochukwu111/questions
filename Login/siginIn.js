const signInForm = document.querySelector('.sign-in-form'); // grab the sign in form from the dom
const errorEl = document.querySelector('.password-show-error') ;// grab the error element from the dom
signInForm.addEventListener('submit', (e) => {
  const password = document.getElementById('signIn-password').value.trim();
   if (password.length <= 7) {
    e.preventDefault()
   errorEl.innerHTML = 'Password must be at least 8 characters long.' ;
  }else if (password.length > 7) {
    errorEl.innerHTML = '';} // remove the error message

})



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
  console.log('clicked')
})
