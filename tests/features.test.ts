import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { App } from '../src/App';

afterEach(() => vi.unstubAllGlobals());

function openExample(hash: string) {
  vi.stubGlobal('location', { hash });
  return renderToStaticMarkup(createElement(App));
}

describe('independent feature examples', () => {
  it.each([
    ['plan', 'Plan a course', 'What a professor brings', 'A possible lesson structure'],
    ['draft', 'Draft a lesson', 'At the end of a shift, a pump-station technician', 'Sample lesson pages'],
    ['review', 'Review together', 'Variables and assignment', 'Please distinguish assignment from an equality comparison.'],
    ['format', 'Format for the LMS', 'Store Pump Values with Variables and Types', 'Download sample HTML'],
  ])('opens /%s directly with its example ready to inspect', (route, heading, sample, control) => {
    const html = openExample(`#/${route}`);
    expect(html).toContain(`<h1>${heading}</h1>`);
    expect(html).toContain(sample);
    expect(html).toContain(control);
    expect(html).toContain('Prepared examples. No live AI or LMS connection.');
    expect(html).toContain(`href="#/${route}" aria-current="page"`);
    expect(html).not.toMatch(/Generate sample outline|Approve sample content|Approve sample presentation/);
    if (route === 'format') {
      expect(html).toMatch(/<button[^>]*>.*?Download sample HTML<\/button>/);
      expect(html).not.toMatch(/<button[^>]*disabled[^>]*>.*?Download sample HTML<\/button>/);
    }
  });

  it('the home page links directly to all four examples', () => {
    const html = openExample('#/home');
    expect(html).toContain('<h1>Explore an AI course studio.</h1>');
    expect(html).toContain('Open any example.');
    for (const route of ['plan', 'draft', 'review', 'format']) {
      expect(html).toContain(`href="#/${route}"`);
    }
  });

  it('an unknown route recovers to the home examples', () => {
    const html = openExample('#/unknown-example');
    expect(html).toContain('<h1>Explore an AI course studio.</h1>');
    expect(html).toContain('href="#/review"');
  });
});
