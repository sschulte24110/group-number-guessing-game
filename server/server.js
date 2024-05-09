const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 5001;

const playerGuesses = [
  {
    playerOneGuess: 2,
    playerTwoGuess: 1,
    playerThreeGuess: 3

  }
]

// let playerArray = [
//   {
//     playerOneGuess: Number(guess),
//     playerOneresult: 'Too High',
//     playerTwoGuess: Number(guess),
//     playerTwoResult: 'Correct',
//     playerThreeGuess: Number(guess),
//     playerThreeGuess: 'Too Low'
//     }
    
// ]

let randomNumber = Math.floor(Math.random()*26)+1;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));
app.use(express.json({extended: true}));

// GET & POST Routes go here


// - '/guesses' sends the server our guesses via the inputs: POST
// - '/guesses' retrieves our guesses from the server and displays them: GET
// - '/randomNumber' gives us a new number when guessed: POST


app.get('/guesses', (req, res) => {
  res.send(playerGuesses);
})

app.post('/guesses', (req, res) => {
  const guesses = req.body;
  console.log(guesses);
  if(!guesses.playerOneGuess || !guesses.playerTwoGuess || !guesses.playerThreeGuess){
    res.status(400).send({error: 'Guess keys must be filled in'})
    return;
  }

  console.log(`Adding new guesses`, guesses)
  playerGuesses.push(guesses);

  res.status(201).send(guesses);
  
})

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})
