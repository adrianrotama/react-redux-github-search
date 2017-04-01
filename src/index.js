import './index.css'

import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import configureStore from './store/configureStore'
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './components/App'
import Search from './components/Search'
import User from './components/User'


const store = configureStore()
injectTapEventPlugin()

const routes = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Search}/>
                <Route path="user/:username" component={User}/>
            </Route>
        </Router>
    </Provider>
)

ReactDOM.render(routes, document.getElementById('root'))
