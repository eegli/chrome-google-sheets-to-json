export function sheetNamesContentScript() {
  const sheets = document.getElementsByClassName('docs-sheet-tab-name');

  const sheetNames: string[] = [];

  for (let i = 0; i < sheets.length; i++) {
    sheetNames.push(sheets[i].innerHTML);
  }

  return sheetNames;
}
