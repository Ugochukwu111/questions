// auth.js

export function setSignedIn(userObj, token) {
  localStorage.setItem('quizcampus_signedIn', 'true');
  localStorage.setItem('quizcampus_user', JSON.stringify(userObj));
  localStorage.setItem('quizcampus_token', token);
}

export function isLoggedIn() {
  return localStorage.getItem('quizcampus_loggedIn') === 'true';
}

export function getUser() {
  const user = localStorage.getItem('quizcampus_user');
  return user ? JSON.parse(user) : null;
}

export function signOut() {
  localStorage.removeItem('quizcampus_loggedIn');
  localStorage.removeItem('quizcampus_user');
  localStorage.removeItem('quizcampus_token');
}

export function redirectIfNotLoggedIn() {
  if (!isLoggedIn()) {
    window.location.href = '/signup.html';
  }
}

export function redirectIfStrangerAfter(seconds) {
  let timer = 0;
  const interval = setInterval(() => {
    if (!isLoggedIn()) {
      timer++;
      if (timer >= seconds) {
        clearInterval(interval);
        window.location.href = '/signup.html';
      }
    } else {
      clearInterval(interval);
    }
  }, 1000);
}
