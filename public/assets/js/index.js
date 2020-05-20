var typewriterone = document.getElementById("typewriterone");
$(document).ready(() => {
  $(document).foundation();
  $("#next-page").on("click", () => {
    location.href = "/pokemon";
    return false;
  });

  var type = new Typewriter(typewriterone, {
    loop: false,
    delay: 60,
  });

  type
    .pauseFor(1500)
    .typeString("Welcome all trainers!")
    .typeString("<br>")
    .pauseFor(1500)
    .typeString("<br> Have you ever had a dispute between friends that ended in disaster?")
    .typeString("<br>")
    .pauseFor(1500)
    .typeString("<br> From calling 'shotgun' to claiming the last slice of pizza, PokéBattle is for you!")
    .typeString("<br>")
    .pauseFor(1500)
    .typeString("<br> Enter the arena, generate your pokemon, and battle to see who wins!")
    .start();



  //declare intromusic var
  var intromusic = document.getElementById("intromusic");

  function audioControls(music) {
    var volume = 0.5;

    $("#play").on("click", function() {
      music.play();
    });

    $("#pause").on("click", function() {
      music.pause();
    });

    $("#refresh").on("click", function() {
      music.pause();
      music.currentTime = 0;
      music.play();
    });

    $("#softer").on("click", function() {
      volume = volume - 0.1;
      music.volume = volume;
    });

    $("#louder").on("click", function() {
      volume = volume + 0.1;
      music.volume = volume;
    });
  }

  intromusic.play();
  $("#intromusic").prop("volume", 0.5);
  audioControls(intromusic);

});


