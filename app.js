var timeCounterBreak = 5;
var timeCounterActive= 25;
var button = document.getElementById("time-change-button");
var stopstart = document.getElementById("stop-start");
var start = "Start";
var stop = "Stop";
var timeCountDownClear;
var countType = true;

// event Listener for time change buttons(4)
button.addEventListener('click', changeTimer, false);

function changeTimer(e){
  if(e.target !== e.currentTarget){
    let val = e.target.value;
  
    switch (val){

      case "1":
        if (timeCounterBreak > 2){
          timeCounterBreak -= 1
          document.querySelector('.break-timer-span').innerHTML = timeCounterBreak;
        } else {
            // make the user see that minimum break is 2 minutes.
        }
        break;

      case "2":
        if (timeCounterBreak < 99){
        timeCounterBreak += 1
        document.querySelector('.break-timer-span').innerHTML = timeCounterBreak;
        } else {
          // make the user see that minimum break is 99 minutes.
        }
        break;
     
      case "3":
      if (timeCounterActive > 2){
        timeCounterActive -= 1
        document.querySelector('.active-timer-span').innerHTML = timeCounterActive;
        document.querySelector('#time').innerHTML = timeCounterActive + ":00";
      } else {
        // make the user see that minimum break is 2 minutes.
      }
      break;

      case "4":
        if (timeCounterActive < 99){
          timeCounterActive += 1
          document.querySelector('.active-timer-span').innerHTML = timeCounterActive;
          document.querySelector('#time').innerHTML = timeCounterActive + ":00";
        } else {
          // make the user see that minimum break is 2 minutes.
        }
        break;

    }
  }
e.stopPropagation();
};

// event Listener for the stop / start and reset button
stopstart.addEventListener('click', ControlTimer, false);

function ControlTimer(e) {
  console.log(e.target.value);
  if (e.target.value == 6) {
    resetClock();

  } else if (e.target.value == 5){
    var timeNow = timeCounterActive * 60;
    var display = document.querySelector('#time');
    document.querySelector(".startbutton").innerHTML = stop;
    document.querySelector(".startbutton").setAttribute("value", 7);
    document.querySelector(".startbutton").setAttribute("class", "startbutton btn btn-danger btn-lg");
    startTimer(timeNow, display);

  } else if (e.target.value == 7) {
    document.querySelector(".startbutton").innerHTML = start;
    document.querySelector(".startbutton").setAttribute("value", 5);
    document.querySelector(".startbutton").setAttribute("class", "startbutton btn btn-success btn-lg");
    pauseTimer();
  }

  e.stopPropagation();
}


// The counter timer
  function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    console.log(minutes);
    timeCountDownClear = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = timeCounterBreak * 60;
        }
    }, 1000);
  };


// function to reset all things back to page onload status
function resetClock(){
  timeCounterBreak = 5;
  timeCounterActive= 25;
  pauseTimer();
  document.querySelector('.active-timer-span').innerHTML = timeCounterActive;
  document.querySelector('.break-timer-span').innerHTML = timeCounterBreak;
  document.querySelector(".startbutton").innerHTML = start;
  document.querySelector(".startbutton").setAttribute("value", 5);
  document.querySelector(".startbutton").setAttribute("class", "startbutton btn btn-success btn-lg");
  document.querySelector('#time').innerHTML = "25:00";
}


// //Pausing the clock
function pauseTimer(){
console.log("clearInt ran");
clearInterval(timeCountDownClear);
}