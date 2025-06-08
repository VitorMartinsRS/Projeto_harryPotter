
let imagemAtual = "";
let idade = 0;


document.getElementById("fotoInput").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagemAtual = e.target.result;
      document.getElementById('fotoPreview').src = imagemAtual;
    };
    reader.readAsDataURL(file);
  }
});


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btn").addEventListener("click", function () {
    const dnascStr = document.getElementById('date').value;
    const dnasc = new Date(dnascStr);
    const dataAtual = new Date();
    idade = dataAtual.getFullYear() - dnasc.getFullYear();

    if (
      dataAtual.getMonth() < dnasc.getMonth() ||
      (dataAtual.getMonth() === dnasc.getMonth() && dataAtual.getDate() < dnasc.getDate())
    ) {
      idade--;
    }
  });
});


function salvar() {
  const foto = document.getElementById('fotoInput').value;
  const nome = document.getElementById('usernome').value;
  const bio = document.getElementById('bio').value;
  const chog = document.getElementById('chogw').value;

  localStorage.setItem('foto', imagemAtual);
  localStorage.setItem('usernome', nome);
  localStorage.setItem('chogw', chog);
  localStorage.setItem('bio', bio);
  localStorage.setItem('idade', idade);

  alert("Perfil salvo com sucesso!");
}

// Deletar perfil
function deletarPerfil(index) {
  if (confirm("Tem certeza que deseja excluir este perfil?")) {
    perfis.splice(index, 1);
    renderizarPerfis();
  }
}