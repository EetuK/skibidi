function saveOptions(e) {
  e.preventDefault(); // Prevent form submission
  const apikey = document.querySelector("#apikey").value;
  console.log(apikey);
  // Save the color to storage
  browser.storage.sync
    .set({ apikey })
    .then(() => {
      console.log("Settings saved.");
    })
    .catch((error) => {
      console.error(`Error saving settings: ${error}`);
    });
}

// Function to restore options from browser storage
function restoreOptions() {
  // Get the stored color value
  browser.storage.sync
    .get("apikey")
    .then((result) => {
      document.querySelector("#settings-form").value = result.apikey || "None"; // Default to blue if not set
    })
    .catch((error) => {
      console.error(`Error restoring settings: ${error}`);
    });
}

// Event listeners
document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
