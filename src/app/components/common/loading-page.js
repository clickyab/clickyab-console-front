import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import $ from 'jquery';

export default class PageLoading extends Component {

    componentDidMount() {

    }
    render() {
        return (
            <div className="preloader-page">
                <img src="/img/rubik-preloader.gif"/>
            </div>
        )
    }
}
