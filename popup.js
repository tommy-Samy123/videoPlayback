const slider = document.getElementById('speed-slider');
const display = document.getElementById('speed-display');
const btnSlower = document.getElementById('btn-slower');
const btnFaster = document.getElementById('btn-faster');

function updateDisplay(val) {
  display.innerText = parseFloat(val).toFixed(1) + 'x';
  slider.value = val;
}

// Request current speed from active tab
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  if (tabs.length === 0) return;
  chrome.tabs.sendMessage(tabs[0].id, {action: "getSpeed"}, function(response) {
    if (chrome.runtime.lastError) {
      // Content script may not be injected (e.g. on chrome:// pages)
      display.innerText = "N/A";
      slider.disabled = true;
      btnSlower.disabled = true;
      btnFaster.disabled = true;
      return;
    }
    if (response && response.speed) {
      updateDisplay(response.speed);
    }
  });
});

function setSpeed(speed) {
  speed = Math.max(0.1, Math.min(parseFloat(speed), 4.0));
  updateDisplay(speed);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "setSpeed", speed: speed});
  });
}

slider.addEventListener('input', (e) => {
  setSpeed(e.target.value);
});

btnSlower.addEventListener('click', () => {
  setSpeed(parseFloat(slider.value) - 0.1);
});

btnFaster.addEventListener('click', () => {
  setSpeed(parseFloat(slider.value) + 0.1);
});
