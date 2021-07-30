import * as GST from 'google-spreadsheets-ts';

export function getJSONEndpoint(googleUrl: string, page: number): string {
  const [sheetId] = googleUrl.match('(?<=\\/d\\/)[^\\/]*') || [''];
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
