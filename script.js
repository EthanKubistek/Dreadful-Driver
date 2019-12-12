const mileadge = document.querySelector(".mileadge");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
const deathScreen = document.querySelector(".deathScreen");

let player = {
  speed: 5,
  delay: 3000
};

const button = document.querySelector(".start");
button.addEventListener("click",start);

const restart = document.querySelector(".respawn");
restart.addEventListener("click",reload);
let position = [10, 15, 20, 30, 45, 50, 55, 60, 70, 80];
let miles =0;
function reload() {
  window.location.reload();
}

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
      if (item.y >= window.innerHeight) {
          item.y -= window.innerHeight;
      }
      item.y += player.speed;
      item.style.top = item.y + "px";
      })
      let lines2 = document.querySelectorAll(".line2");
      lines2.forEach(function (item) {
      if (item.y >= window.innerHeight) {
          item.y -= window.innerHeight;
      }
      item.y += player.speed;
      item.style.top = item.y + "px";
    });
  }

function movePotholes() {
    let potholes = document.querySelectorAll(".potholes");
    potholes.forEach(function (item) {
        if (item.y >= window.innerHeight) {
            item.y -= window.innerHeight;
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

let goFast = Date.now();
let go = Date.now();

function playGame() {
  let old = document.querySelector(".potholes");
    if (old.y > (Math.max(500,window.innerHeight))){
      for(let x=0; x<1; x++){
          let div = document.createElement('div');
          div.classList.add("potholes");
          div.y= 10;
          div.style.top = (x*10) + "px";
          div.style.left = position[(Math.floor(Math.random()*10))] + "%";
          gameArea.replaceChild(div, old);
          miles++;
          mileadge.textContent = miles + " MILES";
          console.log("YOU HAVE GONE " + miles+ " MILES");
      }
    }
  let car = document.querySelector(".car");
  moveLines();
  movePotholes();
  if (player.speed < 25){
    let elapsed = -(goFast-Date.now());
        if (elapsed > player.delay){
          player.speed++;
          player.delay-=100;
          goFast = Date.now();
          }
  } else {
    player.speed = 25;
    player.delay = 1250;
  }
  let road = gameArea.getBoundingClientRect();
    if(player.start) {
        if (keys.ArrowUp && player.y > road.top){
          player.y -= player.speed;
        } else if (keys.ArrowDown && player.y < 800){
          player.y += player.speed;
        } else if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        } else if (keys.ArrowRight && player.x < 565){
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
    mileadge.classList.remove("hide");
    mileadge.style.display= "inline";
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
    let div = document.createElement('div');
    div.classList.add("potholes");
    div.y= 10;
    div.style.top =10 + "px";
    div.style.left = position[(Math.floor(Math.random()*10))] + "%";
    gameArea.appendChild(div);
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
};
