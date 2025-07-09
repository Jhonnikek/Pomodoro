const noti = new Audio('./sounds/noti.wav'); 
const startBtn = document.querySelector('.btn-start'); 
const session = document.querySelector('.minutes'); 
const message = document.querySelector('.app-message');
let myInterval; 
let state = true;

const appTimer = () => {
    const sessionAmount = Number.parseInt(session.textContent)

    if(state) {
    state = false;
    noti.pause();
    noti.currentTime = 0;
    message.textContent = 'RUNNING';
    message.classList.remove('flashing');
    let totalSeconds = sessionAmount * 60;

    const updateSeconds = () => {
        const minuteDiv = document.querySelector('.minutes');
        const secondDiv = document.querySelector('.seconds');

        totalSeconds--;

        let minutesLeft = Math.floor(totalSeconds/60);
        let secondsLeft = totalSeconds % 60;

        if(secondsLeft < 10) {
            secondDiv.textContent = '0' + secondsLeft;
        } else {
            secondDiv.textContent = secondsLeft;
        }
        minuteDiv.textContent = `${minutesLeft}`

        if(minutesLeft === 0 && secondsLeft === 0) {
            noti.play()
            clearInterval(myInterval);
            state = true;
            startBtn.textContent = 'Start';
            message.textContent = 'PRESS START';
            message.classList.add('flashing');
            setTimeout(() => {
                minuteDiv.textContent = sessionAmount;
                secondDiv.textContent = '00';
            }, 1000);
        }
    }
    myInterval = setInterval(updateSeconds, 1000);
    } else {
    alert('Has already started.')
    }
}

startBtn.addEventListener('click', appTimer);
