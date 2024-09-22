const ball = document.getElementById("ball");
const container = document.getElementById("container");

let posX = 0;
let posY = 0;
let velocityX = 2; // 水平速度
let velocityY = 2; // 垂直速度
const ballSize = 20; // 圆球的大小

function animate() {
    posX += velocityX;
    posY += velocityY;

    // 检查边界碰撞
    if (posX + ballSize > container.clientWidth || posX < 0) {
        velocityX = -velocityX; // 反向速度
    }
    if (posY + ballSize > container.clientHeight || posY < 0) {
        velocityY = -velocityY; // 反向速度
    }

    ball.style.left = posX + 'px';
    ball.style.top = posY + 'px';

    requestAnimationFrame(animate); // 循环调用
}

// 启动动画
animate();
