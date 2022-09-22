const tbody = document.querySelector('#tbody')
const container = document.querySelector('.container')
const add = document.querySelector('.add')
const idInput = document.querySelector('.idInput')
const nameInput = document.querySelector('.nameInput')
const emailInput = document.querySelector('.emailInput')
const update = document.querySelectorAll('.update')
const button = document.getElementById('apply')
const hidden = document.querySelector('.edit')


const url = 'https://gorest.co.in/public/v2/users'

fetch(url)
  .then(res => res.json())
   .then(data => {
    data.forEach(element =>{
    let table = tbody
    let row = createRow(element);
    table.appendChild(row)
  })
})

function createRow(user){
  let row = document.createElement("tr");
  row.classList.add(`${user.id}`)
  row.classList.add('line')
  let tdId = document.createElement("td");
  tdId.classList.add('user')
  let tdName = document.createElement("td");
  tdName.classList.add('name')
  let tdEmail = document.createElement("td");
  tdEmail.classList.add('email')
  let tdActions = document.createElement("td");
  tdActions.classList.add('actions')

  
  tdId.innerHTML = user.id 
  tdName.innerHTML = user.name
  tdEmail.innerHTML = user.email

  let imgEdit = document.createElement('img')
  imgEdit.src = 'images/editar.png'
  imgEdit.classList.add('update')

  let imgDelete = document.createElement('img')
  imgDelete.src = 'images/excluir.png'

  tdActions.appendChild(imgEdit)
  tdActions.appendChild(imgDelete)

  row.appendChild(tdId)
  row.appendChild(tdName)
  row.appendChild(tdEmail)
  row.appendChild(tdActions)

    
  imgEdit.addEventListener('click', edit)

  imgDelete.addEventListener("click", remove)

  return row
}


add.addEventListener('click', (e) =>{
  e.preventDefault()
  fetch(url)
  .then(res => res.json())
  .then(data => {

    hidden.classList.remove('show')

    let randonNumber = Math.floor(Math.random() * data.length)
    let table = tbody
    let row = createRow(data[randonNumber]);
    table.appendChild(row)
  })
})

function remove(e){
  let element = e.path[2]
  let id = element.classList.value
  
  fetch(`${url}/${id}`)
  .then(res => res.json())
  .then(data => {
    tbody.removeChild(element)
    hidden.classList.remove('show')
    return data
  }) 
}

function edit(e){
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
        if(idInput.value !== ''){
          idCell.innerText = idInput.value
        }
        if(nameInput.value !== ''){
          nameCell.innerText = nameInput.value
        }
        if(emailInput.value !== ''){
          emailCell.innerText = emailInput.value
        }
      }
      
      hidden.classList.remove('show')
    })
    return data
  })
}

function isInputValueNumber(){
  idInput.value = idInput.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');
}



