import * as GST from 'google-spreadsheets-ts';

function getJSONEndpoint(id: string, page: number): string {
  return `https://spreadsheets.google.com/feeds/list/${id}/${page}/public/values?alt=json`;
}

function isValid(url: string): boolean {
  return url.includes('docs.google.com/spreadsheets');
}

function extract(data: GST.RootObject): Record<string, any> {
  const res = [];

  const rows = data.feed.entry;

  for (const row of rows) {
    const formattedRow = {} as Record<string, any>;

    for (const key in row) {
      if (key.startsWith('gsx$') && !key.endsWith('_cpzh4')) {
        formattedRow[key.replace('gsx$', '')] = row[key].$t;
      }
    }

    res.push(formattedRow);
  }

  console.log(data);
  return res;
}

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('button');

  if (button) {
    button.addEventListener('click', async _ => {
      chrome.tabs.query({ currentWindow: true, active: true }, async tabs => {
        const [{ url: sheetUrl = '', title: tabTitle = 'GoogleSheet' }] = tabs;

        console.log(sheetUrl);
        if (isValid(sheetUrl)) {
          const page = 1;

          const regex = '(?<=\\/d\\/)[^\\/]*';

          const sheetId = sheetUrl.match(regex)![0];

          const api = getJSONEndpoint(sheetId, page);
          console.log(api);
          try {
            const res = await fetch(api);
            const data: GST.RootObject = await res.json();
            console.log('Success!');
            const json = extract(data);

            const jsonStr = JSON.stringify(json);
            const blob = new Blob([jsonStr], { type: 'application/json' });
            const downloadUrl = URL.createObjectURL(blob);

            chrome.downloads.download({
              url: downloadUrl,
              filename: tabTitle + '.json',
            });

            console.log(json);
          } catch (e) {
            console.log('Sheet is not public');
          }
        } else {
          console.log('Not a Google Sheet Url');
        }
      });
    });
  }
});
