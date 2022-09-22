const tbody = document.querySelector('#tbody')
const adicionar = document.querySelector('.adicionar')
const idInput = document.querySelector('.idInput')
const nameInput = document.querySelector('.nameInput')
const emailInput = document.querySelector('.emailInput')
const update = document.querySelectorAll('.update')
const button = document.getElementById('apply')

const url = 'https://gorest.co.in/public/v2/users'

fetch(url)
  .then(res => res.json())
   .then(data => {
    data.forEach(element =>{
    let tabela = tbody
    let linha = crialinha(element);
    tabela.appendChild(linha)
  })
})

function crialinha(usuario){
  let linha = document.createElement("tr");
  linha.classList.add(`${usuario.id}`)
  linha.classList.add('linha')
  let tdId = document.createElement("td");
  tdId.classList.add('user')
  let tdNome = document.createElement("td");
  tdNome.classList.add('nome')
  let tdEmail = document.createElement("td");
  tdEmail.classList.add('email')
  let tdAcoes = document.createElement("td");
  tdAcoes.classList.add('acoes')

  
  tdId.innerHTML = usuario.id 
  tdNome.innerHTML = usuario.name
  tdEmail.innerHTML = usuario.email

  let imgEdit = document.createElement('img')
  imgEdit.src = 'images/editar.png'
  imgEdit.classList.add('update')

  let imgDeletar = document.createElement('img')
  imgDeletar.src = 'images/excluir.png'

  tdAcoes.appendChild(imgEdit)
  tdAcoes.appendChild(imgDeletar)

  linha.appendChild(tdId)
  linha.appendChild(tdNome)
  linha.appendChild(tdEmail)
  linha.appendChild(tdAcoes)

    
  imgEdit.addEventListener('click', editar)

  imgDeletar.addEventListener("click", remove)

  return linha
}

adicionar.addEventListener('click', (e) =>{
  e.preventDefault()
  fetch(url)
  .then(res => res.json())
  .then(data => {

    let numeroAleatorio = Math.floor(Math.random() * data.length)
    let tabela = tbody
    let linha = crialinha(data[numeroAleatorio]);
    tabela.appendChild(linha)
  })
})

function remove(e){
  let element = e.path[2]
  let id = element.classList.value
  
  fetch(`${url}/${id}`)
  .then(res => res.json())
  .then(data => {
    tbody.removeChild(element)
    return data
  }) 
}

function editar(e){
  let tRow = e.path[2]
  let id = tRow.classList[0]
  
  fetch(`${url}/${id}`)
  .then(res => res.json())
  .then(data => {

    const hidden = document.querySelector('.edit')
    hidden.classList.add('show')
    
    idCell = tRow.childNodes[0]
    nameCell = tRow.childNodes[1]
    emailCell = tRow.childNodes[2]

    idInput.value = ''
    nameInput.value = ''
    emailInput.value = ''

    button.addEventListener('click', ()=>{

      if((id == data.id) === true){
        idCell.innerText = idInput.value
        nameCell.innerText = nameInput.value
        emailCell.innerText = emailInput.value
      }
      
      hidden.classList.remove('show')
    })
    return data
  })
}

function isInputValueNumber(){
  idInput.value = idInput.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');
}


