const cardArray = [
  {
    name: "grape",
    icon: "🍇",
  },
  {
    name: "Redapple",
    icon: "🍎",
  },
  {
    name: "Greenapple",
    icon: "🍏",
  },
  {
    name: "unicorn",
    icon: "🦄",
  },
  {
    name: "alien",
    icon: "👽",
  },
  {
    name: "cat",
    icon: "🐈‍⬛",
  },
  {
    name: "dolphin",
    icon: "🐬",
  },
  {
    name: "elephant",
    icon: "🐘",
  },
  {
    name: "parrot",
    icon: "🦜",
  },
  {
    name: "burger",
    icon: "🍔",
  },
  {
    name: "butterfly",
    icon: "🦋",
  },
  {
    name: "sunflower",
    icon: "🌻",
  },
  {
    name: "grape",
    icon: "🍇",
  },
  {
    name: "Redapple",
    icon: "🍎",
  },
  {
    name: "Greenapple",
    icon: "🍏",
  },
  {
    name: "unicorn",
    icon: "🦄",
  },
  {
    name: "alien",
    icon: "👽",
  },
  {
    name: "cat",
    icon: "🐈‍⬛",
  },
  {
    name: "dolphin",
    icon: "🐬",
  },
  {
    name: "elephant",
    icon: "🐘",
  },
  {
    name: "parrot",
    icon: "🦜",
  },
  {
    name: "burger",
    icon: "🍔",
  },
  {
    name: "butterfly",
    icon: "🦋",
  },
  {
    name: "sunflower",
    icon: "🌻",
  },
];

const timer = document.querySelector(".timer");
const display = document.querySelector("#time");
const play = document.querySelector(".play");
const pause = document.querySelector(".pause");
const restart = document.querySelector(".restart");
let state;
let gameStarted = false;
let t = 80;
function start() {
  gameStarted = true;
  restart.style.display = "none";
  play.style.display = "none";
  pause.style.display = "block";
  display.style.color = "black";
  display.classList.remove("alarm");
  display.classList.remove("size");
  if (!state) {
    state = setInterval(function () {
      display.textContent = t + "s";
      t--;
      if (t < 0 || t <= 10) {
        display.style.color = "red";
        display.setAttribute("class", "alarm");
      }
      if (t < 0) {
        clearInterval(state);
        state = null;
        t = 80;
        display.classList.add("size");
        display.style.color = "red";
        display.textContent = "Times Up!";
        display.style.backgroundColor = "transparent";
        pause.style.display = "none";
        play.style.display = "none";
        restart.style.display = "block";
        gameStarted = false;
        matchedCards = 0;
        setTimeout(() => {
          alert("You lost try again 😟");
        }, 1000);
      }
    }, 1000);
  }
}

function pauseTime() {
  clearInterval(state);
  state = null;
  restart.style.display = "none";
  pause.style.display = "none";
  play.style.display = "block";
  display.style.color = "black";
  display.classList.remove("alarm");
  gameStarted = false;
}

function reset() {
  display.textContent = "Timer";
  setTimeout(start(), 1000);
  game.innerHTML = "";
  game.setAttribute("class", "game");
  let matchedCards = 0;
  let flippedCards = [];
  shuffle();
  displayCards();
}

let matchedCards = 0;
let flippedCards = [];
const game = document.querySelector(".game");
shuffle();
displayCards();

//shuffle cards
function shuffle() {
  for (let i = cardArray.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [cardArray[i], cardArray[randomIndex]] = [
      cardArray[randomIndex],
      cardArray[i],
    ];
  }
}

//display cards
function displayCards() {
  cardArray.forEach((card, index) => {
    let gameCards = `<div class="card-container">
            <div class="card" id="${index}">
                <div class="card-front">
                </div>
                <div class="card-back">${card.icon}
                </div>
            </div>
        </div>`;
    game.insertAdjacentHTML("beforeend", gameCards);
  });
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", function () {
      if (!gameStarted) {
        alert("start timer to play the game");
        return;
      }
      if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.toggle("flipped");
        flipcard(this);
      }
    });
  });
}

//flippedcards
function flipcard(card) {
  if (flippedCards.length < 2) {
    let cardId = card.getAttribute("id");
    flippedCards.push(cardId);
    if (flippedCards.length == 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

//findmatch
function checkMatch() {
  let card1 = flippedCards[0];
  let card2 = flippedCards[1];
  let c1 = document.getElementById(card1);
  let c2 = document.getElementById(card2);
  if (cardArray[card1].name === cardArray[card2].name) {
    c1.style.visibility = "hidden";
    c2.style.visibility = "hidden";
    matchedCards++;
    win();
  } else {
    c1.classList.remove("flipped");
    c2.classList.remove("flipped");
  }
  flippedCards = [];
}
function pauseTimeWon() {
  clearInterval(state);
  state = null;
  restart.style.display = "none";
  pause.style.display = "none";
  play.style.display = "none";
  display.style.color = "black";
  display.classList.remove("alarm");
  gameStarted = false;
}

function win() {
  if (matchedCards == cardArray.length / 2) {
    pauseTimeWon();
    game.innerHTML =
      '<h1>You Won🏆</h1><br><button class="play-again">Play Again</button>';
    game.setAttribute("class", "msg");
    document
      .querySelector(".play-again")
      .addEventListener("click", function () {
        location.reload();
      });
  }
}
