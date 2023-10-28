var randomNumber1 = Math.floor((Math.random()*6))+1;
var randomNumber2 = Math.floor((Math.random()*6))+1;

function setDice(randomNumber,img){

    if(randomNumber===1){
        document.querySelector(img).src = "images/dice1.png";
    }
    
    else if(randomNumber===2){
        document.querySelector(img).src = "images/dice2.png";
    }
    
    else if(randomNumber===3){
        document.querySelector(img).src = "images/dice3.png";
    }
    
    else if(randomNumber===4){
        document.querySelector(img).src = "images/dice4.png";
    }
    
    else if(randomNumber===5){
        document.querySelector(img).src = "images/dice5.png";
    }
    
    else if(randomNumber===6){
        document.querySelector(img).src = "images/dice6.png";
    }

    /*Or we can Just do
    document.querySelector(img).src = "images/dice" + randomNumber + "png";
    */

}

function setWinner(rn1,rn2){
    if(rn1>rn2){
        document.querySelector("h1").innerText = "Player1 Wins!!! 🤟🥂";
    }

    else if(rn2>rn1){
        document.querySelector("h1").innerHTML = "Player2 Wins!!! 🤟🥂";
    }

    else{
        document.querySelector("h1").innerHTML = "Draw Game 🙂";
    }
}

setDice(randomNumber1,".img1");
setDice(randomNumber2,".img2");

setWinner(randomNumber1,randomNumber2);
