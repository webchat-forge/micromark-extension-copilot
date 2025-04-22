import { copilot, copilotHtml } from '@webchat-forge/micromark-extension-copilot';
import katex from 'katex';
import { micromark } from 'micromark';
import { useCallback } from 'react';

export const useMathMarkdown = () => {
  const renderMath = useCallback((content: string, isBlock: boolean): string => {
    try {
      return katex.renderToString(content.trim(), {
        displayMode: isBlock,
        throwOnError: true,
        output: 'mathml'
      });
    } catch (error) {
      console.error('KaTeX error:', error);
      return `<pre class="katex-error">${content}</pre>`;
    }
  }, []);

  const renderMarkdown = useCallback((markdown: string): string => {
    return micromark(markdown, 'utf-8', {
      extensions: [copilot()],
      htmlExtensions: [copilotHtml({ renderMath })]
    });
  }, [renderMath]);

  return { renderMarkdown };
};