import classNames from "classnames";
import React, {Component, PropTypes} from "react";
import Switch from "react-ios-switch";

export default class SettingCell extends Component {
	checked = false;

	constructor(props) {
		super(props);
		this.checked = props.checked || this.checked;
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(checked) {
		const {onChange} = this.props;
		this.checked = !this.checked;
		this.setState({a: Math.random()});
		onChange(checked);
	}

	render() {
		const {className, id} = this.props;
		this.id = id;
		return (
			<label className={classNames('settingCell', className)}>
				<div className={'switchValue'}>
					<Switch
						onColor="#ff7200"
						checked={this.checked}
						className={'switch'}
						onChange={this.handleChange.bind(this)}
					/>
				</div>
			</label>
		);
	}
}

SettingCell.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string
};