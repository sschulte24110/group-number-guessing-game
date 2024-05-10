const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5001;

const playerGuesses = [
  {
    playerOneGuess: 2,
    playerTwoGuess: 1,
    playerThreeGuess: 3,
  },
];

let randomNumber = Math.floor(Math.random() * 25) + 1;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }));

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static("server/public"));
app.use(express.json({ extended: true }));

// GET & POST Routes go here

// - '/guesses' sends the server our guesses via the inputs: POST
// - '/guesses' retrieves our guesses from the server and displays them: GET
// - '/randomNumber' gives us a new number when guessed: POST

app.get("/guesses", (req, res) => {
  console.log(randomNumber);
  res.send(playerGuesses);
});

function compareNumbers(guesses) {
  let result = [];
  let playerOneResult;
  let playerTwoResult;
  let playerThreeResult;

  for (let guess of guesses) {
    if (guess.playerOneGuess < randomNumber) {
      playerOneResult = `player 1's guess is too low!`;
    } else if (guess.playerOneGuess > randomNumber) {
      playerOneResult = `player 1's guess is too high!`;
    } else if (guess.playerOneGuess === randomNumber) {
      playerOneResult = `player 1 is a winner!`;
    }

    if (guess.playerTwoGuess < randomNumber) {
      playerTwoResult = `player 2's guess too low!`;
    } else if (guess.playerTwoGuess > randomNumber) {
      playerTwoResult = `player 2's guess too high!`;
    } else if (guess.playerTwoGuess === randomNumber) {
      playerTwoResult = `player 2 is a winner!`;
    }

    if (guess.playerThreeGuess < randomNumber) {
      playerThreeResult = `player 3's guess is too low!`;
    } else if (guess.playerThreeGuess > randomNumber) {
      playerThreeResult = `player 3's guess is too high!`;
    } else if (guess.playerThreeGuess === randomNumber) {
      playerThreeResult = `player 3 is a winner!`;
    }
    result.push({
      playerOneResult: playerOneResult,
      playerTwoResult: playerTwoResult,
      playerThreeResult: playerThreeResult,
    });
    console.log(result);
  }
  return result;
}

app.post("/guesses", (req, res) => {
  const guesses = req.body;
  console.log(guesses);
  if (
    !guesses.playerOneGuess ||
    !guesses.playerTwoGuess ||
    !guesses.playerThreeGuess
  ) {
    res.status(400).send({ error: "Guess keys must be filled in" });
    return;
  }

  console.log(`Adding new guesses`, guesses);
  playerGuesses.push(guesses);

  compareNumbers([guesses]);
  res.status(201).send(guesses);
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
