// resets error messages to be hidden again
const errorSite = document.getElementById("siteError");
errorSite.style.display = "none";

// runs start when user wants to begin countdown
var button = document.querySelector("input.btn_start");

if (button)
{
    button.addEventListener("click", start);
}

let seconds;
let countdownInterval;

function start()
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            
            // checks user is watching a video
            if(tabs[0].url.indexOf('www.youtube.com/watch?') > -1)
            {
                seconds = getTime();

                if(seconds > 0)
                {
                    // hides seconds form
                    const divCountdown = document.getElementById("countdownContainer");
                    divCountdown.style.display = "none";
                    const count = document.getElementById("countdown");
                    count.style.display = "block";
                    // starts countdown
                    countdownInterval = setInterval(decreaseTimer, 1000);
                }
                
            }

            else {
                    const errorSite = document.getElementById("siteError");
                    errorSite.style.display = "block";
                }
    });

}

function getTime() {
    const timeInput = document.getElementById("display").value; 
    const [minutes, seconds] = timeInput.split(":").map(Number);
    return minutes * 60 + seconds;
}

function decreaseTimer()
{
    const timer = document.getElementById('countdown');
    const display = document.getElementById("display");

    if (seconds > 0) {
        seconds--;
        const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        timer.textContent = `${mins}:${secs}`;
    } else {
        clearInterval(countdownInterval);
        timer.textContent = "Time's up!";

        // Refresh video
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
        });
    }
}



