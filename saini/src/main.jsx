import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { Provider } from 'react-redux';
import Store from './Store/Store.jsx';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <ToastContainer style={{fontSize:"1.5rem",textTransform:"lowercase"}}/>
    <App />
  </Provider>,
)
