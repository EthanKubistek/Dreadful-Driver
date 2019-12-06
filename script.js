
/* story 1 seeing car and obstacles on the road*/
const mileadge = document.querySelector(".mileadge");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
const deathScreen = document.querySelector(".deathScreen");

const button = document.querySelector("Button")
button.addEventListener("click",start);



let player = {
  speed: 4
  , potholeSpeed: 2
};
let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);
function moveLines() {
      let lines = document.querySelectorAll(".line");
      lines.forEach(function (item) {
      if (item.y >= 1000) {
          item.y -= 1000;
      }
      item.y += player.speed;
      item.style.top = item.y + "px";
      })
      let lines2 = document.querySelectorAll(".line2");
      lines2.forEach(function (item) {
      if (item.y >= 1000) {
          item.y -= 1000;
      }
      item.y += player.speed;
      item.style.top = item.y + "px";
    });
  }

  function movePotholes() {
        let potholes = document.querySelectorAll(".potholes");
        potholes.forEach(function (item) {
        if (item.y >= 2000) {
            item.y -= 2000;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
      });
  }


function playGame() {
    let car = document.querySelector(".car");
    moveLines();
    movePotholes();
    let road = gameArea.getBoundingClientRect();
    if(player.start) {
        if (keys.ArrowUp && player.y > road.top){
          player.y -= player.speed;
        } if (keys.ArrowDown && player.y < 800){
          player.y += player.speed;
        } if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        } if (keys.ArrowRight && player.x < 565){
            player.x += player.speed;
    }
        car.style.left = player.x + "px";
        car.style.top = player.y + "px";
        window.requestAnimationFrame(playGame);
    }
}

function pressOn(e) {
    e.preventDefault();
    keys[e.key] = true;
}


function pressOff(e) {
    e.preventDefault();
    keys[e.key] = false;
}

function start(){
  startScreen.classList.add("hide");
  gameArea.classList.remove("hide");
  player.start=true;
  for(let x=0; x<7; x++){
    let div = document.createElement('div');
    div.classList.add("line");
    div.y= x*150;
    div.style.top = (x*150) + "px";
    gameArea.appendChild(div);
  }
  for(let x=0; x<7; x++){
    let div = document.createElement('div');
    div.classList.add("line2");
    div.y= x*150;
    div.style.top = (x*150) + "px";
    gameArea.appendChild(div);
  }
  window.requestAnimationFrame(playGame);
  let car = document.createElement("div");
  car.setAttribute("class","car");
  gameArea.appendChild(car);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
  for(let x=0; x<7; x++){
      let div = document.createElement('div');
      div.classList.add("potholes");
      div.y= (x*500);
      console.log(div.y);
      div.style.top = (x*150) + "px";
      div.style.left = (Math.floor(Math.random()*100)- 12) +"%";
      gameArea.appendChild(div);
    }
  }














/* story 2 making the road and obstacles to scroll*/









 /* story 3A moving car from left to right with aroow keys*/











/* 3B knowing you have hit an obstacle*/











/* 4 barrier to keep player on the road*/











/* 5 scrolling speed increasing to increaes the difficulty of the game*/










/* 6 mileage counter*/












/* 7 rest the game*/
