import { CompileContext, Token, type HtmlExtension } from 'micromark-util-types';
import { TOKEN_TYPE_MATH_BLOCK, TOKEN_TYPE_MATH_INLINE } from './syntax/constants';

interface RenderOptions {
  /**
   * Callback to render math content
   * @param content The math content to render
   * @param isBlock Whether the content should be rendered as a block
   * @returns The rendered HTML string
   */
  renderMath?: (content: string, isBlock: boolean) => string;
}

function renderError(content: string, isBlock: boolean): string {
  return isBlock 
    ? `<figure class="math-error" data-math-type="error" tabindex="0"><pre>${content}</pre></figure>`
    : `<span class="math-error" data-math-type="error"><code>${content}</code></span>`;
}

function wrapMathContent(content: string, isBlock: boolean): string {
  if (isBlock) {
    return `<figure class="math-block" data-math-type="block" tabindex="0">
      ${content}
    </figure>`;
  }
  
  return `<span class="math-inline" data-math-type="inline">${content}</span>`;
}

function renderContent(content: string, isBlock: boolean, renderMath?: RenderOptions['renderMath']): string {
  if (!renderMath) {
    return isBlock 
      ? `<pre class="math-block" data-math-type="block"><code>${content}</code></pre>`
      : `<span class="math-inline" data-math-type="inline"><code>${content}</code></span>`;
  }

  try {
    const renderedMath = renderMath(content, isBlock);
    return wrapMathContent(renderedMath, isBlock);
  } catch (error) {
    console.error(`Error rendering ${isBlock ? 'block' : 'inline'} math:`, error);
    return renderError(content, isBlock);
  }
}

export default function copilotHtml(options: RenderOptions = {}): HtmlExtension {
  const { renderMath } = options;

  return {
    exit: {
      // @ts-expect-error math* are not known tokens in micromark
      [TOKEN_TYPE_MATH_INLINE](
        this: CompileContext,
        token: Pick<Token, 'start' | 'end'>
      ) {
        const content = this.sliceSerialize(token);
        this.raw(renderContent(content, false, renderMath));
      },
      [TOKEN_TYPE_MATH_BLOCK](
        this: CompileContext,
        token: Pick<Token, 'start' | 'end'>
      ) {
        const content = this.sliceSerialize(token);
        this.raw(renderContent(content, true, renderMath));
      }
    }
  };
}