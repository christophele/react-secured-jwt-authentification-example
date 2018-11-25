import React, {Component} from 'react';
import Header from '../containers/Header';
import {Route, Switch} from 'react-router-dom';
import Home from './Home';
import Ressources from './Ressources';
import Signin from '../containers/Signin';
import Signout from '../containers/Signout';
import Signup from '../containers/Signup';
import Errors from '../containers/Errors';
import TodoApp from '../components/TodoApp';
/* helpers */
import RequireAuth from '../helpers/RequireAuth';

require("../assets/css/style.css");

export default class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container body_content">
                <Errors />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        {/* appelle la fonction RequireAuth qui prend en param un composant et retourne ce composant en ajoutant des features */}
                        <Route exact path="/ressources" component={RequireAuth(Ressources)} /> 
                        <Route exact path="/todo" component={RequireAuth(TodoApp)} /> 
                        <Route exact path="/signin" component={Signin} />
                        <Route exact path="/signout" component={Signout} />
                        <Route exact path="/signup" component={Signup} />
                    </Switch>
                </div>
            </div>
        );
    }
}