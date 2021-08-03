/**
 * @jest-environment jsdom
 */

import {
  render,
  fireEvent,
  screen,
  cleanup,
  waitFor
} from '@testing-library/preact';
import Popup from '../src/popup/popup';

// If scripting.executeScript needs to be mocked multiple times in a
// test, simply overwrite it with a different mock function - in
// between test files, it will be reset anyway

// Example with "loose implementation", custom response
const scriptMock = mockForV3('scripting.executeScript');
scriptMock.mockResolvedValueOnce([{ result: ['sheet 22'] }]);

// Example with mock according implementing the actual response
const tabsMock = mockForV3('tabs.query') as jest.MockedFunction<
  typeof chrome.tabs.query
>;
tabsMock.mockImplementation(async () => [
  {
    index: 0,
    pinned: false,
    highlighted: false,
    windowId: 0,
    active: true,
    incognito: false,
    selected: false,
    discarded: false,
    autoDiscardable: false,
    groupId: 1
  }
]);

describe('Popup', () => {
  it('should be able to sign in', async () => {
    render(<Popup />);
    const button = screen.getByRole('button', { name: /submit/i });

    await waitFor(() => {
      expect(scriptMock).toHaveBeenCalledTimes(1);
      expect(button).toBeTruthy();
    });
  });
});
