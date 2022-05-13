node ./resources/setUp.js

gameStatus=$( cat ./resources/data.json | grep 'isGameOver' | grep 'false' )

while [[ $gameStatus ]]
do
  read -p "Enter your 5 letter guess: " guess
  node wordle.js $guess
  gameStatus=$( cat ./resources/data.json | grep 'isGameOver' | grep 'false' )
done
