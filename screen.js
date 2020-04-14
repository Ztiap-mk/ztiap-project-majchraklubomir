var width=1056      // 33 kociek
var heigth=576      // 18 kociek
var shot;
var explosion;
var fanfare;
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

class GameObject {
  constructor(x, y, size) {
    // Constructor, generates a new GameObject
    this.x = x;
    this.y = y;
    this.size = size;
    this.physical = true;
    this.destroyable=true;
    this.enemybase=false;
  }

  move(game) {}

  // Check object collision
  checkCollision(scene) {
    // Test collision
    for (var i in scene) {
        var obj = scene[i];
        // Object is not physical
        if (obj == this || !obj.physical) continue;
          var test =
            this.x >= obj.x + obj.size ||
            this.x + this.size <= obj.x ||
            this.y >= obj.y + obj.size ||
            this.y + this.size <= obj.y;
        if (!test) {
         scene.splice(scene.indexOf(this), 1);
         if(obj.enemybase) {
         if(game.audio) fanfare.play(); 
          game_session=1; 
        }
         if(obj.destroyable) scene.splice(scene.indexOf(obj), 1);  
         if(game.audio) explosion.play();
            return i;
        }
    }
    return false;
  }

  // Draw self
  draw(game) {}
}

class AudioSwitch extends GameObject {
  constructor(x,y){
    var size=32;
    super(x*size,y*size,size)
    this.destroyable=false;
    this.img=document.getElementById("audio");
  }

  draw(game){
    game.ctx.drawImage(this.img,this.x,this.y-16);
    if(!game.audio) {
      game.ctx.beginPath();
      game.ctx.moveTo(this.x,this.y-16);
      game.ctx.lineTo(this.x+this.size,this.y+this.size-16);
      game.ctx.lineWidth=5;
      game.ctx.strokeStyle = "#ed1c24";
      game.ctx.stroke();
    }
  }

}


class Background extends GameObject {
  constructor() {
    super(0,0,0);
    this.physical = false;
    this.destroyable=false;
    this.img = document.getElementById("level");
  }

  draw(game) {
    game.ctx.drawImage(this.img, 0, 0);
  }
}

class Border extends GameObject {
    constructor(x, y) {
      var size = 32;
      super(x * size, y * size, size);
      this.destroyable=false;
      this.img = document.getElementById("blackWall");
    }
  
    draw(game) {
      game.ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
    }
}

class Wall extends GameObject{
  constructor(x, y) {
    var size = 32;
    super(x * size, y * size, size);
    this.img = document.getElementById("wall");
  }

  draw(game) {
    game.ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
  }
}

class Player extends GameObject {
  constructor(x, y) {
    var size = 32;
    super(x * size, y * size, size);
    this.rof=700;
    this.fireTimer=false;
    this.img=document.getElementById("player");
  }

  move(game) {
    var last_x = this.x;
    var last_y = this.y;

    // Move accoding to pressed keys
    if(game.keys[37]) {
      this.x-=2;
      this.r=270;
    }
    if(game.keys[38]) {
      this.y-=2;
      this.r=0;
    }
    if(game.keys[39]) {
      this.x+=2;
      this.r=90;
    }
    if(game.keys[40]) {
      this.y+=2;
      this.r=180;
    }

    if(game.keys[37] && game.keys[38]) this.r = 315;
    if(game.keys[37] && game.keys[40]) this.r = 225;
    if(game.keys[39] && game.keys[38]) this.r = 45;
    if(game.keys[39] && game.keys[40]) this.r = 135;
    if (game.keys[32] ) {
      this.startFiring()
    } else {
      this.stopFiring()
    }

      
    
    // Reset position if collision occures
    if (this.checkCollision(game.scene)) {
      this.x = last_x;
      this.y = last_y;
    }
  }
  startFiring() {
    if (this.fireTimer) return

    var player = this
    this.fireTimer = setInterval(function() {player.fire(game.scene)}, this.rof)
  }

  stopFiring() {
    if (!this.fireTimer) return
    clearInterval(this.fireTimer)
    this.fireTimer = false
  }

  fire(scene) {
    scene.push(new Projectile(this.x+12,this.y+12,this.r));
    if(game.audio) shot.play();
  }

  draw(game) {
    game.ctx.save();
    game.ctx.translate(this.x+16,this.y+16);
    game.ctx.rotate(this.r*(Math.PI/180));
    game.ctx.drawImage(this.img, -16, -16);
    game.ctx.restore();
  }
}
class Projectile extends GameObject {
  constructor(x,y,r){
    var size=8;
    super(x*size,y*size,size,r);
    this.r=r;
    this.x=x;
    this.y=y;
    this.img = document.getElementById("rocket");
    if(this.r==270) this.x-=22;
    if(this.r==0) this.y-=22;
    if(this.r==90) this.x+=22;
    if(this.r==180) this.y+=22;
    if(this.r == 315) {
      this.x-=22;
      this.y-=22;
    };
    if(this.r == 225) {
      this.x-=22;
      this.y+=22;
    };
    if(this.r == 45) {
      this.x+=22;
      this.y-=22;
    };
    if(this.r == 135) {
      this.x+=22;
      this.y+=22;
    };
  }
  
  move(){
      if(this.r==270) this.x-=4;
      if(this.r==0) this.y-=4;
      if(this.r==90) this.x+=4;
      if(this.r==180) this.y+=4;
      if(this.r == 315) {
        this.x-=4;
        this.y-=4;
      };
      if(this.r == 225) {
        this.x-=4;
        this.y+=4
      };
      if(this.r == 45) {
        this.x+=4;
        this.y-=4
      };
      if(this.r == 135) {
        this.x+=4;
        this.y+=4
      };
      
    if (this.checkCollision(game.scene));
  }
  
  draw(game){
    game.ctx.save();
    game.ctx.translate(this.x+4,this.y+4);
    game.ctx.rotate(this.r*(Math.PI/180));
    game.ctx.drawImage(this.img, -4, -4);
    game.ctx.restore();
  }
}

class Base extends GameObject {
    constructor(x, y) {
      var size = 64;
      super(x * size, y * size, size);
      this.enemybase=true;
    }
  
  draw(game) {
    game.ctx.drawImage(enemyBase,this.x,this.y);
  }
}

class Game {
    constructor(canvasName) {
      this.audio=false;
      this.canvas = document.getElementById(canvasName);
      this.ctx = canvas.getContext("2d");
      // Model
      this.keys = [];
      this.scene =[
        new Background(),
        new Player(3,6),
        new AudioSwitch(31,1),
        new Wall(4,6),
        new Base(6,6)
      ];
        for (var w = 0; w < canvas.width; w += 32) {
            for (var h = 0; h < canvas.height; h  += 32) {
                if((w==0 && h>=64 && h<=heigth-32) || (w==width-32 && h>=64 && h<=heigth-32) || 
                (w<width-32 && h==64) || (w<width-32 && h==heigth-32))
                    this.scene.push(new Border(w/32,h/32));       
            }
        }
    }
    
  onkeydown(event) {
    this.keys[event.keyCode] = true;
  }

  onkeyup(event) {
    this.keys[event.keyCode] = false;
  }
  onclick(event) {
      this.rect = canvas.getBoundingClientRect();
      this.x= event.clientX - this.rect.left;
      this.y= event.clientY - this.rect.top;
      if(this.x>=31*32 && this.x<=32*32 && this.y>=16 && this.y<=48) {
        if(this.audio) this.audio=false;
        else this.audio=true;
      }
    
  }

  loop() {
    var now = Date.now()
    var dt = (now - this.time) / 100
    this.time = now
    // Just move all the objects
    for (var i in this.scene) {
      this.scene[i].move(this);
    }

    // Render the scene
    for (i in this.scene) {
      this.scene[i].draw(this);
    }
    if(game_session){
      go_to_defeat();
    }
    // Loop animation
    requestAnimationFrame( this.loop.bind(this) );
  }
}
  
var game;
var game_session;
// Just start up our game
function start(){
  shot = new Audio("audio/shot.mp3");
  explosion = new Audio("audio/explosion.mp3");
  fanfare = new Audio("audio/fanfare.mp3");
      game_session=0;
      go_to_game();
      game = new Game("canvas");
      game.loop();   
}

window.onkeydown = function (event) {
  game.onkeydown(event);
};

window.onkeyup = function (event) {
  game.onkeyup(event);
};


window.addEventListener("click",function(event){
  game.onclick(event);
});