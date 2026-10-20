import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowDownToLine, ArrowRight, BookOpen, Check, FileText, LayoutTemplate, MessageSquare, NotebookPen } from 'lucide-react';
import { EXAMPLE_COMMENT, PAGES, PROPOSED_RUNS } from './fixtures';
import type { Block, Page, TemplateId } from './model';
import { renderBlockHtml, sampleDocument, TEMPLATE_STYLES } from './render';

const FEATURES = [
  { id: 'plan', title: 'Plan a course', nav: 'Course plan', description: 'Bring your materials and goals together into a starting outline.', sample: 'Materials + teaching goals', icon: NotebookPen },
  { id: 'draft', title: 'Draft a lesson', nav: 'Lesson draft', description: 'See how existing material could become a readable lesson page.', sample: 'An idea becomes a lesson', icon: FileText },
  { id: 'review', title: 'Review together', nav: 'Feedback', description: 'Leave a comment beside the content and see a suggested revision.', sample: 'A paragraph + a conversation', icon: MessageSquare },
  { id: 'format', title: 'Format for the LMS', nav: 'LMS layout', description: 'Apply a consistent layout and prepare HTML for a designer to use.', sample: 'One lesson, different layouts', icon: LayoutTemplate },
];
const VARIABLES = PAGES.find(page => page.id === 'page-variables')!;
const DEFINITION = VARIABLES.blocks.find(block => block.id === 'variables-definition')!;
const SHORT_TITLES = ['Lesson opening', 'Run order', 'Variables'];

function readRoute() {
  const route = location.hash.replace(/^#\/?/, '').split('/')[0];
  return FEATURES.some(feature => feature.id === route) ? route : 'home';
}

function Intro({ title, children }: { title: string; children: ReactNode }) {
  return <header className="feature-intro"><h1>{title}</h1><p>{children}</p></header>;
}

function BlockText({ block, template = 'simple' }: { block: Block; template?: TemplateId }) {
  return <div dangerouslySetInnerHTML={{ __html: renderBlockHtml(block, template) }} />;
}

function Lesson({ page, template = 'simple' }: { page: Page; template?: TemplateId }) {
  return <article className="lesson-paper proed-demo" aria-label="Sample lesson excerpt">
    <h2>{page.title}</h2>
    <div className="lesson-blocks">{page.blocks.map(block => <BlockText key={block.id} block={block} template={template} />)}</div>
    <p className="sample-caption">Excerpt from the existing Mines ProEd Python course.</p>
  </article>;
}

function Home() {
  return <>
    <div className="home-intro">
      <h1>Explore an AI course studio.</h1>
      <p>A few ideas for helping professors shape their teaching and designers prepare it for the LMS.</p>
    </div>
    <section className="feature-directory" aria-labelledby="explore-heading">
      <div className="directory-heading"><h2 id="explore-heading">What could it help with?</h2><p>Open any example.</p></div>
      {FEATURES.map(feature => <a className="feature-link" href={`#/${feature.id}`} key={feature.id}>
        <div className="feature-description"><h3>{feature.title}</h3><p>{feature.description}</p></div>
        <div className="feature-teaser" aria-hidden="true"><feature.icon size={24} strokeWidth={1.5} /><span>{feature.sample}</span></div>
        <ArrowRight className="feature-arrow" size={22} aria-hidden="true" />
      </a>)}
    </section>
  </>;
}

function Plan() {
  return <>
    <Intro title="Plan a course">Give AI your materials, audience, and teaching goals. It could suggest a structure for you to shape.</Intro>
    <div className="planning-example">
      <section className="planning-input" aria-labelledby="input-heading">
        <h2 id="input-heading">What a professor brings</h2>
        <dl className="brief-sample">
          <dt>Course idea</dt><dd>Introduction to Python Programming</dd>
          <dt>Audience</dt><dd>Working professionals new to Python</dd>
          <dt>Teaching goal</dt><dd>Understand notebooks, run order, and variables.</dd>
        </dl>
        <h3>Existing materials</h3>
        <ul className="materials-list"><li><FileText size={18} aria-hidden="true" />Course outline</li><li><FileText size={18} aria-hidden="true" />Lesson notes</li></ul>
      </section>
      <section className="outline-example" aria-labelledby="outline-heading">
        <h2 id="outline-heading">A possible lesson structure</h2>
        <ul className="sample-outline">{PAGES.map(page => <li key={page.id}><BookOpen size={19} aria-hidden="true" /><div><h3>{page.title}</h3><p>{page.purpose}</p></div></li>)}</ul>
        <p className="sample-caption">A prepared selection from the Python course. A professor would adapt the structure.</p>
      </section>
    </div>
  </>;
}

function Draft() {
  const [selected, setSelected] = useState(0);
  return <>
    <Intro title="Draft a lesson">Turn source material into explanations and examples, ready for a professor to review.</Intro>
    <div className="draft-toolbar"><span>Sample lesson pages</span><div className="choice-group" role="group" aria-label="Sample lesson page">
      {PAGES.map((page, index) => <button key={page.id} aria-pressed={selected === index} onClick={() => setSelected(index)}>{SHORT_TITLES[index]}</button>)}
    </div></div>
    <div className="draft-stage"><Lesson page={PAGES[selected]} /></div>
    <p className="below-example">These examples use existing course text to illustrate what a draft could look like.</p>
  </>;
}

function Review() {
  const [revised, setRevised] = useState(false);
  const [draft, setDraft] = useState('');
  const [comments, setComments] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const revisedBlock = { ...DEFINITION, text: PROPOSED_RUNS.map(run => run.text).join(''), runs: PROPOSED_RUNS };
  return <>
    <Intro title="Review together">Read the lesson and comment beside it. AI could suggest a change, while the professor keeps the final say.</Intro>
    <div className="review-example">
      <article className="lesson-paper proed-demo" aria-label="Paragraph with feedback">
        <h2>Variables and assignment</h2>
        <div className="commented-passage"><BlockText block={revised ? revisedBlock : DEFINITION} /></div>
        <div className="paragraph-note"><MessageSquare size={16} aria-hidden="true" /><span>Feedback on this paragraph</span></div>
        <div className="choice-group revision-choice" role="group" aria-label="Paragraph version">
          <button aria-pressed={!revised} onClick={() => setRevised(false)}>Original</button>
          <button aria-pressed={revised} onClick={() => setRevised(true)}>Suggested revision</button>
        </div>
        <p className="sample-caption">The suggested revision is a prepared example.</p>
      </article>
      <aside className="comment-panel" aria-labelledby="comments-heading">
        <h2 id="comments-heading">Comments</h2>
        <div className="sample-comment"><p className="comment-author">Professor <span>Example</span></p><p>{EXAMPLE_COMMENT}</p></div>
        <p className="comment-explanation">Switch to the suggested revision to see how this feedback could change the paragraph.</p>
        <div className="local-comments" aria-live="polite">{comments.map((comment, index) => <div className="sample-comment" key={index}><p className="comment-author">Your sample comment</p><p>{comment}</p></div>)}</div>
        <form onSubmit={event => { event.preventDefault(); if (!draft.trim()) return; setComments(previous => [...previous, draft.trim()]); setDraft(''); setMessage('Comment added to this example.'); }}>
          <label htmlFor="sample-comment">Try leaving a comment</label>
          <textarea id="sample-comment" placeholder="What would you change?" value={draft} onChange={event => setDraft(event.target.value)} maxLength={2000} rows={3} />
          <button className="button primary" type="submit" disabled={!draft.trim()}>Add comment</button>
          <p className="field-note">For this visit only. Comments do not generate AI replies.</p>
          <span className="sr-only" role="status">{message}</span>
        </form>
      </aside>
    </div>
  </>;
}

function Format() {
  const [template, setTemplate] = useState<TemplateId>('emphasis');
  const [message, setMessage] = useState('');
  const html = sampleDocument(VARIABLES, template);
  function download() {
    const url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `course-studio-${template}-sample.html`;
    document.body.append(anchor); anchor.click(); anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage('Sample HTML prepared for download.');
  }
  return <>
    <Intro title="Format for the LMS">Help designers turn lesson text into consistent pages using reusable layouts.</Intro>
    <div className="format-toolbar"><div className="choice-group" role="group" aria-label="Lesson layout">
      <button aria-pressed={template === 'simple'} onClick={() => setTemplate('simple')}>Simple lesson</button>
      <button aria-pressed={template === 'emphasis'} onClick={() => setTemplate('emphasis')}>Concept emphasis</button>
    </div><button className="button primary" onClick={download}><ArrowDownToLine size={17} aria-hidden="true" />Download sample HTML</button></div>
    <div className="draft-stage"><Lesson page={VARIABLES} template={template} /></div>
    <div className="format-notes"><p>Same lesson, different presentation. These sample layouts still need testing in Thought Industries.</p><p className="download-status" role="status">{message && <><Check size={15} aria-hidden="true" />{message}</>}</p></div>
    <details className="html-details"><summary>See the sample HTML</summary><pre tabIndex={0} role="region" aria-label="Sample HTML source"><code>{html}</code></pre></details>
  </>;
}

export function App() {
  const [route, setRoute] = useState(readRoute);
  const main = useRef<HTMLElement>(null);
  useEffect(() => {
    const changed = () => { setRoute(readRoute()); requestAnimationFrame(() => { main.current?.focus({ preventScroll: true }); window.scrollTo(0, 0); }); };
    window.addEventListener('hashchange', changed);
    return () => window.removeEventListener('hashchange', changed);
  }, []);
  useEffect(() => { document.title = `${FEATURES.find(feature => feature.id === route)?.title || 'Explore'} | ProEd Course Studio`; }, [route]);
  return <>
    <style>{TEMPLATE_STYLES}</style>
    <a className="skip-link" href="#main" onClick={event => { event.preventDefault(); main.current?.focus(); }}>Skip to content</a>
    <header className="site-header"><div className="header-inner">
      <a className="brand" href="#/home"><BookOpen size={24} strokeWidth={1.7} aria-hidden="true" /><span><strong>ProEd</strong> Course Studio</span></a>
      <span className="demo-label">Concept demo</span>
    </div></header>
    {route !== 'home' && <nav className="example-nav" aria-label="Examples"><a href="#/home">Home</a>{FEATURES.map(feature => <a key={feature.id} href={`#/${feature.id}`} aria-current={route === feature.id ? 'page' : undefined}>{feature.nav}</a>)}</nav>}
    <main ref={main} id="main" tabIndex={-1} className={`site-main ${route === 'home' ? 'home' : ''}`}>
      {route === 'home' && <Home />}
      {route === 'plan' && <Plan />}
      {route === 'draft' && <Draft />}
      {route === 'review' && <Review />}
      {route === 'format' && <Format />}
    </main>
    <footer className="site-footer"><p>Prepared examples. No live AI or LMS connection.</p>{route !== 'home' && <a href="#/home">Back to all examples<ArrowRight size={15} aria-hidden="true" /></a>}</footer>
  </>;
}
