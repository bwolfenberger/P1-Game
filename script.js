window.addEventListener('DOMContentLoaded', () => {

    let canvas = document.getElementById('myCanvas')
    let ctx = canvas.getContext('2d')
    
    let x = 0
    let y = Math.floor(Math.random() * 600)
    let dx = 2
    let dy = -2

    let planetRadius = 40
    let planetX = 600
    let planetY = 300

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
            dx = Math.ceil(Math.random() * 5)
            console.log(dx)
        }
    }

    function move () {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawAsteroid()
        drawPlanet()
        x += dx
        y += dy
    }

    


    setInterval(move, 10)




    // Create ctxs
    // Add movement
    // Add ability to remove when clicked


    // Create Planet
    // Add health attribute

    // Create colision detection
    // Decrease health upon colision


})







