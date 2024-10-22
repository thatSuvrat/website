// Get the canvas element
var canvas = document.getElementById('canvas');
// Get the 2D drawing context
var ctx = canvas.getContext("2d");

const speedInput = document.getElementById('speedInput');
const radiusInput = document.getElementById('radiusInput');
const updateButton = document.getElementById('updateButton')


console.log("wtf is wrong with this")
class Ball {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2,);
        ctx.strokeStyle = 'blue';
        ctx.stroke();
        ctx.closePath();
    }

    update() {
        if (this.x + this.dx + this.radius > canvas.width || this.x - this.radius < 0)
            this.dx = -this.dx;
        if (this.y + this.dy + this.radius > canvas.height || this.y - this.radius < 0)
            this.dy = - this.dy;

        this.x += this.dx;
        this.y += this.dy;

    }
}
const ball_1 = new Ball(100, 100, 10, 7.5, 50)
function animate() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight - 50;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball_1.update();
    ball_1.draw();
    window.requestAnimationFrame(animate);
}
const updateBall = () => {
    try {
        let newSpeed = speedInput.value.split(',').map(Number);
        let newRadius = parseFloat(radiusInput.value);
        console.log(radiusInput.value, newRadius)
        ball_1.dx = newSpeed[0];
        ball_1.dy = newSpeed[1];
        ball_1.radius = newRadius;
        console.log(newSpeed, newRadius, ball_1);
    }
    catch (err) {
        alert(err.message);
    }
}
updateButton.addEventListener('click', updateBall);

animate();