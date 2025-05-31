


let container = document.querySelector('#clock-container');
let image= document.querySelector('img');
let button= document.querySelector('button');
let clockRunning= true;
button.innerText= "Stop Clock";

image.addEventListener('mouseover',()=>{
    image.src= "./images/clock.png";
});
image.addEventListener('mouseout',()=>{
    image.src= "./images/3-pose.png";
});

button.addEventListener('click', ()=>{
    
    if(clockRunning) {
        clearInterval(clockInterval);
        button.innerText= "Start Clock";
    }
    else{
        clockInterval = setInterval(updateClock, 1000);
        button.innerText= "Stop Clock";
    }
    clockRunning= !clockRunning;
})




async function updateClock() {
    let currentTime;
    try{
        let response= await fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata');
        let data = await response.json();
        currentTime= new Date(data.datetime);    // convert api response to date object
    }catch(error){
        console.error("Error fetching time:", error);
        currentTime= new Date(); // Fallback to local time if API fails
    }

        let hour= document.querySelector('#hour');
        let minute= document.querySelector('#min');
        let sec= document.querySelector('#sec');

        hour.style.fontFamily= "digital";
    minute.style.fontFamily= "digital"; 
    sec.style.fontFamily= "digital";

    hour.innerText = String(currentTime.getHours()).padStart(2, '0');
    minute.textContent = String(currentTime.getMinutes()).padStart(2, '0');
    sec.textContent =    String(currentTime.getSeconds()).padStart(2, '0');
    
}
let clockInterval = setInterval(updateClock, 1000);
