import React, {Component} from "react";
import {connect} from "react-redux";
import UsersListPTR from './UsersListPTR';

@connect(({userList}) => ({userList}))
export default class UsersListCTR extends Component {
    render() {
        const {items, definitions} = this.props.userList;

        return (<UsersListPTR items={items} definitions={definitions}/>);
    }
}