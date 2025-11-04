import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

// Detect base path for GitHub Pages if needed
// If the app is deployed to https://username.github.io/repo-name/, extract base path
const getBasename = () => {
  // Skip base path detection if running locally
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return '/';
  }
  
  const path = window.location.pathname;
  // Check if we're on GitHub Pages with a repo name (path like /username/repo-name/)
  // But not root GitHub Pages (/username.github.io/)
  const match = path.match(/^\/([^/]+)\/([^/]+)\//);
  return match ? `/${match[1]}/${match[2]}` : '/';
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={getBasename()}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
