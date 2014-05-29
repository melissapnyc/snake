//PREPERATION
var block     = document.getElementById('block'),
    snake     = [document.getElementById('snake0')],
    path      = document.getElementById('path');
var snake0    = snake[0],
    speed     = 60;
    
var blockRect = block.getBoundingClientRect(),
    snakeRect = snake0.getBoundingClientRect();
 
var colors = ['#ed126a', '#34b9cb', '#8a748b', '#3ec1a7', '#feb8c9', '#e4971b']

snake0.style.left = '10px';
snake0.style.top = '10px';
block.style.top = Math.round((Math.floor((Math.random() * 390) + 0))/10)*10;
block.style.left = Math.round((Math.floor((Math.random() * 390) + 0))/10)*10;
block.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
block.style.opacity = 0.0;
snake0.style.opacity = 0.0;

var left  = parseInt(snake0.style.left);
    north = parseInt(snake0.style.top);

var stop = parseInt(snake0.style.top)
    btop = parseInt(block.style.top)
    sleft = parseInt(snake0.style.left)
    bleft = parseInt(block.style.left)
    sbot = stop + 10
    bbot = btop + 10
    sright = sleft + 10
    bright = bleft + 10   

//DIFFICULTY
function setup() {
    document.getElementById("intro").innerHTML = "";
    document.getElementById("intro").style.width = "0px";
    document.getElementById("intro").style.height = "0px";
    document.getElementById("path").style.height = "400px";
    document.getElementById("path").style.width = "400px";
    block.style.opacity = 1.0;
    snake0.style.opacity = 1.0;
}
function easy() {
    setup();
    speed = 80;
}    
 
function medium() {
    setup();
    speed = 60;
}

function hard() {
    setup();
    speed = 40;
}
 
//KEYS FUNCTIONS
var a = false, b = false, c = false, d = false

var oldKey = 'start',
    newKey
var game = "game"

document.onkeydown = function() {
    switch (window.event.keyCode) {
        case 37:
            if (oldKey == 38 || oldKey == 40 || oldKey == 'start') {
                a = false; b = false; c = false; d = false;
                moveleft();
                oldKey = 37;
            }
            break;
        case 38:
            if (oldKey == 37 || oldKey == 39 || oldKey == 'start') {
                a = false; b = false; c = false; d = false;
                moveup();
                oldKey = 38;
            }
            break;
        case 39:
            if (oldKey == 38 || oldKey == 40 || oldKey == 'start') {
                a = false; b = false; c = false; d = false;
                moveright();
                oldKey = 39;
            }
            break;           
        case 40:
            if (oldKey == 37 || oldKey == 39 || oldKey == 'start') {
                a = false; b = false; c = false; d = false;
                movedown();
                oldKey = 40;
            }
            break;
    }
};
    
//MOVEMENT
function follow(sl, st) {
    if (game != 'gameover' && snake.length > 1) {   
        for (var i = snake.length-1; i > 1; i--) {        
            var cube1 = snake[i-1];
            var cube2 = snake[i];
            cube2.style.top = parseInt(cube1.style.top);
            cube2.style.left = parseInt(cube1.style.left);
            checkHit(block);
            checkEnd();
            if (game == "gameover") {
                return;
            }
        }
        snake[1].style.left = sl;
        snake[1].style.top = st;
    }
}
function over() {
    document.getElementById("intro").innerHTML = "";
    document.getElementById("intro").style.width = "400px";
    document.getElementById("intro").style.height = "200px";
    document.getElementById("path").style.height = "0px";
    document.getElementById("path").style.width = "0px";
    document.getElementById("intro").innerHTML="<h1>GAME OVER</h1><h1><button id='reset' onclick='reset()'><b>Reset</b></button></h1>"
    game = 'gameover';
    a = false; b = false; c = false; d = false
}
function moveleft() {
    b = true;
    var id = setInterval(frame, speed)
    function frame() {
        if (game == "gameover") {
            clearInterval(id);
            return;
        } else {
            var sl = snake0.style.left,
                st = snake0.style.top;
            left = left - 10;
            snake0.style.left = left + 'px';
            follow(sl, st);
            checkHit(block);
            if (b == false) {
                clearInterval(id);
                return;
            } else if (left <= 0) {
               clearInterval(id);
               over();
               b = false;
               return;
            }
        }
    }
}
function moveright() { 
    var id = setInterval(frame, speed)
    a = true;
    function frame() {
        if (game == "gameover") {
            clearInterval(id);
            return;
        } else {
            var sl = snake0.style.left,
                st = snake0.style.top;
            left = left + 10;
            snake0.style.left = left + 'px';
            follow(sl, st);
            checkHit(block);
            if (a == false) {
                clearInterval(id);
                return;
            } else if (left >= 390) {
                clearInterval(id);
                over();
                a = false;
                return;
            }
        }    
    }
}
function moveup() {
    c = true;
    var id = setInterval(frame, speed)
    function frame() {
        if (game == "gameover") {
            clearInterval(id);
            return;
        } else {
            var sl = snake0.style.left,
                st = snake0.style.top;
            north = north - 10;
            snake0.style.top = north + 'px';
            follow(sl, st);
            checkHit(block);
            if (c == false) {
                clearInterval(id);
                return;
            } else if (north <= 0) {
                clearInterval(id);
                over();
                c = false;
                return;
            }
        }
    }
}
function movedown() {
    d = true;
    var id = setInterval(frame, speed)
    function frame() {
        if (game == "gameover") {
            clearInterval(id);
            return;
        } else {
            var sl = snake0.style.left,
                st = snake0.style.top;
            north = north + 10;
            snake0.style.top = north + 'px';
            follow(sl, st);
            checkHit(block);
            if (d == false) {
                clearInterval(id);
                return;
            } else if (north >= 390) {
                clearInterval(id);
                over();
                d = false;
                return;
            }
        }
    }
}

//COLLISION
function newBlock() {
    block.style.top = Math.round((Math.floor((Math.random() * 390) + 0))/10)*10;
    block.style.left = Math.round((Math.floor((Math.random() * 390) + 0))/10)*10;
    block.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
}

var n = 1
function hit() {
    updateScore();
    newBlock();
    var sq = document.createElement('DIV')
    sq.className = 'snake'
    var sqp = document.getElementById('snake'+JSON.stringify(n-1))
    sq.style.left = parseInt(sqp.style.left)
    sq.style.top = sqp.style.top
    sq.id = "snake" + JSON.stringify(n)
    if (n%2 == 1) {
        sq.style.backgroundColor = "green";
        speed--;
    }
    document.getElementById('path').appendChild(sq);
    snake.push(document.getElementById(sq.id))
    n++;
}

//CHECKS
function locaSnake() {
    stop = parseInt(snake0.style.top);
    sleft = parseInt(snake0.style.left);
    sbot = stop + 10;
    sright = sleft + 10
    return [stop, sleft, sbot, sright]
}
function loca(block) {
    btop = parseInt(block.style.top);
    bleft = parseInt(block.style.left);
    bbot = btop + 10;
    bright = bleft + 10;
    return [btop, bleft, bbot, bright]
}
function checkHit(block) {
    var S = locaSnake(); //[stop, sleft, sbot, sright]
    var B = loca(block); //[btop, bleft, bbot, bright]
    if (B[2] >= S[0] && S[0] >= B[0] && B[3] >= S[1] && S[1] >= B[1]) {
        hit();
    } else if (B[2] >= S[2] && S[2] >= B[0] && B[3] >= S[1] && S[1] >= B[1]) {
        hit();
    } else if (B[2] >= S[0] && S[0] >= B[0] && B[3] >= S[3] && S[3] >= B[1]) {
        hit();
    } else if (B[2] >= S[2] && S[2] >= B[0] && B[3] >= S[3] && S[3] >= B[1]) {
        hit();
    }
}

function checkEnd() {
    var S = locaSnake(); //[stop, sleft, sbot, sright]
    for (var i = 5; i < snake.length; i++) {
        var B = loca(snake[i]); //[btop, bleft, bbot, bright]
        if (B[2] >= S[0] && S[0] >= B[0] && B[3] >= S[1] && S[1] >= B[1]) {
            over();
        } else if (B[2] >= S[2] && S[2] >= B[0] && B[3] >= S[1] && S[1] >= B[1]) {
            over();
        } else if (B[2] >= S[0] && S[0] >= B[0] && B[3] >= S[3] && S[3] >= B[1]) {
            over();
        } else if (B[2] >= S[2] && S[2] >= B[0] && B[3] >= S[3] && S[3] >= B[1]) {
            over();
        }
    }
}    

//SCORING
var score = 0
function updateScore() {
    score++;
    document.getElementById("score").innerHTML="Score: " + score;
}

function reset() {
    a = false; b = false; c = false; d = false;
    document.getElementById("intro").style.height = "300px";    
    document.getElementById("intro").innerHTML="<b>Choose your difficulty:</b><br><br><button class='diff' id='easy' onclick='easy()'><i>What's snake again?</i></button><br><br><button class='diff' id='medium' onclick='medium()'><i>Oh right, I know this.</i></button><br><br><button class='diff' id='hard' onclick='hard()'><i>Don't worry, I got this!</i></button>";
    score = 0
    document.getElementById("score").innerHTML="Score: " + score;
    snake0.style.left = '10px';
    snake0.style.top = '10px';
    n = 1;
    oldKey = 'start';
    left = parseInt(snake0.style.left);
    north = parseInt(snake0.style.top);
    for (var i = snake.length-1; i > 0; i--) {        
        var d = document.getElementById("path");
        var olddiv = snake[i];
        d.removeChild(olddiv);
    };
    snake = [snake0];
    game = "game";
    block.style.opacity = 0.0;
    snake0.style.opacity = 0.0;
}

//SWIPE Functionality
path.addEventListener('touchstart', handleTouchStart, false);        
path.addEventListener('touchmove', handleTouchMove, false);

var xDown = null,
    yDown = null;                                                        

function handleTouchStart(evt) {                                         
    event.preventDefault();
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }
    var xUp   = evt.touches[0].clientX,                                    
        yUp   = evt.touches[0].clientY,
        xDiff = xDown - xUp,
        yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
            if (oldKey == 38 || oldKey == 40 || oldKey == 'start') {
                a = false; b = false; c = false; d = false;
                moveleft();
                oldKey = 37;
            }
        } else {
            if (oldKey == 38 || oldKey == 40 || oldKey == 'start') {
                a = false; b = false; c = false; d = false;
                moveright();
                oldKey = 39;
            }
        }
    } else {
        if ( yDiff > 0 ) {
            if (oldKey == 37 || oldKey == 39 || oldKey == 'start') {
                a = false; b = false; c = false; d = false;
                moveup();
                oldKey = 38;
            }
        } else {
            if (oldKey == 37 || oldKey == 39 || oldKey == 'start') {
                a = false; b = false; c = false; d = false;
                movedown();
                oldKey = 40;
            }
        }
    } 
    xDown = null; yDOwn = null;                                             
}
