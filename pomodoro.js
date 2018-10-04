//

function getDisplayData() {
  timerW = window.innerWidth;
  WinOutW = window.outerWidth;
  screenW = screen.width;
  timerH = window.innerHeight;
  WinOutH = window.outerHeight;
  screenH = screen.height;
}

function setLayout() {

  if (screenW < 2200) {
    if (timerW > 480) { timerW = 480; }
    if (timerH > 385) { timerH = 385; }
  } else if (screenW < 4400) {
    if (timerW > 720) { timerW = 720; }
    if (timerH > 578) { timerH = 578; }
  }

// put conditional here based on AREA (for desktops)
// if window area is smaller than default size (+ a bit for margin)
// then define new timer dimensions ;-) (Take care to prioritize correct axis)
// mobile remains: timer dimensions = window dimensions (-bit for margins)

// winRatio = timerW / timerH;

  layout = "landscape";
  topDisplayH = timerH * (2 / 11);
  mainDisplayH = timerH * (7 / 11);
  bottomDisplayH = timerH * (2 / 11);
}

function drawPage() {
  getDisplayData();
  setLayout();
  container.style.width = `${timerW}px`;
  container.style.margin = `${(window.innerHeight - timerH) / 2}px auto`;

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
      }
      if ( i % 2 == 1) {
        incrBtns[i].style.transform = 'rotate(180deg)';
        incrBtns[i].style.margin = `${timerH / 105}px 0 0 0`;
      }
    }
  }

  function styleSettingsText(settingsText) {
    for (let i = 0; i < settingsText.length; i++) {
      settingsText[i].style.textAlign = 'center';
      settingsText[i].style.display = 'block';
      settingsText[i].style.color = onDutyColor;
    }
  }

  function styleTextBoxes(textBoxes) {
    for (let i = 0; i < textBoxes.length; i++) {
      textBoxes[i].style.height = `${textH}px`;

    }
  }

  lineH = topDisplayH * 0.043;
  topLineW = timerW * 0.255;
  bottomLineW = timerW * 0.3;
  lineTopVert = (topDisplayH - lineH) / 2;
  textH = topDisplayH / 2.5; // ?change to 'textH'?

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
  styleIncrBtns(incrBtns);
  styleSettingsText(settingsText);
  styleTextBoxes(textBoxes);

  bottomDisplay.style.textAlign = "right";

  // This block can all be set to 'black' when layout finalized -------------
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
  topSettingsHourBox.style.backgroundColor = settingsDispBbgColor;
  topSettingsHTextBox.style.backgroundColor = settingsDispBbgColor;
  topSettingsTenBox.style.backgroundColor = settingsDispBbgColor;
  topSettingsMinBox.style.backgroundColor = settingsDispBbgColor;
  topSettingsMinTextBox.style.backgroundColor = settingsDispBbgColor;
  // ------------------------------------------------------------------------

  lineTopL.style.width = `${topLineW}px`;
  lineTopL.style.borderRadius = `${lineH / 2}px 0 0 ${lineH / 2}px`;

  titleTextBox.style.width = `${timerW - (topLineW * 2)}px`;

  titleText.style.textAlign = 'center';
  titleText.innerHTML = "DUTY SETTINGS";
  titleText.style.color = settingsColor;

  lineTopR.style.width = `${topLineW}px`;
  lineTopR.style.borderRadius = `0 ${lineH / 2}px ${lineH / 2}px 0`;

  topSettingsContainer.style.height = `${mainDisplayH / 2}px`;
  bottomSettingsContainer.style.height = `${mainDisplayH / 2}px`;

  topSettingsTextBox.style.width = `${timerW / 2.25}px`;

  topSettingsText.style.textAlign = 'right';
  topSettingsText.innerHTML = "ON DUTY:";
  topSettingsText.style.color = onDutyColor;
  topSettingsText.style.margin = `0 ${timerW / 23}px 0 0`;

  bottomSettingsTextBox.style.width = `${timerW / 2.25}px`;

  topSettingsHourBox.style.width = `${timerW / 13}px`;
  topSettingsHourBox.style.height = `${textH * 3}px`;

  topSettingsTenBox.style.width = `${timerW / 13}px`;
  topSettingsTenBox.style.height = `${textH * 3}px`;

  topSettingsMinBox.style.width = `${timerW / 13}px`;
  topSettingsMinBox.style.height = `${textH * 3}px`;

  bottomSettingsText.style.textAlign = 'right';
  bottomSettingsText.innerHTML = "OFF DUTY:";
  bottomSettingsText.style.color = offDutyColor;
  bottomSettingsText.style.margin = `0 ${timerW / 23}px 0 0`;

  lineBottomL.style.width = `${bottomLineW}px`;
  lineBottomL.style.borderRadius = `${lineH / 2}px 0 0 ${lineH / 2}px`;

  bottomControlsBox.style.width = `${timerW - (bottomLineW * 2)}px`;
  bottomControlsBox.style.height = `${textH * 1.5}px`;

  lineBottomR.style.width = `${bottomLineW}px`;
  lineBottomR.style.borderRadius = `0 ${lineH / 2}px ${lineH / 2}px 0`;

  document.getElementById('bottomControlsBox').appendChild(soundOn);
  soundOn.style.margin = `0 ${timerW / 36}px 0 0`;

  document.getElementById('bottomControlsBox').appendChild(reset);
  reset.style.margin = `0 ${timerW / 30}px 0 0`;

  document.getElementById('bottomControlsBox').appendChild(play);
  play.style.margin = `0 ${timerW / 24}px 0 0`;

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

}


// ---------- initial declarations and commands -------------

let timerW = 0;
let WinOutW = 0;
let screenW = 0;
let timerH = 0;
let WinOutH = 0;
let screenH = 0;
let winRatio = 0;

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
let settingsColor = "hsl(28, 100%, 55%)";
let onDutyColor = "hsl(215, 100%, 60%)";
let offDutyColor = "hsl(104, 60%, 45%)";

let body = document.getElementsByTagName('body')[0];
let topHourSetText = document.createElement("p");
let topTenSetText = document.createElement("p");
let topMinSetText = document.createElement("p");
let play = document.createElement('img');
play.src = 'img/playMask.png';
let reset = document.createElement('img');
reset.src = 'img/resetMask.png';
let soundOn = document.createElement('img');
soundOn.src = 'img/soundOnMask.png';

let incrBtns = [];
for (i = 0; i < 6; i++) {
  incrBtns[i] = document.createElement('img');
  incrBtns[i].src = 'img/incrMask.png';
}

let defaultItems = [lineTopL, lineTopR, titleTextBox, lineBottomL, lineBottomR,
  bottomControlsBox, topSettingsTextBox, bottomSettingsTextBox, topSettingsHourBox,
  topSettingsHTextBox, topSettingsTenBox, topSettingsMinBox, topSettingsMinTextBox];
let lines = [lineTopL, lineTopR, lineBottomL, lineBottomR];
let buttons = [play, reset, soundOn];
let text = [titleText, topSettingsText, bottomSettingsText, topHourSetText,
  topSettingsHText, topTenSetText, topMinSetText, topSettingsMinText];
let settingsText = [topHourSetText, topTenSetText, topMinSetText];
let textBoxes = [titleTextBox, topSettingsTextBox, bottomSettingsTextBox,
  topSettingsHTextBox, topSettingsMinTextBox];

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

// separate setting styles (that don't change dynamically) from layouts,
// which do change dynamically. Pull out of drawPage() into new
// method 'stylePage()' [Cannot include any sizes relative to dimensions]

drawPage(); // Also called whenever window (body) is resized
