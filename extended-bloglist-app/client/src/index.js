import React from 'react'
import ReactDOM from 'react-dom'
import {provider} from 'react-redux'

import App from './App'
import store from './redux/store'

ReactDOM.render(
    <provider store={store} >
        <App />
    </provider>
    
    , document.getElementById('root'))