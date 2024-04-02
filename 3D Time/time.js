const clockContainer = document.querySelector('.clock-container')

animateClock()
setInterval(animateClock,1000)

function animateClock(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    setDice('h', hours);
    setDice('m', minutes);
    setDice('s', seconds);
    setTime(hours, minutes, seconds)
}

// mouse zoom
document.body.addEventListener("wheel",(e)=>{
    const dir = Math.sign(e.wheelDeltaY);
    const currentValue = clockContainer.style.getPropertyValue('--clock-tz');
    const newValue = Number(currentValue) + (100 * dir);
    clockContainer.style.setProperty('--clock-tz', cap(newValue, 0, 1000) )
})

// mouse rotation
document.body.addEventListener("mousemove",(e)=>{
    const degY = map(e.clientX, 0, window.innerWidth, -45, 45);
    const degX = map(e.clientY, 0, window.innerHeight, 45, -45);
    clockContainer.style.setProperty('--clock-rx', degX )
    clockContainer.style.setProperty('--clock-ry', degY )
})

// mouse leave, reset mouse zoom and rotation
document.body.addEventListener("mouseleave",(e)=>{
    clockContainer.classList.add('smooth-leave');
    clockContainer.style.setProperty('--clock-rx', 0 )
    clockContainer.style.setProperty('--clock-ry', 0 )
    clockContainer.style.setProperty('--clock-tz', 0 )
    setTimeout(()=> clockContainer.classList.remove('smooth-leave'), 250)
})

// helper functions
function setDice(dice, val){
    // first digit
    const digit1 = Math.floor(val/10);
    const digit1top = Math.floor(digit1/2); //top
    const digit1bottom = digit1 - digit1top; //bottom
        
    // second digit
    const digit2 = val % 10;
    const digit2top = Math.floor(digit2/2); //top
    const digit2bottom = digit2 - digit2top; //bottom
    
    // set data-nr
    document.querySelector(`.${dice}1t`).dataset.nr = digit1top
    document.querySelector(`.${dice}1b`).dataset.nr = digit1bottom
    document.querySelector(`.${dice}2t`).dataset.nr = digit2top
    document.querySelector(`.${dice}2b`).dataset.nr = digit2bottom
}

function setTime(h,m,s){
    const timeEl = document.querySelector('.time');
    const hours = String(h).padStart(2,"0");
    const minutes = String(m).padStart(2,"0");
    const seconds = String(s).padStart(2,"0");
    timeEl.innerText = hours + ':' + minutes + ':' + seconds
}

function map(value, in_min, in_max, out_min, out_max){
    value = cap(value, in_min, in_max)
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function cap(value, min, max){
    return Math.min(Math.max(value, min), max)
}