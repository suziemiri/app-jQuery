var pokemonRepository = (function () {
var repository = [];
var  apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

function loadList() {
  return $.ajax(apiUrl, {dataType: 'json'}).then(function(data){
    $.each(data.results, function(index, item) {
      var pokemon = {
        name: item.name,
        detailsUrl: item.url
      }
      add(pokemon)
    })
  }).catch(function (e) {
    console.error(e);
  });
}

function loadDetails(item) {
  var url = item.detailsUrl;
  return $.ajax(url).then(function(details){
    //adding the details to the items...
    item.imageUrl = details.sprites.front_shiny;
    item.height = 'height: ' + details.height;
    item.weight = 'weight: ' + details.weight;
    item.types = details.types.map(function(pokemon) {
      return pokemon.type.name;
    });
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



var $pokemonList = $('.pokemonList');

function addListItem(pokemon) {
  var listItem = $('<li></li>'); //document.createElement("li");
  var button = $('<button type = "button" class = "button-style" data-toggle = "modal" data-target = "#pokemonModal">' + pokemon.name +'</button>'); //document.createElement("button");
  //button.innerText = pokemon.name;
  //button.classList.add("button-style");
  listItem.append(button);
  $pokemonList.append(listItem);
  button.on("click", () => {
    showDetails(pokemon);
  });
    console.log(pokemon)
};

//Adding a modal to show details of pokemon

function showDetails(pokemon) {
  pokemonRepository.loadDetails(pokemon).then(function () {
    showModal(pokemon);
  });
}

function showModal(item) {
  var $nameElement = $('#pokemonModalTitle');
  $nameElement.html(item.name);

  var $imageElement = $('#pokemonModalImage');
  $imageElement.html($('<img src = "'+ item.imageUrl +'">'));

  var $heightElement = $('#pokemonModalInfo');
  $heightElement.html(item.height);


  var closeButton = $('<button class="modal-close">Close</button>');
  closeButton.on('click');
  }


//allows to exit modal with the Esc button on keyboard.
$(window).on('keydown', (e) => {
  if (e.key === 'Escape' && $modalContainer.hasClass('is-visible')){
    hideModal();
  }
})

//allows to exit modal when clicked outside of modal.
var $modalContainer = $('#modal-container');
  $modalContainer.on('click', (e) => {
  //Since this is also triggered when clicking inside the modal. We want to close if user clicks directly on the overlay.
  var target = e.target;
  if(target === $modalContainer[0]) {
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
};

})(); //End IIFE

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
