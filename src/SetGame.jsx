
import Square from "./Square/Square";
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  let randomNumbers = [];
  while (randomNumbers.length < 3) {
    console.log("fun Called")
    let randomNumber = getRandomInt(1, 25);
    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber);
    }
  }
 
function SetGame({setScore, gameOver, setGameOver, clickable}){
    let items = [];
    for (let index = 1; index < 26; index++) {
        if(randomNumbers.includes(index))
          {
            items.push(<Square setScore={setScore} gameOver={gameOver} setGameOver={setGameOver} mine={true} key={index} clickable={clickable}/>);
          } else {
            items.push(<Square setScore={setScore} gameOver={gameOver} setGameOver={setGameOver} key={index} clickable={clickable}/>);
          }
    }
    
    return(
        <>{items}</>
    )
}

export default SetGame;