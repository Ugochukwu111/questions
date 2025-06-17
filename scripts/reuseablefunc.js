export function getNotificationBox(message) {
  const notificationContainer = document.getElementById('notification');
  
  // Set the message text inside the notification container
  notificationContainer.innerText = message;
  
  // Add a class that triggers the slide-down animation
  notificationContainer.classList.add('show');
  
  // Optional: Remove the class after 3 seconds to hide the notification
  setTimeout(() => {
    notificationContainer.classList.remove('show');
  }, 5000);
}

export function getRandomMessage(array){
 const index = Math.floor(Math.random() * array.length);
  return array[index];
}


export function hideSpinner(){
  const spinner = document.querySelector('.spiner-container');
   setTimeout (()=>{
      spinner.style.display = 'none';
      document.body.classList.remove('loading');
   }, 3000)
}


export function Footer() {
  const footer = document.querySelector('footer');
  if (!footer) return console.error('No <footer> element found in the DOM.');

  footer.innerHTML = `
    <div class="footer-left-child text">
      <h2>Quiz-Campus</h2>
      <p class="font-lato footer-content">
        <a href="signin.html">Join us</a> and start practicing academic questions 
        designed for students in Nigeria and beyond.
      </p>
    </div>

    <div class="d-flex j-c-center align-center flex-column footer-middle-child">
      <figure class="d-flex j-c-center flex-column align-center footer-logo">
        <img src="images/logo.png" alt="Quiz-Campus Logo">
        <figcaption class="FWB text-center">Quiz-Campus &copy; 2025</figcaption>
      </figure>
      <p class="FWB text-center"> &copy; 21<sup>st</sup> Century Software. All rights reserved.</p>
    </div>
    
    <ul class="footer-right-child">
      <li><a href="#">Terms of Service</a></li>
      <li><a href="privacy.html">Privacy Policy</a></li>
      <li><a href="mailto:mx58293@gmail.com">Contact Us</a></li>
      <li><a href="mailto:mx58293@gmail.com">Feedback</a></li>
    </ul>
  `;
}
