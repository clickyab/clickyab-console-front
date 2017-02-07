import React, {Component} from "react";
import {connect} from "react-redux";
import CategoryListPTR from "./CategoryListPTR";
import EditCategoryButton from "./EditCategoryButton";
import swagger from "./../../../swagger/index";
import {select} from "./../../../functions/select";
import {sync} from "./../../../functions/sync";
import moment from "moment-jalali";
import {categoryItemsListAction} from "../../../redux/actions/index";
import {translatable} from "react-multilingual/dist";

@connect(({categoryList}) => ({categoryList}))
@translatable(({
    ID,
    Title,
    CreatedAt,
    UpdatedAt,
    Description,
    Scope
}) => ({
    translation: {
        ID,
        Title,
        CreatedAt,
        UpdatedAt,
        Description,
        Scope
    }
}))
export default class CategoryListCTR extends Component {
    callApi(query_name, value) {
        let {dispatch} = this.props;
        sync(function*() {
            let {data} = yield (new swagger.CategoryApi).categoryListGet(select('user.token', 'no token'), {
                ...select('queries.category', {}),
                [query_name]: value
            });

            dispatch(categoryItemsListAction(data));
        })
    }

    sort(flag, query_name) {
        this.callApi('sort', query_name + ':' + flag)
    }

    filter(event, query_name) {
        this.callApi(query_name, event.target.value);
    }

    search(event, query_name) {
        this.callApi(query_name, event.target.value);
    }

    edit(id) {
        return <EditCategoryButton key={Math.random()} id={id}/>
    }


    updated_at(updated_at) {
        return moment(updated_at).format('dddd، jD jMMMM jYYYY');
    }

    created_at(created_at) {
        return moment(created_at).format('dddd، jD jMMMM jYYYY');
    }

    onPaginationChange(page) {
        this.callApi('p', page);
    }

    onPerPageChange(per_page) {
        this.callApi('c', per_page);
    }

    translator(title) {
        return this.props.translation[title];
    }

    render() {
        return (<CategoryListPTR {...this.props.categoryList}
                                 sort={this.sort.bind(this)}
                                 filter={this.filter.bind(this)}
                                 translator={this.translator.bind(this)}
                                 search={this.search.bind(this)}
                                 onPaginationChange={this.onPaginationChange.bind(this)}
                                 onPerPageChange={this.onPerPageChange.bind(this)}
                                 mutators={{updated_at: this.updated_at, created_at: this.created_at}}
                                 edit={this.edit.bind(this)}
        />);
    }
}
