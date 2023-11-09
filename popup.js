document.addEventListener("DOMContentLoaded", function () {
  const speedSlider = document.getElementById("speedSlider");
  const speedOutput = document.getElementById("speedOutput");
  speedOutput.textContent = speedSlider.value + "x"; // Update initial value with 'x' for times.

  // Attach input event listener to the slider
  speedSlider.addEventListener("input", function () {
    speedOutput.textContent = this.value + "x"; // Update display value with 'x'

    // Get the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0]) {
        // Send message to content script to adjust video playback rate
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            action: "adjustPlaybackRate",
            speed: parseFloat(speedSlider.value),
          },
          function (response) {
            if (chrome.runtime.lastError) {
              // Handle case where there is no response from content script
              console.error("Error sending message:", chrome.runtime.lastError);
              return;
            }
            if (response && !response.success) {
              // Handle case where content script finds no video
              console.warn(response.error);
            }
          }
        );
      }
    });
  });
});
