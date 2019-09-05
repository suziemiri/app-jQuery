var pokemonRepository = (function () {
var repository = [];
var  apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

function loadList() {
  return fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function (json) {
    json.results.forEach(function (item) {
      var pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      add(pokemon);
    });
  }).catch(function (e) {
    console.error(e);
  })
}

function loadDetails(item) {
  var url = item.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    //adding the details to the items...
    item.imageUrl = details.sprites.front_shiny;
    item.height = 'height: ' + details.height;
    item.weight = 'weight: ' + details.weight;
    item.types = Object.keys(details.types);
  }).catch(function (e) {
    console.error(e);
  });
}

function add(pokemon) {
  repository.push(pokemon);
}
function getAll() {
  return repository;
}
function addListItem(pokemon) {
  var listItem = document.createElement("li");
  var button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add("button-style");
  listItem.appendChild(button);
  $element.appendChild(listItem);
  button.addEventListener("click", function () {
    showDetails(pokemon);
  });
    console.log(pokemon)
};

function showDetails(item) {
  pokemonRepository.loadDetails(item).then(function () {
    showModal(item);
  });
}

//Adding a modal to show details of pokemon

function showModal(item) {
  var $modalContainer = document.querySelector('#modal-container');
  $modalContainer.classList.add('is-visible');
}

function showModal(item) {
  //clear all modal content that existed
  $modalContainer.innerHTML = '';

  //adding a new div to the DOM with a class named modal
  var modal = document.createElement('div');
  modal.classList.add('modal');

  //Adding Pokemon details to modal
  var nameElement = document.createElement('h1');
  nameElement.innerText = item.name;

  var imgElement = document.createElement('img');
  imgElement.setAttribute('src', item.imageUrl);

  var heightElement = document.createElement('p');
  heightElement.innerText = item.height;

  var weightElement = document.createElement('p');
  weightElement.innerText = item.weight;

  //Add button to close Modal
  var closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);


  modal.appendChild(closeButtonElement);
  modal.appendChild(nameElement);
  modal.appendChild(imgElement);
  modal.appendChild(heightElement);
  modal.appendChild(weightElement);
  $modalContainer.appendChild(modal);

  $modalContainer.classList.add('is-visible');
  }


  //hides modal
    function hideModal() {
      var $modalContainer = document.querySelector('#modal-container');
      $modalContainer.classList.remove('is-visible');
}

//allows to exit modal with the Esc button on keyboard.
window.addEventListener('keydown', (e) => {
  var $modalContainer = document.querySelector('#modal-container');
  if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

//allows to exit modal when clicked outside of modal.
var $modalContainer = document.querySelector('#modal-container');
  $modalContainer.addEventListener('click', (e) => {
  //Since this is also triggered when clicking inside the modal. We want to close if user clicks directly on the overlay.
  var target = e.target;
  if(target === $modalContainer) {
    hideModal();
  };
});

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  showDetails: showDetails,
  loadList:loadList,
  loadDetails:loadDetails,
  showModal: showModal,
  hideModal: hideModal
};

})(); //End IIFE


var $element = document.querySelector(".pokemonList")

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});







/*  if (pokemon.height >= 0.8) {
  document.write('Wow, that is a big pokemon!' + '<br>' + '<br>');
} else {
  document.write('Aww, how cute!' + '<br>' + '<br>');
 }
document.write(pokemonRepository.getAll());
});

/*repository.forEach(function(property){
  document.write('Name' + ' : ' + pokemon.name + '<br>'),
  document.write('Height' + ' : ' + pokemon.height + '<br>'),
  document.write('Types' + ' : ' + pokemon.types + '<br>'),
  document.write('Weaknesses' + ' : ' + pokemon.weaknesses + '<br>')
  if (pokemon.height >= 0.8) {
  document.write('Wow, that is a big pokemon!' + '<br>' + '<br>');
} else {
  document.write('Aww, how cute!' + '<br>' + '<br>');
 }
});*/
