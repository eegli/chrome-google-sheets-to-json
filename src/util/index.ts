import * as GST from 'google-spreadsheets-ts';

type DownloadArgs = {
  fileName: string;
  data: any;
};

export function download(opts: DownloadArgs) {
  const { fileName, data } = opts;
  const str = JSON.stringify(data);
  const blob = new Blob([str], { type: 'application/json' });
  const downloadUrl = URL.createObjectURL(blob);

  chrome.downloads.download({
    url: downloadUrl,
    filename: fileName + '.json'
  });
}

export async function fetchDocsData(url: string): Promise<GST.RootObject> {
  try {
    // Fetch data, extract and prompt download
    const response = await fetch(url);
    const data: GST.RootObject = await response.json();
    return data;
  } catch (e) {
    throw new Error('Error downloading JSON');
  }
}

export function getEndpoint(docsUrl: string, page: number): string {
  const [sheetId] = docsUrl.match('(?<=\\/d\\/)[^\\/]*') || [''];
  return `https://spreadsheets.google.com/feeds/list/${sheetId}/${page}/public/values?alt=json`;
}

export function extractJSON(data: GST.RootObject): any[] {
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
