const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// Credenciales válidas de ejemplo
const validCredentials = {
  username: 'Alejandro',
  password: '1004192951'
};

let loggedIn = false; // Variable para rastrear el estado de inicio de sesión
const inactivityTimeout = 400000; // 5 minutos en milisegundos (300000 ms)

// Función para iniciar la sesión
function startSession() {
  loggedIn = true;
  window.location.href = 'tareas.html';

  // Reiniciar el temporizador de inactividad
  clearTimeout(inactivityTimeoutId);
  resetInactivityTimer();
}

// Función para finalizar la sesión
function endSession() {
  loggedIn = false;
  window.location.href = 'login.html';
}

let inactivityTimeoutId; // Variable para almacenar el ID del temporizador de inactividad

// Función para reiniciar el temporizador de inactividad
function resetInactivityTimer() {
  clearTimeout(inactivityTimeoutId);
  inactivityTimeoutId = setTimeout(endSession, inactivityTimeout);
}

// Detectar actividad del usuario
document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keydown', resetInactivityTimer);

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  if (username === validCredentials.username && password === validCredentials.password) {
    // Credenciales válidas, iniciar la sesión
    startSession();
  } else {
    // Credenciales inválidas, mostrar un mensaje de error
    alert('Usuario o contraseña incorrectos');
  }
});

// Verificar si el usuario ya ha iniciado sesión
if (loggedIn) {
  // Reiniciar el temporizador de inactividad
  resetInactivityTimer();
}