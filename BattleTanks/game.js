var width=1056      // 33 kociek
var heigth=576      // 18 kociek

var xplayer = 5*32 ;
var yplayer = 5*32 ;
var xenemy = 9*32 ;
var yenemy = 6*32 ;


var pos;
var key = [];
var x,y;

level = new Image();
player = new Image();
enemy = new Image();
enemyBase = new Image();
blackWall = new Image();


level.src = 'img/level.png';
player.src = 'img/player.png';
enemy.src = 'img/enemy.png';
enemyBase.src = 'img/enemy-base.png';
blackWall.src = 'img/black-wall.png';

// View
function draw(){
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(level, 0,0);
    ctx.font = "32px Arcade Rounded";
    ctx.fillStyle = "#ed1c24";
    ctx.textAlign = "center";
    ctx.fillText("Battle Tanks", width/2, 48);
    ctx.drawImage(enemyBase, 5*32, 7*32);
    ctx.drawImage(blackWall,  5*32, 4*32);
    ctx.drawImage(enemy, xenemy, yenemy);
    ctx.drawImage(player, xplayer, yplayer);
}


// Controller
function move() {
    document.onkeydown=function(e)
    {
      pos=1;
      key=window.event?e.keyCode:e.which;
    }
    document.onkeyup=function(e){pos=0;}
      if(pos==0)return;
      if(key==37)xplayer-=4;
      if(key==38)yplayer-=4;
      if(key==39)xplayer+=4;
      if(key==40)yplayer+=4;
}

// Main loop
function main() {

  move()
  draw()

  requestAnimationFrame(main)
}

window.onload = function() {

  canvas = document.getElementById("game")
  ctx = canvas.getContext("2d")

  main()
}