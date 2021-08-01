/**
 * @jest-environment jsdom
 */

import googleJSON from './data/sample-spreadsheet';
import { download, extractJSON, getEndpoint, fetchDocsData } from '../src/util';

const mockedRes = { hello: 'jest' };

const mockedFetch = jest.fn().mockResolvedValueOnce({
  json: async () => Promise.resolve(mockedRes)
} as Response);

window.fetch = mockedFetch;

describe('Fetching Docs data', () => {
  it('fetches Google Docs data', async () => {
    const res = await fetchDocsData('test');
    expect(mockedFetch).toHaveBeenCalledTimes(1);
    expect(res).toEqual(mockedRes);
  });
});

describe('JSON parsing and utilities', () => {
  it('generates JSON from the raw response', () => {
    const json = extractJSON(googleJSON);
    expect(json).toMatchSnapshot();
  });

  it('extracts Sheet id and returns an url', () => {
    const urls = [
      'https://docs.google.com/spreadsheets/d/' +
        '1qkr79b8V3GR2Uk2ZYCzeccm7oWWeNV72TZRKOL_Khbg' +
        '/edit',
      'https://docs.google.com/spreadsheets/d/' +
        '1M3qWk9Qvh87qY3pdMB53RwQ513QcUtps9t71I-S-pUk',
      'https://docs.google.com/spreadsheets/d/' +
        '11CVwVoQyn9a2AgztdDf-EZHS0aHxFiHoZu_aFr1PDXk' +
        '/edit#gid=771262429'
    ];
    const mockedGetEndpoint = jest.fn(getEndpoint);
    urls.forEach(url => mockedGetEndpoint(url, 1));

    expect(mockedGetEndpoint.mock.results[0].value).toEqual(
      'https://spreadsheets.google.com/feeds/list/' +
        '1qkr79b8V3GR2Uk2ZYCzeccm7oWWeNV72TZRKOL_Khbg' +
        '/' +
        '1' +
        '/public/values?alt=json'
    );
    expect(mockedGetEndpoint.mock.results[1].value).toEqual(
      'https://spreadsheets.google.com/feeds/list/' +
        '1M3qWk9Qvh87qY3pdMB53RwQ513QcUtps9t71I-S-pUk' +
        '/' +
        '1' +
        '/public/values?alt=json'
    );
    expect(mockedGetEndpoint.mock.results[2].value).toEqual(
      'https://spreadsheets.google.com/feeds/list/' +
        '11CVwVoQyn9a2AgztdDf-EZHS0aHxFiHoZu_aFr1PDXk' +
        '/' +
        '1' +
        '/public/values?alt=json'
    );
  });

  it('prompts a download', () => {
    const downloadSpy = jest.fn();
    window.URL.createObjectURL = jest.fn();
    chrome.downloads.download = jest.fn(downloadSpy);

    download({ fileName: 'test', data: {} });

    expect(downloadSpy).toHaveBeenCalledTimes(1);
  });
});
