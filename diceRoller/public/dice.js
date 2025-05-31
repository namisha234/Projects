const dice= document.getElementById("diceImage");
const startScreen= document.querySelector(".start");
const startButton= document.querySelector(".start-button");
const diceSound= new Audio("sound/diceSound.mp3");
const startButtonSound= new Audio("sound/startButtonSound.mp3");




startButton.addEventListener("click", function (){
    startButton.style.transition= "opacity 0.5s ease-in-out";
    startButton.style.opacity= "0";
    startButtonSound.play();

    setTimeout(() => {
        startScreen.style.display= "none";

        let container= document.getElementById("container");
        container.style.display= "flex";
        container.style.opacity= "0.05";
        
        setTimeout(() => {
            container.style.transition= "opacity 1.5s ease-in-out";
            container.style.opacity= "1";
        }, 80);

       
    },500);
});





dice.addEventListener("click", async function () {
    let dice =this;
    dice.classList.add("container");
    diceSound.play();

    let rollAnimation = setInterval(() =>{
        let randomFace= Math.floor(Math.random()*6)+1;
        dice.src= `/images/dice${randomFace}.png`
    },150);


    setTimeout(async() => { 
        clearInterval(rollAnimation);

        const response = await fetch("http://localhost:8500/roll");
        const data=  await response.json()

        dice.src= `/images/dice${data.number}.png`;
        dice.style.visibility= "visible";
    }, 1000);
});


async function getHistory() {
    const response= await fetch("http://localhost:8500/history");
    const historyData= await response.json();

    let historySection= document.getElementById("history");
    historySection.innerHTML = "<h2>Past Rolls</h2>";

    historyData.forEach(roll => {
        historySection.innerHTML += `<p>🎲 ${roll.dice} (${new Date(roll.timestamp).toLocaleString()})</p>`;
        });
}

window.addEventListener("load", getHistory);