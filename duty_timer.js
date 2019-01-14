// Simon Tharby's solution to Odin Project's 'Pomodoro Clock' exercise:
// https://www.theodinproject.com/courses/web-development-101/lessons/pairing-project
// October, 2018

function setLayout() {
  if (screen.width < 2200) { // 'standard' 1080p(ish) desktop
    timerW = 480; // x/y = 96/77
    timerH = 385;
  } else if (screen.width < 4400) { // 4k(ish)+ desktop
    timerW = 720;
    timerH = 578;
  }

  if (window.innerWidth < (timerW * 1.15)) {
    timerW = window.innerWidth / 1.15;
    timerH = timerW * (77/96);
  }

  if (window.innerHeight < (timerH * 1.1)) {
    timerH = window.innerHeight / 1.1;
    timerW = timerH * (96/77);
  }

  topDisplayH = timerH * (1.7 / 11);
  mainDisplayH = timerH * (7 / 11);
  bottomDisplayH = timerH * (2.3 / 11);
}

function drawPage() {
  function styleDefaults(defaultItems) {
    for (let i = 0; i < defaultItems.length; i++) {
      defaultItems[i].style.display = 'inline-block';
      defaultItems[i].style.verticalAlign = 'middle';
      defaultItems[i].style.backgroundColor = backgroundColor;
    }
  }

  function styleLines(lines) {
    for (let i = 0; i < lines.length; i++) {
      lines[i].style.height = `${lineH}px`;
      lines[i].style.backgroundColor = modeColor;
    }
  }

  function styleButons(buttons) {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.height = '100%';
      buttons[i].style.display = 'inline-block';
      buttons[i].style.verticalAlign = 'top';
      buttons[i].style.backgroundColor = modeColor;
    }
  }

  function styleText(text) {
    for (let i = 0; i < text.length; i++) {
      text[i].style.fontSize = `${textH}px`;
      text[i].style.lineHeight = `${textH}px`;
    }
  }

  function styleIncrBtns(incrBtns) {
    for (let i = 0; i < incrBtns.length; i++) {
      incrBtns[i].style.width = '100%';
      incrBtns[i].style.display = 'block';
      if (i < 6) {
        incrBtns[i].style.backgroundColor = onDutyColor;
      } else {
        incrBtns[i].style.backgroundColor = offDutyColor;
      }
      if ( i % 2 == 1) {
        incrBtns[i].style.margin = `${timerH / 105.0}px 0 0 0`;
      }
    }
  }

  function styleSettingsText(settingsText) {
    for (let i = 0; i < settingsText.length; i++) {
      settingsText[i].style.textAlign = 'center';
      settingsText[i].style.display = 'block';
      if (i < 3) {
        settingsText[i].style.color = onDutyColor;
      } else {
        settingsText[i].style.color = offDutyColor;
      }
    }
  }

  function styleTextBoxes(textBoxes) {
    for (let i = 0; i < textBoxes.length; i++) {
      textBoxes[i].style.height = `${textH}px`;
    }
  }

  setLayout();
  lineH = topDisplayH * 0.045;
  bottomLineW = timerW * 0.3;
  lineTopVert = (topDisplayH - lineH) / 2;
  textH = topDisplayH / 2.2;

  if (mode == "settings") {
    timerDisplay.style.display = 'none';
    settingsDisplay.style.display = 'block';
    modeHoverColor = settingsHoverColor;
    modeColor = settingsColor;
    topLineW = timerW * 0.255;
  } else { // mode == "timer"
    settingsDisplay.style.display = 'none';
    timerDisplay.style.display = 'block';
    if (timerMode == "on_duty") {
      modeHoverColor = onDutyHoverColor;
      modeColor = onDutyColor;
      progColor = onDutyProgColor;
      topLineW = timerW * 0.34;
    } else {
      modeHoverColor = offDutyHoverColor;
      modeColor = offDutyColor;
      progColor = offDutyProgColor;
      topLineW = timerW * 0.325
    }
  }

  container.style.width = `${timerW}px`;
  container.style.margin = `${(window.innerHeight - timerH) / 2}px auto`;
  topDisplay.style.height= `${topDisplayH}px`;
  timerDisplay.style.height = `${mainDisplayH}px`;
  settingsDisplay.style.height = `${mainDisplayH}px`;
  bottomDisplay.style.height= `${bottomDisplayH}px`;
  topDisplay.style.lineHeight = `${topDisplayH}px`;
  bottomDisplay.style.lineHeight = `${bottomDisplayH}px`;
  topSettingsContainer.style.lineHeight = `${mainDisplayH / 2}px`;
  bottomSettingsContainer.style.lineHeight = `${mainDisplayH / 2}px`;
  topTimerContainer.style.lineHeight = `${mainDisplayH * 0.75}px`;
  bottomTimerContainer.style.lineHeight = `${mainDisplayH * 0.25}px`;
  bottomDisplay.style.textAlign = "right";

  styleDefaults(defaultItems); // includes lines
  styleLines(lines);
  styleButons(buttons);
  styleText(text);
  styleIncrBtns(incrBtns);
  styleSettingsText(settingsText);
  styleTextBoxes(textBoxes);

  //      Styling common to all 'display' modes .............................

  lineTopL.style.borderRadius = `${lineH / 2}px 0 0 ${lineH / 2}px`;
  lineTopR.style.borderRadius = `0 ${lineH / 2}px ${lineH / 2}px 0`;
  lineBottomL.style.borderRadius = `${lineH / 2}px 0 0 ${lineH / 2}px`;
  lineBottomR.style.borderRadius = `0 ${lineH / 2}px ${lineH / 2}px 0`;
  lineTopL.style.width = `${topLineW}px`;
  lineTopR.style.width = `${topLineW}px`;
  lineBottomL.style.width = `${bottomLineW}px`;
  lineBottomR.style.width = `${bottomLineW}px`;

  titleText.style.textAlign = 'center';
  titleText.style.color = modeColor;
  titleTextBox.style.width = `${timerW - 1 - (topLineW * 2)}px`; // - 1px to prevent layout oveflow due to rounding errors

  bottomControlsBox.style.width = `${timerW - 1 - (bottomLineW * 2)}px`; // - 1px to prevent layout oveflow due to rounding errors
  bottomControlsBox.style.height = `${textH * 1.5}px`;

  soundOn.style.margin = `0 ${timerW / 36}px 0 0`;
  soundOff.style.margin = `0 ${timerW / 36}px 0 0`;
  reset.style.margin = `0 ${timerW / 30}px 0 0`;
  stop.style.margin = `0 ${timerW / 30}px 0 0`;
  play.style.margin = `0 ${timerW / 23}px 0 0`;
  pause.style.margin = `0 ${timerW / 23}px 0 0`;

  //     'Display', 'header' & 'footer' styling ...........................

  if (mode == "settings") {
    titleText.innerHTML = "DUTY SETTINGS";
    stop.style.display = 'none';
    pause.style.display = 'none';
    play.style.display = 'inline-block';
    reset.style.display = 'inline-block';
    play.title = 'start timer';
  } else if (mode == "timer") {
    stop.style.display = 'inline-block';
    reset.style.display = 'none';
    play.title = 'resume countdown';
    if (timerMode == "on_duty") {
      titleText.innerHTML = "ON DUTY";
    } else {
      titleText.innerHTML = "OFF DUTY";
    }
    if (paused == false) {
      pause.style.display = 'inline-block';
      play.style.display = 'none';
    } else {
      play.style.display = 'inline-block';
      pause.style.display = 'none';
    }
  }

  if (mute == false) {
    soundOff.style.display = 'none';
    soundOn.style.display = 'inline-block';
  } else {
    soundOn.style.display = 'none';
    soundOff.style.display = 'inline-block';
  }

  if (mode == "settings") { // ... Settings container contents ..............
    topSettingsContainer.style.height = `${mainDisplayH / 2}px`;
    bottomSettingsContainer.style.height = `${mainDisplayH / 2}px`;
    topSettingsTextBox.style.width = `${timerW / 2.25}px`;
    bottomSettingsTextBox.style.width = `${timerW / 2.25}px`;
    topSettingsText.style.textAlign = 'right';
    topSettingsText.innerHTML = "ON DUTY:";
    topSettingsText.style.color = onDutyColor;
    topSettingsText.style.margin = `0 ${timerW / 23}px 0 0`;
    bottomSettingsText.style.textAlign = 'right';
    bottomSettingsText.innerHTML = "OFF DUTY:";
    bottomSettingsText.style.color = offDutyColor;
    bottomSettingsText.style.margin = `0 ${timerW / 23}px 0 0`;
    topSettingsHourBox.style.width = `${timerW / 13}px`;
    topSettingsHourBox.style.height = `${textH * 3}px`;
    topSettingsTenBox.style.width = `${timerW / 13}px`;
    topSettingsTenBox.style.height = `${textH * 3}px`;
    topSettingsMinBox.style.width = `${timerW / 13}px`;
    topSettingsMinBox.style.height = `${textH * 3}px`;
    document.getElementById('topSettingsHourBox').appendChild(incrBtns[0]);
    document.getElementById('topSettingsHourBox').appendChild(topHourSetText);
    topHourSetText.style.margin = `${timerH / 105}px 0 0 0`;
    document.getElementById('topSettingsHourBox').appendChild(incrBtns[1]);
    topSettingsHTextBox.style.width = `${timerW / 10}px`;
    topSettingsHText.style.textAlign = 'left';
    topSettingsHText.innerHTML = "h";
    topSettingsHText.style.margin = `0 0 0 ${timerW / 75}px`;
    topSettingsHText.style.color = onDutyColor;
    document.getElementById('topSettingsTenBox').appendChild(incrBtns[2]);
    document.getElementById('topSettingsTenBox').appendChild(topTenSetText);
    topTenSetText.style.margin = `${timerH / 105}px 0 0 0`;
    document.getElementById('topSettingsTenBox').appendChild(incrBtns[3]);
    document.getElementById('topSettingsMinBox').appendChild(incrBtns[4]);
    document.getElementById('topSettingsMinBox').appendChild(topMinSetText);
    topMinSetText.style.margin = `${timerH / 105}px 0 0 0`;
    document.getElementById('topSettingsMinBox').appendChild(incrBtns[5]);
    topSettingsMinTextBox.style.width = `${timerW / 24}px`;
    topSettingsMinText.style.textAlign = 'right';
    topSettingsMinText.innerHTML = "m";
    topSettingsMinText.style.color = onDutyColor;
    bottomSettingsHourBox.style.width = `${timerW / 13}px`;
    bottomSettingsHourBox.style.height = `${textH * 3}px`;
    bottomSettingsTenBox.style.width = `${timerW / 13}px`;
    bottomSettingsTenBox.style.height = `${textH * 3}px`;
    bottomSettingsMinBox.style.width = `${timerW / 13}px`;
    bottomSettingsMinBox.style.height = `${textH * 3}px`;
    document.getElementById('bottomSettingsHourBox').appendChild(incrBtns[6]);
    document.getElementById('bottomSettingsHourBox').appendChild(bottomHourSetText);
    bottomHourSetText.style.margin = `${timerH / 105}px 0 0 0`;
    document.getElementById('bottomSettingsHourBox').appendChild(incrBtns[7]);
    bottomSettingsHTextBox.style.width = `${timerW / 10}px`;
    bottomSettingsHText.style.textAlign = 'left';
    bottomSettingsHText.innerHTML = "h";
    bottomSettingsHText.style.margin = `0 0 0 ${timerW / 75}px`;
    bottomSettingsHText.style.color = offDutyColor;

    resetSettings();

    document.getElementById('bottomSettingsTenBox').appendChild(incrBtns[8]);
    document.getElementById('bottomSettingsTenBox').appendChild(bottomTenSetText);
    bottomTenSetText.style.margin = `${timerH / 105}px 0 0 0`;
    document.getElementById('bottomSettingsTenBox').appendChild(incrBtns[9]);
    document.getElementById('bottomSettingsMinBox').appendChild(incrBtns[10]);
    document.getElementById('bottomSettingsMinBox').appendChild(bottomMinSetText);
    bottomMinSetText.style.margin = `${timerH / 105}px 0 0 0`;
    document.getElementById('bottomSettingsMinBox').appendChild(incrBtns[11]);
    bottomSettingsMinTextBox.style.width = `${timerW / 24}px`;
    bottomSettingsMinText.style.textAlign = 'right';
    bottomSettingsMinText.innerHTML = "m";
    bottomSettingsMinText.style.color = offDutyColor;

  } else { // mode == "timer" ... Timer container contents ...................
    topTimerContainer.style.height = `${mainDisplayH * 0.75}px`;
    bottomTimerContainer.style.height = `${mainDisplayH * 0.25}px`;
    timerDigitsTextBox.style.height = `70%`;
    timerDigitsTextBox.style.width = `${timerW * 0.8}px`;
    timerDigitsTextBox.style.display = 'inline-block';
    timerDigitsTextBox.style.margin = '5.5% 10% 5.5% 10%';
    timerDigitsText.innerHTML = timerText;
    timerDigitsText.style.color = modeColor;
    timerDigitsText.style.fontSize = `${textH * 4}px`;
    timerDigitsText.style.textAlign = 'center';
    timerDigitsText.style.lineHeight = `${mainDisplayH * 0.525}px`;

    progressBarBack.style.height = `20%`;
    progressBarBack.style.width = `${timerW * 0.76}px`;
    progressBarBack.style.display = 'inline-block';
    progressBarBack.style.margin = '4% 12% 7% 12%';
    progressBarBack.style.backgroundColor = progColor;
    progressBarBack.style.borderRadius = `${textH}px`;

    progressBar.style.zIndex = "-1";
    progressBar.style.height = `100%`;
    progressBar.style.width = `${timerW * (0.025 + progBarW)}px`; // 0.025 min, 0.76 max factor
    progressBar.style.backgroundColor = modeColor;
    progressBar.style.borderRadius = `${textH}px`;
  }
}

// ---------- Styling that may be called inside & outside drawPage() ---------

function resetSettings() {
  topHourSetText.innerHTML = hourOnD.toString();
  topTenSetText.innerHTML = tenMinOnD.toString();
  topMinSetText.innerHTML = minOnD.toString();
  bottomHourSetText.innerHTML = hourOffD.toString();
  bottomTenSetText.innerHTML = tenMinOffD.toString();
  bottomMinSetText.innerHTML = minOffD.toString();
}

// ---------- Button actions -------------------------------------------------

function btnHover() {
  let thisID = this.id;
  document.getElementById(`${thisID}`).style.backgroundColor = modeHoverColor;
}

function btnUnHover() {
  let thisID = this.id;
  document.getElementById(`${thisID}`).style.backgroundColor = modeColor;
}

function incrHover() {
  let thisID = this.id;
  if (parseInt(thisID) < 6) {
    document.getElementById(`${thisID}`).style.backgroundColor = onDutyHoverColor;
  } else {
    document.getElementById(`${thisID}`).style.backgroundColor = offDutyHoverColor;
  }
}

function incrUnHover() {
  let thisID = this.id;
  if (parseInt(thisID) < 6) {
    document.getElementById(`${thisID}`).style.backgroundColor = onDutyColor;
  } else {
    document.getElementById(`${thisID}`).style.backgroundColor = offDutyColor;
  }
}

function clickPlay() {
  if (mode == "settings") {
    if ((hourOnD == 0 && tenMinOnD == 0 && minOnD == 0) ||
      (hourOffD == 0 && tenMinOffD == 0 && minOffD == 0)) {
      window.alert('Timer(s) cannot start at 0:00!');
    } else {
      onDutyTotal = (hourOnD * 3600) + (tenMinOnD * 600) + (minOnD * 60);
      offDutyTotal = (hourOffD * 3600) + (tenMinOffD * 600) + (minOffD * 60);
      onDutyCurrent = onDutyTotal;
      offDutyCurrent = offDutyTotal;
      timerText = parseTimerText(onDutyCurrent);
      run = setInterval(everySecond, 1000);
      mode = "timer";
      progBarW = 0.735
      drawPage();
    }
  } else {
    paused = false;
    timerDigitsText.innerHTML = timerText;
    clearInterval(blink);
    run = setInterval(everySecond, 1000);
    play.style.display = 'none';
    pause.style.display = 'inline-block';
  }
}

function clickStop() {
  paused = false;
  clearInterval(blink);
  clearInterval(run);
  mode = "settings";
  timerMode = "on_duty";
  drawPage();
}

function clickMute() {
  clearInterval(alert);
  mute = true;
  alert.volume = 0.0;
  soundOn.style.display = 'none';
  soundOff.style.display = 'inline-block';
}

function clickUnmute() {
  mute = false;
  alert.volume = 1.0;
  soundOff.style.display = 'none';
  soundOn.style.display = 'inline-block';
}

function clickReset() {
  hourOnD = 0; tenMinOnD = 2; minOnD = 5;
  hourOffD = 0; tenMinOffD = 0; minOffD = 5;
  resetSettings();
}

function clickPause() {
  paused = true;
  clearInterval(run);
  blink = setInterval(blinkTimer, 500);
  pause.style.display = 'none';
  play.style.display = 'inline-block';
}

function clickIncr(thisID) {
  if (thisID == 0) {
    hourOnD = (hourOnD + 1) % 10;
    topHourSetText.innerHTML = hourOnD.toString();
  } else if (thisID == 1) {
    hourOnD = (hourOnD + 9) % 10;
    topHourSetText.innerHTML = hourOnD.toString();
  } else if (thisID == 2) {
    tenMinOnD = (tenMinOnD + 1) % 6;
    topTenSetText.innerHTML = tenMinOnD.toString();
  } else if (thisID == 3) {
    tenMinOnD = (tenMinOnD + 5) % 6;
    topTenSetText.innerHTML = tenMinOnD.toString();
  } else if (thisID == 4) {
    minOnD = (minOnD + 1) % 10;
    topMinSetText.innerHTML = minOnD.toString();
  } else if (thisID == 5) {
    minOnD = (minOnD + 9) % 10;
    topMinSetText.innerHTML = minOnD.toString();
  } else if (thisID == 6) {
    hourOffD = (hourOffD + 1) % 10;
    bottomHourSetText.innerHTML = hourOffD.toString();
  } else if (thisID == 7) {
    hourOffD = (hourOffD + 9) % 10;
    bottomHourSetText.innerHTML = hourOffD.toString();
  } else if (thisID == 8) {
    tenMinOffD = (tenMinOffD + 1) % 6;
    bottomTenSetText.innerHTML = tenMinOffD.toString();
  } else if (thisID == 9) {
    tenMinOffD = (tenMinOffD + 5) % 6;
    bottomTenSetText.innerHTML = tenMinOffD.toString();
  } else if (thisID == 10) {
    minOffD = (minOffD + 1) % 10;
    bottomMinSetText.innerHTML = minOffD.toString();
  } else if (thisID == 11) {
    minOffD = (minOffD + 9) % 10;
    bottomMinSetText.innerHTML = minOffD.toString();
  }
}

// ---------- timer functions ------------------------------------------------

function everySecond() {
  let progBarFactor = 0;

  if (timerMode == "on_duty") {
    onDutyCurrent--;
    timerText = parseTimerText(onDutyCurrent);
    progBarFactor = (onDutyCurrent - 1) / (onDutyTotal - 1);
    progBarW = 0.735 * progBarFactor;
    if (onDutyCurrent == 0) {
      if (mute == false) {
        alarmRepeat = setAlarmRepeat;
        playAlarm();
        alarm = setInterval(playAlarm, 3000);
      }
      onDutyCurrent = onDutyTotal;
      timerText = parseTimerText(offDutyCurrent);
      progBarW = 0.735;
      timerMode = "off_duty";
      // insert call alarm (if mute == false)
      drawPage();
    }
  } else {
    offDutyCurrent--;
    timerText = parseTimerText(offDutyCurrent);
    progBarFactor = (offDutyCurrent - 1) / (offDutyTotal - 1);
    progBarW = 0.735 * progBarFactor;
    if (offDutyCurrent == 0) {
      if (mute == false) {
        alarmRepeat = setAlarmRepeat;
        playAlarm();
        alarm = setInterval(playAlarm, 3000);
      }
      offDutyCurrent = offDutyTotal;
      timerText = parseTimerText(onDutyCurrent);
      progBarW = 0.735
      timerMode = "on_duty";
      // insert call alarm (if mute == false)
      drawPage();
    }
  }
  progressBar.style.width = `${timerW * (0.025 + progBarW)}px`; // 0.025 min, 0.76 max factor
  timerDigitsText.innerHTML = timerText;
}

function parseTimerText(seconds) {
  let hours = 0;
  let mins = 0;
  let m = "";
  let s = ""

  hours = Math.floor(seconds / 3600);
  seconds = seconds - (3600 * hours);
  minutes = Math.floor(seconds / 60);
  seconds = seconds - (60 * minutes);

  if (minutes < 10 && hours > 0) {
    m = `0${minutes}`;
  } else m = `${minutes}`;

  if (seconds < 10) {
    s = `0${seconds}`;
  } else {
    s = `${seconds}`;
  }

  if (hours > 0) {
    return `${hours}:${m}:${s}`;
  } else {
    return `${m}:${s}`;
  }
}

function blinkTimer() {
  if (timerDigitsText.innerHTML == "") {
    timerDigitsText.innerHTML = timerText;
  } else {
    timerDigitsText.innerHTML = "";
  }
}

function playAlarm() {
  if (alarmRepeat > 0) {
    alert.play();
    alarmRepeat--;
  } else {
    clearInterval(alert);
  }
}

// ---------- initial declarations and commands ------------------------------

let timerW = 0;
let timerH = 0;
let bottomDisplayH = 0;
let topDisplayH = 0;
let mainDisplayH = 0;
let lineH = 0;
let topLineW = 0;
let bottomLineW = 0;
let lineTopVert = 0;
let textH = 0;
let progBarW = 0.735;

let mode = "settings"; // "settings" or "timer"
let timerMode = "on_duty"; // "on_duty" or "off_duty"
let mute = false;
let alarmRepeat = 0;
let setAlarmRepeat = 3;

let hourOnD = 0;
let tenMinOnD = 2;
let minOnD = 5;
let hourOffD = 0;
let tenMinOffD = 0;
let minOffD = 5;

let onDutyTotal = 0; // start value in seconds
let onDutyCurrent = 0; // current value in seconds
let offDutyTotal = 0;
let offDutyCurrent = 0;

let timerText = "";

let run = true;
let blink = true;
let paused = false;

let backgroundColor = "black";
let settingsColor = "hsl(28, 100%, 55%)";
let settingsHoverColor = "hsl(28, 100%, 35%)";
let onDutyColor = "hsl(215, 100%, 60%)";
let onDutyHoverColor = "hsl(215, 100%, 40%)";
let onDutyProgColor = "hsl(215, 50%, 15%)";
let offDutyColor = "hsl(104, 60%, 45%)";
let offDutyHoverColor = "hsl(104, 60%, 25%)";
let offDutyProgColor = "hsl(104, 30%, 10%)";

let modeColor = settingsColor;
let modeHoverColor = settingsHoverColor;
let progColor = onDutyProgColor;

let alert = new Audio('./audio/alert.mp3');

let body = document.getElementsByTagName('body')[0];
let topHourSetText = document.createElement("p");
let topTenSetText = document.createElement("p");
let topMinSetText = document.createElement("p");
let bottomHourSetText = document.createElement("p");
let bottomTenSetText = document.createElement("p");
let bottomMinSetText = document.createElement("p");

let play = document.createElement('img');
play.src = 'img/playMask.png';
let pause = document.createElement('img');
pause.src = 'img/pauseMask.png';
let reset = document.createElement('img');
reset.src = 'img/resetMask.png';
let stop = document.createElement('img');
stop.src = 'img/stopMask.png';
let soundOn = document.createElement('img');
soundOn.src = 'img/soundOnMask.png';
let soundOff = document.createElement('img');
soundOff.src = 'img/soundOffMask.png';

let clickPlayAtt = document.createAttribute("onclick");
clickPlayAtt.value = "clickPlay()";
play.setAttributeNode(clickPlayAtt);
let clickStopAtt = document.createAttribute("onclick");
clickStopAtt.value = "clickStop()";
stop.setAttributeNode(clickStopAtt);
let clickMuteAtt = document.createAttribute("onclick");
clickMuteAtt.value = "clickMute()";
soundOn.setAttributeNode(clickMuteAtt);
let clickUnmuteAtt = document.createAttribute("onclick");
clickUnmuteAtt.value = "clickUnmute()";
soundOff.setAttributeNode(clickUnmuteAtt);
let clickResetAtt = document.createAttribute("onclick");
clickResetAtt.value = "clickReset()";
reset.setAttributeNode(clickResetAtt);
let clickPauseAtt = document.createAttribute("onclick");
clickPauseAtt.value = "clickPause()";
pause.setAttributeNode(clickPauseAtt);

let incrBtns = [];
let clickIncrAtts = [];

for (i = 0; i < 12; i++) {
  incrBtns[i] = document.createElement('img');
  if (i % 2 == 0) {
    incrBtns[i].src = 'img/incrUpMask.png';
  } else {
    incrBtns[i].src = 'img/incrDnMask.png';
  }
  incrBtns[i].id = i.toString();
  incrBtns[i].addEventListener('mouseover', incrHover);
  incrBtns[i].addEventListener('mouseout', incrUnHover);
  clickIncrAtts[i] = document.createAttribute("onclick");
  clickIncrAtts[i].value = `clickIncr(${i})`;
  incrBtns[i].setAttributeNode(clickIncrAtts[i]);
}

let defaultItems = [lineTopL, lineTopR, titleTextBox, lineBottomL, lineBottomR,
    bottomControlsBox, topSettingsTextBox, bottomSettingsTextBox,
    topSettingsHourBox, topSettingsHTextBox, topSettingsTenBox,
    topSettingsMinBox, topSettingsMinTextBox, bottomSettingsHourBox,
    bottomSettingsHTextBox, bottomSettingsTenBox, bottomSettingsMinBox,
    bottomSettingsMinTextBox];
let lines = [lineTopL, lineTopR, lineBottomL, lineBottomR];
let buttons = [play, pause, reset, stop, soundOn, soundOff];
let buttonLabels = ['play', 'pause', 'reset', 'stop', 'soundOn', 'soundOff'];
let text = [titleText, topSettingsText, bottomSettingsText, topHourSetText,
    topSettingsHText, topTenSetText, topMinSetText, topSettingsMinText,
    bottomHourSetText, bottomSettingsHText, bottomTenSetText, bottomMinSetText,
    bottomSettingsMinText];
let settingsText = [topHourSetText, topTenSetText, topMinSetText,
    bottomHourSetText, bottomTenSetText, bottomMinSetText];
let textBoxes = [titleTextBox, topSettingsTextBox, bottomSettingsTextBox,
    topSettingsHTextBox, topSettingsMinTextBox, bottomSettingsHTextBox,
    bottomSettingsMinTextBox];
let backgroundElements = [body, container, topDisplay, settingsDisplay,
    timerDisplay, bottomDisplay, bottomControlsBox, titleTextBox,
    topSettingsContainer, bottomSettingsContainer, topSettingsTextBox,
    bottomSettingsTextBox, topSettingsHourBox, topSettingsHTextBox,
    topSettingsTenBox, topSettingsMinBox, topSettingsMinTextBox,
    bottomSettingsHourBox, bottomSettingsHTextBox, bottomSettingsTenBox,
    bottomSettingsMinBox, bottomSettingsMinTextBox, topTimerContainer,
    bottomTimerContainer, timerDigitsTextBox];

for (i = 0; i < buttons.length; i++) {
  buttons[i].id = buttonLabels[i];
  buttons[i].addEventListener('mouseover', btnHover);
  buttons[i].addEventListener('mouseout', btnUnHover);
}

for (i = 0; i < backgroundElements.length; i++) {
  backgroundElements[i].style.backgroundColor = backgroundColor;
}

document.getElementById('bottomControlsBox').appendChild(soundOn);
document.getElementById('bottomControlsBox').appendChild(soundOff);
document.getElementById('bottomControlsBox').appendChild(reset);
document.getElementById('bottomControlsBox').appendChild(stop);
document.getElementById('bottomControlsBox').appendChild(play);
document.getElementById('bottomControlsBox').appendChild(pause);

soundOn.title = 'mute alarm';
soundOff.title = 'unmute alarm';
reset.title = 'reset defaults';
stop.title = 'stop and reset timer';
pause.title = 'pause timer';

alert.volume = 1.0;

body.style.fontFamily = "'Ubuntu Mono', monospace";
body.style.fontWeight = "normal";
container.style.margin = "auto";

drawPage(); // Also called whenever window (body) is resized
