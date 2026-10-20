export type TemplateId = 'simple' | 'emphasis';
export type Mark = 'plain' | 'strong' | 'code';
export type InlineRun = { text: string; mark: Mark };
export type BriefValues = { audience: string; focus: string; delivery: string; criteria: string };
export type SourceExcerpt = {
  id: string; title: string; path: string; section: string; capturedAt: string;
  commit: string; digest: string; text: string;
};
export type Block = { id: string; text: string; runs: InlineRun[]; sourceId: string; edited: boolean };
export type Page = { id: string; title: string; sourcePage: number; purpose: string; blocks: Block[] };
