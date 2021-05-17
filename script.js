window.addEventListener('DOMContentLoaded', () => {

    let canvas = document.getElementById('myCanvas')
    let ctx = canvas.getContext('2d')
    
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
        x += dx
        y += dy
        x2 += dx2
        y2 += dy2
    }

    
    function checkClick(event) {
        if (event.clientX > (x + 5) && event.clientX < (x + 37) && event.clientY > (y + 5) && event.clientY < (y + 37)) {
        y = Math.floor(Math.random() * 600)
        x = -100
        dx = 4
        dy = Math.ceil(Math.random() * 4) - 2
        }
      }
    function checkClick2(event) {
        if (event.clientX > (x2 + 5) && event.clientX < (x2 + 37) && event.clientY > (y2 + 5) && event.clientY < (y2 + 37)) {
        y2 = Math.floor(Math.random() * 600)
        x2 = -100
        dx2 = 4
        dy2 = Math.ceil(Math.random() * 4) - 2
        }
      }

      
      document.addEventListener("click", checkClick);
      document.addEventListener("click", checkClick2);


    setInterval(move, 100)




    // Create ctxs
    // Add movement
    // Add ability to remove when clicked


    // Create Planet
    // Add health attribute

    // Create colision detection
    // Decrease health upon colision


})







