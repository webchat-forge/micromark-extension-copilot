import { copilot, copilotHtml } from '@webchat-forge/micromark-extension-copilot';
import { micromark } from 'micromark';
import React, { Fragment } from 'react';

const MARKDOWN = `# LaTeX

$$
\\frac{1}{2}
$$
`;

const App = () => {
  return (
    <Fragment>
      <h1>
        <code>@webchat-forge/micromark-extension-copilot</code> demo
      </h1>
      <pre>{MARKDOWN}</pre>
      <p>Will transform into</p>
      <pre>{micromark(MARKDOWN, 'utf-8', { extensions: [copilot()], htmlExtensions: [copilotHtml()] })}</pre>
    </Fragment>
  );
};

export default App;
