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

var genOne = function() {
  $.ajax({
    type: 'GET',
    url: 'json/pokemon.json',
    dataType: 'json',
    success: function(result){
      $results.empty();
      $results.hide();
      console.log(result);
      for(var i = 0 ; i < result.pokemon.length ; i++) {
        var nextP = result.pokemon[i],
            pName = nextP.name,
            $cardDiv = $('<div class="info-card">'),
            $nameDiv = $('<div class="info-name">'),
            $imgDiv = $('<div class="info-img">'),
            $typeDiv = $('<div class="type-container">');
        $cardDiv.append(($imgDiv).append($('<img src=' + result.pokemon[i].sprites + '>')));
        $cardDiv.append(($nameDiv).append($('<p>').text(pName)));
        $cardDiv.append(($typeDiv));
        for (var j = 0 ; j < nextP.types.length ; j++) {
          $typeDiv.append($('<div class="info-type ' + nextP.types[j] + '-select">').append($('<p>').text(nextP.types[j])));
        }
        $results.append($cardDiv);
        $results.fadeIn();
      }
    }
  });
};

genOne();



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
