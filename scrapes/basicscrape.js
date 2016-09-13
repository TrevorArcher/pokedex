var pokeArr = [];

function soBasic() {
  for (var i = 1 ; i < 10  ; i++) {
    $.ajax ({
      type: 'GET',
      url: 'scrapes/pokemon/'+ i +'.json',
      dataType: 'json',
      success: function(result) {
        var pokeNew = {
        id : result.id,
        name : result.name,
        types : result.types,
        sprites : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + result.id + ".png"
      };
        pokeArr.push(pokeNew);
      }
    });
  }
  console.log(pokeArr);
  document.write(pokeArr);
}

soBasic();

// 721
