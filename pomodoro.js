//

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
      defaultItems[i].style.backgroundColor = modeColor;
    }
  }

  function styleLines(lines) {
    for (let i = 0; i < lines.length; i++) {
      lines[i].style.height = `${lineH}px`;
    }
  }

  function styleButons(buttons) {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.height = '100%';
      buttons[i].style.display = 'inline-block';
      buttons[i].style.verticalAlign = 'top';
      if (mode == "settings") {
        buttons[i].style.backgroundColor = settingsColor;
      } else if (mode == "on_duty") {
        buttons[i].style.backgroundColor = onDutyColor;
      } else {
        buttons[i].style.backgroundColor = offDutyColor;
      }
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
  textH = topDisplayH / 2.2; // ?change to 'textH'?

  if (mode == "settings") {
    timerDisplay.style.display = 'none';
    settingsDisplay.style.display = 'block';
    modeHoverColor = settingsHoverColor;
    modeColor = settingsColor;
    topLineW = timerW * 0.255;
  } else {
    settingsDisplay.style.display = 'none';
    timerDisplay.style.display = 'block';
    if (mode == "on_duty") {
      modeHoverColor = onDutyHoverColor;
      modeColor = onDutyColor;
      topLineW = timerW * 0.34;
    } else {
      modeHoverColor = offDutyHoverColor;
      modeColor = offDutyColor;
      topLineW = timerW * 0.3 // guess... check
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

  // This block can all be set to 'black' when layout finalized -------------
  container.style.backgroundColor = containerBgColor;
  topDisplay.style.backgroundColor = dispBbgColor;
  settingsDisplay.style.backgroundColor = settingsDispBbgColor;
  timerDisplay.style.backgroundColor = mainDisplayBgColor;
  body.style.background = bodyBgColor;
  bottomDisplay.style.backgroundColor = dispAbgColor;
  bottomControlsBox.style.backgroundColor = mainDisplayBgColor;
  titleTextBox.style.backgroundColor = mainDisplayBgColor;
  topSettingsContainer.style.backgroundColor = mainDisplayBgColor;
  bottomSettingsContainer.style.backgroundColor = settingsDispBbgColor;
  topSettingsTextBox.style.backgroundColor = settingsDispBbgColor;
  bottomSettingsTextBox.style.backgroundColor = mainDisplayBgColor;
  topSettingsHourBox.style.backgroundColor = settingsDispBbgColor;
  topSettingsHTextBox.style.backgroundColor = settingsDispBbgColor;
  topSettingsTenBox.style.backgroundColor = settingsDispBbgColor;
  topSettingsMinBox.style.backgroundColor = settingsDispBbgColor;
  topSettingsMinTextBox.style.backgroundColor = settingsDispBbgColor;
  bottomSettingsHourBox.style.backgroundColor = mainDisplayBgColor;
  bottomSettingsHTextBox.style.backgroundColor = mainDisplayBgColor;
  bottomSettingsTenBox.style.backgroundColor = mainDisplayBgColor;
  bottomSettingsMinBox.style.backgroundColor = mainDisplayBgColor;
  bottomSettingsMinTextBox.style.backgroundColor = mainDisplayBgColor;
  topTimerContainer.style.backgroundColor = mainDisplayBgColor;
  bottomTimerContainer.style.backgroundColor = settingsDispBbgColor;
  // ------------------------------------------------------------------------

  //      Styling common to all 'display' modes

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

  document.getElementById('bottomControlsBox').appendChild(soundOn);
  soundOn.style.margin = `0 ${timerW / 36}px 0 0`;

  document.getElementById('bottomControlsBox').appendChild(reset);
  reset.style.margin = `0 ${timerW / 30}px 0 0`;

  document.getElementById('bottomControlsBox').appendChild(stop);
  stop.style.margin = `0 ${timerW / 30}px 0 0`;

  document.getElementById('bottomControlsBox').appendChild(play);
  play.style.margin = `0 ${timerW / 23}px 0 0`;

  document.getElementById('bottomControlsBox').appendChild(pause);
  pause.style.margin = `0 ${timerW / 23}px 0 0`;

  //     'Display', 'header' & 'footer' styling ...........................

  if (mode == "settings") {
    titleText.innerHTML = "DUTY SETTINGS";
    stop.style.display = 'none';
    pause.style.display = 'none';
    play.style.display = 'inline-block';
    reset.style.display = 'inline-block';
  } else if (mode == "on_duty") { // Refactor when add on/off duty stylings
    titleText.innerHTML = "ON DUTY";
    stop.style.display = 'inline-block';
    pause.style.display = 'inline-block';
    play.style.display = 'none';
    reset.style.display = 'none';
  }

  //      Settings container contents .......................................

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
  topHourSetText.innerHTML = "0";
  topHourSetText.style.margin = `${timerH / 105}px 0 0 0`;

  document.getElementById('topSettingsHourBox').appendChild(incrBtns[1]);

  topSettingsHTextBox.style.width = `${timerW / 10}px`;

  topSettingsHText.style.textAlign = 'left';
  topSettingsHText.innerHTML = "h";
  topSettingsHText.style.margin = `0 0 0 ${timerW / 75}px`;
  topSettingsHText.style.color = onDutyColor;

  document.getElementById('topSettingsTenBox').appendChild(incrBtns[2]);

  document.getElementById('topSettingsTenBox').appendChild(topTenSetText);
  topTenSetText.innerHTML = "2";
  topTenSetText.style.margin = `${timerH / 105}px 0 0 0`;

  document.getElementById('topSettingsTenBox').appendChild(incrBtns[3]);

  document.getElementById('topSettingsMinBox').appendChild(incrBtns[4]);

  document.getElementById('topSettingsMinBox').appendChild(topMinSetText);
  topMinSetText.innerHTML = "5";
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
  bottomHourSetText.innerHTML = "0";
  bottomHourSetText.style.margin = `${timerH / 105}px 0 0 0`;

  document.getElementById('bottomSettingsHourBox').appendChild(incrBtns[7]);

  bottomSettingsHTextBox.style.width = `${timerW / 10}px`;

  bottomSettingsHText.style.textAlign = 'left';
  bottomSettingsHText.innerHTML = "h";
  bottomSettingsHText.style.margin = `0 0 0 ${timerW / 75}px`;
  bottomSettingsHText.style.color = offDutyColor;

  document.getElementById('bottomSettingsTenBox').appendChild(incrBtns[8]);

  document.getElementById('bottomSettingsTenBox').appendChild(bottomTenSetText);
  bottomTenSetText.innerHTML = "0";
  bottomTenSetText.style.margin = `${timerH / 105}px 0 0 0`;

  document.getElementById('bottomSettingsTenBox').appendChild(incrBtns[9]);

  document.getElementById('bottomSettingsMinBox').appendChild(incrBtns[10]);

  document.getElementById('bottomSettingsMinBox').appendChild(bottomMinSetText);
  bottomMinSetText.innerHTML = "5";
  bottomMinSetText.style.margin = `${timerH / 105}px 0 0 0`;

  document.getElementById('bottomSettingsMinBox').appendChild(incrBtns[11]);

  bottomSettingsMinTextBox.style.width = `${timerW / 24}px`;

  bottomSettingsMinText.style.textAlign = 'right';
  bottomSettingsMinText.innerHTML = "m";
  bottomSettingsMinText.style.color = offDutyColor;

  //      Timer container contents .......................................

  topTimerContainer.style.height = `${mainDisplayH * 0.65}px`;
  bottomTimerContainer.style.height = `${mainDisplayH * 0.35}px`;

}

// ---------- Button actions --------------------------------

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
  // need to add conditional for when 'play' is used to resume from 'paused'
  mode = "on_duty";
  drawPage();
}


// ---------- initial declarations and commands -------------

let timerW = 0;
let WinOutW = 0;
let screenW = 0;
let timerH = 0;
let WinOutH = 0;
let screenH = 0;
let winRatio = 0;

let mode = "settings"; // "settings" / "on_duty" / "off_duty"

let bottomDisplayH = 0;
let topDisplayH = 0;
let mainDisplayH = 0;

let lineH = 0;
let topLineW = 0;
let bottomLineW = 0;
let lineTopVert = 0;
let textH = 0;

let dispBbgColor = "black";
let dispAbgColor = "black";
let containerBgColor = "black";
let bodyBgColor = "black";
let mainDisplayBgColor = "black";
let settingsDispBbgColor = "black";
let settingsColor = "hsl(28, 100%, 55%)";
let settingsHoverColor = "hsl(28, 100%, 35%)";
let onDutyColor = "hsl(215, 100%, 60%)";
let onDutyHoverColor = "hsl(215, 100%, 40%)";
let offDutyColor = "hsl(104, 60%, 45%)";
let offDutyHoverColor = "hsl(104, 60%, 25%)";

let modeColor = settingsColor;
let modeHoverColor = settingsHoverColor;

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

let clickPlayAtt = document.createAttribute("onclick");
clickPlayAtt.value = "clickPlay()";
play.setAttributeNode(clickPlayAtt);

let incrBtns = [];
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
}

let defaultItems = [lineTopL, lineTopR, titleTextBox, lineBottomL, lineBottomR,
    bottomControlsBox, topSettingsTextBox, bottomSettingsTextBox,
    topSettingsHourBox, topSettingsHTextBox, topSettingsTenBox,
    topSettingsMinBox, topSettingsMinTextBox, bottomSettingsHourBox,
    bottomSettingsHTextBox, bottomSettingsTenBox, bottomSettingsMinBox,
    bottomSettingsMinTextBox];
let lines = [lineTopL, lineTopR, lineBottomL, lineBottomR];
let buttons = [play, pause, reset, stop, soundOn]; // the html img elements
let buttonLabels = ['play', 'pause', 'reset', 'stop', 'soundOn']
let text = [titleText, topSettingsText, bottomSettingsText, topHourSetText,
    topSettingsHText, topTenSetText, topMinSetText, topSettingsMinText,
    bottomHourSetText, bottomSettingsHText, bottomTenSetText, bottomMinSetText,
    bottomSettingsMinText];
let settingsText = [topHourSetText, topTenSetText, topMinSetText,
    bottomHourSetText, bottomTenSetText, bottomMinSetText];
let textBoxes = [titleTextBox, topSettingsTextBox, bottomSettingsTextBox,
    topSettingsHTextBox, topSettingsMinTextBox, bottomSettingsHTextBox,
    bottomSettingsMinTextBox];

for (i = 0; i < buttons.length; i++) {
  buttons[i].id = buttonLabels[i];
  buttons[i].addEventListener('mouseover', btnHover);
  buttons[i].addEventListener('mouseout', btnUnHover);
}

// Toggle visible backgrounds for divs (for use in development)
let editColor = false;

if (editColor == true) {
  containerBgColor = "#101519";
  bodyBgColor = "#110f0b";
  mainDisplayBgColor = "#0f0d09";
  settingsDispBbgColor = '#1c1810';
}

body.style.fontFamily = "'Ubuntu Mono', monospace";
body.style.fontWeight = "normal";
container.style.margin = "auto";

// ?separate setting styles (that don't change dynamically) from layouts,
// which do change dynamically? Pull out of drawPage() into new
// method 'stylePage()' [Cannot include any sizes relative to dimensions]
// Note: ALMOST everything is dynamic, in that almost every element can change
// any of its properties in some circumstance (change; mode, size, etc.).
// Perhaps only appendchild statements can be run just once at start?

drawPage(); // Also called whenever window (body) is resized
