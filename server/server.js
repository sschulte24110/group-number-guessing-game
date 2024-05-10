const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5001;

const playerGuesses = [
  // {
  //   playerOneGuess: 2,
  //   playerTwoGuess: 1,
  //   playerThreeGuess: 3,
  // },
];

const gameResult = [];

let randomNumber = Math.floor(Math.random() * 25) + 1;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }));

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static("server/public"));
app.use(express.json({ extended: true }));

// GET & POST Routes go here

// app.get("/guesses", (req, res) => {
//   console.log(randomNumber);
//   res.send(playerGuesses);
// });

// turns out, we did need a separate function and array for the game results. we're lucky we stopped
// when we did or we would've dug a hole too deep to climb out of LOL
// anyways, what the function below is doing is checking every input to see where they
// stand in comparison to our random number.

// at the end, it returns the object of game results, which ive tested and made sure that
// the right information is stored in the game results array (check the terminal when you submit inputs to confirm)
// now we just need to get this info to the front end, maybe with a get request?
let roundNumber = 0;
function compareNumbers(guess) {

  let playerOneResult;
  let playerTwoResult;
  let playerThreeResult;

  // for (let guess of guesses) {
    if (guess.playerOneGuess < randomNumber) {
      playerOneResult = `is too low!`;
    } else if (guess.playerOneGuess > randomNumber) {
      playerOneResult = `is too high!`;
    } else if (guess.playerOneGuess === randomNumber) {
      playerOneResult = `is a winner!`;
      // randomNumber = Math.floor(Math.random() * 25) + 1;
      console.log(randomNumber)

    }

    if (guess.playerTwoGuess < randomNumber) {
      playerTwoResult = `is too low!`;
    } else if (guess.playerTwoGuess > randomNumber) {
      playerTwoResult = `is too high!`;
    } else if (guess.playerTwoGuess === randomNumber) {
      playerTwoResult = `is a winner!`;
      // randomNumber = Math.floor(Math.random() * 25) + 1;
      console.log(randomNumber)
    }

    if (guess.playerThreeGuess < randomNumber) {
      playerThreeResult = `is too low!`;
    } else if (guess.playerThreeGuess > randomNumber) {
      playerThreeResult = `is too high!`;
    } else if (guess.playerThreeGuess === randomNumber) {
      playerThreeResult = `is a winner!`;
      // randomNumber = Math.floor(Math.random() * 25) + 1;
      console.log(randomNumber)
    }
    roundNumber++;
    
    gameResult.push({
      playerOneGuess: guess.playerOneGuess,
      playerTwoGuess: guess.playerTwoGuess,
      playerThreeGuess: guess.playerThreeGuess,
      playerOneResult: playerOneResult,
      playerTwoResult: playerTwoResult,
      playerThreeResult: playerThreeResult,
      round: roundNumber
    });
    console.log(gameResult);
  // }
  return gameResult;
}
 
app.post("/reset", (req,res) => {
  randomNumber = Math.floor(Math.random() * 25) + 1;
  console.log(randomNumber);
})


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
  // playerGuesses.push(guesses);

  compareNumbers(guesses);
  res.status(201).send(guesses);
});

app.get('/results', (req,res) => {
  console.log(randomNumber);
  console.log(gameResult);
  res.send(gameResult);
})

app.delete("/results", (req, res) => {
  roundNumber = 0;
  console.log('Delete request called');
  gameResult.length = 0
  res.status(200).send(gameResult);
})

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
