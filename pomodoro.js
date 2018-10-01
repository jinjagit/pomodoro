//



function getDisplayData() {
  calcW = window.innerWidth;
  WinOutW = window.outerWidth;
  screenW = screen.width;
  calcH = window.innerHeight;
  WinOutH = window.outerHeight;
  screenH = screen.height;

  if (screen.width < window.innerWidth || fullscrn === true) {
    mobile = true; // probably mobile, but not a foolproof method
  } else {mobile = false;}
}

function setLayout() {
  if (mobile === false && maximize === false && screenW < 2200) {
    if (calcW > 480) { calcW = 480; }
    if (calcH > 385) { calcH = 385; }
  }

  winRatio = calcW / calcH;

  if (winRatio < 1.2) {
    layout = "portrait";
    displayBheight = calcH * (2 / 15);
    displayAheight = calcH * (2 / 15);
  } else if (winRatio >= 1.2 && winRatio < 2.1) {
    layout = "landscape";
    displayBheight = calcH * (2 / 11);
    mainDisplayHeight = calcH * (7 / 11);
    displayAheight = calcH * (2 / 11);
  } else {
    layout = "landscapeLong";
    displayBheight = calcH * (1 / 9);
    displayAheight = calcH * (2 / 9);
  }
}

function drawPage() {
  getDisplayData();
  setLayout();
  container.style.width = `${calcW}px`;
  if (mobile === false) {
    container.style.margin = `${(window.innerHeight - calcH) / 2}px auto`;
  } else {
    container.style.margin = `auto`;
  }
  input = "";
  stylePage();
}

function stylePage() {
  if (layout === "portrait") {
    fontSizeA = calcW / 10;
    fontSizeB = calcW / 23;
  } else if (layout === "landscape") {
    fontSizeA = calcH / 7.8;
    fontSizeB = calcH / 18;
  } else {
    fontSizeA = calcH / 6;
    fontSizeB = calcH / 16;
  }

  displayB.style.height= `${displayBheight}px`;
  mainDisplay.style.height = `${mainDisplayHeight}px`;
  displayA.style.height= `${displayAheight}px`;

  displayB.style.lineHeight = `${displayBheight}px`;
  displayA.style.lineHeight = `${displayAheight}px`;

  displayAtext.style.fontSize = `${fontSizeA}px`;
  displayBtext.style.fontSize = `${fontSizeB}px`;

  container.style.backgroundColor = containerBgColor;
  displayB.style.backgroundColor = dispBbgColor;
  mainDisplay.style.backgroundColor = mainDisplayBgColor;
  body.style.background = bodyBgColor;

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

let calcW = 0;
let WinOutW = 0;
let screenW = 0;
let calcH = 0;
let WinOutH = 0;
let screenH = 0;
let winRatio = 0;
let mobile = false;
let layout = "portrait"; // 3 options: portrait, landscape, landscapeLong
let hand = "r";
let menuActive = false;
let maximize = false;
let fullscrn = false;

let displayAheight = 0;
let displayBheight = 0;
let mainDisplayHeight = 0;
let keyboardHeight = 0;
let keyHeight = 0;
let keyRows = 0;
let keys = [];

let menuH = 0;
let menuW = 0;

let fontSizeA = 0;
let fontSizeB = 0;
let fontSizeKeys = 0;

let gridRowHeight = 0;
let gridColumns = 0;
let numOfKeys = 0;
let keysTemplate = [];

let horOffset = 0;
let vertOffset = 0;

// maximum string lengths for secondary display (displayB):
let maxCharsPortrait = 39;
let maxCharsLandscape = 41;
let maxCharsLandsLong = 66;

// Toggle visible backgrounds for 3 divs in container
let devColor = true;

let dispBbgColor = "black";
let dispAbgColor = "black";
let containerBgColor = "black";
let bodyBgColor = "black";
let mainDisplayBgColor = "black";

let bodyColor = "#c0daf1"; // default text color (used in displays)
let keyDigitColor = "hsl(208, 52%, 72%)"; // default key text color (digits and '.')
let keyOperatorColor = "hsl(208, 96%, 56%)";
let keyAuxColor = "hsl(208, 41%, 42%)"; // text color for '±', '^', '(' and ')' keys
let keyEqualsColor = "hsl(124, 39%, 62%)";
let keyClearColor = "hsl(340, 64%, 55%)"; // text color for 'C' key AND red warning text
let keyBackspColor = "hsl(15, 60%, 63%)";
let keySettingsColor = "hsl(273, 50%, 56%)";
let keyFcolor = "hsl(297, 36%, 53%)";
let menuHoverColor = "hsl(208, 52%, 42%)";

let clickAnim = null;
let warningAnim = null;
let invalidAnim = false; // set to true when animation starts, false at end / interruption


let body = document.getElementsByTagName('body')[0];
let para = document.getElementsByTagName('p')[0];
let displayA = document.getElementById('displayA');
let displayB = document.getElementById('displayB');
let displayAtext = document.getElementById('displayAtext');
let displayBtext = document.getElementById('displayBtext');
let container = document.getElementById('container');

let dispAstore = "";

let counter = 0; // counter for key-click animation; animateClick()
let countWarningAnim = 0; // counter for animateWarningDispA()
let operatorCount = 0;

let lastElemClicked = null;
let startup = false;
let powWarning = false;
let powWarnDisplaying = false;
let powStr = "";
let redText = "";
let redLen = 0;

const FRAME_DURATION = 1000 / 60;
const getTime = typeof performance === 'function' ? performance.now : Date.now;
let scrollPosition = 0;
let lastUpdate = getTime();
let message = "";
let msgLen = 0;
let scrollStr = "";
let scrollMax = 0;
let scrollAnim = null;

if (devColor == true) {
  containerBgColor = "#101519";
  bodyBgColor = "#110f0b";
  mainDisplayBgColor = "#0f0d09";
}

body.style.color = bodyColor;
body.style.fontFamily = "'Ubuntu Mono', monospace";
body.style.fontWeight = "normal";
container.style.margin = "auto";
displayB.style.textAlign = "right";
displayA.style.backgroundColor = dispAbgColor;
displayA.style.textAlign = "right";

drawPage(); // Also called whenever window (body) is resized
displayBtext.style.opacity = "0.0"; // Prevents brief flash of 'waiting for input...' message at startup
