import React, {Component} from "react";
import Radio from "./../common/form/Radio";
import {select} from "../../functions/select";
import {dispatch} from "../../functions/dispatch";
import {switchToPersonal, switchToCorporation, updateLocalStorageAction} from "../../redux/actions/index";

export default class SelectUserType extends Component {
    state = {
        profileType: select('profileType'),
        pCheck: false,
        cCheck: false,
    };

    constructor(props) {
        super(props);
        this.selectProfileType = this.selectProfileType.bind(this);
        this.handleInitialize = this.handleInitialize.bind(this);
    }

    handleInitialize() {
        if (select('user.personal') || select('profileType') == 'personal') {
            this.setState({pCheck: true, cCheck: false});
            dispatch(switchToPersonal());
            dispatch(updateLocalStorageAction());
        }
        if (select('user.corporation') || select('profileType') == 'corporation') {
            this.setState({pCheck: false, cCheck: true});
            dispatch(switchToCorporation());
            dispatch(updateLocalStorageAction());
        }
    }

    componentWillMount() {
        this.handleInitialize();
    }

    selectProfileType(e) {
        let val = e.target.value;

        if (val == 'personal') {
            this.setState({profileType: val, pCheck: true, cCheck: false});
            dispatch(switchToPersonal());
            dispatch(updateLocalStorageAction());
        }
        if (val == 'corporation') {
            this.setState({profileType: val, pCheck: false, cCheck: true});
            dispatch(switchToCorporation());
            dispatch(updateLocalStorageAction());
        }
    }

    render() {
        let {pCheck, cCheck} = this.state;
        return (
            <div className='row'>
                <div className='col-md-12 col-xs-12'>
                    <div className='mt-element-ribbon bg-grey-steel'>
                        <div className='ribbon ribbon-color-primary uppercase'>انتخاب نوع شخص</div>
                        <div className='ribbon-content'>حقیقی
                            یا حقوقی بودن کاربری خود را در ابتدا مشخص کنید و سپس فرم را تکمیل نمایید
                            <br />
                            <br />
                            <div className='form-group form-md-radios'>
                                <div className='md-radio-list'>
                                    <Radio onClick={this.selectProfileType} checked={pCheck} label={'حقیقی'}
                                           name={'user-type'} value={'personal'} id={'radio_personal'}/>
                                    <Radio onClick={this.selectProfileType} checked={cCheck} label={'حقوقی'}
                                           name={'user-type'} value={'corporation'}
                                           id={'radio_corporation'}/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}