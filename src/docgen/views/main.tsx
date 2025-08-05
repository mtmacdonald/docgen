import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => <div>Hello World</div>;

const main = () => {
  const rootElement = document.getElementById('root');
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
};

main();