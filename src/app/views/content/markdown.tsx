import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Link } from '@tanstack/react-router';

type Props = {
  content: string;
};

export const Markdown = ({ content }: Props) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        a: ({ href, children, title, className }) => {
          // no href -> render plain text anchor
          if (!href) {
            return <a title={title} className={className}>{children}</a>;
          }

          // External links -> normal <a> (same tab)
          if (href.startsWith('http://') || href.startsWith('https://')) {
            return (
              <a href={href} title={title} className={className}>
                {children}
              </a>
            );
          }

          // Pure in-page anchors -> normal <a>
          if (href.startsWith('#')) {
            return (
              <a href={href} title={title} className={className}>
                {children}
              </a>
            );
          }

          // Internal doc links: strip .html/.md, drop leading "./", preserve fragment
          const [rawPath, fragment] = href.split('#');
          const path = rawPath.replace(/^\.\//, '').replace(/(\.html|\.md)$/, '');
          const toPath = path === '' || path === 'index' ? '/' : path.startsWith('/') ? path : `/${path}`;
          const to = fragment ? `${toPath}#${fragment}` : toPath;

          return (
            <Link to={to} title={title} className={className}>
              {children}
            </Link>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
