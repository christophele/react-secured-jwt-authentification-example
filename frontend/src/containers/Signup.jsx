import React, {Component} from "react";
import {connect} from "react-redux";
import {reduxForm, Field} from "redux-form";
import * as actions from "../actions";
import * as validations from "../validations";

const fields = {
    email: 'email',
    password: 'password',
    secondPassword: 'secondPassword'
}

class Signup extends Component {
    handleSubmit = formValues => {
        this.props.signupUser(formValues, this.props.history);
    }

    renderInputComponent = field => {
        return (
            <div className="row justify-content-md-center">
                <fieldset className="col-md-4 form-group">
                    <label className="bmd-label-floating">  
                        {field.label}
                    </label>
                    <input {...field.input} type={field.type} className="form-control" />
                    {field.meta.touched 
                    && field.meta.error
                    && <span className="error">
                        {field.meta.error}        
                    </span>}
                </fieldset>
            </div>
        );
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                <div className="row justify-content-md-center">
                    <h1>Inscription</h1>
                </div>
                <Field
                    name={fields.email}
                    component={this.renderInputComponent}
                    type="text"
                    label="Email"
                />
                <Field
                    name={fields.password}
                    component={this.renderInputComponent}
                    type="password"
                    label="Mot de passe"
                />
                <Field
                    name={fields.secondPassword}
                    component={this.renderInputComponent}
                    type="password"
                    label="Confirmation du mot de passe"
                />
                <div className="row justify-content-md-center">
                    <button type="submit" className="btn btn-primary btn-raised">Inscription</button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

function validate(formValues) {
    const errors = {};
    errors.email = validations.validateEmail(formValues.email);
    errors.password = validations.validateNotEmpty(formValues.password);
    errors.secondPassword = validations.validateEqual(formValues.password, formValues.secondPassword);

    console.log(errors);
    return errors;
}

const SignupForm = reduxForm({
    form: 'signup',
    fields: Object.keys(fields),
    validate
})(Signup);

export default connect(mapStateToProps, actions)(SignupForm);