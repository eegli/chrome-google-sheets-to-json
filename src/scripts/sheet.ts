export type SheetNames = string[];

export function getSheetNames() {
  const sheets = document.getElementsByClassName('docs-sheet-tab-name');

  const sheetNames: SheetNames = [];

  for (let i = 0; i < sheets.length; i++) {
    sheetNames.push(sheets[i].innerHTML);
  }

  return sheetNames;
}
