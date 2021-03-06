import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card'

import toPairsIn from 'lodash/toPairsIn'

export const Fields = {
  Mail: {
    required: true,
    regExp: {
      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      error: 'Not a valid e-mail address'
    }
  },
  Password: {
    required: true,
    custom: [
      {
        test: (value) => value && value.length > 5,
        error: "Too short"
      }
    ]
  }
};

const validate = values => {
  const errors = {};
  toPairsIn(Fields).forEach(([key, validations]) => {
    if (validations.required && !values[key]) {
      errors[key] = 'Required';
    } else if (validations.regExp && !validations.regExp.pattern.test(values[key])) {
      errors[key] = validations.regExp.error;
    } else if (validations.custom) {
      for (let customValidation of validations.custom) {
        if (!customValidation.test(values[key])) {
          errors[key] = customValidation.error;
          break;
        }
      }
    }
  });
  return errors;
};

export class LoginForm extends Component {
  render() {
    const { fields: { Mail, Password }, handleSubmit, submitting, invalid} = this.props;
    const flexBetweenStyle = {display: 'flex', justifyContent: 'space-around'};
    return (
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader style={{backgroundColor: 'lightgray'}}
                      title="Login" />
          <CardText>
            <div className="row align-spaced">
              <div className="medium-5 small-12 column">
                <TextField {...Mail}
                  ref="Mail"
                  type="email"
                  floatingLabelText="Email"
                  style={{maxWidth: '100%'}}
                  errorText={Mail.touched && Mail.error} />
              </div>
              <div className="medium-5 small-12 column">
                <TextField {...Password}
                  ref="Password"
                  type="password"
                  floatingLabelText="Password"
                  style={{maxWidth: '100%'}}
                  errorText={Password.touched && Password.error}/>
              </div>
            </div>
          </CardText>

          <CardActions style={{display: 'flex', flexDirection: 'row-reverse'}}>
            {/* everything is revered with flex-direction, because the submit button should come first (in DOM) */}
            <FlatButton ref="submit" label="Submit" disabled={invalid || submitting} style={{marginLeft: 'auto'}} type="submit" />
            <RaisedButton label="Sign up" secondary={true} onTouchTap={() => browserHistory.push('/signup')} />
          </CardActions>
        </Card>
      </form>
  );
  }
  }

  export default reduxForm({
    form: 'login-form',
    fields: Object.keys(Fields),
    validate
  })(LoginForm);