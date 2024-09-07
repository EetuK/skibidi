// Create a context menu item
browser.contextMenus.create({
  id: "skibidi",
  title: "Skibidi",
  contexts: ["selection", "page"],
});

// Listen for the context menu click
browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "skibidi") {
    // Send a message to the content script to select the text and replace it
    browser.tabs.sendMessage(tab.id, { action: "replaceText" });
  }
});
