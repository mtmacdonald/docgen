import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

type Props = {
  content: string;
};

export const Markdown = ({ content }: Props) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, className, children, ...props }) {
          return (
            <code
              className={className}
              style={{
                background: '#f6f8fa',
                padding: '0.2em 0.4em',
                borderRadius: '4px',
                fontSize: '0.95em',
              }}
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
