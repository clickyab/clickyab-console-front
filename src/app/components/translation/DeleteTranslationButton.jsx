import React, {Component} from "react";
import {sync} from "./../../functions/sync";
import swagger from "./../../swagger/index";
import {getToken} from "../../redux/helpers";
import {select} from "../../functions/select";
import {dispatch} from "../../functions/dispatch";
import {translationListAction} from "../../redux/actions/index";

export default class DeleteTranslationButton extends Component {
	deleteAction(event) {
		let {id} = this.props;
		sync(function* () {
			let {data, error} = yield (new swagger.MiscApi())
				.miscDeleteIdDelete(id, getToken());

			if(!error) {
				let {data} = yield (new swagger.MiscApi).miscTranslateLangGet(select("locale"), getToken(), {
					...select('queries.translation', {})
				});

				dispatch(translationListAction(data));
			}
		});
	}

	render() {
		return <div className="btn-group ">
			<button className="btn btn-info btn-xs edit-item mt-ladda-btn ladda-button" data-style="zoom-in"
					key="delete" onClick={(event) => this.deleteAction(Object.assign({}, event))}>حذف
			</button>
		</div>
	}
}