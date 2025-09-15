import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './docgen/views/router.tsx';
import './bundle/assets/styles/framework.css';

const app = () => {
  const rootElement = document.getElementById('root');
  const root = ReactDOM.createRoot(rootElement!);
  root.render(<RouterProvider router={router} />);
};

app();
