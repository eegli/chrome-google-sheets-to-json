export function insertCheckboxes(parent: HTMLElement, data: string[]): void {
  let idx = data.length - 1;
  // Looping backwards through the sheet names and appending a new node before the first child of the parent

  for (; idx >= 0; idx--) {
    const el = data[idx];
    const container = document.createElement('div');
    const input = document.createElement('input');
    const label = document.createElement('label');

    input.type = 'radio';
    input.name = 'sheetSelect';
    input.value = el;
    input.id = el;
    if (idx === 0) input.checked = true;

    label.htmlFor = el;
    label.innerHTML = el;

    container.classList.add('form-check');
    input.classList.add('form-check-input');
    label.classList.add('form-check-label');

    container.append(input);
    container.append(label);

    parent.prepend(container);
  }
}
