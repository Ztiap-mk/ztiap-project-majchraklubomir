/*
uvod = new Image();
playB = new Image();
controlB = new Image();
exitB = new Image();
backB = new Image();
controlS = new Image();
backB = new Image();
defeatS = new Image();

uvod.src = 'img/uvod.png';
playB.src ='img/playB.png';
controlB.src= 'img/controlB.png';
exitB.src='img/exitB.png';
backB.src='img/backB.png';
controlS.src='img/controlsS.png';
backB.src ='img/backB.png';
defeatS.src = 'img/defeatS.png';




function uvodna(){
    
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(uvod, 0,0);
    ctx.drawImage(playB, 398,80);
    ctx.drawImage(controlB,398,230);
    ctx.drawImage(exitB,398,380);
    canvas.addEventListener('click', function(e) {
    pos = getCursorPosition(canvas, e)
    if(pos[0]>398 && pos[0]<398+270 && pos[1]>80 && pos[1]<180) main();
    if(pos[0]>398 && pos[0]<398+270 && pos[1]>230 && pos[1]<330) controls();
   // if(pos[0]>398 && pos[0]<398+270 && pos[1]>380 && pos[1]<480) close();

})
  }

function controls(){   
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(controlS,0,0);
    ctx.drawImage(backB,800,400);
    canvas.addEventListener('click', function(e) {
    pos = getCursorPosition(canvas, e)
        if(pos[0]>800 && pos[0]<800+177 && pos[1]>400 && pos[1]<400+65) uvodna();
        
    
    })
}

function defeat(){
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(defeatS,0,0);
    ctx.drawImage(playB,398,380);
    canvas.addEventListener('click', function(e) {
    pos = getCursorPosition(canvas, e)
        if(pos[0]>398 && pos[0]<398+270 && pos[1]>380 && pos[1]<480) 
        {
            location.reload();
        }
        
    
    })
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return[x,y];
}
*/

function start(){
    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "block";
    main()
}

function go_to_menu(){
    document.getElementById("game_display").style.display = "none";
    document.getElementById("contorls").style.display = "none";
    document.getElementById("menu").style.display = "block";
}

function go_to_controls() {
    document.getElementById("game_display").style.display = "none";
    document.getElementById("menu").style.display = "none";
    document.getElementById("controls").style.display = "block";
}