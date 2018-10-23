import {Route, Switch} from 'react-router-dom';
import React from 'react';
import Home from './home';
import Rooms from './rooms';

export default props => (
    <Switch>
        <Route exact path ="/" component={Home} />
        <Route path ="/rooms" component={Rooms} />
    </Switch>
)