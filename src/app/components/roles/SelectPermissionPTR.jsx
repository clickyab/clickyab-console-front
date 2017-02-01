import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import Select from 'react-select';

export default class SelectPermissionPTR extends Component {

    render() {
        let {multi, selfValue, parentValue, globalValue, options, self, parent, global, toggleDisabled,
            handleOnChangeSelf, handleOnChangeParent, handleOnChangeGlobal} = this.props;
        let array = [];
        array.push.apply(array, selfValue);
        array.push.apply(array, parentValue);
        array.push.apply(array, globalValue);
        options = options.filter(val => !array.includes(val));
        return (
            <div>
                <div className="form-group">
                    <label className="mt-checkbox">
                        <Field component="input" id="self" value="self"
                               onClick={toggleDisabled}
                               name="self"
                               type="checkbox"/> خودم
                        <span/>
                    </label>
                    <Select
                        disabled={self}
                        multi={multi}
                        options={options}
                        onChange={handleOnChangeSelf}
                        value={selfValue}
                        placeholder='انتخاب دسترسی...'
                    />
                </div>
                <div className="form-group">
                    <label className="mt-checkbox">
                        <Field component="input" id="parent" value="parent"
                               onClick={toggleDisabled}
                               name="parent"
                               type="checkbox"/> PARENT
                        <span/>
                    </label>
                    <Select
                        disabled={parent}
                        multi={multi}
                        options={options}
                        onChange={handleOnChangeParent}
                        value={parentValue}
                        placeholder='انتخاب دسترسی...'
                    />
                </div>
                <div className="form-group">
                    <label className="mt-checkbox">
                        <Field component="input" id="global" value="global"
                               onClick={toggleDisabled}
                               name="global"
                               type="checkbox"/> Global
                        <span/>
                    </label>
                    <Select
                        disabled={global}
                        multi={multi}
                        options={options}
                        onChange={handleOnChangeGlobal}
                        value={globalValue}
                        placeholder='انتخاب دسترسی...'
                    />
                </div>
            </div>

        )
    }
}