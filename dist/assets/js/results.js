$(document).ready(function(){function a(a){$.ajax({method:"GET",url:"/highscore?name="+a}).then(b=>{console.log(b),console.log(b.count),$("#userHighScore").append(a+" has won "+b.count+" times!")})}(function(){$.ajax({method:"GET",url:"/battle"}).done(b=>{console.log(b),$("#userWhoWon").append(b[0].userName);const c=$(`
    <img src="${b[0].image}"></img>
    `);$("#winningPokemon").append(c),$("#winningPokemon").append(b[0].pokemonName),a(b[0].userName)})})()});
