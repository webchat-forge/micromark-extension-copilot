import { describe, it, expect, vi, beforeEach } from 'vitest';
import { copilotHtml } from '../src/index';
import { TOKEN_TYPE_MATH_INLINE, TOKEN_TYPE_MATH_BLOCK } from '../src/syntax/constants';

describe('copilotHtml extension', () => {
  let extension: ReturnType<typeof copilotHtml>;
  let mockContext: any;
  
  beforeEach(() => {
    extension = copilotHtml();
    // Setup mock micromark context
    mockContext = {
      sliceSerialize: vi.fn().mockReturnValue('x^2'),
      raw: vi.fn(),
      tag: vi.fn()
    };
  });
  
  it('should return an HTML extension object with correct structure', () => {
    // Test structure of the extension
    expect(extension).toHaveProperty('exit');
    expect(extension.exit).toHaveProperty(TOKEN_TYPE_MATH_INLINE);
    expect(extension.exit).toHaveProperty(TOKEN_TYPE_MATH_BLOCK);
  });
  
  it('should render inline math correctly', () => {
    const token = { type: TOKEN_TYPE_MATH_INLINE };
    extension.exit[TOKEN_TYPE_MATH_INLINE].call(mockContext, token);
    
    expect(mockContext.sliceSerialize).toHaveBeenCalledWith(token);
    expect(mockContext.raw).toHaveBeenCalledWith(
      '<span class="math-inline" data-math-type="inline"><code>x^2</code></span>'
    );
  });
  
  it('should render block math correctly', () => {
    const token = { type: TOKEN_TYPE_MATH_BLOCK };
    extension.exit[TOKEN_TYPE_MATH_BLOCK].call(mockContext, token);
    
    expect(mockContext.sliceSerialize).toHaveBeenCalledWith(token);
    expect(mockContext.raw).toHaveBeenCalledWith(
      '<pre class="math-block" data-math-type="block"><code>x^2</code></pre>'
    );
  });
  
  it('should use custom render function if provided', () => {
    const renderMath = vi.fn().mockReturnValue('<renderedMath>');
    const extensionWithRenderer = copilotHtml({ renderMath });
    
    const token = { type: TOKEN_TYPE_MATH_INLINE };
    extensionWithRenderer.exit[TOKEN_TYPE_MATH_INLINE].call(mockContext, token);
    
    expect(renderMath).toHaveBeenCalledWith('x^2', false);
    expect(mockContext.raw).toHaveBeenCalledWith(
      '<span class="math-inline" data-math-type="inline"><renderedMath></span>'
    );
  });
  
  it('should handle errors in custom render function', () => {
    // Mock console.error to avoid cluttering test output
    const originalConsoleError = console.error;
    console.error = vi.fn();
    
    const renderMath = vi.fn().mockImplementation(() => {
      throw new Error('Rendering error');
    });
    
    const extensionWithRenderer = copilotHtml({ renderMath });
    const token = { type: TOKEN_TYPE_MATH_INLINE };
    
    extensionWithRenderer.exit[TOKEN_TYPE_MATH_INLINE].call(mockContext, token);
    
    expect(renderMath).toHaveBeenCalledWith('x^2', false);
    expect(mockContext.raw).toHaveBeenCalledWith(
      '<span class="math-error" data-math-type="error"><code>x^2</code></span>'
    );
    
    // Restore console.error
    console.error = originalConsoleError;
  });
});