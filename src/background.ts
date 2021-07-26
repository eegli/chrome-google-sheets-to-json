chrome.tabs.onUpdated.addListener(async _ => {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    // console.log(tab.url);
  } catch (err) {}
});
