import { FunctionalComponent, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { sheetNamesContentScript } from '../scripts/sheet';
import { downloadJSON } from '../util';
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
      handleDownload();
    }
  }

  async function handleDownload(): Promise<void> {
    // Each sheet has its own url. The first sheet has number 1, the
    // second number 2, etc
    const page = sheets.indexOf(selectedSheet) + 1;
    const url = activeTab?.url || '';
    const fileName =
      activeTab?.title?.replace(' - Google Sheets', '') || 'data';

    // Download JSON
    try {
      await downloadJSON({ url, page, fileName });
      window.close();
    } catch (e) {
      console.log('Sheet is not public');
      console.error('An error occured', e);
      setIsPublicDoc(false);
    }
  }

  // https://dev.to/stlnick/useeffect-and-async-4da8
  useEffect(() => {
    (async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
      });

      setActiveTab(tab);

      const sheets = await chrome.scripting.executeScript({
        target: { tabId: tab.id || 0 },
        func: sheetNamesContentScript
      });

      const sheetNames: string[] = sheets[0].result;

      setSheets(sheetNames);
      setSelectedSheet(sheetNames[0]);
    })();
  }, []);

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
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading text-nowrap">Sheet is not public</h4>
            <p>
              It looks like the Sheet "{selectedSheet}" is not published. As of
              now, this extension can only download Google Sheets that are
              published to the web.
            </p>
            <hr />
            <p className="mb-0">
              Publish your Sheet and try again.
              <br />
              <a
                href="https://support.google.com/docs/answer/183965"
                rel="noopener noreferrer"
                target="_blank"
                class="alert-link">
                How to publish a Google Sheet
              </a>
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

render(<Popup />, document.body);
