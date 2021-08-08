// Wait for DOM to load before running script
window.addEventListener('DOMContentLoaded', () => {
    // Set variables
    let canvas = document.getElementById('myCanvas')
    let ctx = canvas.getContext('2d')
    let imgAsteroid = document.getElementById('asteroid')
    let imgPlanet = document.getElementById('planet')
    var music = new Audio('css/music.m4a')
    var endMusic = new Audio('css/endAudio.m4a')
    var hitAudio1 = new Audio('css/hit1.m4a')
    var hitAudio2 = new Audio('css/hit2.m4a')
    music.loop = true
    endMusic.loop = true
    hitAudio1.volume = .5
    hitAudio2.volume = .5
    let clickCounter = 0
    let muteLocationX = 1150
    let muteLocationY = 575
    let health = 100
    let score = 0
    let interval
    
    // Mutes and unmutes audio
    function mutePage() {
        if (music.muted === false) {
            music.muted = true
            hitAudio1.muted = true
            hitAudio2.muted = true
        } else {
            music.muted = false
            hitAudio1.muted = false
            hitAudio2.muted = false
        } 
    }
    
    // On click of start button, start screen is removed and gameplay is initiated
    document.querySelector('#startButton').onclick = () => {
        document.querySelector('.container').style.display = 'none'
        music.play()
        interval = setInterval(move, 50)
    }
    
    // On click of restart button, end screen is removed and gameplay is initiated
    document.querySelector('#endButton').onclick = () => {
        document.querySelector('.endContainer').style.display = 'none'
        music.muted = false
        endMusic.muted = true
        interval = setInterval(move, 50)
        health = 100
        score = 0
    }

    // Display mute icon
    function drawMute() {
        ctx.fillText('🔇', muteLocationX, muteLocationY)
    }
    
    // Display current health
    function drawHealth() {
        ctx.font = '16px Orbitron'
        ctx.fillStyle = 'greenyellow'
        ctx.fillText('Health: ' + health, 500, 50)
    }
    
    // Display current score
    function drawScore() {
        ctx.font = '16px Orbitron'
        ctx.fillStyle = 'red'
        ctx.fillText('Score: ' + score, 650, 50)
    }

    //<-- Main object constructor -->
    class Object {
        constructor(imgSrc, xPos, yPos, xSize, ySize, radius, xTarget, yTarget, xSpeed, ySpeed) {
            this.imgSrc = imgSrc
            this.xPos = xPos
            this.yPos = yPos
            this.xSize = xSize
            this.ySize = ySize
            this.radius = xSize / 2.5
            this.xTarget = xPos + (xSize/2)
            this.yTarget = yPos + (ySize/2)
            this.xSpeed = xSpeed
            this.ySpeed = ySpeed
        }

        // Display object function
        draw() {
            ctx.beginPath()
            ctx.drawImage(this.imgSrc, this.xPos, this.yPos, this.xSize, this.ySize)
            ctx.fill()
            ctx.closePath()
            this.xPos = this.xPos + this.xSpeed
            this.yPos = this.yPos + this.ySpeed
            this.xTarget = this.xPos + (this.xSize/2)
            this.yTarget = this.yPos + (this.ySize/2)
            // resets Object position if offscreen
            if (this.xPos > 1300 || this.xPos < -100 || this.yPos > 700 || this.yPos < -100) {
                this.resetPositions()
            }
        }

        // Increased speed of asteroids each interval
        increaseSpeed() {
            if (this.xSpeed > 0) {
                this.xSpeed = this.xSpeed + .01
            } else {
                this.xSpeed = this.xSpeed - .01
            }
        }    

        // Function to determine if the asteroids hit the planet
        collisionDetection() {
            let distanceXA1 = planet.xTarget - this.xTarget
            let distanceYA1 = planet.yTarget - this.yTarget
            let distanceA1 = Math.sqrt(distanceXA1 * distanceXA1 + distanceYA1 * distanceYA1)
            // If asteroid hits planet
            if (distanceA1 < planet.radius + this.radius) {
                this.resetPositions()
                // Reduce health equal to size of the asteroid
                health = health - Math.round(this.radius)

                // If health reaches 0, initiate end game
                if (health <= 0) {  
                    asteroids.forEach(element => {
                        element.resetPositions()
                    })

                    asteroids.forEach(element => {
                        element.resetSpeed()
                    })
                    
                    // Display end game screen
                    clearInterval(interval)
                    document.querySelector('.endContainer').style.display = 'block'
                    document.querySelector('.endText').innerText = `Final Score: ${score}`
                    music.muted = true
                    endMusic.muted = false
                    endMusic.play()
                }
            }
        }
        
        // Reset all asteroids offscreen
        resetPositions() {
            this.yPos = Math.floor(Math.random() * 600)
            this.ySpeed = Math.ceil(Math.random() * 4) - 2
            if (this.yPos%2 == 0) {
                this.xPos = -100
            } else {
                this.xPos = 1300
            }
        }
        // Randomize speed based on yPos variable
        resetSpeed() {
            if (this.yPos%2 == 0) {
                this.xSpeed = 3
            } else {
                this.xSpeed = -3
            }
        }

        // Check position of click
        checkClick(canvas, event) {
            let rect = canvas.getBoundingClientRect();
            let xMousePosition = event.clientX - rect.left;
            let yMousePosition = event.clientY - rect.top;

            // If click is in the same area as an asteroid, reset position of asteroid
            if (xMousePosition > (this.xTarget - this.radius) && xMousePosition < (this.xTarget + this.radius) && yMousePosition > (this.yTarget - this.radius) && yMousePosition < (this.yTarget + this.radius)) {
                this.resetPositions()

                // add audio on click, switches between two audio files to allow for quicker sound
                if (clickCounter%2 == 0) {
                    hitAudio1.play()
                    clickCounter++
                } else if (clickCounter%2 == 1) {
                    hitAudio2.play()
                    clickCounter++
                }
                
                // Increase score
                score = score + 10
            }
        }
    }

    // Initiate planet variable
    let planet = new Object(imgPlanet, 500, 200, 200, 200, 80, 0, 0, 0, 0) 
    
    // Creates an array of asteroids with randomized variables
    var asteroids = []
    // Number of asteroids is determined by how many iterations of the for loop
    for (let i = 0; i < 10; i++) {
        let yPos = Math.floor(Math.random() * 600)
        let xPos = -100
        let xSpeed = 3
        if (yPos%2 == 0) {
            xPos = -100
            xSpeed = 3
        } else {
            xPos = 1300
            xSpeed = -3
        }
        let xSize = Math.floor(Math.random() * 40) + 40
        let ySize = xSize
        let radius = xSize / 2.5
        let xTarget = xPos + (xSize/2)
        let yTarget = yPos + (ySize/2)
        let ySpeed = Math.ceil(Math.random() * 4) - 2
        
        // Initiate asteroid variable
        let asteroid = new Object(imgAsteroid, xPos, yPos, xSize, ySize, radius, xTarget, yTarget, xSpeed, ySpeed)
        // Add asteroid to asteroids array
        asteroids.push(asteroid)
    }

    // Clears canvas then redraws objects
    function move () {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        // Loops through asteroid array to redraw each
        asteroids.forEach(element => {
            element.draw()
        })
        
        // Loops through asteroid array to check each for collision
        asteroids.forEach(element => {
            element.collisionDetection()
        })
        
        // Loops through asteroid array to increase each speed
        asteroids.forEach(element => {
            element.increaseSpeed()
        })

        planet.draw()
        drawHealth()
        drawScore()
        drawMute()
    }

    // Check click for mute button
    function checkClick2(canvas, event) {
        let rect = canvas.getBoundingClientRect();
        let xMousePosition = event.clientX - rect.left;
        let yMousePosition = event.clientY - rect.top;

        if (xMousePosition > (muteLocationX) && xMousePosition< (muteLocationX + 25) && yMousePosition < (muteLocationY) && yMousePosition > (muteLocationY - 20)) {
            mutePage()
        }
    }
    // Check click for each asteroid
    canvas.addEventListener("mousedown", function(e) {
        asteroids.forEach(element => {
            element.checkClick(canvas, e)
        })
        checkClick2(canvas, e)
    })
})