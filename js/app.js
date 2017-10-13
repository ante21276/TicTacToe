!function() {
  let count = 9;
  let fields = document.querySelector(".boxes");
  let players_ul = document.querySelector("header").children[1];
  let ply1_name, ply2_name;
  let ply1_isPlaying = true, ply2_isPlaying = false;
  let ply1_fields = generateArray(), ply2_fields = generateArray();
  !function addAttr() {
    for(let i = 0; i < 9;i++){
      fields.children[i].setAttribute("data-attr", i);}
  }()
  function generateArray() {
    return [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  }
  function html(clas, id, p, button){
    let html = "<div class='screen screen-" + clas + "' id=" + id + ">";
    html += "<header>";
    html += "<h1>Tic Tac Toe</h1>";
    html += "<p class='message'>" + p + "</p>";
    html += "<a href='#' class='button'>" + button + "</a>";
    html += "</header></div>";
    return html;
  }
  !function startScreen() { // Show start screen
    $("#board").hide();
    $("body").append(html('start', 'start', '','Start game'));
  }();
  function addActive() { // Add active class to X or O
    ply1_isPlaying == true ? $("#player1").addClass("active") : $("#player1").removeClass("active");
    ply2_isPlaying == true ? $("#player2").addClass("active") : $("#player2").removeClass("active");
  }
  function startBtn() { // Shows board
    $(".button").click(() => {
      ply1_name = prompt("Enter player 1 name").toUpperCase();
      ply2_name = prompt("Enter player 2 name").toUpperCase();
      var p = document.createElement("P");
      var p1 = document.createElement("P");
      p.innerHTML = ply1_name;
      p1.innerHTML = ply2_name;
      players_ul.children[0].appendChild(p);
      players_ul.children[1].appendChild(p1);
      $("#board").show();
      $("#start").remove();
      addActive();
    });
  };
  function hoverField(){ //Hover fields symbol appear
    startBtn();
    fields.addEventListener("mouseover", (e)=>{
      if(e.target.className === "box" && ply1_isPlaying == true){e.target.style.backgroundImage = "url(img/o.svg)";}
      else if (e.target.className === "box" && ply2_isPlaying == true) {e.target.style.backgroundImage = "url(img/x.svg)";}
    });
    fields.addEventListener("mouseout", (e)=>{
      e.target.style.backgroundImage = ""
    });
  };
  function subtract(player_num_fields, e, num, name) {
    for(let i= 0; i < 8; i++) {
      let index = player_num_fields[i].indexOf(parseInt(e.target.attributes[1].value));
      if(index > -1) {
        player_num_fields[i].splice(index,1);
      }
      if(player_num_fields[i].length < 1) {
        !function startScreen() { // Show start screen
          $("#board").hide();
          $("body").append(html('win screen-win-' + num, 'finish', 'Player ' + name + ' has won','New Game'));
        }();
      }
    }
  }
  function clickField (){
    hoverField();
    fields.addEventListener("click", (e)=>{ //Start listener
      if(e.target.className === "box" && ply1_isPlaying == true){
        count --;
        subtract(ply1_fields,e,"one", ply1_name);
        e.target.className = "box box-filled-1";
        ply1_isPlaying = false;ply2_isPlaying = true;
        addActive();
      }
      else if(e.target.className === "box" && ply2_isPlaying == true){count--;subtract(ply2_fields,e,"two", ply2_name);e.target.className = "box box-filled-2";ply2_isPlaying = false;ply1_isPlaying = true;addActive()}
      if(count === 0) {
        !function startScreen(num) { // Show start screen
          $("#board").hide();
          $("body").append(html('win screen-win-' + num, 'finish', 'It is TIE !!','New Game'));
        }("tie");
      }
      $(".button").click(() => {
        $("#board").show();
        $("#finish").remove();
        $(".boxes li").removeClass().addClass("box");
        addActive();
        ply1_fields = generateArray()
        ply2_fields = generateArray();
        count = 9;
      });
    }); // End listener
  }
  clickField();
}();
