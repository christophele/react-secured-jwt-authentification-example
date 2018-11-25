import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
    addRessources,
    getSecretRessource
} from '../actions';
import {
    getIntegerList,
    getContainsOneList,
    getPrimeNumberList,
    getSpecialNumbersList
} from '../selectors';

class Ressources extends Component {
    componentWillMount() {
        this.props.getSecretRessource();
    }
    renderRessources = ressources => {
        return (
            ressources.map(ressource => <li key={ressource}>{ressource}</li>)
        )
    }
    render() {
        return (
            <div className="row">
                <div className="col">
                    <button className="btn btn-raised btn-primary" type="button" onClick={() => this.props.addRessources()}>
                        Ajouter un nombre
                    </button>
                </div>
                <div className="col">
                    <p>Entiers</p>
                    <ul>
                        {this.renderRessources(this.props.integerRessources)}
                    </ul>
                </div>
                <div className="col">
                    <p>Contiennent "1"</p>
                    <ul>
                        {this.renderRessources(this.props.containsOneRessources)}
                    </ul>
                </div>
                <div className="col">
                    <p>Entiers premiers</p>
                    <ul>
                        {this.renderRessources(this.props.primeRessources)}
                    </ul>
                </div>
                <div className="col">
                    <p>Entiers premiers contenant "1"</p>
                    <ul>
                        {this.renderRessources(this.props.specialRessources)}
                    </ul>
                </div>
                {this.props.message}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        integerRessources: getIntegerList(state),
        containsOneRessources: getContainsOneList(state),
        primeRessources: getPrimeNumberList(state),
        specialRessources: getSpecialNumbersList(state),
        message : state.ressources.message
    }
}

const mapDispatchToProps = {
    addRessources,
    getSecretRessource
}


export default connect(mapStateToProps, mapDispatchToProps)(Ressources);