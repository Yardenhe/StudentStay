import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { Provider } from 'react-redux'

import './styles/main.scss';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider>
    {/* // <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </Provider>
)
