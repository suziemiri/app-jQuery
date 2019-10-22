var pokemonRepository = (function () {
var repository = [];
var  apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

function loadList() {
  return $.ajax(apiUrl, {dataType: 'json'}).then(function(data){
    data.results.forEach(function(item) {
      var pokemon = {
        name: item.name,
        detailsUrl: item.url
      }
      add(pokemon);
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

var $pokemonList = $('.pokemonList');

function addListItem(pokemon) {
  var listItem = $('<li></li>'); //document.createElement("li");
  var button = $('<button class ="button-style">' + pokemon.name +'</button>'); //document.createElement("button");
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

function showDetails(item) {
  pokemonRepository.loadDetails(item).then(function () {
    showModal(item);
  });
}

function showModal(pokemon) {
  $('.modal').remove()
  var modal = $('<div class="modal"></div>');


  var closeButton = $('<button class="modal-close">Close</button>');
  closeButton.on('click', hideModal);



  var nameElement = $('<h1>' + pokemon.name + '</h1>');

  var heightElement = $('<p>' + pokemon.height + '<p>');

  var weightElement = $('<p>' + pokemon.weight + '<p>');

  var imgElement = $('<img></img>');
  imgElement.attr('src', pokemon.imageUrl);


modal
  .append(closeButton)
  .append(nameElement)
  .append(imgElement)
  .append(heightElement)
  .append(weightElement)

  $modalContainer
  .append(modal)
  .addClass('is-visible')

  }


  //hides modal
    function hideModal() {
    $modalContainer.removeClass('is-visible');
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
  hideModal: hideModal
};

})(); //End IIFE

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
