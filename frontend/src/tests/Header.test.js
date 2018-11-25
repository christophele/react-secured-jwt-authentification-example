import React from 'react';
import Header from '../containers/Header';
import RootTest from './RootTest';
import {shallow, mount} from 'enzyme';
import {setAuthentification, incrementActionCount} from '../actions';
import AuthentificationReducer from '../reducers/Authentification';
import {SET_AUTHENTIFICATION, INCREMENT_ACTION_COUNT} from '../actions/action-types';
import {ActionCounter} from '../middlewares/ActionCounter';

/* test sur composant connecté avec redux */
describe('Test sur Header', () => {
    it('Render du composant connecté sans erreur', () => {
        const wrapper = shallow(
            <RootTest>
                <Header />
            </RootTest>
        );
    });

    it('test que le libellé du bouton connexion est bien \'connexion\' puis \'deconnexion\' après clique' , () => {
        const wrapper = mount(
            <RootTest>
                <Header />
            </RootTest>
        );
        expect(wrapper.find("a").at(3).text()).toEqual('Connexion');
        wrapper.find("a").at(3).simulate("click");
        expect(wrapper.find("a").at(3).text()).toEqual('Déconnexion');
    });

    it('test le payload d\'une action', () => {
        const action = incrementActionCount();
        expect(action.type).toEqual(INCREMENT_ACTION_COUNT);
    });

    it('test le reducer Authentification sans action type', () => {
        const initialState = {
            isLoggedIn: false
        }
        expect(AuthentificationReducer(initialState, {}).isLoggedIn).toEqual(false);
    });

    it('test le reducer Authentification sans action type', () => {
        const action = {
            type: SET_AUTHENTIFICATION,
            payload: true
        };
        const initialState = {
            isLoggedIn: false
        } 
        expect(AuthentificationReducer(initialState, action).isLoggedIn).toEqual(true);
    });
});
