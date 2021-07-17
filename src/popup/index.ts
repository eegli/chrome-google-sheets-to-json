let changeColor = document.getElementById('changeColor') as HTMLElement;

chrome.storage.sync.get('color', ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log(tab.url);

  if (tab.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    });
  }
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get('color', ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
