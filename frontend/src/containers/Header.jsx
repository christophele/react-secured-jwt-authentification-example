import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {Link} from 'react-router-dom';

class Header extends Component {
    renderAuthentificationLink = () => {
        if(this.props.isLoggedIn) {
            return (
                <li className="nav-item">
                    <Link className="nav-link" to={"/signout"}>Déconnexion</Link>
                </li>
            )
        } else {
            return (
                [
                    <li key={1} className="nav-item">
                        <Link className="nav-link" to={"/signin"}>Connexion</Link>
                    </li>
                    ,
                    <li key={2} className="nav-item">
                        <Link className="nav-link" to={"/signup"}>Inscription</Link>
                    </li>
                ]
            )
        }
    }
    
    render() {
        return (
            <div>
                <ul className="nav nav-tabs bg-primary">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Accueil</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/ressources">Ressources</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/todo">Todo</Link>
                    </li>
                    {this.renderAuthentificationLink()}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.authentification.isLoggedIn
    };
};

export default connect(mapStateToProps, actions)(Header);

export {Header}