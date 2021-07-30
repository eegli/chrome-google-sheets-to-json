// !This is all very buggy
// !https://stackoverflow.com/a/64475504

/* const colorIcons = {
  16: 'assets/icon-16.png',
  32: 'assets/icon-32.png',
  48: 'assets/icon-48.png',
  128: 'assets/icon-128.png',
};

async function loadImageData() {
  const icons = {} as Record<string, ImageData>;
  for (const [size, url] of Object.entries(colorIcons)) {
    const img = await createImageBitmap(await (await fetch(url)).blob());
    const { width: w, height: h } = img;
    const canvas = new OffscreenCanvas(w, h);
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0, w, h);
    icons[size] = ctx.getImageData(0, 0, w, h);
  }
  return icons;
} */

/* // TODO action.disable() should fire on install
chrome.declarativeContent.onPageChanged.removeRules(async () => {
  // @ts-ignore
  await chrome.action.disable();
  const images = await loadImageData();
  chrome.declarativeContent.onPageChanged.addRules([
    {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostContains: '.docs.google.com', schemes: ['https'] },
        }),
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { pathContains: 'spreadsheets', schemes: ['https'] },
        }),
      ],
      actions: [
        // Path is not supported: https://bugs.chromium.org/p/chromium/issues/detail?id=462542
        new chrome.declarativeContent.SetIcon(images),
        new chrome.declarativeContent.ShowPageAction(),
      ],
    },
  ]);
}); */

// Our serviceworker is only used for updating icons
chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (info.status === 'complete') {
    console.log(info);
    if (tab.url?.includes('https://docs.google.com/spreadsheets/d')) {
      await chrome.action.setPopup({ tabId, popup: 'popup.html' });
    } else {
      // Remove popup
      await chrome.action.setPopup({ tabId, popup: '' });
    }
  }
});
