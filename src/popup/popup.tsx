import { FunctionalComponent, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { sheetNamesContentScript } from '../scripts/sheet';
import { download, extractJSON, fetchDocsData, getEndpoint } from '../util';
import CheckBoxes from './checkbox';
import Error from './error';

export type Sheets = string[];

const Popup: FunctionalComponent = () => {
  const [activeTab, setActiveTab] = useState<chrome.tabs.Tab>();
  const [sheets, setSheets] = useState<Sheets>([]);
  const [selectedSheet, setSelectedSheet] = useState<string>('');
  const [isPublicDoc, setIsPublicDoc] = useState<boolean>(true);

  /* https://preactjs.com/guide/v10/typescript/#typing-events */
  function handleSelectSheet(e: Event) {
    e.preventDefault();
    if (e.target instanceof HTMLInputElement) {
      setSelectedSheet(e.target.value);
    }
  }

  function handleSubmit(e: Event): void {
    e.preventDefault();
    handleDownload();
  }

  async function handleDownload(): Promise<void> {
    // Each sheet has its own url. The first sheet has number 1, the
    // second number 2, etc
    const page = sheets.indexOf(selectedSheet) + 1;
    const url = activeTab?.url || '';
    const fileName =
      activeTab?.title?.replace(' - Google Sheets', '') || 'data';

    const JSONapi = getEndpoint(url, page);
    // Download JSON
    try {
      const sheetData = await fetchDocsData(JSONapi);
      const json = extractJSON(sheetData);
      download({
        data: json,
        fileName
      });
      window.close();
    } catch (e) {
      console.error('An error occured', e);
      setIsPublicDoc(false);
    }
  }

  /*   // https://dev.to/stlnick/useeffect-and-async-4da8
  useEffect(() => {
    (async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
      });

      const sheets = await chrome.scripting.executeScript({
        target: { tabId: tab.id || 0 },
        func: sheetNamesContentScript
      });

      const sheetNames: string[] = sheets[0].result;

      setActiveTab(tab);
      setSheets(sheetNames);
      setSelectedSheet(sheetNames[0]);
    })();
  }, []); */

  return (
    <main>
      <div className="container w-auto p-3">
        {isPublicDoc ? (
          <div>
            <h4 className="text-nowrap">Choose Sheet</h4>
            <form name="sheet" onSubmit={handleSubmit}>
              <CheckBoxes
                sheets={sheets}
                selectedSheet={selectedSheet}
                onChange={handleSelectSheet}
              />
              <button type="submit" className="btn btn-primary my-3">
                Submit
              </button>
            </form>
          </div>
        ) : (
          <Error sheetName={selectedSheet} />
        )}
      </div>
    </main>
  );
};

export default Popup;
