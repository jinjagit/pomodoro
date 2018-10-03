//

function getDisplayData() {
  timerW = window.innerWidth;
  WinOutW = window.outerWidth;
  screenW = screen.width;
  timerH = window.innerHeight;
  WinOutH = window.outerHeight;
  screenH = screen.height;

  if (screen.width < window.innerWidth || fullscrn === true) {
    mobile = true; // probably mobile, but not a foolproof method
  } else {mobile = false;}
}

function setLayout() {
  if (mobile === false && maximize === false) {
    if (screenW < 2200) {
      if (timerW > 480) { timerW = 480; }
      if (timerH > 385) { timerH = 385; }
    } else if (screenW < 4400) {
      if (timerW > 720) { timerW = 720; }
      if (timerH > 578) { timerH = 578; }
    }
  }

// put conditional here based on AREA (for desktops)
// if window area is smaller than default size (+ a bit for margin)
// then define new timer dimensions ;-) (Take care to prioritize correct axis)
// mobile remains: timer dimensions = window dimensions (-bit for margins)

  winRatio = timerW / timerH;

  if (winRatio < 1.2) {
    layout = "portrait";
    topDisplayH = timerH * (2 / 15);
    mainDisplayH = timerH * (11 / 15);
    bottomDisplayH = timerH * (2 / 15);
  } else if (winRatio >= 1.2 && winRatio < 2.1) { // favored desktop layout
    layout = "landscape";
    topDisplayH = timerH * (2 / 11);
    mainDisplayH = timerH * (7 / 11);
    bottomDisplayH = timerH * (2 / 11);
  } else {
    layout = "landscapeLong";
    topDisplayH = timerH * (1 / 9);
    mainDisplayH = timerH * (7 / 9);
    bottomDisplayH = timerH * (1 / 9);
  }
}

function drawPage() {
  getDisplayData();
  setLayout();
  container.style.width = `${timerW}px`;
  if (mobile === false) {
    container.style.margin = `${(window.innerHeight - timerH) / 2}px auto`;
  } else {
    container.style.margin = `auto`;
  }
  input = "";
  stylePage();
}

function stylePage() {
  function styleDefaults(defaultItems) {
    for (let i = 0; i < defaultItems.length; i++) {
      defaultItems[i].style.display = 'inline-block';
      defaultItems[i].style.verticalAlign = 'middle';
      defaultItems[i].style.backgroundColor = settingsColor;
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
      buttons[i].style.backgroundColor = settingsColor;
      buttons[i].style.display = 'inline-block';
      buttons[i].style.verticalAlign = 'top';
    }
  }

  function styleText(text) {
    for (let i = 0; i < text.length; i++) {
      text[i].style.textAlign = 'center';
      text[i].style.fontSize = `${textH}px`;
      text[i].style.lineHeight = `${textH}px`;
    }
  }

  if (layout === "portrait") {

  } else if (layout === "landscape") { // only working on this, atm.
    lineH = topDisplayH * 0.043;
    topLineW = timerW * 0.255;
    bottomLineW = timerW * 0.35;
    lineTopVert = (topDisplayH - lineH) / 2;
    textH = topDisplayH / 2.5; // ?change to 'textH'?
  } else {

  }

  if (settingsMode = true) {
    mainDisplay.style.display = 'none';
    settingsDisplay.style.display = 'block';
  } else {
    settingsDisplay.style.display = 'none';
    mainDisplay.style.display = 'block';
  }

  topDisplay.style.height= `${topDisplayH}px`;
  mainDisplay.style.height = `${mainDisplayH}px`;
  settingsDisplay.style.height = `${mainDisplayH}px`;
  bottomDisplay.style.height= `${bottomDisplayH}px`;

  topDisplay.style.lineHeight = `${topDisplayH}px`;
  bottomDisplay.style.lineHeight = `${bottomDisplayH}px`;
  topSettingsContainer.style.lineHeight = `${mainDisplayH / 2}px`;
  bottomSettingsContainer.style.lineHeight = `${mainDisplayH / 2}px`;

  styleDefaults(defaultItems); // includes lines
  styleLines(lines);
  styleButons(buttons);
  styleText(text);


  bottomDisplay.style.textAlign = "right";

  // This block can all be set to 'black' when layout finalized -------------
  body.style.color = bodyColor;
  container.style.backgroundColor = containerBgColor;
  topDisplay.style.backgroundColor = dispBbgColor;
  settingsDisplay.style.backgroundColor = settingsDispBbgColor;
  mainDisplay.style.backgroundColor = mainDisplayBgColor;
  body.style.background = bodyBgColor;
  bottomDisplay.style.backgroundColor = dispAbgColor;
  bottomControlsBox.style.backgroundColor = mainDisplayBgColor;
  titleTextBox.style.backgroundColor = mainDisplayBgColor;
  topSettingsContainer.style.backgroundColor = mainDisplayBgColor;
  bottomSettingsContainer.style.backgroundColor = settingsDispBbgColor;
  topSettingsTextBox.style.backgroundColor = settingsDispBbgColor;
  bottomSettingsTextBox.style.backgroundColor = mainDisplayBgColor;
  // ------------------------------------------------------------------------

  lineTopL.style.width = `${topLineW}px`;
  lineTopL.style.borderRadius = `${lineH / 2}px 0 0 ${lineH / 2}px`;

  titleTextBox.style.width = `${timerW - (topLineW * 2)}px`;
  titleTextBox.style.height = `${textH}px`;

  titleText.innerHTML = "DUTY SETTINGS";
  titleText.style.color = settingsColor;

  lineTopR.style.width = `${topLineW}px`;
  lineTopR.style.borderRadius = `0 ${lineH / 2}px ${lineH / 2}px 0`;

  topSettingsContainer.style.height = `${mainDisplayH / 2}px`;
  bottomSettingsContainer.style.height = `${mainDisplayH / 2}px`;

  topSettingsTextBox.style.width = `${timerW - (topLineW * 2)}px`;
  topSettingsTextBox.style.height = `${textH}px`;

  topSettingsText.innerHTML = "ON DUTY:";
  topSettingsText.style.color = onDutyColor;

  bottomSettingsTextBox.style.width = `${timerW - (topLineW * 2)}px`;
  bottomSettingsTextBox.style.height = `${textH}px`;

  bottomSettingsText.innerHTML = "OFF DUTY:";
  bottomSettingsText.style.color = offDutyColor;

  lineBottomL.style.width = `${bottomLineW}px`;
  lineBottomL.style.borderRadius = `${lineH / 2}px 0 0 ${lineH / 2}px`;

  bottomControlsBox.style.width = `${timerW - (bottomLineW * 2)}px`;
  bottomControlsBox.style.height = `${textH * 1.5}px`;

  lineBottomR.style.width = `${bottomLineW}px`;
  lineBottomR.style.borderRadius = `0 ${lineH / 2}px ${lineH / 2}px 0`;

  document.getElementById('bottomControlsBox').appendChild(play);
  play.style.margin = `0 ${timerW / 26}px 0 0`; // change to fraction (of something)

  document.getElementById('bottomControlsBox').appendChild(reset);
  reset.style.margin = `0 ${timerW / 23}px 0 0`; // change to fraction (of something)

  // kept for reference...
  /*if (mobile === false && maximize === false) {
    container.style.webkitBoxShadow = "2px 2px 17px 2px rgba(0, 0, 0, 0.4)";
    container.style.mozBoxShadow =  "2px 2px 17px 2px rgba(0, 0, 0, 0.4)";
    container.style.boxShadow = "2px 2px 17px 2px rgba(0, 0, 0, 0.4)";
  }*/
}

function toggleMaxLayout() { // Improve by checking window v display size on mobile
  if (maximize === false) {
    maximize = true;
    if (mobile === true) {
      goFullscreen();
    }
  } else {
    maximize = false;
    if (mobile === true) {
      exitFullscreen();
    }
  }
  drawPage();
}

function goFullscreen() {
  let elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
  fullscrn = true;
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
  fullscrn = false;
}

// ---------- initial declarations and commands -------------

let timerW = 0;
let WinOutW = 0;
let screenW = 0;
let timerH = 0;
let WinOutH = 0;
let screenH = 0;
let winRatio = 0;
let mobile = false;
let layout = "portrait"; // 3 options: portrait, landscape, landscapeLong
let maximize = false;
let fullscrn = false;
let settingsMode = true;

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
let bodyColor = "#c0daf1"; // default text color (used in displays)
let settingsColor = "hsl(28, 100%, 55%)";
let onDutyColor = "hsl(215, 100%, 55%)";
let offDutyColor = "hsl(104, 60%, 55%)";

let body = document.getElementsByTagName('body')[0];
let topDisplay = document.getElementById('topDisplay');
let mainDisplay = document.getElementById('mainDisplay');
let settingsDisplay = document.getElementById('settingsDisplay');
let bottomDisplay = document.getElementById('bottomDisplay');
let container = document.getElementById('container');
let lineTopL = document.getElementById('lineTopL');
let lineTopR = document.getElementById('lineTopR');
let titleTextBox = document.getElementById('titleTextBox');
let titleText = document.getElementById('titleText');
let lineBottomL = document.getElementById('lineBottomL');
let lineBottomR = document.getElementById('lineBottomR');
let bottomControlsBox = document.getElementById('bottomControlsBox');
let topSettingsContainer = document.getElementById('topSettingsContainer');
let bottomSettingsContainer = document.getElementById('bottomSettingsContainer');
let topSettingsTextBox = document.getElementById('topSettingsTextBox');
let topSettingsText = document.getElementById('topSettingsText');
let bottomSettingsTextBox = document.getElementById('bottomSettingsTextBox');
let bottomSettingsText = document.getElementById('bottomSettingsText');

let play = document.createElement('img');
play.src = 'img/playMask.png';
let reset = document.createElement('img');
reset.src = 'img/resetMask.png';

let defaultItems = [lineTopL, lineTopR, titleTextBox, lineBottomL, lineBottomR, bottomControlsBox, topSettingsTextBox, bottomSettingsTextBox];
let lines = [lineTopL, lineTopR, lineBottomL, lineBottomR];
let buttons = [play, reset];
let text = [titleText, topSettingsText, bottomSettingsText];

// Toggle visible backgrounds for 3 divs in container
let editColor = true;

if (editColor == false) {
  containerBgColor = "#101519";
  bodyBgColor = "#110f0b";
  mainDisplayBgColor = "#0f0d09";
  settingsDispBbgColor = '#1c1810';
}

body.style.fontFamily = "'Ubuntu Mono', monospace";
body.style.fontWeight = "normal";
container.style.margin = "auto";

// separate setting styles (that don't change dynamically) from layouts,
// which do change dynamically. Pull out of drawPage() into new
// method 'stylePage()' [Cannot include any sizes relative to dimensions]

drawPage(); // Also called whenever window (body) is resized
