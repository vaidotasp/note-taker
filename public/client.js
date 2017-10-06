//GET all the notebooks by calling our API endpoint ('/')

// fetch('/')
//   .then(response => response.json())
//   .then(data => console.log(data))
console.log('works')

let editElems = Array.from(document.querySelectorAll('span.edit'))
let delElems = Array.from(document.querySelectorAll('span.del'))
editElems.forEach(el => el.addEventListener('click', editCard))

//edit card functionality
function editCard() {
  let cardElem = this.parentElement.parentElement.parentElement
  let cardID = this.parentElement.parentElement.parentElement.dataset.id
  console.log(`You clicked ${cardID} card for edit request`)
  //if (cardElem.)
}

delElems.forEach(el => el.addEventListener('click', deleteCard))

//delete card functionality
function deleteCard(e) {
  let cardID = this.parentElement.parentElement.parentElement.dataset.id
  fetch('/card/' + cardID, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.parentElement.parentElement.parentElement.remove()
    })
    .catch(error => console.log(error)) //FIXME: Needs proper error handling

  //this is just debug, remove this later
  console.log(
    `Fired Delete Event for ${this.parentElement.parentElement.parentElement
      .dataset.id}`
  )
}
