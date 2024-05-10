function onReady() {
  console.log("JavaScript is loaded!");
  renderGuessHistory();
}
const historyDiv = document.getElementById("tbody");

function sendGuesses(event) {
  event.preventDefault();

  const playerOneGuess = document.getElementById("player-one-guess").value;
  const playerTwoGuess = document.getElementById("player-two-guess").value;
  const playerThreeGuess = document.getElementById("player-three-guess").value;

  axios({
    method: "post",
    url: `/guesses`,
    data: {
      playerOneGuess: Number(playerOneGuess),
      playerTwoGuess: Number(playerTwoGuess),
      playerThreeGuess: Number(playerThreeGuess),
    },
  })
    .then(function (response) {
      console.log("SUCCESS");
      renderGuessHistory();

      document.getElementById("player-one-guess").value = "";
      document.getElementById("player-two-guess").value = "";
      document.getElementById("player-three-guess").value = "";
    })
    .catch(function (response) {
      alert("request failed");
      console.log(error);
    });
}

function renderGuessHistory() {
  axios({
    method: "GET",
    url: "/results",
  }).then(function (response) {
    historyDiv.innerHTML = "";
    let guesses = response.data;
    console.log(guesses);
    for (let players of guesses) {
      historyDiv.innerHTML += `<tr>
      <td>${players.playerOneGuess}</td>
      <td>${players.playerOneResult}</td>
      <td>${players.playerTwoGuess}</td>
      <td>${players.playerTwoResult}</td>
      <td>${players.playerThreeGuess}</td>
      <td>${players.playerThreeResult}</td>
      <td>${players.round}</td>
      </tr>`;
    }
  });
}

// function renderResultsHistory () {
//   let playerOneResultTD = document.getElementsByClassName("playerOneResults")
//   let playerTwoResultTD = document.getElementsByClassName("playerTwoResults")
//   let playerThreeResultTD = document.getElementsByClassName("playerThreeResults")
//   // console.log('PlayerOneResultTD', playerOneResultTD)
//   // console.log('playerTwoResultTD', playerTwoResultTD);
//   // console.log('playerThreeResultTD', playerThreeResultTD);
//   axios ({
//     method: "GET",
//     url: "/results"
//   }).then (function (response) {
    
//     historyDiv.innerHTML = "";
//     let results = response.data;
//     console.log('Results', results);
//     for (let result of results){

//     playerOneResultTD.innerText = (result.playerOneResult);
//     playerTwoResultTD.innerText = (result.playerTwoResult);
//     playerThreeResultTD.innerText = (result.playerThreeResult);
    
//     }
//     // historyDiv.innerHTML += `
//     // <tr>
//     //   <td>${result.playerOneResult}</td>
//     //   <td>${result.playerTwoResult}</td>
//     //   <td>${result.playerThreeResult}</td>
//     // <tr>  
//     // `
//   })
// }


// renderResultsHistory();


onReady();
