
/* story 1 seeing car and obstacles on the road*/
const mileadge = document.querySelector(".mileadge");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
const deathScreen = document.querySelector(".deathScreen");

const button = document.querySelector(".start");
button.addEventListener("click",start);

const restart = document.querySelector(".respawn");
restart.addEventListener("click",reload);
function reload() {
  window.location.reload();
}

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
        if (item.y >= 1000) {
            item.y -= 1000;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
      });
      let car = document.querySelector(".car");
      potholes.forEach(function (item) {
              if (isCollide (car, item)) {
                gameArea.classList.add("hide");
                deathScreen.classList.remove("hide");
      }
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
  for(let x=0; x<3; x++){
      let div = document.createElement('div');
      div.classList.add("potholes");
      div.y= (x*500);
      div.style.top = (x*150) + "px";
      div.style.left = (Math.floor(Math.random()*100)) + "%";
      gameArea.appendChild(div);
    }
  window.requestAnimationFrame(playGame);
  let car = document.createElement("div");
  car.setAttribute("class","car");
  gameArea.appendChild(car);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
  }

  function isCollide(a, b) {
            let aRect = a.getBoundingClientRect();
            let bRect = b.getBoundingClientRect();
            return !(
                (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
        }
