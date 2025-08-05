import React from 'react';
import { Main } from './pages/main/main';
import '../../include/require/styles/framework.css';

export const App = () => {
  return (
    <Main
      parameters={{
        title: 'Dummy Title',
        name: 'Dummy Name',
        version: '1.0.0',
        date: '2024-01-01',
        organization: { name: 'Org', url: 'https://org.com' },
        author: { name: 'Author', url: 'https://author.com' },
        owner: { name: 'Owner', url: 'https://owner.com' },
        contributors: [{ name: 'Contributor', url: 'https://contributor.com' }],
        website: { name: 'Website', url: 'https://website.com' },
        summary: 'Dummy summary',
        attribution: 'Dummy attribution',
        year: '2024',
        backlink: { name: 'Backlink', url: 'https://backlink.com' },
      }}
      sortedPages={[]}
      pdfEnabled
      children={(<div>Placeholder</div>)}
    />
  );
}
