
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
  x: 80,
  y: 560,
  width: 40,
  height: 40,
  speed: 5,
  lane: 0,
  color: "lime",
  hp: 3,
};

const lanes = [80, 240];
let bullets = [];
let enemies = [];
let items = [];
let frame = 0;
let score = 0;

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function shoot() {
  bullets.push({ x: player.x + 15, y: player.y, width: 10, height: 20 });
}

function drawBullets() {
  ctx.fillStyle = "yellow";
  bullets.forEach(b => {
    b.y -= 10;
    ctx.fillRect(b.x, b.y, b.width, b.height);
  });
  bullets = bullets.filter(b => b.y > 0);
}

function spawnEnemy() {
  const lane = Math.floor(Math.random() * 2);
  enemies.push({
    x: lanes[lane],
    y: -40,
    width: 40,
    height: 40,
    hp: 1,
    color: "red",
  });
}

function drawEnemies() {
  enemies.forEach(e => {
    e.y += 3;
    ctx.fillStyle = e.color;
    ctx.fillRect(e.x, e.y, e.width, e.height);
  });
  enemies = enemies.filter(e => e.y < canvas.height && e.hp > 0);
}

function detectCollisions() {
  bullets.forEach(b => {
    enemies.forEach(e => {
      if (
        b.x < e.x + e.width &&
        b.x + b.width > e.x &&
        b.y < e.y + e.height &&
        b.y + b.height > e.y
      ) {
        e.hp--;
        b.y = -100;
        score += 10;
      }
    });
  });
}

function moveLeft() {
  player.lane = Math.max(0, player.lane - 1);
  player.x = lanes[player.lane];
}
function moveRight() {
  player.lane = Math.min(1, player.lane + 1);
  player.x = lanes[player.lane];
}

function drawUI() {
  ctx.fillStyle = "white";
  ctx.font = "18px sans-serif";
  ctx.fillText("HP: " + player.hp, 10, 20);
  ctx.fillText("Score: " + score, 260, 20);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frame++;

  if (frame % 30 === 0) shoot();
  if (frame % 60 === 0) spawnEnemy();

  drawPlayer();
  drawBullets();
  drawEnemies();
  detectCollisions();
  drawUI();

  requestAnimationFrame(gameLoop);
}

gameLoop();
