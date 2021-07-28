chrome.runtime.onMessage.addListener((req, sender, res) => {
  console.log(req, sender);
  const json = {};
  const jsonStr = JSON.stringify(json);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const downloadUrl = URL.createObjectURL(blob);

  chrome.downloads.download({
    url: downloadUrl,
    filename: 'test' + '.json',
  });
});
