import { incrementActionCount } from '../actions';
import { INCREMENT_ACTION_COUNT } from '../actions/action-types';

export const ActionCounter = store => {
    return next => {
        return action => {
            if(action.type !== INCREMENT_ACTION_COUNT) {
                store.dispatch(incrementActionCount());
            }

            // console.log('action qui passe ', action);
            next(action);
        };
    };
};