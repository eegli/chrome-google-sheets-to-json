async function getTabGroup() {
  const { color } = await chrome.tabGroups.get(1);
  if (!color) throw new Error('No color!');
  return color;
}

describe('Sample test', () => {
  it('fails with loose implementation', async () => {
    // Example with "loose implementation"
    const looseScriptMock = mockForV3('tabGroups.get');

    // Custom response, does not have to follow API interface
    looseScriptMock.mockImplementation(async () => ({
      collapsed: true,
      // color: 'blue',
      id: 1,
      windowId: 1
    }));

    await expect(getTabGroup()).rejects.toThrow();
  });

  it('works with strong implementation', async () => {
    // Example with mocking the actual implementation
    const strongScriptMock = mockForV3('tabGroups.get') as jest.MockedFunction<
      typeof chrome.tabGroups.get
    >;

    // TS complains if something is removed from the mocked response
    strongScriptMock.mockImplementation(async () => ({
      collapsed: true,
      color: 'blue',
      id: 1,
      windowId: 1
    }));

    await expect(getTabGroup()).resolves.toBe('blue');
  });
});
