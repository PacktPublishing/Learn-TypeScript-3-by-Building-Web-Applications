import React from 'react';

export class Calculator extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentResult: this.props.initialValue,
        };
    }

    render() {
        return (
            <div>
                <span>Current result: {this.state.currentResult}</span>
                <br/>
                <br/>
                <button onClick={() => this.add(1)}>+1</button>
            </div>
        );
    }

    add(value) {
        this.setState((state, props) => {
            return {currentResult: state.currentResult + value}
        });
    }
}
