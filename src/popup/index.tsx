import { FunctionalComponent, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { sheetNamesContentScript } from '../scripts/sheet';
import { extractJSON, getJSONEndpoint } from '../util/json';
import * as GST from 'google-spreadsheets-ts';
import CheckBoxes from './checkbox';

export type Sheets = string[];

const Popup: FunctionalComponent = () => {
  const [activeTab, setActiveTab] = useState<chrome.tabs.Tab>();
  const [sheets, setSheets] = useState<Sheets>([]);
  const [selectedSheet, setSelectedSheet] = useState<string>('');
  const [isPublicDoc, setIsPublicDoc] = useState<boolean>(true);

  /* https://preactjs.com/guide/v10/typescript/#typing-events */
  function handleSelectSheet(event: Event) {
    event.preventDefault();
    if (event.target instanceof HTMLInputElement) {
      setSelectedSheet(event.target.value);
    }
  }

  function handleSubmit(event: Event): void {
    event.preventDefault();
    if (event.target instanceof HTMLFormElement) {
      console.log(event.target);
      handleDownload();
    }
  }

  async function handleDownload(): Promise<void> {
    // Each sheet has its own url. The first sheet has number 1, the
    // second number 2, etc
    const page = sheets.indexOf(selectedSheet) + 1;
    const JSONendpoint = getJSONEndpoint(activeTab?.url || '', page);
    console.log(JSONendpoint);

    // Download JSON
    try {
      // Fetch data, extract and prompt download
      const response = await fetch(JSONendpoint);
      const textResponse = await response.clone().text();
      const html = new DOMParser().parseFromString(textResponse, 'text/html');
      const errors = html.getElementsByClassName('errorMessage');
      console.log(errors);

      if (errors.length > 0) {
        console.log(errors);
        console.log('Sheet is not public');
        setIsPublicDoc(false);
      } else {
        const data: GST.RootObject = await response.json();
        const json = extractJSON(data);
        const jsonStr = JSON.stringify(json);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const downloadUrl = URL.createObjectURL(blob);

        const tabTitle = activeTab?.title || '';

        chrome.downloads.download({
          url: downloadUrl,
          filename: tabTitle + ' - ' + selectedSheet + '.json',
        });
        window.close();
      }
    } catch (e) {
      console.error('An error occured', e);
    }
  }

  // https://dev.to/stlnick/useeffect-and-async-4da8
  useEffect(() => {
    (async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      setActiveTab(tab);

      const sheets = await chrome.scripting.executeScript({
        target: { tabId: tab.id || 0 },
        func: sheetNamesContentScript,
      });

      const sheetNames: string[] = sheets[0].result;

      setSheets(sheetNames);
      setSelectedSheet(sheetNames[0]);
    })();
  }, []);

  return (
    <div className='container w-auto p-3'>
      <div>
        <h4>Choose Sheet</h4>
        <form name='sheet' onSubmit={handleSubmit}>
          <CheckBoxes
            sheets={sheets}
            selectedSheet={selectedSheet}
            onChange={handleSelectSheet}
          />
          <button type='submit' className='btn btn-primary my-3'>
            Submit
          </button>
        </form>
      </div>
      {!isPublicDoc && (
        <div className='alert alert-danger' role='alert'>
          Sheet is not public!
        </div>
      )}
    </div>
  );
};

render(<Popup />, document.body);
