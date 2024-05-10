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

const gameResult = [];

let randomNumber = Math.floor(Math.random() * 25) + 1;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }));

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static("server/public"));
app.use(express.json({ extended: true }));

// GET & POST Routes go here

app.get("/guesses", (req, res) => {
  console.log(randomNumber);
  res.send(playerGuesses);
});

// turns out, we did need a separate function and array for the game results. we're lucky we stopped
// when we did or we would've dug a hole too deep to climb out of LOL
// anyways, what the function below is doing is checking every input to see where they
// stand in comparison to our random number.

// at the end, it returns the object of game results, which ive tested and made sure that
// the right information is stored in the game results array (check the terminal when you submit inputs to confirm)
// now we just need to get this info to the front end, maybe with a get request?

function compareNumbers(guesses) {
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
      randomNumber = Math.floor(Math.random() * 25) + 1;
      console.log(randomNumber)

    }

    if (guess.playerTwoGuess < randomNumber) {
      playerTwoResult = `player 2's guess too low!`;
    } else if (guess.playerTwoGuess > randomNumber) {
      playerTwoResult = `player 2's guess too high!`;
    } else if (guess.playerTwoGuess === randomNumber) {
      playerTwoResult = `player 2 is a winner!`;
      randomNumber = Math.floor(Math.random() * 25) + 1;
      console.log(randomNumber)
    }

    if (guess.playerThreeGuess < randomNumber) {
      playerThreeResult = `player 3's guess is too low!`;
    } else if (guess.playerThreeGuess > randomNumber) {
      playerThreeResult = `player 3's guess is too high!`;
    } else if (guess.playerThreeGuess === randomNumber) {
      playerThreeResult = `player 3 is a winner!`;
      randomNumber = Math.floor(Math.random() * 25) + 1;
      console.log(randomNumber)
    }
    gameResult.push({
      playerOneResult: playerOneResult,
      playerTwoResult: playerTwoResult,
      playerThreeResult: playerThreeResult,
    });
    console.log(gameResult);
  }
  return gameResult;
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
  console.log(gameResult);
  res.status(201).send({ guesses, gameResult });
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
