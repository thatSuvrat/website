// -------------------------------- Resize canvas --------------------------------

const canvas = document.querySelector('canvas');
console.log(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

window.addEventListener('resize',
    function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
)

var gravity = 0.9
var friction = 0.8

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
)

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = x;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.colours = [
        "#0274BD", // Bright blue
        "#E9E6DD", // Dusty beige
        "#C4AD9D", // Creamy brown
        "#001524", // Almost black
        "#F57251", // Peachy orange
    ];
    this.colour = this.colours[Math.floor(Math.random() * this.colours.length)];

    if (this.x + this.radius + this.dx >= innerWidth)
        this.x = this.x - this.radius;
    if (this.y + this.radius + this.dy >= innerHeight)
        this.y = 100;


    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = '#000000';
        c.stroke();
        c.fillStyle = this.colour;
        c.fill();
    }


    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius + this.dx + gravity > innerHeight - 0.1 || this.y - this.radius < 0) {
            this.y = innerHeight - this.radius
            this.dy *= -friction;
        } else {
            this.dy += gravity;
        }

        if (this.y + this.radius >= innerHeight) {
            // this.y = floorY - this.radius; // Snap to floor position
        }

        this.x += this.dx;
        this.y += this.dy;

        var distance = Math.sqrt(Math.pow(this.x - mouse.x, 2) + Math.pow(this.y - mouse.y, 2));

        if (distance < 100 && this.dy < 15 && innerHeight - this.y < 30) {
            this.dy = 25
        }
        // else if (distance > 100 && this.radius > 20) {
        //     this.radius -= 1;
        // }


        this.draw();
    }
}

var circleArr = [];

for (var i = 0; i < 140; i++) {
    var radius = 20;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 5;
    var dy = (Math.random() - 0.5) * 5;
    circleArr.push(new Circle(x, y, dx, dy, radius));
}

// ------------------------------- Animate circle --------------------------------

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArr.length; i++) {
        circleArr[i].update();
    }

}
animate();