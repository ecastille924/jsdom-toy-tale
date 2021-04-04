let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  fetchToys()
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(data => {
    data.forEach(toy => createToyCard(toy))
  })
}

function createToyCard(toy) {
  const toyFormContainer = document.querySelector("#toy-collection")
  const toyCard = document.createElement("div")
  toyCard.classList.add("card")
  toyCard.dataset.id = toy.id

  const toyName = document.createElement("h2")
  toyName.innerText = toy.name
  toyCard.append(toyName)

  const toyImage = document.createElement("img")
  toyImage.classList.add("toy-avatar")
  toyImage.src = toy.image
  toyCard.append(toyImage)

  const toyLikes = document.createElement("p")
  toyLikes.innerText = toy.likes + " likes"
  toyCard.append(toyLikes)

  const likeButton = document.createElement("button")
  likeButton.addEventListener("click", function() {
    increaseLikes(toy);
    window.location.reload(true);
  })
  likeButton.classList.add("like-btn")
  likeButton.innerText = "❤️"
  toyCard.append(likeButton)
  
  toyFormContainer.append(toyCard)
  
}

form = document.querySelector('.add-toy-form')
form.addEventListener("submit", submitData)

function submitData(){
  
  let formData = {
    "name": document.querySelectorAll('.input-text')[0].value,
    "image": document.querySelectorAll('.input-text')[1].value,
    "likes": "0"
  } 
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
    
  fetch("http://localhost:3000/toys", configObj)
    .then(resp => resp.json())
    .then(json => console.log(json))
}

function increaseLikes(toy){

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": parseInt(toy.likes) + 1
    })
  }
  fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
}


// With the response data, make a `<div class="card">` for each toy and add it to the
// toy-collection `div`.