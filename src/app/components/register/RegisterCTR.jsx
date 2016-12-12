import React, {Component} from 'react';
import {FooterFullScreen} from '../layouts/FooterFullScreen.jsx';
import RegisterForm from './RegisterForm';

export default class Register extends Component {
    render() {
        return (
            <div className='user-login-5'>
                <div className='row'>

                    <div className='col-md-6 bs-reset mt-login-5-bsfix'>
                        <div className='login-bg'>
                            <div className='login-logo'>
                                <div className='logo'/>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-6 login-container bs-reset mt-login-5-bsfix'>
                        <div className='login-content'>
                            <RegisterForm/>
                        </div>
                        <div className='login-footer'>
                            <div className='row bs-reset'>
                                <div className='col-xs-12 bs-reset text-center'>
                                    <FooterFullScreen />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
