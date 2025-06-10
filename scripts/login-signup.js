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

document.querySelector('.js-display-password-btn').addEventListener('click', (e) => {
  const passwordInput = document.getElementById('password'); // grab the password input from the dom
  const confirmPasswordInput = document.getElementById('confirmed-password'); // grab the confirm password input from the dom
  const passwordContainerEl = document.querySelector('.password-input-container'); // grab the password container from the dom

  // check if the password is type password or text and change it to the opposite type
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text'; // change the type to text
    confirmPasswordInput.type = 'text'; // change the type to text
    // passwordContainerEl.classList.add('show-password'); // add the show-password class to the password container
    e.target.setAttribute('aria-label', 'hide password');
  } else {
    passwordInput.type = 'password'; // change the type to password
    confirmPasswordInput.type = 'password'; // change the type to password
    // passwordContainerEl.classList.remove('show-password'); // remove the show-password class from the password container
    e.target.setAttribute('aria-label', 'Show password');
  }
  console.log('clicked')
})


//const select = document.getElementById("school");
// fetch("https://corsproxy.io/?https://nigerian-universities.onrender.com")
//   .then(response => response.text())
//   .then(text => {
//     const parsed = JSON.parse(text);
//     const universities = parsed.data; // ✅ actual list is under "data"

//     if (!Array.isArray(universities)) {
//       throw new Error("Unexpected format: 'data' is not an array");
//     }

//     const select = document.getElementById("school");
//     select.innerHTML = '<option value="">-- Select a university --</option>';

//     universities.forEach(uni => {
//       const option = document.createElement("option");
//       option.value = uni.name;
//       option.textContent = uni.name;
//       select.appendChild(option);
//     });

//     select.disabled = false;
//   })
//   .catch(error => {
//     console.error("Error loading universities:", error);
//   });


// Fetch the list of Nigerian universities through a CORS proxy
fetch("https://corsproxy.io/?https://nigerian-universities.onrender.com")
  .then(response => response.text()) // Read the raw text response
  .then(text => {
    // Parse the text into a JSON object
    const parsed = JSON.parse(text);

    // Extract the array of universities from the 'data' property
    const universities = parsed.data;

    // Check if we actually got an array
    if (!Array.isArray(universities)) {
      throw new Error("Unexpected format: 'data' is not an array");
    }

    // Get the <select> element where the options will be added
    const select = document.getElementById("school");

    // Add the default option to the dropdown
    select.innerHTML = '<option value="">-- Select a university --</option>';

    // Sort the universities alphabetically by name
    universities.sort((a, b) => a.name.localeCompare(b.name));

    // Loop through each university and add it as an <option> in the dropdown
    universities.forEach(uni => {
      const option = document.createElement("option");
      option.value = uni.name;         // Set the option value to the university name
      option.textContent = uni.name;   // Set the text shown to the user
      select.appendChild(option);      // Add the option to the dropdown
    });

    // Enable the dropdown now that it's populated
    select.disabled = false;
  })
  .catch(error => {
    // Log any errors to the console for debugging
    console.error("Error loading universities:", error);
  });


  document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const emailError = params.get('emailError');
  if (emailError) {
    const errorElem = document.querySelector('.email-errormsg');
    errorElem.textContent = decodeURIComponent(emailError);
    errorElem.style.color = 'red';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const emailError = params.get('emailError');
  console.log("emailError from URL:", emailError);  // Debug log
  if (emailError) {
    const errorElem = document.querySelector('.email-errormsg');
    if (errorElem) {
      errorElem.textContent = decodeURIComponent(emailError);
      errorElem.style.color = 'red';
    } else {
      console.error(".email-errormsg element not found");
    }
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  // Show email error if present
  const emailError = params.get('emailError');
  if (emailError) {
    const errorElem = document.querySelector('.email-errormsg');
    if (errorElem) {
      errorElem.textContent = decodeURIComponent(emailError);
      errorElem.style.color = 'red';
    }
  }

  // Repopulate all form fields if present in URL params
  const fullname = params.get('fullname');
  if (fullname) {
    document.getElementById('fullname').value = decodeURIComponent(fullname);
  }

  const email = params.get('email');
  if (email) {
    document.getElementById('email').value = decodeURIComponent(email);
  }

  const password = params.get('password');
  if (password) {
    document.getElementById('password').value = decodeURIComponent(password);
  }

  const confirmPassword = params.get('confirmPassword');
  if (confirmPassword) {
    document.getElementById('confirmed-password').value = decodeURIComponent(confirmPassword);
  }

  const school = params.get('school');
  if (school) {
    const schoolSelect = document.getElementById('school');
    // Wait until schools are loaded, then set value
    if (schoolSelect) {
      // If the select is disabled/loading, wait for it to enable first
      const trySetSchool = () => {
        if (!schoolSelect.disabled) {
          schoolSelect.value = decodeURIComponent(school);
        } else {
          // retry after some time
          setTimeout(trySetSchool, 100);
        }
      };
      trySetSchool();
    }
  }
});


//window.history.replaceState({}, document.title, window.location.pathname);