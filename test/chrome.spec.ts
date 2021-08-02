// Import for Intellisense and linting
import { chrome } from 'jest-chrome';

describe('Chrome Jest', () => {
  it('tests', () => {
    const example = (url: string) => {
      chrome.downloads.download({
        url: url,
        filename: 'test.json'
      });
    };
    const downloadSpy = jest.fn();

    chrome.downloads.download.mockImplementation(downloadSpy);
    example('test2');
    expect(downloadSpy).toHaveBeenCalledTimes(1);
  });
});
