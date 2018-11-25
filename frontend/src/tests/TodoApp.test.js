import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from '../components/TodoApp';
import { shallow } from 'enzyme';

describe('Test TodoApp fonctionnement', function() {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<TodoApp />);
    });

    afterEach(() => {
        wrapper.unmount();
    })

    it('render le composant TodoApp sans erreur', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TodoApp />, div);
        console.log(div.innerHTML);
    });

    it('Contient la chaîne "Nouvelle tâche" ', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TodoApp />, div);
        
        expect(div.innerHTML).toContain('Nouvelle tâche');
    });

    it('render le composant TodoApp sans erreur avec shallow', () => {
        expect(wrapper.html()).toContain('Nouvelle tâche');
    });

    it('possède 2 classes css "row" ', () => {
        expect(wrapper.find('.row').length).toEqual(2);
    });

    it('possède 1 id "addButton" ', () => {
        expect(wrapper.find('#addButton').length).toEqual(1);
    });

    it('change la valeur d\'input ', () => {
        wrapper.find("input").simulate("change", {
            target: {value: 'Yo'}
        });
        expect(wrapper.find("input").prop("value")).toEqual('Yo');
    });

    it('type value in input, click on btn & check value in list ', () => {
        wrapper.find("input").simulate("change", {
            target: {value: 'Yo'}
        });
        wrapper.find("button").simulate("click");
        expect(wrapper.find('.list-group-item').text()).toContain('Yo');
    });
});

