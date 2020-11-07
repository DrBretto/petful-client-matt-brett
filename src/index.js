import './css/setup.css'
import './css/gradients.css'
import './css/index.css'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
<BrowserRouter>
<App />
</BrowserRouter>
, 
document.getElementById('root'))