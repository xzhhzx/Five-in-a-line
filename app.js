// cache the dom (storing for future use)
// & reset everything to 0 value
let userScore = 0;
let computerScore = 0;
// const userScore_span = document.getElementById('user-score');
// const computerScore_span = document.getElementById('computer-score');
// const scoreBoard_div = document.querySelector('.score-board');
// const result_div = document.querySelector('.result');

var N = 15;

/* Current state of chess board */
game_state = Array(N).fill(0).map(x => Array(N).fill(0));

/* Current turn */
var turn = 'A';



// set up the core function for the computer that will use math.random to loop through an array and return that value
function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

// similar to convertcase but just takes lowercase and replaces with titlecase
function convertCase(anythingIwant) {
  if (anythingIwant === 'paper') return 'Paper';
  if (anythingIwant === 'scissors') return 'Scissors';
  return 'Rock';
}

// Winning Condition - this handles what happens when the user clicks one of the choices where the value is them passed through as a parameter
function win(user, computer) {
  userScore++;
  // console.log('user score is ' + userScore + ' ' + user);
  userScore_span.innerHTML = userScore;
  const userName = ' (user)'.fontsize(3).sup();
  const compName = ' (comp)'.fontsize(3).sup();
  result_div.innerHTML = `<p>${convertCase(user)}${userName} beats ${convertCase(computer)}${compName}. You win!</p>`;
  const roundStatus = document.getElementById(user);
  roundStatus.classList.add('winningStyles');
  setTimeout(() => roundStatus.classList.remove('winningStyles'), 300);
}

// Losing Condition - this handles what happens when the user clicks one of the choices where the value is them passed through as a parameter
function loses(user, computer) {
  computerScore++;
  // console.log('computer score is ' + computerScore + ' ' + computer);
  computerScore_span.innerHTML = computerScore;
  const userName = ' (user)'.fontsize(3).sup();
  const compName = ' (comp)'.fontsize(3).sup();
  result_div.innerHTML = `<p>${convertCase(computer)}${compName} beats ${convertCase(user)}${userName}. You lose!</p>`;
  const roundStatus = document.getElementById(user);
  roundStatus.classList.add('losingStyles');
  setTimeout(() => roundStatus.classList.remove('losingStyles'), 300);
}

// Draw Condition - this handles what happens when the user clicks one of the choices where the value is them passed through as a parameter
function draw(user, computer) {
	const userName = ' (user)'.fontsize(3).sup();
  const compName = ' (comp)'.fontsize(3).sup();
  result_div.innerHTML = `<p>It was a draw! You both chose ${convertCase(user)}</p>`;
  // "It was a draw! You both chose " + user + " " + computer; // old js
  const roundStatus = document.getElementById(user);
  roundStatus.classList.add('drawStyles');
  setTimeout(() => roundStatus.classList.remove('drawStyles'), 300);
}

// The core game functions that set up and determine the games actual logic aka paper beats rock etc
function game(userChoice) {
  const computerChoice = getComputerChoice();
  // console.log('Game function: user choice is = ' + userChoice);
  // console.log('Game function: computer choice is = ' + computerChoice);

  switch (userChoice + computerChoice) {
    case 'paperrock':
    case 'rockscissors':
    case 'scissorspaper':
      win(userChoice, computerChoice);
      // console.log("user wins");
      break;
    case 'rockpaper':
    case 'scissorsrock':
    case 'paperscissors':
      loses(userChoice, computerChoice);
      // console.log("computer wins");
      break;
    case 'rockrock':
    case 'scissorsscissors':
    case 'paperpaper':
      draw(userChoice, computerChoice);
      // console.log("draw");
      break;
  }
}

/* Listening events on table cells doesn't work. */
function showChessShadow(cell) {
  
  // if(document.querySelectorAll( ":hover" ))
  // console.log(document.querySelectorAll(":hover"));
  // if(document.querySelectorAll(":hover").length === 8){
  //   console.log(document.querySelectorAll(":hover")[6]);
  //   document.querySelectorAll(":hover")[6].innerHTML = "<img src=\"./image/grid_chess_shadow.png\">";
  // }
  // document.querySelectorAll(":hover")

  // console.log();
  console.log('inside' + cell.id);
  cell.innerHTML = "<img src=\"./image/grid_chess_shadow.png\">";
  
}

function showChessShadow_img(cell_img) {
  // console.log('inside' + cell_img.id);

  let x = cell_img.id.split('_')[0];
  let y = cell_img.id.split('_')[1];
  
  if(game_state[x][y] === 0){
    cell_img.src = "./image/grid_chess_shadow.png";
  }
}

function unshowChessShadow(cell) {
  console.log(cell.id);
  cell.innerHTML = "<img src=\"./image/grid.png\">";
}

function unshowChessShadow_img(cell_img) {
  // console.log('outside' + cell_img.id);

  let x = cell_img.id.split('_')[0];
  let y = cell_img.id.split('_')[1];
  
  if(game_state[x][y] === 0){
    cell_img.src = "./image/grid.png";
  }
}


function putChess_playerA(cell_img) {
  if(turn === 'A'){
    console.log(turn);
    console.log('Player A confirm chess position: ' + cell_img.id);
    cell_img.src = "./image/grid_chess_black.png";
    let x = cell_img.id.split('_')[0];
    let y = cell_img.id.split('_')[1];
    game_state[x][y] = 1;


    /* After we put down a chess, we no more want(and need) for the inside/outside event handler
    * This could be achieved by following two methods:
    * 1. Change `game_state` and check it everytime in inside/outside event handlers (inefficient!)
    * 2. removeEventListener
      (However, removeEventListener is not working for anonymous function)
    */
    cell_img.removeEventListener('mouseenter', () => showChessShadow_img(cell_img));    // Doesn't work!
    cell_img.removeEventListener('mouseout', () => unshowChessShadow_img(cell_img));

    // Switch to player B
    turn = 'B';
  }
}


function putChess_playerB(cell_img) {
  if(turn === 'B'){
    console.log(turn);
    console.log('Player B confirm chess position: ' + cell_img.id);
    cell_img.src = "./image/grid_chess_white.png";
    let x = cell_img.id.split('_')[0];
    let y = cell_img.id.split('_')[1];
    game_state[x][y] = 2;

    // Switch to player A
    turn = 'A';
  }

}


function putChess(cell_img) {
  let x = parseInt(cell_img.id.split('_')[0]);
  let y = parseInt(cell_img.id.split('_')[1]);

  if(turn === 'A'){
    if(isWinning(1, x, y)){
      window.alert("Player A wins!");
    }

    if(game_state[x][y] === 0){
      // console.log('Player A confirm chess position: ' + cell_img.id);
      game_state[x][y] = 1;     // Modify underlying data structure
      cell_img.src = "./image/grid_chess_black.png";    // Modify image
      turn = 'B';   // Switch turn
    } else {
      window.alert("Don't XIA put!");
    }
  }
  else{
    if(isWinning(2, x, y)){
      window.alert("Player B wins!");
    }

    if(game_state[x][y] === 0){
      game_state[x][y] = 2;
      // console.log('Player B confirm chess position: ' + cell_img.id);
      cell_img.src = "./image/grid_chess_white.png";
      turn = 'A';
    } else {
      window.alert("Don't XIA put!");
    }
  }
}


function isWinning(playerID, newX, newY){
  console.log("");
  let left = newY;  // 1.Check horizontal: go left/right as far as possible
  let right = newY;
  let up = newX;    // 2.Check vertical: go up/down as far as possible
  let down = newX;
  let nw_X = newX;  // 3. Check "\" (NW to SE)
  let nw_Y = newY;
  let se_X = newX;  
  let se_Y = newY;
  let ne_X = newX;  // 4. Check "/" 
  let ne_Y = newY;
  let sw_X = newX;  
  let sw_Y = newY;

  while(left-1 >= 0 && game_state[newX][left-1] === playerID){
    left--;
  }
  while(right+1 < N && game_state[newX][right+1] === playerID){
    right++;
  }
  if(right-left+1 >= 5) 
    return true;

  while(up-1 >= 0 && game_state[up-1][newY] === playerID){
    up--;
  }
  while(down+1 < N && game_state[down+1][newY] === playerID){
    down++;
  }
  if(down-up+1 >= 5)
    return true;

  while(nw_X-1 >=0 && nw_Y-1 >=0 && game_state[nw_X-1][nw_Y-1] === playerID){
    nw_X--;
    nw_Y--;
  }
  while(se_X+1 <N && se_Y+1 < N && game_state[se_X+1][se_Y+1] === playerID){
    se_X++;
    se_Y++;
  }
  if(se_X-nw_X+1 >= 5)
    return true;

  
  while(sw_X+1 < N && sw_Y-1 >=0 && game_state[sw_X+1][sw_Y-1] === playerID){
    sw_X++;
    sw_Y--;
  }
  while(ne_X-1 >= 0 && ne_Y+1 < N && game_state[ne_X-1][ne_Y+1] === playerID){
    ne_X--;
    ne_Y++;
  }
  if(sw_X-ne_X+1 >= 5)
    return true;

  return false;
}


function createGameBoard() {        // Dynamically create a table, see: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
  // get the reference for the gameBoard placeholder
  var gameboard = document.getElementById("gameboard");
  
  // creates <table> and <tbody> elements
  mytable = document.createElement("table");
  mytable.id = "mtable";
  mytablebody = document.createElement("tbody");

  // creating all cells
  for(var j = 0; j < N; j++) {
      // creates a <tr> element
      mycurrent_row = document.createElement("tr");
      mycurrent_row.setAttribute("class", "row")

      for(var i = 0; i < N; i++) {
          // creates a <td> element
          mycurrent_cell = document.createElement("td");
          mycurrent_cell.id = j + "_" + i;
          mycurrent_cell.setAttribute("class", "cell")

          // creates a Text Node
          // currenttext = document.createTextNode("[" + j + "," + i + "]");
          img = document.createElement('img');
          img.id = j + "_" + i + "_img";
          img.src = "./image/grid.png";
          img.setAttribute("class", "cell_img");
          

          mycurrent_cell.appendChild(img)
          // appends the Text Node we created into the cell <td>
          // mycurrent_cell.appendChild(currenttext);
          // appends the cell <td> into the row <tr>
          mycurrent_row.appendChild(mycurrent_cell);
      }
      // appends the row <tr> into <tbody>
      mytablebody.appendChild(mycurrent_row);
  }

  // appends <tbody> into <table>
  mytable.appendChild(mytablebody);
  // appends <table> into <body>
  gameboard.appendChild(mytable);
  // sets the border attribute of mytable to 2;
  // mytable.setAttribute("border","2");


  test.appendChild(document.createElement("div"));
  
}


// ES6 style of writing this function
// This function creates and adds an eventlistener to the rock, paper scissors html element and the passes the value of that element to the game function
function main() {
  // rock_div.addEventListener('click', () => game('rock'));

  createGameBoard();

  /* Listening events on table cells doesn't work. Result in multiple event detected */
  console.log(mytable.querySelectorAll(".cell")[0]);
  console.log(mytable.querySelectorAll(".cell_img")[0]);
  mytable.querySelectorAll(".cell_img").forEach(cell_img => {
    // console.log(cell_img);
    cell_img.addEventListener('mouseenter', () => showChessShadow_img(cell_img));
    cell_img.addEventListener('mouseout', () => unshowChessShadow_img(cell_img));
    // cell_img.addEventListener('click', () => putChess_playerA(cell_img));    // Doesn't work, since both would be called!
    // cell_img.addEventListener('click', () => putChess_playerB(cell_img));
    cell_img.addEventListener('click', () => putChess(cell_img));
  });

  console.log(N);
  console.log(N+1);
}



// document.body.onload = createGameBoard;
main();
