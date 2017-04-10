import React, {Component} from "react";
import {connect} from "react-redux";
import CampaignListPTR from "./CampaignListPTR";
import EditCampaignButton from "./EditCampaignButton";
import swagger from "../../../swagger/index";
import {select} from "../../../functions/select";
import moment from "moment-jalali";
import {sync} from "../../../functions/sync";
import {campaignItemsListAction} from "../../../redux/actions/index";
import {translatable} from "react-multilingual/dist";
import ChangeCampaignStatus from "./ChangeCampaignStatus";
import ChangeCampaignArchiveStatus from "./ChangeCampaignArchiveStatus";
import ChangeCampaignActiveStatus from "./ChangeCampaignActiveStatus";
import {Base64} from "js-base64";
import {baseUrl} from "../../../functions/baseUrl";
let BigPicture = require('./../../common/ThumbnailGallery');
let statistic = baseUrl() + "/statics";


@connect(({campaignList}) => ({campaignList}))
@translatable(({
				   ID, Title, CreatedAt, UpdatedAt, Description, Email,
				   UserID, Name, ArchiveStatus, _actions, AdArchiveStatus, AdActive, AdPayStatus,
				   yes, no, accepted, pending, rejected, AdActiveStatus, AdAdminStatus, Src, PlanID, View

			   }) => ({
	translation: {
		ID, Title, CreatedAt, UpdatedAt, Description, Email,
		UserID, Name, ArchiveStatus, Action: _actions, AdArchiveStatus, AdActive, AdPayStatus,
		yes, no, accepted, pending, rejected, AdActiveStatus, AdAdminStatus, Src, PlanID, View
	}
}))
export default class CampaignListCTR extends Component {
	componentDidMount() {
		function setClickHandler(objectClassName, fn) {
			document.querySelector("." + objectClassName).onclick = fn;
		}

		setClickHandler('table-advance', function (e) {
			if (e.target.className == 'thumbnail-image') {
				BigPicture({
					el: e.target,
					imgSrc: e.target.src
				});
			}
			else if (e.target.className == 'thumbnail-video') {
				BigPicture({
					el: e.target,
					vidSrc: e.target.getAttribute('data-video')
				});
			}
		});
	}


	callApi(query_name, value) {
		let {dispatch} = this.props;
		sync(function*() {
			let {data} = yield (new swagger.AdApi()).campaignListGet(select('user.token', 'no token'), {
				sort: 'created_at:DESC',
				...select('queries.campaign', {}),
				[query_name]: value
			});

			dispatch(campaignItemsListAction(data));
		})
	}

	sort(flag, query_name) {
		this.callApi('sort', query_name + ':' + flag);
	}

	filter(event, query_name) {
		this.callApi(query_name, event.target.value);
	}

	search(event, query_name) {
		this.callApi(query_name, event.target.value);
	}

	edit(id , {pay_status}) {
		if(pay_status == 'no') {
            return <EditCampaignButton key={Math.random()} id={id}/>
		}
	}

	updated_at(updated_at) {
		return moment(updated_at).format('jYYYY/jM/jD');
	}

	created_at(created_at) {
		return moment(created_at).format('jYYYY/jM/jD');
	}

	description(description, {cli_message_id}) {
		if (description != null && cli_message_id == null) {
			return Base64.decode(description).substring(0, 10) + "...";
		}
		if (cli_message_id != null) {
			return "پروموت";
		}

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

	admin_status(admin_status, {id, _actions}) {
		if (_actions.split(',').includes("admin_status")) {
			return <ChangeCampaignStatus id={id} admin_status={admin_status} translator={this.translator.bind(this)}/>;
		}
		let span;
		if (admin_status == 'pending') {
			span = <span className="label  label-warning"> {this.translator(admin_status)} </span>;
		} else if (admin_status == 'accepted') {
			span = <span className="label  label-success"> {this.translator(admin_status)} </span>;
		} else if (admin_status == 'rejected') {
			span = <span className="label  label-danger"> {this.translator(admin_status)} </span>;
		}

		return span;
	}


	archive_status(archive_status, {id, _actions}) {
		if (_actions.split(',').includes("archive_status")) {
			return <ChangeCampaignArchiveStatus id={id} archive_status={archive_status}
												translator={this.translator.bind(this)}/>
		} else {
			return this.translator(archive_status)
		}
	}


	pay_status(pay_status) {
		if (pay_status == "no") {
			return <span className="label  label-warning"> {this.translator(pay_status)} </span>
		} else if (pay_status == "yes") {
			return <span className="label  label-success"> {this.translator(pay_status)} </span>
		}
	}


	active_status(active_status, {id, _actions}) {
		if (_actions.split(',').includes("active_status")) {
			return <ChangeCampaignActiveStatus id={id} active={active_status} translator={this.translator.bind(this)}/>
		}
		else {
			return this.translator(active_status)
		}
	}

	src(src, {description}) {
		let splitByLastDot = function (text) {
			if (text != null || text != undefined) {
				let index = text.lastIndexOf('.');
				return text.slice(index + 1)
			}
		};

		if (src != null) {
			if (splitByLastDot(src) == "png" || splitByLastDot(src) == "jpg") {
				return <img className={"thumbnail-image"} src={statistic + src}
							data-caption={Base64.decode(description)}/>
			}
			else if (splitByLastDot(src) == "mov" || splitByLastDot(src) == "mp4") {
				return <div className={"thumbnail-video"} style={{backgroundImage: 'url(/img/video-file.jpg)'}}
							data-video={statistic + src} data-caption={Base64.decode(description)}/>
			}

			else {
				return <img className={ "thumbnail-image"} src="/img/pdf-file.jpg"
							data-caption={Base64.decode(description)}/>
			}

		} else {
			return <img className={ "thumbnail-image"} src="/img/thumbnail.jpg"
						data-caption={Base64.decode(description)}/>
		}

	}


	render() {
		return (<CampaignListPTR {...this.props.campaignList}
								 edit={this.edit.bind(this)}
								 sort={this.sort.bind(this)}
								 translator={this.translator.bind(this)}
								 onPaginationChange={this.onPaginationChange.bind(this)}
								 onPerPageChange={this.onPerPageChange.bind(this)}
								 filter={this.filter.bind(this)}
								 search={this.search.bind(this)}
								 mutators={{
									 description: this.description.bind(this),
									 updated_at: this.updated_at,
									 created_at: this.created_at,
									 admin_status: this.admin_status.bind(this),
									 archive_status: this.archive_status.bind(this),
									 pay_status: this.pay_status.bind(this),
									 src: this.src.bind(this),
									 active_status: this.active_status.bind(this)
								 }}
								 defaults={{
									 view: 0
								 }}
		/>);
	}
}