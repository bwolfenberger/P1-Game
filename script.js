window.addEventListener('DOMContentLoaded', () => {

    let canvas = document.getElementById('myCanvas')
    let asteroid = canvas.getContext('2d')
    
    let x = canvas.width/2
    let y = canvas.height-30
    let dx = 2
    let dy = -2

    function moveAsteroid() {
        asteroid.clearRect(0, 0, canvas.width, canvas.height)
        asteroid.beginPath()
        asteroid.fillRect(x, y, 30, 30)
        asteroid.fill()
        asteroid.closePath()
        x += dx
        y += dy
    }

    setInterval(moveAsteroid, 10)




    // Create Asteroids
    // Add movement
    // Add ability to remove when clicked


    // Create Planet
    // Add health attribute

    // Create colision detection
    // Decrease health upon colision


})







