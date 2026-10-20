import { describe, expect, it } from 'vitest';
import { COPYRIGHT, PAGES } from '../src/fixtures';
import { renderBlockHtml, sampleDocument } from '../src/render';

const page = PAGES.find(item => item.id === 'page-variables')!;
const definition = page.blocks.find(block => block.id === 'variables-definition')!;
const visibleText = (html: string) => html.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
  .replace(/<[^>]*>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');

describe('sample HTML export', () => {
  it.each(['simple', 'emphasis'] as const)('preserves wording, source order, and copyright in the %s layout', template => {
    const html = sampleDocument(page, template);
    const text = visibleText(html);
    expect(html).toMatch(/^<!doctype html>/);
    expect(text).toContain(page.title);
    expect(text).toContain(COPYRIGHT);
    expect(text).toContain('LMS compatibility is unverified.');
    expect(text).toContain('source page 6');
    let previous = -1;
    for (const block of page.blocks) {
      const index = text.indexOf(block.text);
      expect(index).toBeGreaterThan(previous);
      previous = index;
      expect(html).toContain(renderBlockHtml(block, template));
    }
    expect(html.includes('class="demo-block demo-concept"')).toBe(template === 'emphasis');
    expect(html).toContain('<strong>variable</strong>');
    expect(html).toContain('<strong>assignment</strong>');
    expect(html).toContain('<code>=</code>');
  });

  it('escapes script-like titles, block text, and block identifiers', () => {
    const title = '<img src=x onerror="alert(1)"> & layout';
    const text = '<script>alert("sample")</script> & literal text';
    const html = sampleDocument({
      ...page, title,
      blocks: [{ ...definition, id: 'block" data-unsafe="value', text, runs: [{ text, mark: 'plain' }] }],
    }, 'emphasis');
    expect(html).not.toMatch(/<script|<img/);
    expect(html).toContain('&lt;img src=x onerror=&quot;alert(1)&quot;&gt; &amp; layout');
    expect(html).toContain('&lt;script&gt;alert(&quot;sample&quot;)&lt;/script&gt; &amp; literal text');
    expect(html).toContain('data-block-id="block&quot; data-unsafe=&quot;value"');
    expect(visibleText(html)).toContain(title);
    expect(visibleText(html)).toContain(text);
  });

  it('uses escaped canonical text when inline runs no longer match the block', () => {
    const text = 'Revised <strong>literal</strong> definition without an equals sign.';
    const html = renderBlockHtml({ ...definition, text }, 'emphasis');
    expect(visibleText(html)).toBe(text);
    expect(html).toContain('&lt;strong&gt;literal&lt;/strong&gt;');
    expect(html).not.toContain('<strong>');
    expect(html).not.toContain('<code>');
  });
});
