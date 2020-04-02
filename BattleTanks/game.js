var width=1056      // 33 kociek
var heigth=576      // 18 kociek
var box =32;
var key = [];

level = new Image();
player = new Image();
enemy = new Image();
enemyBase = new Image();
blackWall = new Image();
wall = new Image();


level.src = 'img/game/level.png';
player.src = 'img/game/player.png';
enemy.src = 'img/game/enemy.png';
enemyBase.src = 'img/game/enemyBase.png';
blackWall.src = 'img/game/blackWall.png';
wall.src = 'img/game/wall.png';

function go_to_game(){
  document.getElementById("menu").style.display = "none";
  document.getElementById("controls").style.display = "none";
  document.getElementById("defeat").style.display = "none";
  document.getElementById("game_display").style.display = "block";
}

function go_to_menu(){
  document.getElementById("game_display").style.display = "none";
  document.getElementById("controls").style.display = "none";
  document.getElementById("menu").style.display = "block";
  document.getElementById("defeat").style.display = "none";
}

function go_to_controls() {
  document.getElementById("game_display").style.display = "none";
  document.getElementById("menu").style.display = "none";
  document.getElementById("controls").style.display = "block";
  document.getElementById("defeat").style.display = "none";
}

function go_to_defeat() {
  document.getElementById("game_display").style.display = "none";
  document.getElementById("menu").style.display = "none";
  document.getElementById("controls").style.display = "none";
  document.getElementById("defeat").style.display = "block";
}
//Initialize
function init(){
  inside = {
    wallx:7 * box,
    wally:12 *box,
    xplayer: 5*box ,
    yplayer: 5*box ,
    xenemy: 9*box ,
    yenemy: 6*box ,
    rplayer:0,
  }
}



// View
function draw(){
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(level, 0,0);
    ctx.font = "32px Arcade Rounded";
    ctx.fillStyle = "#ed1c24";
    ctx.textAlign = "center";
    ctx.fillText("Battle Tanks", width/2, 48);
    ctx.drawImage(enemyBase, 5*box, 7*box);
    border();
    ctx.save()
    ctx.translate(inside.xplayer,inside.yplayer);
    ctx.rotate(inside.rplayer*(Math.PI/180))
    ctx.drawImage(player, -16,-16);
    ctx.restore()
    ctx.drawImage(enemy, inside.xenemy, inside.yenemy);
    ctx.drawImage(wall, inside.wallx,inside.wally);
}

function border(){
  for (var w = 0; w < canvas.width; w += 32) {
    for (var h = 0; h < canvas.height; h  += 32) {
        if((w==0 && h>=64 && h<=heigth-32) || (w==width-32 && h>=64 && h<=heigth-32) || 
        (w<width-32 && h==64) || (w<width-32 && h==heigth-32)) ctx.drawImage(blackWall, w, h);
    }
  }
}

// Controller
function move() {
    window.onkeydown=function(event)
    {
      key[event.keyCode] =true;
    };
    window.onkeyup=function(event){
      key[event.keyCode] =false;
    };
      if(key[37]) {
        inside.xplayer-=2;
        inside.rplayer=270;
      }
      if(key[38]) {
        inside.yplayer-=2;
        inside.rplayer=0;
      }
      if(key[39]) {
        inside.xplayer+=2;
        inside.rplayer=90;
      }
      if(key[40]) {
        inside.yplayer+=2;
        inside.rplayer=180;
      }

      if(key[37] && key[38]) inside.rplayer = 315;
      if(key[37] && key[40]) inside.rplayer = 225;
      if(key[39] && key[38]) inside.rplayer = 45;
      if(key[39] && key[40]) inside.rplayer = 135;

      if(inside.xplayer>width-48) game_session = false;
      else if(inside.xplayer<48) game_session = false;
      else if(inside.yplayer>heigth-48) game_session = false;
      else if(inside.yplayer<112) game_session = false;

      
}





// Main loop
function main() {
  move()
  draw()
  if(game_session) requestAnimationFrame(main);
  else go_to_defeat()
}


function start(){
  go_to_game()

  canvas = document.getElementById("game")
  ctx = canvas.getContext("2d")
  init()
  game_session = true;
  
  main()
}