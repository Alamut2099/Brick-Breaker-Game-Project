var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleeX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowcount = 3;
var brickColumnCount = 8;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
var score = 0;
var lives = 3;
document.addEventListener(`keydown`, keyDownHandler, false);
document.addEventListener(`keyup`, keyUpHandler, false);
function keyDownHandler(e) {
    if (e.key == `Right` || e.key == `ArrowRight`) {
        rightPressed = true;
    }
    else if (e.key == `Left` || e.key == `ArrowLeft`) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.key == `Right` || e.key == `ArrowRight`) {
        rightPressed = false;
    }
    else if (e.key == `Left` || e.key == `ArrowLeft`) {
        leftPressed = false;
    }
}
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y +
                    brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowcount * brickColumnCount) {
                        alert(`YOU WIN, CONGRATS`);
                        document.location.reload();
                    }
                }
            }
        }
    }
}
function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText(`Score:` + score, 8, 20);
}

function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = `#0095DD`;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawLives() {
    ctx.font = `16px Arial`;
    ctx.fillStyle = `#0095DD`;
    ctx.fillText(`Lives: ` + lives, canvas.width - 65, 20);
}
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = `#0095DD`;
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth,
        paddleHeight);
    ctx.fillsytle = `#0095DD`;
    ctx.fill();
    ctx.closePath();
}


