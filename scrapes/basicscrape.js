
function pokemon(id, name, types, sprites) {
  $.ajax ({
    type: 'get',
    url: 'pokeapi.co/api/v2/pokemon/' + this.id + '/',
    dataType: 'json',
    success: function(result){
      console.log(result);
    }
  });
  this.id = result.id;
  this.name = result.name;
  this.types = result.types;
  this.sprites = result.sprites;
}

for (var i = 1 ; i < 5 ; i++) {
  new pokemon()
}
