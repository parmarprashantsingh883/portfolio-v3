import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// No StrictMode: the ported animation effects (typewriter, observers, split-text)
// are imperative one-shots and are not idempotent under StrictMode's dev double-invoke.
createRoot(document.getElementById('root')!).render(<App />)
