const signUpForm = document.querySelector('.sign-up-form'); // grab my form from the dom

signUpForm.addEventListener('submit', (e) => {
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmed-password').value.trim();  
  const passwordContainerEl = document.querySelector('.password-input-container');
  const Inputs = passwordContainerEl.querySelectorAll('input');

  // Check if passwords match
  if (password !== confirmPassword) {
    e.preventDefault();
    document.querySelector('.passwaord-show-error').innerHTML = 'Passwords do not match.';
    Inputs.forEach((input) => input.classList.add('error'));
  
  } else if (password.length <= 7) {
    e.preventDefault();
    document.querySelector('.passwaord-show-error').innerHTML = 'Password must be at least 8 characters long.';
    Inputs.forEach((input) => input.classList.add('error'));
  
  } else if (password === confirmPassword) {
    e.preventDefault(); // prevent default form action

    // ✅ Passed validation, clear error state
    Inputs.forEach((input) => {
      document.querySelector('.passwaord-show-error').innerHTML = '';
      input.classList.remove('error');
    });

    // 🧠 Grab other input values
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const school = document.getElementById('school').value.trim();

    const formData = {
      fullname,
      email,
      password,
      confirmPassword,
      school
    };

    // 🚀 Send data to backend API
    fetch("https://quiz-campus-backend.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error); // Show error message from backend
        } else {
          alert(data.message); // Signup successful
          window.location.href = "/login.html"; // Redirect user
        }
      })
      .catch(err => {
        console.error("Signup error:", err);
        alert("An unexpected error occurred. Please try again.");
      });
  }
});



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



  const formData = {
  fullname: fullnameInput.value,
  email: emailInput.value,
  password: passwordInput.value,
  confirmPassword: confirmPasswordInput.value,
  school: schoolInput.value
};

fetch("https://quiz-campus-backend.onrender.com/signup", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(formData)
})
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      alert(data.error); // show error message
    } else {
      alert(data.message); // "Signup successful"
      window.location.href = "/login.html"; // redirect to login page
    }
  })
  .catch(err => console.error("Signup error:", err));
