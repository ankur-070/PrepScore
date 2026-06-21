import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AssessmentProvider } from './context/AssessmentContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AssessmentProvider>
      <App />
    </AssessmentProvider>
  </React.StrictMode>
)
