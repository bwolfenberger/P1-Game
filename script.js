window.addEventListener('DOMContentLoaded', () => {


    let canvas = document.getElementById('myCanvas')
    let ctx = canvas.getContext('2d')

    let imgAsteroid = document.getElementById('asteroid')
    let imgPlanet = document.getElementById('planet')
    let health = 100
    let score = 0
    let x = -100
    let y = Math.floor(Math.random() * 600)
    let dx = 2
    let dy = 0

    let x2 = -100
    let y2 = Math.floor(Math.random() * 600)
    let dx2 = 2
    let dy2 = -2

    let planetTarget = {radius: 85, x: 600, y: 250}
    let asteroidTarget = {radius: 20, x: x, y: y}
    let asteroid2Target = {radius: 17, x: x2, y: y2}
    let planetX = 500
    let planetY = 150

    function drawHealth() {
        ctx.font = '16px Arial'
        ctx.fillStyle = 'red'
        ctx.fillText('Health: ' + health, 550, 550)
    }
    function drawScore() {
        ctx.font = '16px Arial'
        ctx.fillStyle = 'red'
        ctx.fillText('Score: ' + score, 700, 550)
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
        ctx.drawImage(imgPlanet, planetX, planetY, 200, 200)
        ctx.closePath()
    }
    

    function drawAsteroid() {
        ctx.beginPath()
        ctx.drawImage(imgAsteroid, x, y, 50, 50)
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
        ctx.drawImage(imgAsteroid, x2, y2, 40, 40)
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
        drawHealth()
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
        console.log(`x= ${x} and y= ${y}`)
        console.log(`x click= ${xPosition} and y click= ${yPosition}`)

        if (xPosition > (x) && xPosition< (x + 30) && yPosition > (y) && yPosition < (y + 30)) {
            y = Math.floor(Math.random() * 600)
            x = -100
            dx = 4
            dy = Math.ceil(Math.random() * 4) - 2
            score = score + 10
        }
        if (xPosition > (x2) && xPosition< (x2 + 30) && yPosition > (y2) && yPosition < (y2 + 30)) {
            y2 = Math.floor(Math.random() * 600)
            x2 = -100
            dx2 = 4
            dy2 = Math.ceil(Math.random() * 4) - 2
            score = score + 10
        }
    }
          
        canvas.addEventListener("mousedown", function(e)
        {
            checkClick(canvas, e);
        });

    let interval = setInterval(move, 50)




    // Create ctxs
    // Add movement
    // Add ability to remove when clicked


    // Create Planet
    // Add health attribute

    // Create colision detection
    // Decrease health upon colision


})







