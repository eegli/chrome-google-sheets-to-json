import { FunctionComponent } from 'preact';

type ErrorProps = {
  sheetName: string;
};

const Error: FunctionComponent<ErrorProps> = ({ sheetName }) => (
  <div className="alert alert-danger" role="alert">
    <h4 className="alert-heading text-nowrap">Sheet is not public</h4>
    <p>
      It looks like the Sheet "{sheetName}" is not published. As of now, this
      extension can only download Google Sheets that are published to the web.
    </p>
    <hr />
    <p className="mb-0">
      Publish your Sheet and try again.
      <br />
      <a
        href="https://support.google.com/docs/answer/183965"
        rel="noopener noreferrer"
        target="_blank"
        class="alert-link">
        How to publish a Google Sheet
      </a>
    </p>
  </div>
);

export default Error;
