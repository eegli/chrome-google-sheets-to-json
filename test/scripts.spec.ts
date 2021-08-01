/**
 * @jest-environment jsdom
 */

import { sheetNamesContentScript } from '../src/scripts/sheet';

beforeAll(() => {
  document.body.innerHTML =
    '<div>' +
    '<div class="docs-sheet-tab-name">sheet 1</div>' +
    '<div class="docs-sheet-tab-name">sheet 2</div>' +
    '<div class="docs-sheet-tab">sheet 3</div>' +
    '</div>';
});

describe('Content scripts - Sheet names', () => {
  it('returns a string array', () => {
    const res = sheetNamesContentScript();
    expect(res).toEqual(['sheet 1', 'sheet 2']);
  });
});
