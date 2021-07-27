import * as GST from 'google-spreadsheets-ts';
import { getJSONEndpoint, extractJSON } from '../util/';
import { getSheetNames } from '../scripts';

function isValid(url: string): boolean {
  return url.includes('docs.google.com/spreadsheets');
}

const sheetNames: string[] = [];

chrome.runtime.onMessage.addListener((message, sender, response) => {
  message.map((name: string) => sheetNames.push(name));
});

document.addEventListener('DOMContentLoaded', async _ => {
  const tabs = await chrome.tabs.query({ currentWindow: true, active: true });
  const [activeTab] = tabs;
  const {
    url: sheetUrl = '',
    title: tabTitle = 'GoogleSheet',
    id: tabId = 0,
  } = activeTab;

  document.getElementById('button')!.addEventListener('click', async _ => {
    if (isValid(sheetUrl)) {
      await chrome.scripting.executeScript({
        target: { tabId },
        function: getSheetNames,
      });

      const customPage =
        document.getElementById('sheet-number')!.textContent || '1';
      const page = 1;

      const regex = '(?<=\\/d\\/)[^\\/]*';

      const sheetId = sheetUrl.match(regex)![0];

      const api = getJSONEndpoint(sheetId, page);
      console.log(api);
      try {
        const res = await fetch(api);
        const data: GST.RootObject = await res.json();
        console.log('Success!');
        const json = extractJSON(data);

        const jsonStr = JSON.stringify(json);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const downloadUrl = URL.createObjectURL(blob);

        chrome.downloads.download({
          url: downloadUrl,
          filename: tabTitle + '.json',
        });

        console.log(json);
      } catch (e) {
        alert('Sheet is not public');
      }
    } else {
      alert('Not a Google Sheet Url');
    }
  });
});
