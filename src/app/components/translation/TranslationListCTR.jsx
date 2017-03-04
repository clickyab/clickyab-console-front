import React, {Component} from "react";
import {connect} from "react-redux";
import TranslationListPTR from "./TranslationListPTR";
import {sync} from "../../functions/sync";
import swagger from "./../../swagger/index";
import {select} from "../../functions/select";
import {telegramItemsListAction} from "../../redux/actions/index";
import moment from "moment-jalali";
import {translatable} from "react-multilingual/dist";
import {getToken} from "../../redux/helpers";
import InlineEdit from 'react-edit-inline';

@connect(({translationList}) => ({translationList}))
@translatable(({
    ID, Name, Description,
    CreatedAt, UpdatedAt, Action,
    Email, UserID, BotChatID, Username,
    Resolve, Remove

}) => ({
    translation: {
        ID, Name, Description,
        CreatedAt, UpdatedAt, Action,
        Email, UserID, BotChatID, Username,
        Resolve, Remove
    }
}))
export default class TranslationListCTR extends Component {

    constructor(props){
        super(props);
        this.dataChanged = this.dataChanged.bind(this);
        this.state = {
            message: 'ReactInline demo'
        }
    }

    dataChanged(id) {
        return (data) => {
            let translateText = data.translated;
            sync(function*() {
                let {data} = yield (new swagger.MiscApi).miscTranslatePut(getToken(), {'payloadData': {
                    "id": id,
                    "lang": select("locale"),
                    "translated": translateText
                }});
            })
            // data = { description: "New validated text comes here" }
            // Update your model from here
            console.log(data);
            this.setState({...data})
        }
    }

    customValidateText(text) {
        return (text.length > 0);
    }
    callApi(query_name, value) {
        let {dispatch} = this.props;
        sync(function*() {
            let {data} = yield (new swagger.MiscApi).miscTranslateLangGet(select("locale"), getToken(), {
                ...select('queries.translation', {}),
                [query_name]: value
            });

            dispatch(telegramItemsListAction(data));
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
    }

    updated_at(updated_at) {
        return moment(updated_at).format('jYYYY/jM/jD');
    }

    created_at(created_at) {
        return moment(created_at).format('jYYYY/jM/jD');
    }

    translated(translated , {id}) {
            return (<div>
                <InlineEdit
                    id={id}
                    validate={this.customValidateText}
                    activeClassName="editing form-control input-small"
                    text={ translated != null ? translated: "ویرایش"}
                    paramName="translated"
                    change={this.dataChanged(id)}
                    style={{
                        cursor: 'pointer'
                }}

                />
            </div>)


    }

    text(text) {
        return <p className="label label-warning" style={{direction: 'ltr',textAlign: 'left',float:'left' , display:'inline-block'}}>{text}</p>;
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
        return (<TranslationListPTR {...this.props.translationList}
                                 sort={this.sort.bind(this)}
                                 filter={this.filter.bind(this)}
                                 search={this.search.bind(this)}
                                 onPaginationChange={this.onPaginationChange.bind(this)}
                                 onPerPageChange={this.onPerPageChange.bind(this)}
                                 mutators={{updated_at: this.updated_at, created_at: this.created_at , text:this.text ,  translated: this.translated.bind(this)}}
                                 edit={this.edit.bind(this)}
                                 translator={this.translator.bind(this)}
        />)
    }
}