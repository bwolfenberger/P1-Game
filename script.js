window.addEventListener('DOMContentLoaded', () => {

    let canvas = document.getElementById('myCanvas')
    let asteroid = canvas.getContext('2d')
    
    let x = 0
    let y = Math.floor(Math.random() * 600)
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
        console.log(`x= ${x}`)
        console.log(y)
        if (x > 1300 || x < -100 || y > 700 || y < -100) {
            y = Math.floor(Math.random() * 600)
            x = 0
            dx = Math.floor(Math.random() * 5)
            dy = Math.floor(Math.random() * -2)
        }
        
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







