window.addEventListener('DOMContentLoaded', function() {
  // Execute after page load
})

var suits = ['clubs', 'diamonds', 'hearts', 'spades'];
var deck = [];
var playerHand = document.querySelector('#player-hand');
var dealerHand = document.querySelector('#dealer-hand');
var dealerHandPoints = document.querySelector('#dealer-points');
var playerHandPoints = document.querySelector('#player-points');
var deal = document.querySelector('#deal-button');
var hit = document.querySelector('#hit-button');
var stand = document.querySelector('#stand-button');
var playAgain = document.querySelector('#again-button');
var names = document.querySelectorAll('.player-name2');
var playerScoreShown = document.querySelector('.player-score-shown')
var dealerScoreShown = document.querySelector('.dealer-score-shown')
var cardsLeft = document.querySelector('.cards-left-shown')
// var initialPlayerHand = document.createElement('img');
// var initialDealerHand = document.createElement('img');
var dealerHandList = [];
var playerHandList = [];
var playerPoints = 0;
var dealerPoints = 0;
var playerScore = 0;
var dealerScore = 0;
var cardAmount = 52;


function buildDeck() {
  for (var i = 0; i < suits.length; i++) {
    for (var j = 1; j < 14; j++) {
      var card = {};
      card.rank = j
      card.suit = suits[i]
      card.img = `images/${j}_of_${suits[i]}.png`
      deck.push(card)
    }
  }
}


function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}


function dealDeck(){
  let playerCard1 = deck.pop();
  let playerCard2 = deck.pop();
  playerHandList.push(playerCard1);
  playerHandList.push(playerCard2);

  let dealerCard1 = deck.pop();
  let dealerCard2 = deck.pop();
  dealerHandList.push(dealerCard1);
  dealerHandList.push(dealerCard2);

  for(i=0 ; i < playerHandList.length ; i++){
    let initialPlayerHand = document.createElement('img');
    initialPlayerHand.src = playerHandList[i].img;
    playerHand.appendChild(initialPlayerHand);
  }

  for(i=0 ; i < dealerHandList.length ; i++){
    let initialDealerHand = document.createElement('img');
    initialDealerHand.src = dealerHandList[i].img;
    dealerHand.appendChild(initialDealerHand);
  }

  cardAmount -= 4;
  cardsLeft.innerHTML = cardAmount

}


function hitPlayer() {
  playerPoints = 0;
  let playerCard = deck.pop();
  playerHandList.push(playerCard);

  let playerHitCard = document.createElement('img');
  playerHitCard.src = playerHandList[playerHandList.length - 1].img
  playerHand.appendChild(playerHitCard);

  cardAmount -= 1;
  cardsLeft.innerHTML = cardAmount;
}


function hitDealer() {
  dealerPoints = 0;
  let dealerCard = deck.pop();
  dealerHandList.push(dealerCard);

  let dealerHitCard = document.createElement('img');
  dealerHitCard.src = dealerHandList[dealerHandList.length - 1].img
  dealerHand.appendChild(dealerHitCard);

  cardAmount -= 1;
  cardsLeft.innerHTML = cardAmount;
  
}


function calculatePlayerPoints() {
  playerHandList.sort(function(a, b){
    return b.rank - a.rank;
  })
  for (var i = 0; i < playerHandList.length; i++) {
    if (playerHandList[i].rank === 1) {
      if (playerPoints < 11) {
        playerPoints += 11;
      } else {
        playerPoints += 1;
      }
    } else if (playerHandList[i].rank > 1 && playerHandList[i].rank < 11) {
      playerPoints += playerHandList[i].rank;
    } else {
      playerPoints += 10;
    }
  }
  playerHandPoints.innerHTML = playerPoints.toString();

  let message = document.querySelector('.message');
  if (playerPoints > 21) {
    message.textContent = "You Busted! Dealer Wins!"
    hit.setAttribute('class', 'none');
    stand.setAttribute('class', 'none');
    playAgain.setAttribute('class', '');
    dealerScore++;
    gameOver();
  } 
} 


function calculateDealerPoints() {
  dealerHandList.sort(function(a, b){
    return b.rank - a.rank;
  })
  for (var i = 0; i < dealerHandList.length; i++) {
    if (dealerHandList[i].rank === 1) {
      if (dealerPoints < 11) {
        dealerPoints += 11;
      } else {
        dealerPoints += 1;
      }
    } else if (dealerHandList[i].rank > 1 && dealerHandList[i].rank < 11) {
      dealerPoints += dealerHandList[i].rank;
    } else {
      dealerPoints += 10;
    }
  }
  dealerHandPoints.innerHTML = dealerPoints.toString();

  let message = document.querySelector('.message');
  if (dealerPoints > 21) {
    message.textContent = "Dealer Busted! You Win!";
    hit.setAttribute('class', 'none');
    stand.setAttribute('class', 'none');
    playAgain.setAttribute('class', '');
    playerScore++;
    gameOver();
  }
} 

function updateScore() {
  playerScoreShown.textContent = playerScore;
  dealerScoreShown.textContent = dealerScore;
}

function clearCards() {
  playerHandList = [];
  playerHand.innerHTML = "";

  dealerHandList = [];
  dealerHand.innerHTML = "";
}

function gameOver() {
  let message = document.querySelector('.message');
  if (cardAmount === 0 || cardAmount < 4) {
    if (playerScore > dealerScore) {
      message.innerHTML = "GAME OVER! YOU BEAT THE DEALER!";
      hit.setAttribute('class', 'none');
      stand.setAttribute('class', 'none');
      playAgain.setAttribute('class', 'none');
      deal.setAttribute('class', 'none');
    } else if (dealerScore > playerScore) {
      message.innerHTML = "GAME OVER! DEALER BEAT YOU!";
      hit.setAttribute('class', 'none');
      stand.setAttribute('class', 'none');
      playAgain.setAttribute('class', 'none');
      deal.setAttribute('class', 'none');
    } else {
      message.innerHTML = "YOU TIED WITH THE DEALER!";
      hit.setAttribute('class', 'none');
      stand.setAttribute('class', 'none');
      playAgain.setAttribute('class', 'none');
      deal.setAttribute('class', 'none');
    }
  }
}






buildDeck();
shuffleArray(deck);

hit.setAttribute('class', 'none');
stand.setAttribute('class', 'none');
playAgain.setAttribute('class', 'none');
names[0].setAttribute('class', 'none player-name2');
names[1].setAttribute('class', 'none player-name2');
cardsLeft.innerHTML = cardAmount;





deal.addEventListener('click', ()=>{
  let message = document.querySelector('.message');
  message.textContent = "";
  hit.setAttribute('class', '');
  stand.setAttribute('class', '');
  names[0].setAttribute('class', 'player-name2');
  names[1].setAttribute('class', 'player-name2');
  
  dealDeck();
  calculatePlayerPoints();
  calculateDealerPoints();

  deal.setAttribute('class', 'none');
  
})


hit.addEventListener('click', ()=>{
  hitPlayer();
  calculatePlayerPoints();
  updateScore();
  gameOver();

})


stand.addEventListener('click', ()=>{
  let message = document.querySelector('.message');

  while (dealerPoints < 18 || dealerPoints <= playerPoints) {
    hitDealer();
    calculateDealerPoints();
  }
  
  if (dealerPoints < playerPoints && dealerPoints < 22) {
    message.textContent = "You Win!";
    playerScore++
  } else if (dealerPoints > playerPoints && dealerPoints < 22) {
    message.textContent = "Dealer Wins!";
    dealerScore++
  } else if (dealerPoints === 21 && playerPoints === 21) {
    message.textContent = "Draw!";
  }
  
  
  gameOver();
  updateScore();

  hit.setAttribute('class', 'none');
  stand.setAttribute('class', 'none');
  playAgain.setAttribute('class', '');


})

playAgain.addEventListener('click', ()=>{
  // updateScore();

  dealerPoints = 0;
  playerPoints = 0;

  
  hit.setAttribute('class', '');
  stand.setAttribute('class', '');
  playAgain.setAttribute('class', 'none');

  let message = document.querySelector('.message');
  message.innerHTML = "";

  
  clearCards();

  dealDeck();
  calculatePlayerPoints();
  calculateDealerPoints();

})