- random number generator
- route to send our guesses
    -function name is sendGuessesClient(event)
- route to send our guesses back
  - should return if our guesses were too high, too low, or correct
  - past guesses should append to a history list below
- route to send our result
- Need a restart button to tell server to select a new random number (POST)

- inputs named playerOneInput, playerTwoInput, playerThreeInput
  -Add required to inputs
- Total guesses made indicator

- routes named
    - '/randomNumber' gives us the random number: GET
    - '/guesses' sends the server our guesses via the inputs: POST
    - '/guesses' retrieves our guesses from the server and displays them: GET
    - '/randomNumber' gives us a new number when guessed: POST

restartButton