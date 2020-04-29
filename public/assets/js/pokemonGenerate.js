//upon page load- first containers will dynamically generate
var userOneset = false;
var userTwoset = false;
var firstInput = true;
var firstPokeball;

$(document).ready(function() {

  function getCardSectionsToGeneratePokemon() {
    const generateCardSectionsOne = $(`<h4>Player 1:</h4>
    <div class="form">
  <input id="input-userOne" type="text" name="pokeUserNameOne"> </div>
  <button type="button" alt="pokemon ball" class="nes-btn is-error" id="userOne">Generate Pokemon</button>
  `);
    const generateCardSectionsTwo = $(`<h4>Player 2:</h4>
    <div class="form">
  <input id="input-userTwo" type="text" name="pokeUserNameTwo"> </div>
  <button type="button" alt="pokemon ball" class="nes-btn is-error" id="userTwo">Generate Pokemon</button>
  `);
      //append to card-sections
    $("#card-userOne").append(generateCardSectionsOne);
    $("#card-userTwo").append(generateCardSectionsTwo);

  }


  function postUser(pokeBall) {
    $.ajax("/api/user", {
      type: "POST",
      data: pokeBall
    }).then(
      function(){
        console.log("done!");
      }
    );
  }

  function saveAndgeneratePokemon(user) {
    console.log(user);
    username = $("#input-" + user).val();
    console.log(username);
    var randomNum = Math.floor(Math.random() * 150) + 1;
    console.log(randomNum);
    let pokeSearch = `https://pokeapi.co/api/v2/pokemon/${randomNum}`;
    console.log(pokeSearch);
    //saves pokemon,usename, xp, and image url in mysql
    $.ajax({
      url: pokeSearch,
      method: "GET"
    }).then(function(response) {
      var pokeBall = {
        userName: username,
        pokemonName: response.name,
        xp: response.base_experience,
        image: response.sprites.front_shiny,
        winner: false
      };

      // pokeBall.winnner= true;
      if(firstInput) {
        firstInput = false;
        firstPokeball = pokeBall;
        console.log(firstPokeball);
      } else {

        firstPokeball.xp > pokeBall.xp ? firstPokeball.winner = true : pokeBall.winner = true;

        postUser(firstPokeball);
        postUser(pokeBall);

      }

      //card will empty by card id
      $("#card-" + user).empty();
      //pokemon each user got will be dynamically created and appeneded yo card
      const userPokemon = `<h3>${pokeBall.pokemonName}</h3><img src=${pokeBall.image} ></img>`;
      $("#card-" + user).append(userPokemon);


    });

  }

  getCardSectionsToGeneratePokemon();

  function saveUserNameAndGeneratePokemon() {

  // on click function that saves input from userone
    $("#userOne").on("click",function() {
      saveAndgeneratePokemon(this.id);
      userOneset = true;
    });
    // on click function that saves input from usertwo
    $("#userTwo").on("click",function() {
      saveAndgeneratePokemon(this.id);
      userTwoset = true;
    });

    $("#goResultsPage").on("click",function() {
      // conditional that checks both users have generated a pokemon
      if (userOneset && userTwoset) {
        $("button").removeAttr("Onclick");
        $(".nes-dialog").remove();
        window.location.replace("/results");

      } else {
        const sendAlert = $(`
        <form method="dialog">
          <p>Alert: Please generate a pokemon!</p>
          <menu class="dialog-menu">
            <button class="nes-btn is-primary" id="confirm">Confirm</button>
          </menu>
        </form>`);


        $("#dialog-default").append(sendAlert);
      }

      $("#confirm").on("click",function() {
        console.log("next time this model will not show")
      });

    });

  }

  saveUserNameAndGeneratePokemon();
});








