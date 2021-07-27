export function getSheetNames() {
  const sheets = document.getElementsByClassName('docs-sheet-tab-name');

  const sheetNames: string[] = [];

  for (let i = 0; i < sheets.length; i++) {
    sheetNames.push(sheets[i].innerHTML);
  }
  console.log(sheetNames);
  // chrome.runtime.sendMessage({ sheetNames });
}
