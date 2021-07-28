export function createCheckbox(parent: HTMLElement, data: string[]): void {
  data.forEach((el, idx) => {
    const container = document.createElement('div');

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.id = el;
    radio.value = el;
    radio.name = 'sheetSelect';
    if (idx === 0) radio.checked = true;

    const label = document.createElement('label');
    label.htmlFor = el;

    const text = document.createTextNode(el);
    label.appendChild(text);

    container.appendChild(radio);
    container.appendChild(label);

    parent.append(container);
  });
}
