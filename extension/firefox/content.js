browser.runtime.onMessage.addListener(async (message) => {
  console.log("Message", message);
  if (message.action === "replaceText") {
    const selection = window.getSelection();
    const { apikey } = await browser.storage.sync.get("apikey");

    if (apikey !== "None" && selection.rangeCount > 0) {
      //  Make a fetch request to an API to get new content
      fetch("https://skibidi-6n9v.onrender.com/skibidi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_message: selection.toString(),
          token: apikey,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const range = selection.getRangeAt(0);
          range.deleteContents(); // Remove the selected text
          range.insertNode(document.createTextNode(data.response)); // Insert the new text
        })
        .catch((error) => {
          console.error("Error fetching new content:", error);
        });
    }

    // const selectedElement = document.activeElement;

    // if (selectedElement) {
    //   const selectedText = selectedElement.textContent;

    //   console.log(selectedText);

    //   selectedElement.textContent = "This is replaced!"; // data.newContent;
  }
});
