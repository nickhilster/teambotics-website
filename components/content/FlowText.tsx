import type { ReactNode } from "react";

type TextRange = {
  start: number;
  end: number;
  text: string;
};

type FlowTextProps = {
  text: string;
  anchors?: readonly string[];
};

export function FlowText({ text, anchors = [] }: FlowTextProps) {
  const ranges: TextRange[] = [];
  const markdownAnchorPattern = /\*\*([\s\S]+?)\*\*/g;

  for (const match of text.matchAll(markdownAnchorPattern)) {
    const start = match.index ?? 0;
    ranges.push({ start, end: start + match[0].length, text: match[1] });
  }

  for (const anchor of anchors) {
    const start = text.indexOf(anchor);
    if (anchor && start >= 0) {
      ranges.push({ start, end: start + anchor.length, text: anchor });
    }
  }

  ranges.sort((left, right) => left.start - right.start || right.end - left.end);

  const content: ReactNode[] = [];
  let cursor = 0;

  for (const [index, range] of ranges.entries()) {
    if (range.start < cursor) continue;

    if (range.start > cursor) {
      content.push(text.slice(cursor, range.start));
    }

    content.push(
      <strong className="flowwrite-anchor" key={`anchor-${index}`}>
        {range.text}
      </strong>,
    );
    cursor = range.end;
  }

  if (cursor < text.length) {
    content.push(text.slice(cursor));
  }

  return <span className="flowwrite-text">{content}</span>;
}
