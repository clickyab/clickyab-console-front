import React, {Component} from 'react';

export default class checkState extends Component {
    state = {
        hello: 'world'
    };

    render() {
        return (
            <div>
                <input type='text' value={this.state.hello}
                       onChange={event => this.setState({hello: 'by tadig : ' + event.target.value})}/>
                {this.state.hello}
            </div>
        );
    }
}

