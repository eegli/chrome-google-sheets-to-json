import { extractJSON, getJSONEndpoint, createCheckbox } from '../util';
import * as GST from 'google-spreadsheets-ts';
import { getSheetNames, SheetNames } from '../scripts';

document.addEventListener('DOMContentLoaded', async _ => {
  const [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  const {
    url: sheetUrl = '',
    title: tabTitle = 'GoogleSheet',
    id: tabId = 0,
  } = activeTab;

  const sheetNamesRes = await chrome.scripting.executeScript({
    target: { tabId },
    function: getSheetNames,
  });

  const sheetNames = sheetNamesRes[0].result as SheetNames;

  const optionsContainer = document.getElementById('sheet-opts-radio')!;

  createCheckbox(optionsContainer, sheetNames);

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
      console.log('Success');
      const json = extractJSON(data);

      console.log(json);
    } catch (e) {
      console.error('Sheet is not public');
    }
  });
});
