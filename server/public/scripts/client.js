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
    url: "/guesses",
  }).then(function (response) {
    historyDiv.innerHTML = "";
    let guesses = response.data;
    console.log(guesses);
    for (let players of guesses) {
      historyDiv.innerHTML += `<tr>
      <td>${players.playerOneGuess}</td>
      <td>${players.playerTwoGuess}</td>
      <td>${players.playerThreeGuess}</td>
      </tr>`;
    }
  });
}

onReady();
