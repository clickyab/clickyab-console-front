import React from 'react';
import {Field} from 'redux-form';

export default ({name, id, label, value , checked, ...props}) => {
    return (
        <div className="md-radio">
            <Field name={name} value={value}  type="radio" defaultChecked component="input"
                   id={id} className="md-radiobtn" />
            <label htmlFor={id}>
                <span/>
                <span className="check"/>
                <span className="box"/>
                {label}
            </label>
        </div>
    );
}