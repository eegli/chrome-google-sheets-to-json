function add(num: number) {
  return num + 1;
}

describe('Test', () => {
  it('works', () => {
    expect(add(1)).toEqual(2);
  });
});
