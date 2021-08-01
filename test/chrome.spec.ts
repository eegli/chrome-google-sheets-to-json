import { chrome } from 'jest-chrome';

function example(url: string): void {
  chrome.downloads.download({
    url: url,
    filename: 'test.json'
  });
}

test('Download', () => {
  const downloadSpy = jest.fn();

  chrome.downloads.download.mockImplementation(downloadSpy);

  example('test');
});
