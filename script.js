document.addEventListener('DOMContentLoaded', function(event) {
  //when DOM is ready and loaded

  //select container div
  var div = document.getElementById('container');

  //add container for timer
  var timer = document.createElement('div');
  timer.className += ' timer-container';
  div.appendChild(timer);

  //select form that contains inputs for times
  var form = document.getElementById('input-time');

  //add event listener for submit button
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    var valid = true;
    var time, current, child, countdown;

    var days = form.elements.days.value;
    var hours = form.elements.hours.value;
    var minutes = form.elements.minutes.value;
    var seconds = form.elements.seconds.value;

    countdown = { days: days, hours: hours, minutes: minutes, seconds: seconds };
    console.log(countdown);
    
    for (time in countdown) {
      current = countdown[time];
      if (parseInt(current) === NaN && current !== '' || parseInt(current) < 0) {
        valid = false;
      }
      if (current === '') {
        countdown[time] = 0;
      } else {
        countdown[time] = parseInt(countdown[time]);
      }
    }
    //remove form after submit
    form.parentNode.removeChild(form);
    //append new element
    if (!valid) {
      console.log('in here');
      child = document.createElement('div');
      child.innerHTML = 'Invalid Input';
      div.appendChild(child);
    } else {
      createTimer(countdown);
    }
  });

  //create countdown element
  var createTimer = function(countdown) {
    //convert to timer
    var days = countdown.days;
    var hours = countdown.hours;
    var minutes = countdown.minutes;
    var seconds = countdown.seconds;

    if (seconds >= 60) {
      minutes += Math.floor(seconds / 60);
      seconds = seconds % 60;
    }
    if (minutes >= 60) {
      hours += Math.floor(minutes / 60);
      minutes = minutes % 60;
    }

    if (hours >= 24) {
      days += Math.floor(hours / 24);
      hours = hours % 24;
    }

    countdown.days = days;
    countdown.hours = hours;
    countdown.minutes = minutes;
    countdown.seconds = seconds;

    return createTimerHTML(countdown);
  };

  var createTimerHTML = function(countdown) {

    var container = document.querySelector('.timer-container');
    var unit, time;

    for (time in countdown) {
      unit = document.createElement('div');
      unit.className += ' unit-container';
      unit.innerHTML = '<h4>' + countdown[time] + '</h4>' + '<p>' + time + '</p>';
      container.appendChild(unit);
    }

    var timer = setInterval(function() {
      updateTimer(countdown, timer);
    }, 1000);
  };

  var updateTimer = function(countdown, timer) {
    var container, children, i, child, countdownArr;
    //set conditions for timer
    countdown.seconds -= 1;
    if (countdown.seconds <= 0 && countdown.minutes === 0) {
      countdown.seconds = 0;
    }
    if (countdown.seconds <= 0 && countdown.minutes > 0) {
      countdown.seconds = 59;
      countdown.minutes -= 1;
    }
    if (countdown.minutes <= 0 && countdown.hours > 0) {
      countdown.minutes = 59;
      countdown.hours -= 1;
    }
    if (countdown.hours <= 0 && countdown.days > 0) {
      countdown.hours = 23;
      countdown.days -= 1;
    }

    container = document.querySelector('.timer-container');
    children = container.children;
    countdownArr = [ countdown.days, countdown.hours, countdown.minutes, countdown.seconds ];
    for (i = 0; i < children.length; i++) {
      child = children[i];
      if (child.getElementsByTagName('h4')[0].innerHTML !== countdownArr[i].toString()) {
        child.getElementsByTagName('h4')[0].innerHTML = countdownArr[i].toString();
      }
    }
    if ( countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0) {
      clearInterval(timer);
    }
  };

});