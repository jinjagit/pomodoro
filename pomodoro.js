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
      if (calcW > 480) { calcW = 480; }
      if (calcH > 385) { calcH = 385; }
    } else if (screenW < 4400) {
      if (calcW > 720) { calcW = 720; }
      if (calcH > 578) { calcH = 578; }
    }
  }

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
      //defaultItems[i].style.position = 'relative';
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

  if (layout === "portrait") {
    fontSizeA = timerW / 10;
    fontSizeB = timerW / 23;
  } else if (layout === "landscape") {
    lineH = topDisplayH * 0.05;
    topLineW = timerW * 0.3;
    lineTopVert = (topDisplayH - lineH) / 2;
    topTextH = topDisplayH / 3;
    fontSizeA = timerH / 7.8;
    fontSizeB = timerH / 18;
  } else {
    fontSizeA = timerH / 6;
    fontSizeB = timerH / 16;
  }

  topDisplay.style.height= `${topDisplayH}px`;
  mainDisplay.style.height = `${mainDisplayH}px`;
  bottomDisplay.style.height= `${bottomDisplayH}px`;

  topDisplay.style.lineHeight = `${topDisplayH}px`;
  bottomDisplay.style.lineHeight = `${bottomDisplayH}px`;

  //bottomDisplayText.style.fontSize = `${fontSizeA}px`;
  //topDisplayText.style.fontSize = `${fontSizeB}px`;

  styleDefaults(defaultItems);
  styleLines(lines);

  container.style.backgroundColor = containerBgColor;
  topDisplay.style.backgroundColor = dispBbgColor;
  mainDisplay.style.backgroundColor = mainDisplayBgColor;
  body.style.background = bodyBgColor;

  lineTopL.style.width = `${topLineW}px`;
  lineTopL.style.left = '0px';
  lineTopL.style.borderRadius = `${lineH / 2}px 0 0 ${lineH / 2}px`;

  topTextBox.style.width = `${timerW - (topLineW * 2)}px`;
  topTextBox.style.height = `${topTextH}px`;
  topTextBox.style.backgroundColor = mainDisplayBgColor;

  topText.innerHTML = "DUTY SETTINGS";
  topText.style.textAlign = 'center';
  topText.style.lineHeight = `${topTextH}px`;
  topText.style.color = settingsColor;
  topText.style.fontSize = `${topTextH}px`;

  lineTopR.style.width = `${topLineW}px`;
  lineTopR.style.borderRadius = `0 ${lineH / 2}px ${lineH / 2}px 0`;


  lineBottomL.style.width = `${topLineW}px`;
  lineBottomL.style.left = '0px';
  lineBottomL.style.borderRadius = `${lineH / 2}px 0 0 ${lineH / 2}px`;

  bottomControlsBox.style.width = `${timerW - (topLineW * 2)}px`;
  bottomControlsBox.style.height = `${topTextH * 2}px`;
  bottomControlsBox.style.backgroundColor = mainDisplayBgColor;

  lineBottomR.style.width = `${topLineW}px`;
  lineBottomR.style.borderRadius = `0 ${lineH / 2}px ${lineH / 2}px 0`;

  document.getElementById('bottomControlsBox').appendChild(play);

  play.style.backgroundColor = settingsColor;
  play.style.height = '100%';
  play.style.verticalAlign = 'top';
  play.style.margin = '0 20px 0 0';






  if (mobile === false && maximize === false) {
    container.style.webkitBoxShadow = "2px 2px 17px 2px rgba(0, 0, 0, 0.4)";
    container.style.mozBoxShadow =  "2px 2px 17px 2px rgba(0, 0, 0, 0.4)";
    container.style.boxShadow = "2px 2px 17px 2px rgba(0, 0, 0, 0.4)";
  }
}

function toggleMaxLayout() {
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

let bottomDisplayH = 0;
let topDisplayH = 0;
let mainDisplayH = 0;

let lineH = 0;
let topLineW = 0;
let lineTopVert = 0;
let topTextH = 0;

let fontSizeA = 0;
let fontSizeB = 0;
let fontSizeKeys = 0;

let horOffset = 0;
let vertOffset = 0;

// maximum string lengths for secondary display (topDisplay):
let maxCharsPortrait = 39;
let maxCharsLandscape = 41;
let maxCharsLandsLong = 66;

let dispBbgColor = "black";
let dispAbgColor = "black";
let containerBgColor = "black";
let bodyBgColor = "black";
let mainDisplayBgColor = "black";
let bodyColor = "#c0daf1"; // default text color (used in displays)
let settingsColor = "hsl(28, 100%, 55%)"

let body = document.getElementsByTagName('body')[0];
let para = document.getElementsByTagName('p')[0];
let bottomDisplay = document.getElementById('bottomDisplay');
let topDisplay = document.getElementById('topDisplay');
//let bottomDisplayText = document.getElementById('bottomDisplayText');
//let topDisplayText = document.getElementById('topDisplayText');
let container = document.getElementById('container');
let lineTopL = document.getElementById('lineTopL');
let lineTopR = document.getElementById('lineTopR');
let topTextBox = document.getElementById('topTextBox');
let topText = document.getElementById('topText');
let lineBottomL = document.getElementById('lineBottomL');
let lineBottomR = document.getElementById('lineBottomR');
let bottomControlsBox = document.getElementById('bottomControlsBox');

let play = document.createElement('img');
play.src = 'img/playMask.png';

let defaultItems = [lineTopL, lineTopR, topTextBox, lineBottomL, lineBottomR, bottomControlsBox];
let lines = [lineTopL, lineTopR, lineBottomL, lineBottomR];

// Toggle visible backgrounds for 3 divs in container
let devColor = true;

if (devColor == false) {
  containerBgColor = "#101519";
  bodyBgColor = "#110f0b";
  mainDisplayBgColor = "#0f0d09";
}

body.style.color = bodyColor;
body.style.fontFamily = "'Ubuntu Mono', monospace";
body.style.fontWeight = "normal";
container.style.margin = "auto";
topDisplay.style.textAlign = "right";
bottomDisplay.style.backgroundColor = dispAbgColor;
bottomDisplay.style.textAlign = "right";

drawPage(); // Also called whenever window (body) is resized
