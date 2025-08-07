import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
  content: string;
};

export const Markdown = ({ content }: Props) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
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
        // Customize other elements as needed (e.g. h1, table, etc.)
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
