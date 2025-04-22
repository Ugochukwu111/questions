// yes na my sigin in sign up logic be this!!!
const signUpForm = document.querySelector('.sign-up-form') // grab my form from the dom
signUpForm.addEventListener('submit', (e) => {

  // grabs the passwaord and confirmed password from the dom and trims the space
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmed-password').value.trim();  

  const passwordContainerEl = document.querySelector('.password-input-container');

  // grabs the inputs (confirm password and passwprd) of the password container
  const Inputs = passwordContainerEl.querySelectorAll('input') ;

  // check if the password and confirmed password are equal
        if (password !== confirmPassword){
          e.preventDefault()
          document.querySelector('.passwaord-show-error').innerHTML = 'Passwords do not match.' // show the error message
          // loop through the inputs and add the error class to each of them
             Inputs.forEach((input) => {
            input.classList.add('error')}) // add error class to the inputs
        } else if (password.length <= 7) {
            e.preventDefault()
            document.querySelector('.passwaord-show-error').innerHTML = 'Password must be at least 8 characters long.' // show the error message;

            // loop through the inputs and add the error class to each of them
            Inputs.forEach((input) => {
              input.classList.add('error')}); // add error class to the inputs
          }else if (password === confirmPassword) {
            // loop through the inputs and remove the error class from each of them
            Inputs.forEach((input) => {
              document.querySelector('.passwaord-show-error').innerHTML = '';
              input.classList.remove('error')})// remove error class from the inputs 
            }
})

