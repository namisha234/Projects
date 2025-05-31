document.addEventListener('DOMContentLoaded', () =>{
    const container= document.querySelector(".div");
    
    if(!container) {
        console.error("Ball element not found");
        return;
    }
    let gravity= 0.5;
    let bounceFactor=1;
    let minBounceSpeed= 3;
    let minBallSize= 35;
    let maxBallSize= 80;
   
    container.style.position= "relative";
    container.style.overflow= "hidden";
    container.style.width= "100%";
    container.style.height= "100vh";

    function createBall(startFromBottom= false) {
        const ball = document.createElement("div");
        ball.classList.add("circle");


        let size= Math.random() *  (maxBallSize - minBallSize)  + minBallSize; // random size between 20 and 60
        ball.style.width= `${size}px`;
        ball.style.height= `${size}px`;
        ball.style.backgroundColor= `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        ball.style.position= "absolute";
        ball.style.transition= "transform 0.9ms ease-in-out";

        let positionX= Math.random() * (container.clientWidth - size);
        ball.style.left= `${positionX}px`;

        let positionY = startFromBottom ? container.clientHeight - size : Math.random() * (container.clientHeight / 2) ;
        let velocity= Math.random() * 3 + 2; // random velocity between 2 and 5

        container.appendChild(ball);
    
    
    function updateBallPosition() {
        if(!ball.classList.contains("hovered")){
           
        positionY += velocity;
        velocity+= gravity;
        

        // collision detection with container bottom
        if(positionY + ball.clientHeight >= container.clientHeight) {
            positionY= container.clientHeight - ball.clientHeight;
            velocity *= -bounceFactor; // reverse velocity and apply bounce factor
            // check if velocity is below minBounceSpeed
            if(Math.abs(velocity) < minBounceSpeed) {
                velocity= minBounceSpeed * (velocity  < 0? -1: 1); // stop bouncing if below min speed
            }

        }
        ball.style.transform= `translateY(${positionY}px)`;
    }
        
        requestAnimationFrame(updateBallPosition);
    }
        updateBallPosition();

        ball.addEventListener("mouseenter", () => {
            ball.classList.add("hovered");
            ball.style.transform += ` translateY(${positionY}px)scale(1.5)`;
            ball.style.transiton= "none";
        });

        ball.addEventListener("mouseleave", () => {
            ball.classList.remove("hovered");
            ball.style.transform = `translateY(${positionY}px) scale(1)`;
        });        
    }

    container.addEventListener("mouseenter", () => {
        for(let i=0; i<2; i++)
        {
            createBall(i%2 ===0);
        }
    });
       
    for( let i=0; i<8; i++)
        {
            createBall(i%2 ===0);
        }
        
    });