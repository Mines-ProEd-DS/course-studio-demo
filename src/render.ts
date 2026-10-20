import type { Block, InlineRun, Page, TemplateId } from './model';
import { COPYRIGHT } from './fixtures';

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!);
}

export function renderInlineHtml(runs: InlineRun[]): string {
  return runs.map(run => {
    const text = escapeHtml(run.text);
    if (run.mark === 'strong') return `<strong>${text}</strong>`;
    if (run.mark === 'code') return `<code>${text}</code>`;
    return text;
  }).join('');
}

/** Learner block markup shared by review, template previews, and exported pages. */
export function renderBlockHtml(block: Block, templateId: TemplateId): string {
  const concept = templateId === 'emphasis'
    && (block.id === 'kernel-explanation' || block.id === 'variables-definition');
  const runs = block.runs.map(run => run.text).join('') === block.text
    ? block.runs : [{ text: block.text, mark: 'plain' as const }];
  return `<p class="demo-block${concept ? ' demo-concept' : ''}" data-block-id="${escapeHtml(block.id)}">${renderInlineHtml(runs)}</p>`;
}

/** Only learner-text rules belong here; surrounding application controls own their layout. */
export const TEMPLATE_STYLES = `
.proed-demo .demo-block { white-space: pre-wrap; line-height: 1.75; margin: 0; }
.proed-demo .demo-concept { background: #eaf1f9; border: 1px solid #7288a8; border-radius: 5px; padding: 1.25rem; }
.proed-demo .demo-block code { font-family: ui-monospace, SFMono-Regular, Consolas, monospace; color: inherit; background: #f4f8fb; padding: .05em .2em; }
`.trim();


export function sampleDocument(page: Page, template: TemplateId): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(page.title)}: layout sample</title>
<style>
body { margin: 0; color: #21314d; background: #f4f8fb; font: 1rem/1.7 system-ui, sans-serif; }
main { max-width: 720px; margin: 2rem auto; padding: 2rem; background: white; overflow-wrap: anywhere; }
h1 { font-size: 1.8rem; line-height: 1.3; } .sample-blocks { display: grid; gap: 1.25rem; }
.sample-note, footer { font-size: .85rem; color: #4d5f7c; } footer { margin-top: 2rem; }
${TEMPLATE_STYLES}
</style></head><body><main class="proed-demo">
<p class="sample-note">Course Studio concept demo. Prepared lesson excerpt; LMS compatibility is unverified.</p>
<p class="sample-note">${escapeHtml(COPYRIGHT)}</p>
<h1>${escapeHtml(page.title)}</h1>
<div class="sample-blocks">${page.blocks.map(block => renderBlockHtml(block, template)).join('\n')}</div>
<footer>Selected from Mines ProEd, Introduction to Python Programming, Lesson 1, source page ${page.sourcePage}. This is an excerpt, not a complete lesson.</footer>
</main></body></html>`;
}
