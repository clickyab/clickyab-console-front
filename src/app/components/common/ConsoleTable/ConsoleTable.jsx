import React, {Component} from "react";
import {dispatch} from "../../../functions/dispatch";
import {channelQueryAction, updateLocalStorageAction} from "../../../redux/actions/index";
import {Pagination} from "./Pagination";
import {PerPage} from "./PerPage";
import {Head} from "./Head";
import {Body} from "./Body";

export function dataTableLoader(status) {
    if (status === true) {
        $(".loader-table").fadeIn();
    }
    else {
        $(".loader-table").fadeOut();
    }
}

export class ConsoleTable extends Component {
    static defaultProps = {
        defaults: {},
        mutators: {}
    };

    constructor(props) {
        super(props);

        this.onPaginationChange = this.onPaginationChange.bind(this);
        this.onPerPageChange = this.onPerPageChange.bind(this);
        this.headers = this.headers.bind(this);
    }

    headers() {
        let headers = this.props.definitions.filter(
            header => header.visible ? header : null
        );

        if (this.props.action === false)
            return headers;

        return [...headers, {
            width: 150,
            data: '_actions',
            filter: false,
            filter_valid_map: null,
            searchable: false,
            sortable: false,
            title: "Action",
            name: "Action",
            visible: true
        }];
    }

    onPaginationChange(event) {
        const page = event.target.value;
        let {onPaginationChange, list} = this.props;

        dispatch(channelQueryAction(list, 'p', page));
        dispatch(updateLocalStorageAction());

        dataTableLoader(true);
        onPaginationChange(page);
        dataTableLoader(false);
    }

    onPerPageChange(event) {
        const per_page = event.target.value;
        let {onPerPageChange, list} = this.props;

        dispatch(channelQueryAction(list, 'p', 1));
        dispatch(channelQueryAction(list, 'c', per_page));
        dispatch(updateLocalStorageAction());

        dataTableLoader(true);
        onPerPageChange(per_page);
        dataTableLoader(false);

        dispatch(channelQueryAction(list, 'p', 1));
    }

    render() {
        return (
            <div className="table-holder">
                <div className="loader-table" style={{display: 'none'}}>
                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"/>
                </div>
                <div id="show-hide-action-btns"/>

                <div className="table-responsive">
                    <table className="table table-striped table-advance table-hover">
                        <Head {...this.props} headers={this.headers}/>
                        <Body {...this.props} headers={this.headers}/>
                    </table>
                </div>
                <div className="row margin-top-20">
                    <Pagination  {...this.props} onPaginationChange={this.onPaginationChange}/>
                    <PerPage  {...this.props} onPerPageChange={this.onPerPageChange}/>
                </div>
            </div>
        );
    }
}