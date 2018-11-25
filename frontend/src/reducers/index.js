import {combineReducers} from 'redux';
import AuthentificationReducer from './Authentification';
import ActionInfoReducer from './ActionInfo';
import RessourcesReducer from './Ressources';
import ErrorsReducer from './Errors';

import {reducer as form} from 'redux-form';

const rootReducer = combineReducers({
    form: form,
    authentification: AuthentificationReducer,
    ressources: RessourcesReducer,
    actionInfo: ActionInfoReducer,
    errors: ErrorsReducer
});

export default rootReducer;