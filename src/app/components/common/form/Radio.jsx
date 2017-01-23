import React from 'react';
import {Field} from 'redux-form';

export default ({name, id, label, value , ...props}) => {
    return (
        <div className="md-radio">
            <Field name={name} value={value} type="radio" component="input"
                   id={id} className="md-radiobtn" {...props}/>
            <label htmlFor={id}>
                <span/>
                <span className="check"/>
                <span className="box"/>
                {label}
            </label>
        </div>
    );
}