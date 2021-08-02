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
const scriptMock = mockForV3('scripting', 'executeScript');
scriptMock.mockResolvedValueOnce([{ result: ['sheet 1'] }]);

const tabsMock = mockForV3('tabs', 'query');
tabsMock.mockResolvedValue([{}]);

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
