let editElems = Array.from(document.querySelectorAll('span.edit'))
let delElems = Array.from(document.querySelectorAll('span.del'))
editElems.forEach(el => el.addEventListener('click', editCard))
let saveBtn = document.getElementById('enter')
saveBtn.addEventListener('click', saveCard)
//SAVE card functionality

function saveCard() {
  console.log('save card hit')
}

//EDIT card functionality
function editCard() {
  //setting the targets for specific card that was clicked on
  let editBtn = this
  let cardElem = this.parentElement.parentElement
  let cardID = cardElem.dataset.id
  let dateElement = cardElem.childNodes[1] //what is this
  let titleText = cardElem.childNodes[0].textContent
  let slicedBodyText = cardElem.childNodes[2].textContent

  //Edit/Save button toggle
  if (cardElem.childNodes[0].contentEditable === 'false') {
    cardElem.childNodes[0].contentEditable = 'true'
    cardElem.childNodes[2].contentEditable = 'true'
    cardElem.childNodes[2].focus()
    editBtn.classList.add('edit-save')
    editBtn.innerHTML = 'save'
  } else {
    cardElem.childNodes[0].contentEditable = 'false'
    cardElem.childNodes[2].contentEditable = 'false'
    editBtn.classList.remove('edit-save')
    editBtn.innerHTML = 'edit'

    //capturing the new card info and saving it to DB
    let updatedCardData = {
      title: titleText,
      body: slicedBodyText
    }
    fetch('/card/' + cardID, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedCardData)
    })
      .then(response => response.json())
      .then(function(data) {
        updateDate(data)
      })
      .catch(error => console.log(error))

    function updateDate(data) {
      dateElement.textContent = data
    }
  }
}

//DELETE card functionality
delElems.forEach(el => el.addEventListener('click', deleteCard))
function deleteCard(e) {
  let cardID = this.parentElement.parentElement.dataset.id
  fetch('/card/' + cardID, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      this.parentElement.parentElement.remove()
    })
    .catch(error => console.log(error)) //FIXME: Needs proper error handling
}
