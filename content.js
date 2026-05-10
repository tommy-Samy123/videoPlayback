// content.js
let overlayTimeout;

// Create the overlay elements
const overlay = document.createElement('div');
overlay.id = 'video-speed-controller-overlay';
overlay.style.display = 'none';

const speedText = document.createElement('div');
speedText.id = 'video-speed-controller-text';
speedText.innerText = '1.0x';

const slider = document.createElement('input');
slider.type = 'range';
slider.id = 'video-speed-controller-slider';
slider.min = '0.1';
slider.max = '4.0';
slider.step = '0.1';
slider.value = '1.0';

overlay.appendChild(slider);
overlay.appendChild(speedText);

// Function to find the primary video on the page
function getVideo() {
  const videos = document.querySelectorAll('video');
  if (videos.length === 0) return null;
  // Try to find the largest or playing video, otherwise default to first
  for (let v of videos) {
    if (!v.paused && !v.ended) return v;
  }
  return videos[0];
}

// Function to attach overlay to correct container (for fullscreen support)
function attachOverlay() {
  const container = document.fullscreenElement || document.body;
  if (overlay.parentElement !== container) {
    container.appendChild(overlay);
  }
}

// Function to show and update overlay
function showOverlay(speed) {
  attachOverlay();
  speedText.innerText = speed.toFixed(1) + 'x';
  slider.value = speed;
  overlay.style.display = 'flex';
  overlay.classList.remove('fade-out');
  
  clearTimeout(overlayTimeout);
  overlayTimeout = setTimeout(() => {
    overlay.classList.add('fade-out');
    setTimeout(() => {
      if (overlay.classList.contains('fade-out')) {
        overlay.style.display = 'none';
      }
    }, 500); // match transition duration
  }, 2000);
}

// Set speed and update UI
function setSpeed(video, newSpeed) {
  newSpeed = Math.max(0.1, Math.min(newSpeed, 16.0));
  video.playbackRate = newSpeed;
  showOverlay(newSpeed);
  // Optional: save to storage
  chrome.storage.local.set({ playbackSpeed: newSpeed });
}

// Slider event listener
slider.addEventListener('input', (e) => {
  const video = getVideo();
  if (video) {
    setSpeed(video, parseFloat(e.target.value));
  }
});

// Prevent event bubbling so dragging slider doesn't trigger video controls
slider.addEventListener('keydown', (e) => e.stopPropagation());
slider.addEventListener('mousedown', (e) => e.stopPropagation());

// Listen for keyboard shortcuts
window.addEventListener('keydown', (e) => {
  // Ignore if typing in an input
  const active = document.activeElement;
  if (
    active &&
    (active.tagName === 'INPUT' ||
      active.tagName === 'TEXTAREA' ||
      active.isContentEditable)
  ) {
    return;
  }

  // Handle 's' and 'd'
  if (e.key === 's' || e.key === 'd') {
    const video = getVideo();
    if (!video) return;

    let speed = video.playbackRate;
    if (e.key === 's') speed -= 0.1;
    if (e.key === 'd') speed += 0.1;
    
    setSpeed(video, speed);
  }
}, true); // Use capture phase to ensure we catch it before page logic

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSpeed') {
    const video = getVideo();
    sendResponse({ speed: video ? video.playbackRate : 1.0 });
  } else if (request.action === 'setSpeed') {
    const video = getVideo();
    if (video) {
      setSpeed(video, request.speed);
    }
  }
});
