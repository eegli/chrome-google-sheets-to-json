import * as GST from 'google-spreadsheets-ts';

export function getJSONEndpoint(id: string, page: number): string {
  return `https://spreadsheets.google.com/feeds/list/${id}/${page}/public/values?alt=json`;
}
export function extractJSON(data: GST.RootObject): Record<string, any> {
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
