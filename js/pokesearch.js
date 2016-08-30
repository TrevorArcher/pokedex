var $results = $('.search-results');
var $buttons = $('button');
var pNameArr = [];
var pTypeArr = [];

$('.type').on('click', function(){
  $(this).toggleClass(this.value);
  $(this).toggleClass(this.value + '-select');
  $(this).toggleClass('type-select');
  console.log(this.value);
});

$('.search-reset').on('click', function(){
  for (var i = 0 ; i < $buttons.length ; i++) {
    if ($($buttons[i]).hasClass('type-select')) {
      $($buttons[i]).addClass($buttons[i].value);
      $($buttons[i]).removeClass('type-select');
      $($buttons[i]).removeClass($buttons[i].value + '-select');
    }
  }
});

// var genOne = function() {
//   $.ajax({
//     type: 'GET',
//     url: 'https://pokeapi.co/api/v2/generation/1/',
//     dataType: 'json',
//     success: function (result){
//       console.log(result);
//       for (var i = 0 ; i < result.pokemon_species.length ; i++) {
//         var pName = result.pokemon_species[i].name;
//         $results.append(($('<div class="info-card">')).append(($('<div class="info-name">')).append($('<p>').text(pName))));
//       }
//     }
//   });
// };


// $('.search-submit').on('click', function(event){
//   event.preventDefault();
//   // var pType = $(this).text();
//   // console.log(pType);
//   for (var i = 0 ; i < $buttons.length ; i++) {
//     var pType = $($buttons[i].value);
//     $.ajax({
//       type: 'GET',
//       url: ('https://pokeapi.co/api/v2/type/' + pType.toLowerCase()),
//       dataType: 'json',
//       success: function(result){
//         $results.empty();
//         pNameArr = [];
//         console.log(result);
//         for (var i = 0 ; i < result.pokemon.length ; i++){
//           var pName = result.pokemon[i].pokemon.name;
//           pNameArr.push(pName);
//           $results.append(($('<div class="info-card">')).append(($('<div class="info-name">')).append($('<p>').text(pName))));
//         }
//       }
//       console.log(pNameArr);
//     });
//   }
// });
