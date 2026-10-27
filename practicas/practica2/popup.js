document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('password');
  const toggleVisibility = document.getElementById('toggleVisibility');
  const meterFill = document.getElementById('meterFill');
  const feedbackText = document.getElementById('feedbackText');

  // Requisitos
  const reqLength = document.getElementById('req-length');
  const reqUpper = document.getElementById('req-upper');
  const reqLower = document.getElementById('req-lower');
  const reqNumber = document.getElementById('req-number');
  const reqSpecial = document.getElementById('req-special');

  // Alternar visibilidad de contraseña
  toggleVisibility.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleVisibility.textContent = 'Ocultar contraseña';
    } else {
      passwordInput.type = 'password';
      toggleVisibility.textContent = 'Mostrar contraseña';
    }
  });

  // Evaluar contraseña al escribir
  passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    let score = 0;

    // 1. Longitud
    const hasLength = val.length >= 8;
    updateRequirement(reqLength, hasLength);
    if (val.length >= 8) score++;
    if (val.length >= 12) score++; // Puntos extra por longitud aceptable

    // 2. Mayúsculas
    const hasUpper = /[A-Z]/.test(val);
    updateRequirement(reqUpper, hasUpper);
    if (hasUpper) score++;

    // 3. Minúsculas
    const hasLower = /[a-z]/.test(val);
    updateRequirement(reqLower, hasLower);
    if (hasLower) score++;

    // 4. Números
    const hasNumber = /[0-9]/.test(val);
    updateRequirement(reqNumber, hasNumber);
    if (hasNumber) score++;

    // 5. Caracteres especiales
    const hasSpecial = /[^A-Za-z0-9]/.test(val);
    updateRequirement(reqSpecial, hasSpecial);
    if (hasSpecial) score++;

    // Actualizar la barra de progreso y texto
    updateMeter(score, val.length);
  });

  function updateRequirement(element, isValid) {
    if (isValid) {
      element.classList.add('valid');
    } else {
      element.classList.remove('valid');
    }
  }

  function updateMeter(score, length) {
    if (length === 0) {
      meterFill.style.width = '0%';
      meterFill.style.backgroundColor = '#e0e0e0';
      feedbackText.textContent = 'Nivel: -';
      feedbackText.style.color = '#333';
      return;
    }

    let percentage = 0;
    let color = '';
    let text = '';

    if (score <= 2) {
      percentage = 25;
      color = '#e74c3c'; // Rojo
      text = 'Muy Débil';
    } else if (score <= 4) {
      percentage = 50;
      color = '#e67e22'; // Naranja
      text = 'Débil';
    } else if (score === 5) {
      percentage = 75;
      color = '#f1c40f'; // Amarillo
      text = 'Aceptable';
    } else {
      percentage = 100;
      color = '#2ecc71'; // Verde
      text = 'Muy Segura';
    }

    meterFill.style.width = percentage + '%';
    meterFill.style.backgroundColor = color;
    feedbackText.textContent = 'Nivel: ' + text;
    feedbackText.style.color = color;
  }
});
