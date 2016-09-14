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
    $cardDiv = $('<div class="info-card" value=' + nextP.id + '>'),
    $nameDiv = $('<div class="info-name">'),
    $imgDiv = $('<div class="info-img">'),
    $typeDiv = $('<div class="type-container">');
    if ((pTypeArr.includes(nextP.types[0]) || pTypeArr.includes(nextP.types[1]))) {
      $imgDiv.append($('<img src=' + nextP.sprites + '>'));
      $nameDiv.append($('<p>').text(pName));
      $cardDiv.append($imgDiv);
      $cardDiv.append($nameDiv);
      for (var j = 0 ; j < nextP.types.length ; j++) {
        var $type = $('<div class="info-type ' + nextP.types[j] + '-select">');
        $type.append($('<p>').text(nextP.types[j]));
        $typeDiv.append($type);
      }
      $cardDiv.append(($typeDiv));
      $results.append($cardDiv);
    }
    $results.fadeIn();
  }
});

$('.search-results').on('click', '.info-card', function() {
  var $infoText = $('<div class="info-text">'),
      $htWt = $('<div class="ht-wt">'),
      $ht = $('<h3 class="ht"></h3>'),
      $wt = $('<h3 class="wt"></h3>'),
      $statContain = $('<div class="stat-container">');
      pId = '',
      pName = '',
      pHt = '',
      pWt = '',
      pStats = {
        'hp': 0,
        'atk': 0,
        'def': 0,
        'spcAtk': 0,
        'spcDef': 0,
        'speed': 0
      };

  var thisId = this.getAttribute('value');

  $(this).toggleClass('more-info');
  $('.info-text').empty();
  $infoOver.fadeToggle();
  if ($(this).hasClass('more-info')){
    $.ajax({
      type: 'GET',
      url: 'scrapes/pokemon/'+ thisId +'.json',
      dataType: 'json',
      success: function(result){
        console.log(result);
        pId = result.id;
        pName = result.name;
        pHt = (result.height) / 10;
        pWt = (result.weight) / 10;
        pStats.speed = result.stats[0].base_stat;
        pStats.spcDef = result.stats[1].base_stat;
        pStats.spcAtk = result.stats[2].base_stat;
        pStats.def = result.stats[3].base_stat;
        pStats.atk = result.stats[4].base_stat;
        pStats.hp = result.stats[5].base_stat;
        $infoOver.append($infoText);
        if (pId.toString().length == 1) {
          $infoText.append($('<h1 class="name-overlay">').text('#00' + pId + ' ' + pName));
        } else if (pId.toString().length == 2) {
          $infoText.append($('<h1 class="name-overlay">').text('#0' + pId + ' ' + pName));
        } else {
          $infoText.append($('<h1 class="name-overlay">').text('#' + pId + ' ' + pName));
        }
        $infoText.append($htWt);
        $htWt.append($ht.text('Height: ' + pHt + 'm'));
        $htWt.append($wt.text('Weight: ' + pWt + 'kg'));
        $infoText.append($statContain);
        for (var key in pStats){
          $statContain.append($('<div class="stat ' + key + '">').html(key + '<br>' + pStats[key]));
        }
      }
    });
  }
});

$('.close-overlay').on('click', function() {
  $('.info-card').removeClass('more-info');
  $('.info-text').empty();
  $infoOver.fadeToggle();
});
