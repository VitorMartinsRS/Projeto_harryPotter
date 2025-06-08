
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const rememberMeCheckbox = document.querySelector('.remember-me');
  const emailInput = document.getElementById('Email');
  const passwordInput = document.getElementById('Senha');
  const storageKey = "rememberMeData";

  // 1. Carregar dados se "Lembrar-me" estiver marcado
  const storedData = localStorage.getItem(storageKey);
  if (storedData) {
    const userData = JSON.parse(storedData);
    emailInput.value = userData.email;
    passwordInput.value = userData.password;
    rememberMeCheckbox.checked = true;
  }

  // 2. Envio do formulário
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    // Salvar ou remover dados do "Lembrar-me"
    if (rememberMeCheckbox.checked) {
      const userData = {
        email: email,
        password: password
      };
      localStorage.setItem(storageKey, JSON.stringify(userData));
    } else {
      localStorage.removeItem(storageKey);
    }

    // Verificar usuário cadastrado (precisa estar salvo como localStorage.setItem(email, JSON.stringify(userData)))
    const user = localStorage.getItem(email);
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.Senha === password) {
        localStorage.setItem("user", JSON.stringify(parsedUser)); // salva o usuário logado
        window.location.href = "filmes.html";
      } else {
        alert("Senha Incorreta");
      }
    } else {
      alert("Usuário Não Cadastrado");
    }
  });

  // 3. Limpar dados ao desmarcar "Lembrar-me"
  rememberMeCheckbox.addEventListener('change', function () {
    if (!this.checked) {
      localStorage.removeItem(storageKey);
    }
  });
});

