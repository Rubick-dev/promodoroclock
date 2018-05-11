var display = document.querySelector('#time');  //Selects teh display area for the count down time
var breakTimeDisplay = 5; // time display for break timer
var breakCurrentTime = breakTimeDisplay * 60; // time calculation for countdown timer for break
var activeTimeDisplay = 25; // time display for acive timer
var activeCurrentTime = activeTimeDisplay * 60; // time calculation for countdown timer for active
var button = document.getElementById("time-change-button");
var stopstart = document.getElementById("stop-start");
var currentTimer; //used when clock is paused
var timeCountDownClear;  // Set interval variable
var currentCountType = null; //Null = timer not started, Active = True and Break = False
var timeNow; //timer used when doing count down

// event Listener for time change buttons(4)
button.addEventListener('click', changeTimer, false);

function changeTimer(e){
  if(e.target !== e.currentTarget){
    let val = e.target.value;
  
    switch (val){

      case "1":
        if (breakTimeDisplay > 2){
          breakTimeDisplay -= 1
          breakCurrentTime = breakTimeDisplay * 60;
          document.querySelector('.break-timer-span').innerHTML = breakTimeDisplay;
        } else {
            // make the user see that minimum break is 2 minutes.
        }
        break;

      case "2":
        if (breakTimeDisplay < 99){
        breakTimeDisplay += 1
        breakCurrentTime = breakTimeDisplay * 60;
        document.querySelector('.break-timer-span').innerHTML = breakTimeDisplay;
        } else {
          // make the user see that minimum break is 99 minutes.
        }
        break;
     
      case "3":
      if (activeTimeDisplay > 2){
        activeTimeDisplay -= 1
        activeCurrentTime = activeTimeDisplay * 60;
        document.querySelector('.active-timer-span').innerHTML = activeTimeDisplay;
        document.querySelector('#time').innerHTML = activeTimeDisplay + ":00";
      } else {
        // make the user see that minimum break is 2 minutes.
      }
      break;

      case "4":
        if (activeTimeDisplay < 99){
          activeTimeDisplay += 1
          activeCurrentTime = activeTimeDisplay * 60;
          document.querySelector('.active-timer-span').innerHTML = activeTimeDisplay;
          document.querySelector('#time').innerHTML = activeTimeDisplay + ":00";
        } else {
          // make the user see that minimum break is 2 minutes.
        }
        break;
    }
  }
  e.stopPropagation();
};

// event Listener for the stop / start / reset buttons
stopstart.addEventListener('click', controlTimer, false);

function controlTimer(e) {
  
  console.log(e.target.value + " click target value");
  if (e.target.value == 6) { // Hitting the reset button
    resetClock();

  } else if (e.target.value == 5){ //Hitting the start button
    disableButtons();
    if (currentCountType == null) { //For first time running the clock, sets currentConentType to Active Clock
      changeStartButton();
      currentCountType = true
      timeNow = activeCurrentTime;
      startTimer(timeNow, display);

    } else if (currentCountType) { // runs when start is clicked after pause
      changeStartButton();
      timeNow = currentTimer;
      startTimer(timeNow, display);

    } else if(!currentCountType) { // Runs when start is clicked afer pause when currentContentType is false and set to break
      changeStartButton();
      timeNow = currentTimer;
      startTimer(timeNow, display);

    } else {
      console.log("Houston we have a problem - this conditional should never run");
    }
  
  } else if (e.target.value == 7) { //hitting the pause button
    document.querySelector(".startbutton").innerHTML = "Start";
    document.querySelector(".startbutton").setAttribute("value", 5);
    document.querySelector(".startbutton").setAttribute("class", "startbutton btn btn-success btn-lg");
    pauseTimer();
  }
  e.stopPropagation();
}


// The Active & Break counter timer
  function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    console.log(duration + " current duration iteration");
    timeCountDownClear = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        currentTimer = timer;

        if (--timer < 0) {
          pauseTimer();
          console.log(currentCountType + " current counter type before 0 time toggle")
          currentCountType = currentCountType == true ? false : true;
          console.log(currentCountType + " current counter type after toggle")
          if  (currentCountType) {
            timeNow = activeCurrentTime;
            document.querySelector('.tt').textContent = "Active";
            startTimer(timeNow, display);
          } else {
            timeNow = breakCurrentTime;
            document.querySelector('.tt').textContent = "Break";
            startTimer(timeNow, display); 
          }
        }
    }, 1000);
  };


// function to reset all things back to page onload status
function resetClock(){
  pauseTimer();
  breakTimeDisplay = 5;
  breakCurrentTime = breakTimeDisplay * 60;
  activeTimeDisplay = 25;
  activeCurrentTime = activeTimeDisplay * 60;
  currentCountType = null;
  currentTimer = activeCurrentTime;
  document.querySelector('.active-timer-span').innerHTML = activeTimeDisplay;
  document.querySelector('.break-timer-span').innerHTML = breakTimeDisplay;
  document.querySelector(".startbutton").innerHTML = "Start";
  document.querySelector(".startbutton").setAttribute("value", 5, "class");
  document.querySelector(".startbutton").setAttribute("class", "startbutton btn btn-success btn-lg");
  document.querySelector('#time').innerHTML = "25:00";
  enableButtons();
  console.log("reset buitton stats" + activeCurrentTime + " activeCurrentTimer" + activeTimeDisplay + " activeTimeDisplay variable value");
  console.log("reset buitton stats" + currentTimer + " currentTimer" + timeNow + " timeNow");
};


// //Pausing the clock
function pauseTimer(){
console.log("clearInt ran");
clearInterval(timeCountDownClear);
};


// Disable break and asvtive timer buttons
function disableButtons(){
  document.querySelector(".reduce-break").setAttribute("disabled", "true");
  document.querySelector(".increase-break").setAttribute("disabled", "true");
  document.querySelector(".reduce-session").setAttribute("disabled", "true");
  document.querySelector(".increase-session").setAttribute("disabled", "true");
};


// Enable buttons
function enableButtons(){
  document.querySelector(".reduce-break").removeAttribute("disabled");
  document.querySelector(".increase-break").removeAttribute("disabled");
  document.querySelector(".reduce-session").removeAttribute("disabled");
  document.querySelector(".increase-session").removeAttribute("disabled");
};


// change button back to start button
function changeStartButton(){
  document.querySelector(".startbutton").innerHTML = "Pause";
  document.querySelector(".startbutton").setAttribute("value", 7);
  document.querySelector(".startbutton").setAttribute("class", "startbutton btn btn-warning btn-lg");
  console.log(timeNow + " time left on currentCount");
  console.log(currentCountType + " is currentContentType(True for Active, False for Break, Null for firstime start");
};