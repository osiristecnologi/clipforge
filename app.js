// TROCAR TELA
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  document.getElementById("screen-" + screenId).classList.add("active");
}

// LOGIN FAKE
function doLogin() {
  // pega email só pra validar
  const emailInput = document.querySelector("#form-login input[type='email']");
  
  if (!emailInput || emailInput.value === "") {
    alert("Digite um email primeiro");
    return;
  }

  // salva login (simulação)
  localStorage.setItem("user", emailInput.value);

  // vai pro dashboard
  showScreen("dashboard");
}

// LOGOUT
function doLogout() {
  localStorage.removeItem("user");
  showScreen("auth");
}

// MOSTRAR/OCULTAR SENHA
function togglePass(btn) {
  const input = btn.parentElement.querySelector("input");

  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}

// TROCAR LOGIN / CADASTRO
function toggleAuthForm(e) {
  e.preventDefault();

  const login = document.getElementById("form-login");
  const signup = document.getElementById("form-signup");
  const subtitle = document.getElementById("auth-subtitle");
  const switchText = document.getElementById("auth-switch");

  login.classList.toggle("hidden");
  signup.classList.toggle("hidden");

  if (login.classList.contains("hidden")) {
    subtitle.innerText = "Crie sua conta";
    switchText.innerHTML = 'Já tem conta? <a href="#" onclick="toggleAuthForm(event)">Entrar</a>';
  } else {
    subtitle.innerText = "Entre e comece a criar";
    switchText.innerHTML = 'Não tem conta? <a href="#" onclick="toggleAuthForm(event)">Criar conta</a>';
  }
}

// NAVEGAÇÃO
function navigateTo(page) {
  if (page === "editor") {
    showScreen("editor");
  } else {
    showScreen("dashboard");
  }
}

// AUTO LOGIN (se já tiver salvo)
window.onload = function () {
  const user = localStorage.getItem("user");

  if (user) {
    showScreen("dashboard");
  } else {
    showScreen("auth");
  }
};
