import React, {Component} from 'react';

export class ConsoleCell extends Component {
    render() {
        let {mutator, data} = this.props;
        return (
            mutator ? <td>{mutator(data)}</td> : <td>{data}</td>
        );
    }
}