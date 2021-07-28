import { extractJSON, getJSONEndpoint, insertCheckboxes } from '../util';
import * as GST from 'google-spreadsheets-ts';
import { getSheetNames, SheetNames } from '../scripts';

document.addEventListener('DOMContentLoaded', async _ => {
  const [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  const { url: sheetUrl = '', title = '', id: tabId = 0 } = activeTab;
  const tabTitle = title.replace(' - Google Sheets', '');

  const sheetNamesRes = await chrome.scripting.executeScript({
    target: { tabId },
    function: getSheetNames,
  });

  const sheetNames = sheetNamesRes[0].result as SheetNames;

  const optionsForm = document.getElementById('sheet-opts')!;

  insertCheckboxes(optionsForm, sheetNames);

  document.getElementById('button')!.addEventListener('click', async _ => {
    const form = document.forms.namedItem('sheet')!;
    const radios = form.elements.namedItem('sheetSelect') as RadioNodeList;

    // The first sheet has number 1, the second number 2, etc
    const pageNumber = sheetNames.indexOf(radios.value) + 1;

    const regex = '(?<=\\/d\\/)[^\\/]*';

    const sheetId = sheetUrl.match(regex)![0];

    const api = getJSONEndpoint(sheetId, pageNumber);
    try {
      const res = await fetch(api);
      const data: GST.RootObject = await res.json();
      console.log(data);
      const json = extractJSON(data);
      const jsonStr = JSON.stringify(json);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const downloadUrl = URL.createObjectURL(blob);

      chrome.downloads.download({
        url: downloadUrl,
        filename: tabTitle + '.json',
      });

      // window.close();
    } catch (e) {
      console.error(e, 'Sheet is not public');
    }
  });
});
