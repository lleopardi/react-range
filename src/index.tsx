import './index.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Menu from './components/Menu/Menu';
import Home from './pages/Home/Home';
import NormalFilter from './pages/Normal/NormalFilter';
import FixedFilter from './pages/Fixed/FixedFilter';


const App = () => {

    const menuItems = [
        {
            route: '/',
            description: 'Home'
        },
        {
            route: '/exercise1',
            description: 'Normal (Exercise1)'
        },
        {
            route: '/exercise2',
            description: 'Fijo (Exercise2)'
        },
    ]

    return (
        <Router>
            <Menu items={menuItems} />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/exercise1">
                    <NormalFilter />
                </Route>
                <Route path="/exercise2">
                    <FixedFilter />
                </Route>
            </Switch>
        </Router>

    );
}
ReactDOM.render(<App />, document.getElementById('app'));