import React from 'react';
import { Markdown } from './markdown.tsx';

export const Page = ({ content }: { content: string }) => {
  return <Markdown content={content} />;
};
