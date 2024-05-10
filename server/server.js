const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5001;

// Combined the player guesses and results into one array rather than two
// const playerGuesses = [
// {
//   playerOneGuess: 2,
//   playerTwoGuess: 1,
//   playerThreeGuess: 3,
// },
// ];

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }));

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));
app.use(express.json({ extended: true }));

// GET & POST Routes go here

//
// app.get("/guesses", (req, res) => {
//   console.log(randomNumber);
//   res.send(playerGuesses);
// });

// Array to log guesses and results
const gameResult = [];
// Global variable to count the number of rounds
let roundNumber = 0;
// Random Number Generator
let randomNumber = Math.floor(Math.random() * 25) + 1;

function compareNumbers(guess) {
  let playerOneResult;
  let playerTwoResult;
  let playerThreeResult;

  if (guess.playerOneGuess < randomNumber) {
    playerOneResult = `is too low!`;
  } else if (guess.playerOneGuess > randomNumber) {
    playerOneResult = `is too high!`;
  } else if (guess.playerOneGuess === randomNumber) {
    playerOneResult = `is a winner!`;
    console.log(randomNumber);
  }
  if (guess.playerTwoGuess < randomNumber) {
    playerTwoResult = `is too low!`;
  } else if (guess.playerTwoGuess > randomNumber) {
    playerTwoResult = `is too high!`;
  } else if (guess.playerTwoGuess === randomNumber) {
    playerTwoResult = `is a winner!`;
    // randomNumber = Math.floor(Math.random() * 25) + 1;
    console.log(randomNumber);
  }
  if (guess.playerThreeGuess < randomNumber) {
    playerThreeResult = `is too low!`;
  } else if (guess.playerThreeGuess > randomNumber) {
    playerThreeResult = `is too high!`;
  } else if (guess.playerThreeGuess === randomNumber) {
    playerThreeResult = `is a winner!`;
    // randomNumber = Math.floor(Math.random() * 25) + 1;
    console.log(randomNumber);
  }
  roundNumber++;

  gameResult.push({
    playerOneGuess: guess.playerOneGuess,
    playerTwoGuess: guess.playerTwoGuess,
    playerThreeGuess: guess.playerThreeGuess,
    playerOneResult: playerOneResult,
    playerTwoResult: playerTwoResult,
    playerThreeResult: playerThreeResult,
    round: roundNumber,
  });
  console.log(gameResult);
  // }
  return gameResult;
}

// Moved reset into the app.delete function and combined it to just one button to do both resetting the game and generating a new number.
// app.post("/reset", (req,res) => {
//   randomNumber = Math.floor(Math.random() * 25) + 1;
//   console.log(randomNumber);
// })

app.post('/guesses', (req, res) => {
  const guesses = req.body;
  console.log(guesses);
  if (
    !guesses.playerOneGuess ||
    !guesses.playerTwoGuess ||
    !guesses.playerThreeGuess
  ) {
    res.status(400).send({ error: 'Guess keys must be filled in' });
    return;
  }
  console.log(`Adding new guesses`, guesses);
  compareNumbers(guesses);
  res.status(201).send(guesses);
});

app.get('/results', (req, res) => {
  console.log(randomNumber);
  console.log(gameResult);
  res.send(gameResult);
});

app.delete('/results', (req, res) => {
  randomNumber = Math.floor(Math.random() * 25) + 1;
  roundNumber = 0;
  console.log('Delete request called');
  gameResult.length = 0;
  res.status(200).send(gameResult);
});

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
