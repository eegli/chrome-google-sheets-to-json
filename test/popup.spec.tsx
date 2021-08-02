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
import { chrome } from 'jest-chrome';

chrome.tabs.query.mockResolvedValue([
  {
    title: 'jest',
    url: 'https://google.com',
    id: 1
  } as chrome.tabs.Tab
]);

describe('Popup', () => {
  it('should be able to sign in', async () => {
    render(<Popup />);

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /submit/i });
      expect(button).toBeTruthy();
    });
  });
});
