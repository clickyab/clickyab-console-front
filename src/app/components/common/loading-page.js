import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

export default class PageLoading extends Component {

    render() {
        return (
            <div className="preloader-page">
                <img src="/img/rubik-preloader.gif"/>
            </div>
        )
    }
}
