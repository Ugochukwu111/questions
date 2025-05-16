export function getNotificationBox(message) {
  const notificationContainer = document.getElementById('notification');
  
  // Set the message text inside the notification container
  notificationContainer.innerText = message;
  
  // Add a class that triggers the slide-down animation
  notificationContainer.classList.add('show');
  
  // Optional: Remove the class after 3 seconds to hide the notification
  setTimeout(() => {
    notificationContainer.classList.remove('show');
  }, 3000);
}

export function generatesRandomNumber(array){
 const index = Math.floor(Math.random() * array.length);
  return array[index];
}