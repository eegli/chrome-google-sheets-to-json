import { extractJSON, getJSONEndpoint } from '../util/json';
import * as GST from 'google-spreadsheets-ts';
import { sheetNamesContentScript } from '../scripts/sheetname';
import { insertCheckboxes } from '../util/checkbox';

document.addEventListener('DOMContentLoaded', async _ => {
  const [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  const { url: tabUrl = '', title = '', id: tabId = 0 } = activeTab;

  // Title of the current tab
  const tabTitle = title.replace(' - Google Sheets', '');

  // Inject script to get the names of the sheets
  const sheetNamesRes = await chrome.scripting.executeScript({
    target: { tabId },
    func: sheetNamesContentScript,
  });

  const sheetNames: string[] = sheetNamesRes[0].result;
  const optionsForm = document.getElementById('sheet-opts')!;
  const text = document.getElementById('title')!;

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
    const JSONendpoint = getJSONEndpoint(tabUrl, pageNumber);

    console.log(JSONendpoint);

    try {
      // Fetch data, extract and prompt download
      const res = await fetch(JSONendpoint);
      const text = await res.text();
      const html = new DOMParser().parseFromString(text, 'text/html');
      const errors = html.getElementsByClassName('errorMessage');
      console.log(errors);

      if (errors.length > 0) {
        console.log('Sheet is not public');
        return;
      }
      const data: GST.RootObject = await res.json();
      const json = extractJSON(data);
      const jsonStr = JSON.stringify(json);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const downloadUrl = URL.createObjectURL(blob);

      chrome.downloads.download({
        url: downloadUrl,
        filename: tabTitle + ' - ' + selectedSheet + '.json',
      });
      // window.close();
    } catch (e) {
      console.error('An error occured', e);
    }
  });
});
