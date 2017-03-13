import classNames from "classnames";
import React from "react";
import Switch from "react-ios-switch";

class SettingCell extends React.Component {
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
        const {className, value} = this.props;
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

export default SettingCell;
