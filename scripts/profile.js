import { getUser } from './auth.js';

const user = getUser();



if (user) {
  // Example: set text content
  document.querySelector('#profile-name').textContent = user.fullname || 'No name';
  document.querySelector('#profile-email').textContent = user.email || 'No email';
  document.querySelector('#profile-school').textContent = user.school || 'Undergraduate';

  // Example: set profile picture (if it exists)
  if (user.profilePicUrl) {
    document.querySelector('#profile-pic').src = user.profilePicUrl;
  }
} else {
  // If user isn't logged in or data is missing, redirect to signin
  window.location.href = '/signin.html';
}





const editProfilePicBtn = document.querySelector('.edith-user-profile-photo-btn');
const fileInput = document.getElementById('profilePicInput');
const profilePic = document.getElementById('profilePic');
// Open file picker on button click
editProfilePicBtn.addEventListener('click', () => {
  fileInput.click();// Trigger file input click
});
// Add an event listener to detect when the user selects a file
fileInput.addEventListener('change', () => {
  // Get the first file the user selected (even though input can accept multiple files, we only want one)
  const file = fileInput.files[0];
  // Check if a file was actually selected (null check)
  if (file) {
    // Create a FileReader object to read the file contents
    const reader = new FileReader();
    // Set up a function to run once the file is fully read
    reader.onload = (e) => {
      // e.target.result contains the image data as a base64 URL
      // We set the profile image's src to this, so it updates in the browser
      profilePic.src = e.target.result;
    };
    // Start reading the selected file as a Data URL (base64 encoded image)
    reader.readAsDataURL(file);
  }
});
