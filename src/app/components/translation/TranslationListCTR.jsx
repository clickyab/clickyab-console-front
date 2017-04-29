import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import TranslationListPTR from "./TranslationListPTR";
import {sync} from "../../functions/sync";
import swagger from "./../../swagger/index";
import {select} from "../../functions/select";
import {translationListAction} from "../../redux/actions/index";
import moment from "moment-jalali";
import {getToken} from "../../redux/helpers";
import InlineEdit from "react-edit-inline";
import DeleteTranslationButton from "./DeleteTranslationButton";

@connect(({translationList}) => ({translationList}))
export default class TranslationListCTR extends Component {
	constructor(props) {
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
				yield (new swagger.MiscApi).miscTranslatePut(getToken(), {
					'payloadData': {
						"id": id,
						"lang": select("locale"),
						"translated": translateText
					}
				});
			});

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
				sort: 'created_at:DESC',
				...select('queries.translation', {}),
				[query_name]: value
			});

			dispatch(translationListAction(data));
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
		return id;
	}

	deleteAction(id) {
		return <DeleteTranslationButton key={Math.random()} id={id}/>;
	}

	updated_at(updated_at) {
		return moment(updated_at).format('jYYYY/jM/jD');
	}

	created_at(created_at) {
		return moment(created_at).format('jYYYY/jM/jD');
	}

	translated(translated, {id}) {
		return (<div>
			<InlineEdit
				id={id}
				validate={this.customValidateText}
				editingElement="textarea"
				activeClassName="editing form-control"
				text={translated != null ? translated : "ویرایش"}
				paramName="translated"
				change={this.dataChanged(id)}
				style={{
					cursor: 'pointer'
				}}
			/>
		</div>)
	}

	text(text) {
		return <p style={{direction: 'ltr', display: 'inline-block'}}>{text}</p>;
	}

	onPaginationChange(page) {
		this.callApi('p', page);
	}

	onPerPageChange(per_page) {
		this.callApi('c', per_page);
	}

	render() {
		return (<TranslationListPTR
			{...this.props.translationList}
			sort={this.sort.bind(this)}
			filter={this.filter.bind(this)}
			search={this.search.bind(this)}
			onPaginationChange={this.onPaginationChange.bind(this)}
			onPerPageChange={this.onPerPageChange.bind(this)}
			mutators={{
				updated_at: this.updated_at,
				created_at: this.created_at,
				text: this.text,
				translated: this.translated.bind(this)
			}}
			edit={this.edit.bind(this)}
			deleteAction={this.deleteAction.bind(this)}
		/>)
	}
}

TranslationListCTR.propTypes = {
	dispatch: PropTypes.func,
	translationList: PropTypes.array,
};