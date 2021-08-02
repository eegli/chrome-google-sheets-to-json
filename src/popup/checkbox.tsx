import { FunctionalComponent } from 'preact';
import { Sheets } from './popup';

type CheckBoxProps = {
  sheets: Sheets;
  selectedSheet: string;
  onChange: (e: Event) => void;
};

const CheckBoxes: FunctionalComponent<CheckBoxProps> = ({
  sheets,
  selectedSheet,
  onChange
}) => {
  return (
    <div onChange={onChange}>
      {sheets.map(sheet => {
        return (
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="sheetSelect"
              value={sheet}
              id={sheet}
              checked={sheet === selectedSheet}></input>
            <label for={sheet} className="form-check-label">
              {sheet}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default CheckBoxes;
