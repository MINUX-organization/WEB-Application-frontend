import ReactDOM from 'react-dom/client';
import { App, reportWebVitals } from '@/app';

function assertEnv(key: string) {
  if (process.env[key] === undefined) {
    throw new Error(`${key} is undefined`)
  }
}

assertEnv('REACT_APP_BACKEND_PORT')

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />); 

reportWebVitals();
