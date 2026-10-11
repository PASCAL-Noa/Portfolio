import React, { useMemo } from 'react';
import { marked } from 'marked';

interface MarkdownViewProps {
  content?: string;
  className?: string;
}

export const MarkdownView: React.FC<MarkdownViewProps> = ({ content = '', className = '' }) => {
  const html = useMemo(() => {
    if (!content) return '';
    try {
      return marked.parse(content, { breaks: true, gfm: true, async: false }) as string;
    } catch {
      return content;
    }
  }, [content]);

  return (
    <div
      className={`markdown-content leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
