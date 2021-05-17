window.addEventListener('DOMContentLoaded', () => {


    let canvas = document.getElementById('myCanvas')
    let ctx = canvas.getContext('2d')

    let health= 100
    let x = -100
    let y = Math.floor(Math.random() * 600)
    let dx = 2
    let dy = 0

    let x2 = -100
    let y2 = Math.floor(Math.random() * 600)
    let dx2 = 2
    let dy2 = -2

    let planetRadius = 40
    let planetX = 600
    let planetY = 300

    function drawScore() {
        ctx.font = '16px Arial'
        ctx.fillStyle = 'red'
        ctx.fillText('Health: ' + health, 550, 550)
    }

    function collisionDetection() {
        if ((planetX + 20) > (x) && (planetX - 20) < (x + 30) && (planetY + 20) > (y) && (planetY - 20) < (y + 30)) {
            y = Math.floor(Math.random() * 600)
            x = -100
            dx = 4
            dy = Math.ceil(Math.random() * 4) - 2
            health = health - 25
        }
        if ((planetX + 20) > (x2) && (planetX - 20) < (x2 + 30) && (planetY + 20) > (y2) && (planetY - 20) < (y2 + 30)) {
            y2 = Math.floor(Math.random() * 600)
            x2 = -100
            dx2 = 4
            dy2 = Math.ceil(Math.random() * 4) - 2
            health = health - 25
        }   
        if (health === 0) {
            alert('You lose ☠️')
            clearInterval(interval)
        }
    }

    function drawPlanet () {
        ctx.beginPath()
        ctx.arc(planetX, planetY, planetRadius, 0, Math.PI*2);
        ctx.fillStyle = 'green'
        ctx.fill()
        ctx.closePath
    }
    

    function drawAsteroid() {
        ctx.beginPath()
        ctx.fillStyle = 'red'
        ctx.fillRect(x, y, 30, 30)
        ctx.fill()
        ctx.closePath()
        if (x > 1300 || x < -100 || y > 700 || y < -100) {
            y = Math.floor(Math.random() * 600)
            x = 0
            dx = 4
            dy = Math.ceil(Math.random() * 4) - 2
        }
    }
    function drawAsteroid2() {
        ctx.beginPath()
        ctx.fillStyle = 'blue'
        ctx.fillRect(x2, y2, 30, 30)
        ctx.fill()
        ctx.closePath()
        if (x2 > 1300 || x2 < -100 || y2 > 700 || y2 < -100) {
            y2 = Math.floor(Math.random() * 600)
            x2 = 0
            dx2 = 4
            dy2 = Math.ceil(Math.random() * 4) - 2
        }
    }

    function move () {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawAsteroid()
        drawAsteroid2()
        drawPlanet()
        collisionDetection()
        drawScore()
        x += dx
        y += dy
        x2 += dx2
        y2 += dy2

    }

    // repositions the asteroids on click
    function checkClick(canvas, event) {
        let rect = canvas.getBoundingClientRect();
        let xPosition = event.clientX - rect.left;
        let yPosition = event.clientY - rect.top;

        if (xPosition > (x) && xPosition< (x + 30) && yPosition > (y) && yPosition < (y + 30)) {
            y = Math.floor(Math.random() * 600)
            x = -100
            dx = 4
            dy = Math.ceil(Math.random() * 4) - 2
        }
        if (xPosition > (x2) && xPosition< (x2 + 30) && yPosition > (y2) && yPosition < (y2 + 30)) {
            y2 = Math.floor(Math.random() * 600)
            x2 = -100
            dx2 = 4
            dy2 = Math.ceil(Math.random() * 4) - 2
        }
    }
          
        canvas.addEventListener("mousedown", function(e)
        {
            checkClick(canvas, e);
        });

    let interval = setInterval(move, 5)




    // Create ctxs
    // Add movement
    // Add ability to remove when clicked


    // Create Planet
    // Add health attribute

    // Create colision detection
    // Decrease health upon colision


})







