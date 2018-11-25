import {createSelector} from 'reselect';
import lodash from 'lodash';

/* selector = fonction qui reçoit tout le store en paramètre */
export const getIntegerList = state => {
    return state.ressources.ressourceList
}

export const getContainsOneList = state => {
    return getIntegerList(state).filter(
        r => r.toString().indexOf('1') > -1)
};

export const getPrimeNumberList = state => {
    return getIntegerList(state).filter(r => isPrimeNumber(r));
}

const isPrimeNumber = value => {
    for (var i = 2; i < value; i++) {
        if(value % i === 0) {
            return false;
        }
    }
    return value > 1;
}

export const getSpecialNumbersList = createSelector(
    getContainsOneList,
    getPrimeNumberList,
    (containsOneList, primeNumbersList) => {
        return lodash.intersection(containsOneList, primeNumbersList);
    }
)