console.log("App carregado");

document.body.style.background = "#111";
document.body.style.color = "#fff";

document.getElementById("app").innerHTML = `
  <h2>Login ClipForge</h2>
  <input type="email" placeholder="Seu email" id="email" />
  <br><br>
  <button onclick="login()">Entrar</button>
`;

function login() {
  const email = document.getElementById("email").value;

  if (email === "") {
    alert("Digite um email");
    return;
  }

  document.getElementById("app").innerHTML = `
    <h2>Bem-vindo, ${email} 🚀</h2>
    <p>Agora sim parece um app 😎</p>
  `;
}
