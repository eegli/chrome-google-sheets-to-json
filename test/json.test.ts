import googleJSON from './data/sample-spreadsheet';
import { extractJSON } from '../src/util';

describe('JSON parsing and utilities', () => {
  it('generates JSON from the raw response', () => {
    const json = extractJSON(googleJSON);
    expect(json).toMatchSnapshot();
  });
  it('extracts JSON', () => {});
});
