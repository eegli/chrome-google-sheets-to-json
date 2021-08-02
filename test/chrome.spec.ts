describe('Test chrome', () => {
  it('tests', () => {
    const example = (url: string) => {
      chrome.downloads.download({
        url: url,
        filename: 'test.json'
      });
    };
    const downloadSpy = jest.fn();

    chrome.downloads.download = jest.fn(downloadSpy);

    example('test2');
    expect(downloadSpy).toHaveBeenCalledTimes(1);
  });
});
