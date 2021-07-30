import * as GST from 'google-spreadsheets-ts';

type DownloadArgs = {
  url: string;
  page: number;
  fileName: string;
};

export async function downloadJSON(opts: DownloadArgs): Promise<void> {
  const { url, page, fileName } = opts;
  const JSONendpoint = getJSONEndpoint(url, page);
  try {
    // Fetch data, extract and prompt download
    const response = await fetch(JSONendpoint);
    const data: GST.RootObject = await response.json();
    const json = extractJSON(data);
    const jsonStr = JSON.stringify(json);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const downloadUrl = URL.createObjectURL(blob);

    chrome.downloads.download({
      url: downloadUrl,
      filename: fileName + '.json'
    });
  } catch (e) {
    throw new Error('Error downloading JSON');
  }
}

function getJSONEndpoint(docsUrl: string, page: number): string {
  const [sheetId] = docsUrl.match('(?<=\\/d\\/)[^\\/]*') || [''];
  return `https://spreadsheets.google.com/feeds/list/${sheetId}/${page}/public/values?alt=json`;
}

function extractJSON(data: GST.RootObject): any[] {
  const res: Record<string, any>[] = [];

  const rows = data.feed.entry;

  // Empty Google Sheet
  if (!rows) return res;

  for (const row of rows) {
    const formattedRow = {} as Record<string, any>;

    for (const key in row) {
      if (key.startsWith('gsx$') && !key.endsWith('_cpzh4')) {
        formattedRow[key.replace('gsx$', '')] = row[key].$t;
      }
    }

    res.push(formattedRow);
  }

  return res;
}
