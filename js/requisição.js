const url = 'https://potterhead-api.vercel.app/api/movies'
const filmes = document.querySelector('.card-container')
const titulosOriginais = Array.from(document.querySelectorAll('.titulo')).map(t => t.textContent)

// aplicação da API
function testeApi(filme, i){
  const titulo = titulosOriginais[i]
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
  const jaFavorito = favoritos.some(fav => fav.titulo === titulo)

  return `
        <li>    
        <div class="card">
        <p>
        <button class="estrela">&#9733;</button></p>
        <img src="${filme.poster}" alt="">
        <h2>${filme.serial} - ${titulosOriginais[i]}</h2>
        </div>
        </li>
        `
}
// aplicação da API

function salvar(filmeData){
  const estrelas = document.querySelectorAll('.estrela')
  estrelas.forEach((estrela, index) => {
  estrela.addEventListener('click', () => {
    
    let titulo = estrela[index]
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
    const jaFavorito = favoritos.some(f => f.titulo === titulo)

    if (jaFavorito) {
      estrela.classList.remove('favorito')
      estrela.style.color = 'white'
      favoritos = favoritos.filter(f => f.titulo !== titulo)
    }else{
      estrela.classList.add('favorito')
      estrela.style.color = 'yellow'
      let filme = { ...filmeData[index], titulo:titulo }
      favoritos.push(filme) 
    }
    localStorage.setItem('favoritos', JSON.stringify(favoritos))
    
  })
})}
//tentativa frustrada de tentar aplicar o status de "favorito"

//importação do fetch 
fetch(url)
.then(response => response.json())
.then(jsonresponse => {
  filmes.innerHTML = jsonresponse.map((filme, i) => testeApi(filme, i)).join("")
  salvar(jsonresponse)
})
.catch((error) => console.log(error))
//importação do fetch