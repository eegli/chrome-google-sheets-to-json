import { extractJSON, getJSONEndpoint } from '../util/json';
import * as GST from 'google-spreadsheets-ts';
import { getSheetNames } from '../scripts/sheet';
import { insertCheckboxes } from '../util/checkbox';

document.addEventListener('DOMContentLoaded', async _ => {
  const [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  const { url = '', title = '', id: tabId = 0 } = activeTab;

  // Title of the current tab
  const tabTitle = title.replace(' - Google Sheets', '');
  // Extract Google Sheet ID
  const sheetId = url.match('(?<=\\/d\\/)[^\\/]*')![0];

  // Inject script to get the names of the sheets
  const sheetNamesRes = await chrome.scripting.executeScript({
    target: { tabId },
    function: getSheetNames,
  });

  const sheetNames: string[] = sheetNamesRes[0].result;

  const optionsForm = document.getElementById('sheet-opts')!;

  // Insert checkboxes to select a sheet to download
  insertCheckboxes(optionsForm, sheetNames);

  document.getElementById('button')!.addEventListener('click', async _ => {
    // Select value of checked sheet
    const form = document.forms.namedItem('sheet')!;
    const radios = form.elements.namedItem('sheetSelect') as RadioNodeList;
    const selectedSheet = radios.value;

    // Each sheet has its own url. The first sheet has number 1, the
    // second number 2, etc
    const pageNumber = sheetNames.indexOf(selectedSheet) + 1;

    // Construct the final url
    const JSONendpoint = getJSONEndpoint(sheetId, pageNumber);
    try {
      // Fetch data, extract and prompt download
      const res = await fetch(JSONendpoint);
      const data: GST.RootObject = await res.json();
      const json = extractJSON(data);
      const jsonStr = JSON.stringify(json);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const downloadUrl = URL.createObjectURL(blob);

      chrome.downloads.download({
        url: downloadUrl,
        filename: tabTitle + ' - ' + selectedSheet + '.json',
      });

      window.close();
    } catch (e) {
      console.error(e, 'Sheet is not public');
    }
  });
});
