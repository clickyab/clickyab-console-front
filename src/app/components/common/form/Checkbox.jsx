import React from 'react';
import {Field} from 'redux-form';

export default ({name, id, label, ...props}) => {
    return (
        <div className="md-checkbox">
            <Field name={name} type="checkbox" component="input"
                   id={id} {...props} className="md-check"/>
            <label htmlFor={id}>
                <span/>
                <span className="check"/>
                <span className="box"/>
                {label}
            </label>
        </div>
    );
}