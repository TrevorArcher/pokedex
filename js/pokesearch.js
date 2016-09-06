var $results = $('.search-results'),
    $infoOver = $('#info-overlay'),
    $buttons = $('button'),
    pObj,
    pNameArr = [],
    pTypeArr = [];

var genOne = function() {
  $.ajax({
    type: 'GET',
    url: 'json/pokemon.json',
    dataType: 'json',
    success: function(result){
      pObj = result;
      console.log(pObj);
    }
  });
}();

$('.type').on('click', function(){
  var thisType = this.value;
  if (pTypeArr.includes(thisType) && ($(this).hasClass(thisType + '-select'))){
      pTypeArr.splice(pTypeArr.indexOf(thisType),1);
      console.log(pTypeArr);
      console.log('type removed!');
  } else {
    pTypeArr.push(thisType);
    console.log(pTypeArr);
    console.log('type has been added!');
  }
  $(this).toggleClass(thisType);
  $(this).toggleClass(thisType + '-select');
  $(this).toggleClass('type-select');
  console.log(thisType);
});

$('.search-reset').on('click', function(){
  pTypeArr = [];
  $results.empty();
  for (var i = 0 ; i < $buttons.length ; i++) {
    if ($($buttons[i]).hasClass('type-select')) {
      $($buttons[i]).addClass($buttons[i].value);
      $($buttons[i]).removeClass('type-select');
      $($buttons[i]).removeClass($buttons[i].value + '-select');
    }
  }
});

$('.search-submit').on('click', function(event){
  event.preventDefault();
  $results.hide();
  $results.empty();
  for(var i = 0 ; i < pObj.pokemon.length ; i++) {
    var nextP = pObj.pokemon[i],
        pName = nextP.name,
        $cardDiv = $('<div class="info-card">'),
        $nameDiv = $('<div class="info-name">'),
        $imgDiv = $('<div class="info-img">'),
        $typeDiv = $('<div class="type-container">');
    if ((pTypeArr.includes(nextP.types[0]) || pTypeArr.includes(nextP.types[1]))) {
      $cardDiv.append(($imgDiv).append($('<img src=' + pObj.pokemon[i].sprites + '>')));
      $cardDiv.append(($nameDiv).append($('<p>').text(pName)));
      $cardDiv.append(($typeDiv));
      for (var j = 0 ; j < nextP.types.length ; j++) {
        $typeDiv.append($('<div class="info-type ' + nextP.types[j] + '-select">').append($('<p>').text(nextP.types[j])));
      }
      $results.append($cardDiv);
    }
    $results.fadeIn();
  }
});

$('.search-results').on('click', '.info-card', function() {
  $(this).toggleClass('more-info');
  if ($('#info-overlay').css('display') == 'none'){
    $('#info-overlay').css('display', 'inline');
    // $('body').css('overflow','hidden'); Not sure if I care enough about disabling scrolling
  } else {
    $('#info-overlay').css('display', 'none');
    // $('body').css('overflow','initial');
  }
  // $infoOver.hide();
  // $infoOver.empty();
  //insert ajax call to pokeapi

  // $infoOver.append(($imgDiv));
});

$('.close-overlay').on('click', function() {
  $('.info-card').removeClass('more-info');
  if ($('#info-overlay').css('display') == 'none'){
    $('#info-overlay').css('display', 'inline');
    // $('body').css('overflow','hidden'); Not sure if I care enough about disabling scrolling
  } else {
    $('#info-overlay').css('display', 'none');
    // $('body').css('overflow','initial');
  }
});
