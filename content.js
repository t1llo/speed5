// Listen for messages from the popup to adjust video speed.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "adjustPlaybackRate") {
    // Always find the latest video element when a message is received.
    const videoElement = document.querySelector("video");

    if (videoElement) {
      videoElement.playbackRate = request.speed;
      sendResponse({ success: true });
    } else {
      sendResponse({ success: false, error: "No video element found" });
    }
  }
  // Indicate that you wish to send a response asynchronously.
  return true;
});
