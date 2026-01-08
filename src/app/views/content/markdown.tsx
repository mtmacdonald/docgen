import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Link } from '@tanstack/react-router';
import { TbCopy, TbCheck } from 'react-icons/tb';
import { preprocessAdmonitions } from '../../common/markdown/markdown.ts';
import styles from './code-block.module.css';

type Props = {
  content: string;
};

const CodeBlock = ({ children, ...props }: any) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const codeElement = children?.props?.children;
    const textContent =
      typeof codeElement === 'string'
        ? codeElement
        : codeElement?.toString() || '';

    navigator.clipboard.writeText(textContent.trim()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={styles.codeBlockWrapper}>
      <button
        className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
        onClick={handleCopy}
        aria-label="Copy code"
        title={copied ? 'Copied' : 'Copy code'}
      >
        {copied ? <TbCheck /> : <TbCopy />}
      </button>
      <pre {...props}>{children}</pre>
    </div>
  );
};

export const Markdown = ({ content }: Props) => {
  const preparedContent = preprocessAdmonitions(content);
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        pre: CodeBlock,
        a: ({ href, children, title, className }) => {
          // no href -> render plain text anchor
          if (!href) {
            return (
              <a title={title} className={className}>
                {children}
              </a>
            );
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
          const path = rawPath
            .replace(/^\.\//, '')
            .replace(/(\.html|\.md)$/, '');
          const toPath =
            path === '' || path === 'index'
              ? '/'
              : path.startsWith('/')
                ? path
                : `/${path}`;
          const to = fragment ? `${toPath}#${fragment}` : toPath;

          return (
            <Link to={to} title={title} className={className}>
              {children}
            </Link>
          );
        },
      }}
    >
      {preparedContent}
    </ReactMarkdown>
  );
};
