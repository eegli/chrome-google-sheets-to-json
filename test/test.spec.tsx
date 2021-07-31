function add(num: number) {
  return num + 1;
}

import sampleJSON from './sample-json.json';
import Popup from '../src/popup/error';
import { extractJSON } from '../src/util';

describe('Test', () => {
  it('works', () => {
    expect(add(1)).toEqual(2);
  });
  it('matches snapshot', () => {
    expect(<Popup sheetName="testSheet" />).toMatchSnapshot();
  });
  it('extracts JSON', () => {
    const json = extractJSON(sampleJSON);
    expect(json).toMatchSnapshot();
  });
});
