//GET all the notebooks by calling our API endpoint ('/')

// fetch('/')
//   .then(response => response.json())
//   .then(data => console.log(data))
console.log('works')

let editElems = Array.from(document.querySelectorAll('span.edit'))
let delElems = Array.from(document.querySelectorAll('span.del'))
// editElems.addEventListener('click', editCard)
// function editCard(){}

delElems.forEach(el => el.addEventListener('click', deleteCard))

function deleteCard(e){
  //find the id of the card to be deleted
  //find the card in DB, delete and save
  console.log(`Fired Delete Event for ${this.parentElement.parentElement.parentElement.dataset.id}`)
}