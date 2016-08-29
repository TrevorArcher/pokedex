var $results = $('.search-results');
var pNameArr = [];

$('.type').on('click', function(event){
  var pType = $(this).text();
  event.preventDefault();
  console.log(pType);
  $.ajax({
    type: 'GET',
    url: ('https://pokeapi.co/api/v2/type/' + pType.toLowerCase()),
    dataType: 'json',
    success: function(result){
      $results.empty();
      pNameArr = [];
      for (var i = 0 ; i < result.pokemon.length ; i++){
        var pName = result.pokemon[i].pokemon.name;
        pNameArr.push(pName);
      }
      console.log(pNameArr);
    }
  });
});
