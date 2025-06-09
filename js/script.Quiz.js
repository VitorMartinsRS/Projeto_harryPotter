document.addEventListener("DOMContentLoaded", function () {
  const botaoQuiz = document.querySelector(".botao_quiz");
  const container = document.querySelector(".container");
  const intro = document.querySelector(".centro");
  const perguntas = document.querySelectorAll(".questions-container");
  const casaResult = document.getElementById("casa-result");
  const imagemCasa = document.getElementById("imagem-casa");

  let perguntaAtual = 0;
  let respostaSelecionada = null;

  const pontuacoes = {
    grifinoria: 0,
    sonserina: 0,
    corvinal: 0,
    lufaLufa: 0
  };  // <-- Corrigido: fechou o objeto com } e ponto e vírgula

  // Esconde a div de resultado no início
  const resultadoFinal = document.getElementById("resultado-final");
  resultadoFinal.classList.add("hide");

  // Iniciar o quiz ao clicar no botão "Começar quiz!"
  botaoQuiz.addEventListener("click", function () {
    intro.classList.add("hide");
    container.classList.remove("hide");
    

    const chapeu = document.getElementById("chapeu-seletor");
  if (chapeu) {
    chapeu.style.display = "block";  // mostra a imagem
  }

    perguntas[perguntaAtual].classList.remove("hide");
  });

  perguntas.forEach((pergunta) => {
    const botoesResposta = pergunta.querySelectorAll(".resp-button");
    const navButtons = pergunta.querySelector(".nav-buttons");
    const btnProxima = navButtons.querySelector("#prox-question");
    const btnVoltar = navButtons.querySelector("#ant-question");

    btnProxima.classList.add("hide");

    botoesResposta.forEach(botao => {
      botao.addEventListener("click", () => {
        respostaSelecionada = botao.getAttribute("data-casa");

        // Limpa seleções anteriores
        botoesResposta.forEach(btn => {
          btn.classList.remove("selecionado", "grifinoria", "sonserina", "corvinal", "lufaLufa");
        });

        // Adiciona classe de seleção para mostrar qual resposta foi escolhida
        botao.classList.add("selecionado");

        // Mostra o botão de próxima pergunta
        btnProxima.classList.remove("hide");
      });
    });

    btnProxima.addEventListener("click", () => {
      if (!respostaSelecionada) return;

      // Atualiza a pontuação da casa
      pontuacoes[respostaSelecionada]++;
      
      // Esconde a pergunta atual
      perguntas[perguntaAtual].classList.add("hide");
      
      // Avança para a próxima pergunta
      perguntaAtual++;
      
      // Reseta a resposta selecionada
      respostaSelecionada = null;

      // Verifica se há mais perguntas
      if (perguntaAtual < perguntas.length) {
        perguntas[perguntaAtual].classList.remove("hide");
      } else {
        mostrarResultado(); // Chama a função para exibir o resultado
      }
    });

    btnVoltar.addEventListener("click", () => {
      perguntas[perguntaAtual].classList.add("hide");
      perguntaAtual--;
      perguntas[perguntaAtual].classList.remove("hide");
      perguntas[perguntaAtual].querySelector("#prox-question").classList.add("hide");
    });
  });

  // Função para mostrar o resultado final
  function mostrarResultado() {
    const resultado = Object.keys(pontuacoes).reduce((a, b) =>
      pontuacoes[a] > pontuacoes[b] ? a : b
    );

    const nomesCasas = {
      grifinoria: "Grifinória",
      sonserina: "Sonserina",
      corvinal: "Corvinal",
      lufaLufa: "Lufa-Lufa"
    };

    const frasesCasas = {
      grifinoria: "Corajoso e destemido, você é a alma da Grifinória!",
      sonserina: "Astuto e ambicioso, você é a essência da Sonserina!",
      corvinal: "Inteligente e criativo, você é puro orgulho da Corvinal!",
      lufaLufa: "Leal e trabalhador, você é coração da Lufa-Lufa!"
    };

    resultadoFinal.classList.remove("hide");
    resultadoFinal.classList.add(resultado);

    if (casaResult) {
      casaResult.textContent = nomesCasas[resultado] || "Casa desconhecida";
    }

   if (imagemCasa) {
      imagemCasa.src = `img/casas/${resultado}.jpg`;
      imagemCasa.alt = `Imagem da casa ${resultado}`;
    }

    const fraseCasa = document.getElementById("frase-casa");
    if (fraseCasa) {
      fraseCasa.textContent = frasesCasas[resultado] || "";
    }

    // 🎉 Efeito de confete
    if (typeof confetti === "function") {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.9 }
      });
    } else {
      console.warn("Biblioteca confetti não carregada!");
    }
    
  }
});
